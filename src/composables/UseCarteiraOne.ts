/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Composable para gerenciar operações da carteira digital One1
 * Fornece funções para manipular saldo, pagamentos e atualizações da carteira digital
 */
import { updateOrcamentoStatus } from '@/api/actions/Orcamento'
import { useToast } from './Toast'
import { useSwal } from './Swal'
import type { IError, IOrcamentoPedidoPaymentStatus, ITypePayment, IWalletOne } from '@/model/Index'
import { computed, getCurrentInstance, reactive, ref, watchEffect } from 'vue'
import { getAllWallet, updateCarteiraOne } from '@/api/actions/Carteira'
import { getAllPaymentType } from '@/api/actions/Payment'

const { swalConfirmed } = useSwal()
const { notifyToast } = useToast()

type Emit = (event: 'debit-cart', ...args: any[]) => void

/**
 * Hook para gerenciar operações da carteira digital
 * @param {Emit} emit1 - Função opcional para emitir eventos
 * @returns {Object} Objeto contendo funções e estados para gerenciar a carteira
 */
export const useCarteiraOne = (emit1?: Emit) => {
  const { emit } = getCurrentInstance() as { emit: Emit }

  /**
   * Configurações de paginação e filtros
   */
  const limit = ref<number>(10)
  const offset = ref<number>(0)
  const total = ref<number>(0)
  const walletStatus = ref<number>(0)
  const searchNome = ref('')
  
  /**
   * Lista de carteiras e tipos de pagamento
   */
  const wallet = ref<IWalletOne[]>([])
  const allPaymentType = ref<ITypePayment[]>([])

  /**
   * Processa pagamento usando a carteira digital
   * @param {IOrcamentoPedidoPaymentStatus} value - Dados do orçamento a ser pago
   */
  const paymentCarteiraOne = async (value: IOrcamentoPedidoPaymentStatus) => {
    // Verifica se o saldo é insuficiente
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
        return
      }
    } else if (
      value.cliente.carteira_one1_cliente !== null &&
      value.orc_valor_total < Number(value.cliente.carteira_one1_cliente.cart_valor)
    ) {
      // Saldo suficiente
      const result = await swalConfirmed({
        title: 'Atenção, Pagamento com a carteira one1',
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

        // Verifica se o pagamento já foi efetuado
        if (data['status_payment'] !== undefined) {
          notifyToast({ msg: data.msg, typeToast: 'warning' })
          return
        }

        // Debita da carteira
        emit('debit-cart', parseFloat(value.orc_valor_total.toString() as string))
        notifyToast({ msg: data.msg, typeToast: 'success' })
        return
      }
    } else {
      notifyToast({
        msg: 'saldo da carteira insuficiente ou é inexistente',
        typeToast: 'warning'
      })
      return
    }
  }

  /**
   * Computed que retorna a lista de carteiras
   */
  const cWallet = computed(() => wallet.value)

  /**
   * Obtém a lista de carteiras com base nos filtros atuais
   */
  const getWallet = async () => {
    try {
      const { data } = await getAllWallet(
        limit.value,
        offset.value,
        walletStatus.value,
        searchNome.value
      )
      wallet.value = data.wallet
      total.value = data.total
    } catch (er: unknown) {
      const error = er as IError
      wallet.value = []
      total.value = 0
      if (error.response.status === 404) {
        notifyToast({ msg: 'Não existe mais carteiras', typeToast: 'info' })
      }
    }
  }

  /**
   * Atualiza uma carteira digital
   * @param {Object} updateCartOne - Dados para atualização da carteira
   * @returns {Promise} Promise com os dados da resposta da API
   */
  const validateUpdateCarteiraOne = async (updateCartOne: {
    id_cartOne: number | undefined
    user_id: number
    fpg_id: number
  }) => {
    try {
      const { data, status } = await updateCarteiraOne(updateCartOne)
      notifyToast({ msg: data.msg, typeToast: 'success' })

      if (status === 200) {
        await getWallet()
      }

      return { data, status }
    } catch (er) {
      const error = er as IError
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
    }
  }

  return {
    limit,
    offset,
    total,
    wallet,
    cWallet,
    getWallet,
    paymentCarteiraOne,
    validateUpdateCarteiraOne,
    walletStatus,
    searchNome,
    allPaymentType
  }
}
