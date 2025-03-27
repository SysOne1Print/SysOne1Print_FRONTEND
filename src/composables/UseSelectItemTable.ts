/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Composable para gerenciar seleção de itens em tabelas
 * Fornece funções para selecionar, excluir e gerenciar itens selecionados
 */
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { useToast } from '@/composables/Toast'
import { useLoginStore } from '@/stores/LoginStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useSwal } from './Swal'
import { deleteAccounting } from '@/api/actions/AccountFinanceiro'
import type { IError, IFinanceAllList } from '@/model/Index'

const { notifyToast } = useToast()
const { userData } = storeToRefs(useLoginStore())
const { swalConfirmed } = useSwal()

/**
 * Hook para gerenciar seleção de itens em tabelas
 * @returns {Object} Objeto contendo funções e estados para gerenciar seleção de itens
 */
export const useSelectItem = () => {
  const router = useRouter()

  /**
   * Itens selecionados para contas a pagar
   */
  const selectAccount = ref<{ selectItem: number[] }>({ selectItem: [] })

  /**
   * Itens selecionados para contas a receber
   */
  const selectAccount2 = ref<{ selectItem: number[] }>({ selectItem: [] })

  /**
   * Lista de IDs de itens selecionados
   */
  const selectItem = ref<number[]>([])

  /**
   * Lista de finanças de fornecedores (contas a pagar)
   */
  const listFinanceFornecedor = ref<IFinanceAllList[]>([])

  /**
   * Lista de finanças de recebimentos de fornecedores (contas a receber)
   */
  const listFinanceRecbFornecedor = ref<IFinanceAllList[]>([])

  /**
   * Computed que retorna a lista de finanças de fornecedores
   */
  const listFinanceFornecedorCompt = computed(() => listFinanceFornecedor.value)

  /**
   * Computed que retorna a lista de finanças de recebimentos de fornecedores
   */
  const listFinanceRecbFornecedorCompt = computed(() => listFinanceRecbFornecedor.value)

  /**
   * Seleciona ou desmarca todos os itens da lista
   * @param {boolean} event - Estado do checkbox (marcado/desmarcado)
   * @param {ComputedRef | Ref} relistProduct - Lista de produtos a selecionar
   * @param {string} route - Rota opcional para filtrar itens
   */
  const selectAll = (event: boolean, relistProduct: ComputedRef | Ref, route: string = '') => {
    if (event && route === '') {
      relistProduct.value.forEach((v: { pro_id?: number; id: number }) => {
        selectItem.value.push(v.pro_id ?? v.id)
      })
      return
    }

    if (event && route !== '') {
      relistProduct.value.forEach(
        (v: { orc_id: number; statusQueue: string; statusId?: number }) => {
          if (v.statusQueue !== 'Rodando' && v.statusId !== 1) selectItem.value.push(v.orc_id)
        }
      )
      return
    }

    selectItem.value = []
  }

  /**
   * Exclui contas contábeis selecionadas
   * @param {number} model_type - Tipo de modelo (1: contas a pagar, 2: contas a receber)
   */
  const deleteAccountingFn = async (model_type: number) => {
    try {
      if (userData.value.user_id <= 0) {
        notifyToast({ msg: 'Logue no painel novamente', typeToast: 'info' })
        setTimeout(() => {
          router.push({ name: 'home' })
        }, 800)
        return
      }

      if (model_type === 1 && selectAccount.value.selectItem.length === 0) {
        notifyToast({ msg: 'Selecione pelo menos uma conta', typeToast: 'info' })
        return
      }

      if (model_type === 2 && selectAccount2.value.selectItem.length === 0) {
        notifyToast({ msg: 'Selecione pelo menos uma conta', typeToast: 'info' })
        return
      }

      const result = await swalConfirmed({
        title: 'Atenção',
        icon: 'warning',
        text: 'Você deseja realmente excluir essas contas?'
      })

      if (result.isConfirmed) {
        const { data, status } = await deleteAccounting(
          model_type === 1 ? selectAccount.value : selectAccount2.value,
          model_type
        )

        if (status === 200) {
          notifyToast({ msg: data.msg, typeToast: 'success' })
          if (model_type === 1) {
            selectAccount.value.selectItem.forEach((v) => {
              const indexToDelete = listFinanceFornecedor.value.findIndex((n) => n.id === v)
              if (indexToDelete !== -1) {
                listFinanceFornecedor.value.splice(indexToDelete, 1)
              }
            })
            selectAccount.value.selectItem = []
          } else {
            selectAccount2.value.selectItem.forEach((v) => {
              const indexToDelete = listFinanceRecbFornecedor.value.findIndex((n) => n.id === v)
              if (indexToDelete !== -1) {
                listFinanceRecbFornecedor.value.splice(indexToDelete, 1)
              }
            })
            selectAccount2.value.selectItem = []
          }
        }
      }
    } catch (er: unknown) {
      const error = er as IError
      if (error.response === undefined) {
        notifyToast({ msg: 'Erro interno', typeToast: 'error' })
        return
      }
      if (error.response.status === 404) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
        return
      } else {
        notifyToast({ msg: 'Erro interno ', typeToast: 'error' })
        return
      }
    }
  }

  /**
   * Seleciona ou desmarca um item específico
   * @param {number} id - ID do item
   * @param {number} model_type - Tipo de modelo (1: contas a pagar, 2: contas a receber)
   */
  const selectItemFn = (id: number, model_type: number) => {
    if (model_type === 1) {
      const index = selectAccount.value.selectItem.indexOf(id)
      if (index === -1) {
        selectAccount.value.selectItem.push(id)
      } else {
        selectAccount.value.selectItem.splice(index, 1)
      }
    } else {
      const index = selectAccount2.value.selectItem.indexOf(id)
      if (index === -1) {
        selectAccount2.value.selectItem.push(id)
      } else {
        selectAccount2.value.selectItem.splice(index, 1)
      }
    }
  }

  return {
    selectAll,
    selectItem,
    deleteAccountingFn,
    selectItemFn,
    selectAccount,
    selectAccount2,
    listFinanceFornecedor,
    listFinanceRecbFornecedor,
    listFinanceFornecedorCompt,
    listFinanceRecbFornecedorCompt
  }
}
