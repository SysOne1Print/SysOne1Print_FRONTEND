/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Composable para gerenciar operações financeiras
 */
import { useToast } from '@/composables/Toast'
import type { IError, IOrcamentoPedidoPaymentStatus, IOrcamentoPedidoStatus } from '@/model/Index'
import { useSwal } from '@/composables/Swal'
import { getOrcamentoPedidoStatus, updateOrcamentoStatus } from '@/api/actions/Orcamento'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDomStore } from '@/stores/DomStore'

const { notifyToast } = useToast()
const { swalConfirmed } = useSwal()

/**
 * Hook para gerenciar operações financeiras
 * @returns {Object} Objeto contendo funções e estados para gerenciar finanças
 */
export const useFinance = () => {
  // Configurações de paginação
  const limit = ref<number>(10)
  const offset = ref<number>(0)
  const total = ref<number>(0)
  const { orcStatus } = storeToRefs(useDomStore())

  const listOrc = ref<IOrcamentoPedidoStatus[]>([])

  /**
   * Recarrega a lista de orçamentos com filtros opcionais
   * @param {string} typeProd - Tipo de produto para filtrar
   * @param {string} searchItem - Termo de busca
   */
  const rechargeOrcamento = async (typeProd = '', searchItem = '') => {
    try {
      let typeSearch = -1
      if (Number(orcStatus.value) > 0 || typeProd !== '') {
        typeSearch = Number(orcStatus.value)
      }

      const { data } = await getOrcamentoPedidoStatus(limit.value, '', offset.value, typeSearch, '')
      listOrc.value = [...data.orc]
      total.value = data.total
    } catch (er: unknown) {
      const error = er as IError
      listOrc.value = []
      total.value = 0
      if (error.response.status === 404) {
        notifyToast({ msg: 'Não existe mais orçamentos', typeToast: 'info' })
      }
    }
  }

  /**
   * Aprova um orçamento para pagamento
   * @param {IOrcamentoPedidoPaymentStatus} value - Dados do orçamento a ser aprovado
   */
  const budgetStatusApprove = async (value: IOrcamentoPedidoPaymentStatus) => {
    try {
      // Verifica se o pagamento é com carteira
      if (value.forma_pagamento.fpg_id === 10) {
        // Verifica saldo da carteira
        if (
          value.cliente.carteira_one1_cliente !== null &&
          value.orc_valor_total >= Number(value.cliente.carteira_one1_cliente.cart_valor)
        ) {
          const result = await swalConfirmed({
            title:
              'Atenção, o saldo da carteira do cliente e (menor/igual) do que o valor do produto, ele ficará com saldo negativo',
            icon: 'info',
            text: 'Você deseja realmente pagar esse orçamento com dinheiro da carteira?'
          })

          if (result.isConfirmed) {
            const { data } = await updateOrcamentoStatus(
              {
                orc_id: value.orc_id
              },
              value
            )
            notifyToast({ msg: data.msg, typeToast: 'success' })
            await rechargeOrcamento()
          }
        }
        // Outras verificações e lógica de aprovação
        // ...
      }
    } catch (er: unknown) {
      // Tratamento de erros
      // ...
    }
  }

  return {
    limit,
    offset,
    total,
    listOrc,
    rechargeOrcamento,
    budgetStatusApprove,
    // Outros métodos e propriedades
  }
}
