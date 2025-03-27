/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/**
 * Composable para gerenciar operações de orçamentos
 * Fornece funções para manipular produtos no carrinho, calcular valores e atualizar orçamentos
 */
import { useLoginStore } from '@/stores/LoginStore'
import { computed, getCurrentInstance, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from './Toast'
import { useProductStore } from '@/stores/ProductStore'
import { useClientStore } from '@/stores/ClientStore'
import { sendAllProductFile } from '@/api/actions/Produtos'
import type { IError, pedidoOrc } from '@/model/Index'
import { updateBudgetCompletely } from '@/api/actions/Orcamento'
import { storeToRefs } from 'pinia'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Emit = (event: 'modal', ...args: any[]) => void

/**
 * Hook para gerenciar operações de orçamentos
 * @param {Emit} emit1 - Função opcional para emitir eventos
 * @returns {Object} Objeto contendo funções e estados para gerenciar orçamentos
 */
export const useBudget = (emit1?: Emit) => {
  const { emit } = getCurrentInstance() as { emit: Emit }
  
  /**
   * Formatador de moeda para valores em Real (BRL)
   */
  const real = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })

  // Hooks
  const { stateValue, productCart } = storeToRefs(useProductStore())
  const { getClientById } = useClientStore()
  const { notifyToast } = useToast()
  const route = useRoute()
  const { userData } = useLoginStore()
  
  /**
   * ID do cliente obtido dos parâmetros da rota
   */
  const paramsRouter = ref(route.params.id || route.params.id_cli)

  /**
   * Computed que mapeia os produtos do carrinho para o formato necessário para o orçamento
   * @returns {Array} Array de produtos formatados para o orçamento
   */
  const prod = computed(() => {
    return productCart.value.map((v) => {
      //4: categoria de items: Camiseta | 1,2 e 3: impressão e DTF
      return {
        pro_visible: v.pro_visible,
        content: v.content,
        corDtf: v.corDtf,
        produto_type: v.pro_categoria_item,
        pro_id: v.pro_id,
        pro_nome: v.pro_nome,
        pro_desconto: v.value_discount.toString(),
        pro_cor: v.cor,
        pro_tamanho: v.tamanho,
        pro_discount_type: v.value_discount_type,
        produto_preco_unidade: { pro_venda: v.pro_venda },
        /*pro_status: v.pro_status,*/ qnty: v.qnty,
        type: v.type,
        oit_id: 0,
        prod_deleted: v.prod_deleted
      }
    })
  })
  
  /**
   * Dados do cliente com base no ID obtido dos parâmetros da rota
   */
  const getClient = computed(() => getClientById(Number(paramsRouter.value)))

  /**
   * Valor total do carrinho formatado em moeda (R$)
   */
  const totalCart = computed(() =>
    real.format(
      parseFloat(stateValue.value.totalValue === '' ? '0' : stateValue.value.totalValue.toString())
    )
  )
  
  /**
   * Valor total do carrinho com desconto aplicado, formatado em moeda (R$)
   */
  const totalCartWithDiscount = computed(() => {
    return stateValue.value.totalWithDiscount === '' ||
      stateValue.value.totalWithDiscount === undefined
      ? totalCart.value
      : real.format(parseFloat(stateValue.value.totalWithDiscount.toString()))
  })
  
  /**
   * Flag para controlar o estado de processamento de operações
   */
  const check = ref<boolean>(false)
  
  /**
   * Objeto que armazena os dados do orçamento a ser criado ou atualizado
   */
  const pedidoOrcamento = ref<pedidoOrc>({
    client: Number(paramsRouter.value),
    corDtf: 0,
    formaPagamento: 5,
    status: 1, //orçamento,
    orc_type_discount: 0,
    // observacao: '',
    valorFrete: '0.00',
    exibirRecibo: false,
    valorTotal: totalCart.value,
    orc_valor_discount: totalCartWithDiscount.value,
    usuariocadastro: userData.user_id,
    produto_orcamento: [],
    urlForItems: []
  })

  /**
   * Confirma a alteração de um orçamento existente
   * @param {number} orc_id - ID do orçamento a ser alterado
   */
  const confirAlterOrcamento = async (orc_id: number) => {
    check.value = true
    const form = new FormData()
    try {
      // Atualiza os valores totais do orçamento
      pedidoOrcamento.value.valorTotal = totalCart.value
      pedidoOrcamento.value.orc_valor_discount = totalCartWithDiscount.value
      
      // Mapeia os produtos para o formato necessário para a API
      const orcamento = prod.value.map((v) => {
        return {
          ...v,
          produto_preco_unidade: { pro_venda: Number(v.produto_preco_unidade.pro_venda) }
        }
      })
      
      // Adiciona os IDs dos itens de orçamento existentes, se houver
      productCart.value.forEach((v, index) => {
        if (v.orcamento_itens !== undefined && v.orcamento_itens?.length > 0)
          v.orcamento_itens?.forEach((val) => {
            orcamento[index].oit_id = val.oit_id as number
          })
      })

      pedidoOrcamento.value.produto_orcamento = orcamento
      
      // Verifica se o usuário está logado
      if (userData.user_id <= 0) {
        notifyToast({
          msg: 'Logue no Painel novamente para executar essa função',
          typeToast: 'info'
        })
        setTimeout(() => {
          check.value = false
        }, 500)

        return
      }

      // Verifica se há produtos no orçamento
      if (pedidoOrcamento.value.produto_orcamento.length > 0) {
        // Primeiro atualiza os produtos sem arquivos
        alterOnlyProductWithOutFile()
          .then((result) => {
            // Prepara o upload de arquivos para produtos que necessitam
            productCart.value.forEach((v) => {
              let noti = 0
              if (v.pro_categoria_item === 4) {
                return
              }
              if (noti === 0 && v.pro_categoria_item !== 4)
                notifyToast({
                  msg: 'Fazendo upload dos arquivos, e criando o Id do pedido',
                  typeToast: 'info'
                })

              // Adiciona os arquivos e informações relacionadas ao FormData
              v.dropzoneFile?.forEach((value) => {
                form.append('item', value)
                if (v.type !== 0 && v.type > 0) {
                  const qualidade: string = v.one1_produto_estoque.find(
                    (c) => c.one1_outros.id === v.type
                  )?.one1_outros?.one1_nome as string
                  form.append('qualidade[]', qualidade)
                }
                form.append('pro_id[]', v.pro_id.toString())
                form.append('pro_categ_tipo[]', v.type.toString())
              })
              form.append('service_type', (1).toString())
              noti++
            })
            
            // Adiciona informações do cliente e do orçamento
            form.append('nome_client', getClient.value?.cli_nome as string)
            form.append('nome_empresa', getClient.value?.cli_nome_fantasia as string)
            form.append('client_id', paramsRouter.value.toString())
            form.append('orc_id', orc_id.toString())

            // Envia os arquivos se houver qualidade especificada
            if (form.get('qualidade[]') !== null) {
              sendAllProductFile(form)
                .then((result) => result)
                .catch((err) => err)
            }
          })
          .catch((err: unknown) => {
            throw err
          })
      } else {
        notifyToast({ msg: 'Adicione um item ao carrinho para prosseguir', typeToast: 'info' })
        setTimeout(() => {
          check.value = false
        }, 500)
      }
    } catch (er: unknown) {
      const error = er as IError
      console.log(error)
      if (error.response !== undefined) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      } else {
        notifyToast({ msg: 'Error', typeToast: 'error' })
      }
      setTimeout(() => {
        check.value = false
      }, 500)
    }
  }

  /**
   * Atualiza apenas os produtos do orçamento sem enviar arquivos
   * @returns {Promise} Promise com os dados da resposta da API
   */
  const alterOnlyProductWithOutFile = async () => {
    try {
      const id_orc: number = Number(route.params.id_orc)
      const { data, status } = await updateBudgetCompletely(pedidoOrcamento.value, id_orc)
      if (status === 200) {
        // status de criação e o 201 e nao 200
        setTimeout(() => {
          notifyToast({ msg: data.msg, typeToast: 'success' })
          emit('modal', { check: true, pedido: data.pedido })
          check.value = false
        }, 1000)
      }
      return data
    } catch (er: unknown) {
      const error = er as IError
      console.log(error)
      notifyToast({ msg: 'Erro no banco de dados, impossivel criar orçamento', typeToast: 'error' })
      check.value = false
    }
  }

  return {
    confirAlterOrcamento,
    route,
    pedidoOrcamento,
    totalCart,
    prod,
    getClient
  }
}
