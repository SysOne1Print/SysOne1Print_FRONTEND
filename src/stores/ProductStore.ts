import { ref, onMounted, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { stringify, parse } from 'zipson'
import type {
  IArquivos,
  IError,
  IOrcamentoPedidoStatus,
  IProduct,
  IProductPreco,
  cartItem
} from '@/model/Index'
import { getAllProductsById, getProductByName } from '@/api/actions/Produtos'
import { useClientStore } from '@/stores/ClientStore'
import { getPedidoOrc } from '@/api/actions/Orcamento'
import { discountProductType, modeloFilmeDtfUtil } from '@/util/Util'

const { clientSelect } = storeToRefs(useClientStore())

/**
 * Formatador de moeda para exibição de valores em Real (BRL)
 */
const real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

/**
 * Store para gerenciar produtos e carrinho de compras
 * Fornece funções para buscar produtos, adicionar ao carrinho, calcular valores e descontos
 */
export const useProductStore = defineStore(
  'products',
  () => {
    /**
     * Estado dos produtos disponíveis
     */
    const productState = ref<IProduct[]>([
      {
        pro_id: 0,
        pro_nome: '',
        pro_categoria_item: 0,
        pro_data_validade: '',
        pro_frete: false,
        pro_galeria_id: 0,
        pro_marca: '',
        pro_observacao: '',
        pro_quantidade: 0,
        pro_venda: 0,
        produto_galeria: {
          pro_galeria_path: '',
          pro_galeria_all: []
        },
        produto_tipo_servico: {
          id: 0,
          descricao: ''
        },
        produto_preco_unidade: [
          {
            ppu_id: 0,
            umd_id: '',
            ppu_algura: '',
            ppu_itens_caixa: '',
            ppu_largura: '',
            ppu_peso_bruto: '',
            ppu_peso_liq: '',
            ppu_profundidade: '',
            ppu_volume: '',
            unidade_medida: {
              umd_descricao: '',
              umd_status: 0,
              umd_sigla: ''
            }
          }
        ],
        one1_produto_estoque: [
          {
            produto_preco_unidade: [
              {
                id: 0,
                id_prod: 0,
                one1_pro_estId: 0,
                ppu_preco_venda: ''
              }
            ],
            one1_produto_peso: {
              id: 0,
              peso: ''
            },
            pro_est_id_tamanho: 0,
            pro_estoque: 0,
            pro_id: 0,
            one1_tamanho: {
              id: 0,
              one1_tamanho_nome: ''
            },
            one1_outros: {
              id: 0,
              one1_nome: ''
            },
            one1_cor: {
              id: 0,
              one1_cor_id_categ: 0,
              one1_cor_id_subcateg: 0,
              one1_cor_nome: ''
            },
            one1_modelo_tintas: {
              modelo_id: 0,
              modelo_nome: ''
            },
            one1_metros_sublimatico: {
              id_metro: 0,
              metro: ''
            },
            one1_insumos_tamanho: {
              id: 0,
              nome: '',
              one1_outro_id: 0
            },
            pro_est_cor: 0
          }
        ],
        produto_categoria_item: {
          prod_tipo_descricao: ''
        },

        pro_umd_caixa: 0,
        unidade_medida: {
          umd_descricao: '',
          umd_id: 0,
          umd_sigla: ''
        },
        pro_visible: ''
      }
    ])
    
    /**
     * Estado do orçamento atual
     */
    const budgetState = ref<IOrcamentoPedidoStatus>()
    
    /**
     * Configurações de desconto geral para o modal
     */
    const discountGeralModal = ref<{
      discount: number
      type: number
    }>({
      discount: 0,
      type: 0
    })

    /**
     * Valores totais do carrinho (com e sem desconto)
     */
    const stateValue = ref<{ totalValue: number | string; totalWithDiscount: number | string }>({
      totalValue: '',
      totalWithDiscount: ''
    })
    
    /**
     * Produto selecionado para alteração
     */
    const alterProductSelectState = ref<cartItem>()
    
    /**
     * Produto atualmente selecionado
     */
    const productSelectState = ref<IProduct>({
      pro_id: 0,
      pro_nome: '',
      pro_categoria_item: 0,
      pro_data_validade: '',
      pro_frete: false,
      pro_galeria_id: 0,
      pro_marca: '',
      pro_observacao: '',
      pro_quantidade: 0,
      pro_venda: 0,
      produto_galeria: {
        pro_galeria_path: '',
        pro_galeria_all: []
      },
      produto_tipo_servico: {
        id: 0,
        descricao: ''
      },
      produto_preco_unidade: [
        {
          ppu_id: 0,
          umd_id: '',
          ppu_algura: '',
          ppu_itens_caixa: '',
          ppu_largura: '',
          ppu_peso_bruto: '',
          ppu_peso_liq: '',
          ppu_profundidade: '',
          ppu_volume: '',
          unidade_medida: {
            umd_descricao: '',
            umd_status: 0,
            umd_sigla: ''
          }
        }
      ],
      one1_produto_estoque: [
        {
          pro_est_id_tamanho: 0,
          pro_estoque: 0,
          pro_id: 0,
          one1_tamanho: {
            id: 0,
            one1_tamanho_nome: ''
          },
          one1_outros: {
            id: 0,
            one1_nome: ''
          },
          one1_cor: {
            id: 0,
            one1_cor_id_categ: 0,
            one1_cor_id_subcateg: 0,
            one1_cor_nome: ''
          },
          one1_modelo_tintas: {
            modelo_id: 0,
            modelo_nome: ''
          },
          produto_preco_unidade: [
            {
              id: 0,
              id_prod: 0,
              one1_pro_estId: 0,
              ppu_preco_venda: ''
            }
          ],
          one1_produto_peso: {
            id: 0,
            peso: ''
          },
          one1_metros_sublimatico: {
            id_metro: 0,
            metro: ''
          },
          one1_insumos_tamanho: {
            id: 0,
            nome: '',
            one1_outro_id: 0
          },
          pro_est_cor: 0
        }
      ],
      produto_categoria_item: {
        prod_tipo_descricao: ''
      },
      pro_umd_caixa: 0,
      unidade_medida: {
        umd_descricao: '',
        umd_id: 0,
        umd_sigla: ''
      },
      pro_visible: ''
    })
    
    /**
     * Valor inicial para reset de seleção
     */
    const selectInit = ref()

    /**
     * Carrinho de produtos
     */
    const productCart = ref<cartItem[]>([])

    /**
     * Define o estado dos produtos com base em critérios de busca
     * @param {string} search - Termo de busca
     * @param {number} limit - Limite de resultados
     * @param {number | null} typeCategory - Tipo de categoria
     * @param {boolean} disponivel - Filtro de disponibilidade
     */
    const setProductState = async (
      search: string,
      limit: number,
      typeCategory: number | null,
      disponivel: boolean
    ) => {
      const { data } = await getProductByName(search, limit, typeCategory, disponivel, 0)
      productState.value = data
    }

    /**
     * Computed que retorna os produtos no carrinho que não foram excluídos
     */
    const cartProduct = computed(() => productCart.value.filter((v) => !v.prod_deleted))
    
    /**
     * Computed que retorna o estado do orçamento atual
     */
    const budgetStateComputed = computed(() => budgetState.value)
    
    /**
     * Busca todos os produtos com limite
     * @param {number} limit - Limite de resultados
     */
    const getAllProductStore = async (limit: number) => {
      getAllProductsById(limit)
        .then(({ data }) => {
          productState.value = data
        })
        .catch((err) => {
          console.log(err)
          productState.value = []
          throw err
        })
    }

    /**
     * Busca um orçamento pelo ID e prepara o carrinho
     * @param {number} id_orc - ID do orçamento
     */
    const getBudgetChangeByIdStore = async (id_orc: number) => {
      try {
        const { data } = await getPedidoOrc(id_orc)
        let dtfPreco: IProductPreco | undefined
        //let produto_preco_unidade: IPrecoUnidade | undefined

        //desestruturação
        const {
          orca: { orcamento_itens, ...orcRest }
        } = data

        budgetState.value = { ...orcRest, orcamento_itens }
        if (budgetState.value !== undefined) {
          budgetState.value.orcamento_itens.forEach((v) => {
            switch (v.produto.pro_categoria_item) {
              case 2:
              case 1:
                //produtoType.type
                dtfPreco = v.produto.one1_produto_estoque.find(
                  (val) => val.one1_outros.id === v.oit_itens_type_material
                )
                break
              case 6:
              case 7:
                dtfPreco = v.produto.one1_produto_estoque.find((val) => {
                  if ([6, 7].some((v1) => v1 === v.produto.pro_categoria_item)) {
                    return val
                  }
                })
                break

              case 8:
                dtfPreco = v.produto.one1_produto_estoque[0]
                break
              default:
                break
            }

            productCart.value.push({
              ...v.produto,
              prod_deleted: false,
              orcamento_itens: [
                {
                  oit_id: v.oit_id
                }
              ],
              one1_produto_estoque: v.produto.one1_produto_estoque,
              cor:
                v.produto.pro_categoria_item === 4
                  ? v.produto.one1_produto_estoque[0].pro_est_cor
                  : 0,
              pro_id: v.produto.pro_id,
              pro_nome: v.produto.pro_nome,
              dropzoneFile: [],
              fileExist: budgetState.value?.arquivos.map((v) => ({
                ...v,
                url_deleted: false
              })) as IArquivos[],
              produto_galeria: {
                pro_galeria_all: v.produto.produto_galeria.pro_galeria_all,
                pro_galeria_path: v.produto.produto_galeria.pro_galeria_path
              },
              qnty: v.oit_qtde,
              type: v.oit_itens_type_material === null ? 0 : v.oit_itens_type_material,
              content: v.oit_observacao,
              produto_tipo_servico: v.produto.produto_tipo_servico,
              pro_categoria_item: v.produto.pro_categoria_item,
              pro_venda: Number(v.produto.pro_venda.toString()),
              value_discount: parseFloat(v.oit_valor_desconto.toString()),
              tamanho: v.oit_itens_tamanho,
              pro_quantidade: v.produto.pro_quantidade,
              value_discount_type: v.oit_type_discount,
              ...([1, 2, 6, 7, 8].some((va) => va === v.produto.pro_categoria_item)
                ? { pro_venda: dtfPreco?.produto_preco_unidade[0].ppu_preco_venda as number }
                : {}),
              pro_visible: v.produto.pro_visible,
              unidade_medida: v.produto.unidade_medida
            })

            calTotalProductCart(v.oit_type_discount)
          })

          if (orcRest['orc_type_discount']) {
            discountGeralModal.value.type = orcRest['orc_type_discount']
            discountGeralModal.value.discount = orcRest['orc_valor_total_discount']
            calTotalProductCart(orcRest['orc_type_discount'])
            calcTotalWithDiscount()
          }
        }
      } catch (er: unknown) {
        const error = er as IError
        console.log(error)
        throw error
      }
    }

    /**
     * Adiciona um produto ao carrinho
     * @param {cartItem} product - Produto a ser adicionado
     */
    const addProductCart = (product: cartItem) => {
      productCart.value.push({
        ...product,
        pro_id: product.pro_id,
        pro_nome: product.pro_nome,
        dropzoneFile: product.dropzoneFile,
        produto_galeria: product.produto_galeria,
        //pro_status: product.pro_status, //adicionar essa coluna no banco
        qnty: product.qnty,
        type: product.type,
        cor: product.cor,
        corDtf: product.corDtf,
        content: product.content,
        produto_tipo_servico: product.produto_tipo_servico,
        pro_categoria_item: product.pro_categoria_item,
        pro_venda: product.pro_venda,
        value_discount: product.value_discount,
        tamanho: product.tamanho,
        pro_quantidade: product.pro_quantidade,
        value_discount_type: product.value_discount_type
      })

      calTotalProductCart(product.value_discount_type)
      calcTotalWithDiscount()
    }

    /**
     * Altera um produto no carrinho
     * @param {cartItem} alterItem - Produto com alterações
     * @param {number} index - Índice do produto no carrinho
     */
    const alterProductCart = (alterItem: cartItem, index: number) => {
      if (index !== -1) {
        productCart.value[index] = alterItem
        calTotalProductCart(alterItem.value_discount_type) // Testar alteração do carrinho, e exclusão para ver a função funcionando

        if (discountGeralModal.value.type === 1) {
          calcTotalWithDiscount(discountGeralModal.value.discount, 0)
        } else {
          calcTotalWithDiscount(0, discountGeralModal.value.discount)
        }
      }
    }

    /**
     * Calcula o valor total dos produtos no carrinho
     * @param {number | undefined} type_discount - Tipo de desconto (1: valor, 2: percentual)
     */
    const calTotalProductCart = (type_discount?: number | undefined) => {
      let valueSum = 0
      stateValue.value.totalValue = productCart.value.reduce(
        (accumulator: number = 0, object: cartItem) => {
          //preço especifico
          const pro_venda: number = productSpecificPriceClient(object)
          if (object.prod_deleted === false) {
            if (
              (object.value_discount > 0 && object.value_discount_type === 1) ||
              type_discount === 1
            ) {
              // desconto Real -> tipo de Item: Produto
              const valueDisc =
                pro_venda - parseFloat(object.value_discount.toString().replace(',', '.')) //aplicando desconto

              //Calculo de desconto dos tipos de Item (Produto|Serviço)
              const value = calTotalProductBasedTypeService(object, valueDisc)

              //Recebe o valor total do desconto na variavel para retornar o valor correto
              valueSum = accumulator + value
            } else if (object.value_discount_type === 2 || type_discount === 2) {
              // desconto porcentagem
              const disc = calculateDiscountCartPercent(object)
              const value = (pro_venda - disc) * Number(object.qnty)

              //Recebe o valor total do desconto na variavel para retornar o valor correto
              valueSum = accumulator + value
            } else {
              //calculo de valor total antigo
              //const value = Number(pro_venda) * Number(object.qnty)
              const value = calTotalProductBasedTypeService(object, pro_venda)
              valueSum = accumulator + value
            }
          }

          return valueSum
        },
        0
      )
    }

    /**
     * Calcula o valor total com base no tipo de serviço do produto
     * @param {cartItem} object - Item do carrinho
     * @param {number} pro_venda - Valor de venda do produto
     * @returns {number} Valor total calculado
     */
    const calTotalProductBasedTypeService = (object: cartItem, pro_venda: number) => {
      //Tipo Item (Produto) aplicando o desconto
      if (object.produto_tipo_servico.id === 1 && object.value_discount_type === 1) {
        return calTotalDiscountService(object, pro_venda)
        //
      } else if (object.produto_tipo_servico.id === 2 && object.value_discount_type === 1) {
        return calTotalDiscountService(object, pro_venda)
        //
      } else {
        return calTotalDiscountService(object, pro_venda)
      }
    }

    /**
     * Calcula o desconto para serviços
     * @param {cartItem} object - Item do carrinho
     * @param {number} pro_venda - Valor de venda do produto
     * @returns {number} Valor com desconto aplicado
     */
    const calTotalDiscountService = (object: cartItem, pro_venda: number) => {
      //adicionar essa linha pois produtos unitarios nao precisa de adicional no calculo como quantidade e etc
      if (
        [4, 5, 6, 7, 8].every((v) => v !== object.pro_categoria_item) &&
        object.unidade_medida !== undefined &&
        object.unidade_medida.umd_descricao.toLocaleLowerCase() === 'unidade'
      ) {
        return parseFloat(pro_venda.toString().replace(',', '.'))
      }

      if (
        object.produto_tipo_servico.id === 1 &&
        [1, 2, 3, 10].some((v) => v === object.pro_categoria_item)
      ) {
        return parseFloat(pro_venda.toString().replace(',', '.')) * Number(object.qnty)
      }

      const tipoService =
        object.produto_tipo_servico.id === 1
          ? parseFloat(pro_venda.toString().replace(',', '.')) + Number(object.qnty) //mudar para multiplicação caso tenha uma erro
          : parseFloat(pro_venda.toString().replace(',', '.')) * Number(object.qnty)

      return tipoService
    }

    const productSpecificPriceClient = (object: cartItem): number => {
      // função para verificar se o cliente tem um desconto especifico ativo

      if (clientSelect.value?.nivel_desconto !== undefined) {
        const discountByProduct = searchForDiscountLevelByProduct(object)
        if (
          object.pro_id === discountByProduct?.nds_prod_id &&
          discountByProduct.nds_status === 1
        ) {
          return parseFloat(discountByProduct.nds_valor) as number
        }
      }

      return parseFloat(object.pro_venda.toString())
    }

    const searchForDiscountLevelByProduct = (product: cartItem) => {
      return clientSelect.value?.nivel_desconto.find((v) => {
        product.type = modeloFilmeDtfUtil(product)
        return discountProductType(v, product)
      })
    }

    const calculateDiscountCartPercent = (object: cartItem) => {
      return (
        object.pro_venda * (parseFloat(object.value_discount.toString().replace(',', '.')) / 100)
      )
    }

    const discountBasedAmount = (obj: cartItem) => {
      return (obj.value_discount / obj.pro_venda) * 100
    }

    const calcTotalWithDiscount = (
      discountRealNum?: number,
      discountPerc?: number,
      modo?: string
    ) => {
      if (discountGeralModal.value.type > 0 && discountGeralModal.value.discount > 0) {
        if (discountGeralModal.value.type === 1) {
          discountRealNum = discountGeralModal.value.discount
        }

        if (discountGeralModal.value.type === 2) {
          discountPerc = discountGeralModal.value.discount
        }
      }

      if ((discountRealNum && discountRealNum > 0) || discountRealNum !== undefined) {
        /**
         * @author Joel de paula
         * @description o totalValue, deve ser o total sem o desconto, ou refazer o calculo total antes.
         */

        if (modo === 'change') {
          productCart.value.map((value) => productSpecificPriceClient(value))
        }

        stateValue.value.totalValue = Number(stateValue.value.totalValue) - discountRealNum
        stateValue.value.totalWithDiscount = stateValue.value.totalValue
      }
      if ((discountPerc && discountPerc > 0) || discountPerc !== undefined) {
        const valorPercentagem = Number(stateValue.value.totalValue) * (discountPerc / 100)
        stateValue.value.totalValue = Number(stateValue.value.totalValue) - valorPercentagem

        stateValue.value.totalWithDiscount = stateValue.value.totalValue
      }
    }

    const updateTotalValueWithDiscount = () => {
      if (parseFloat(stateValue.value.totalWithDiscount.toString()) > 0) {
        stateValue.value.totalValue = stateValue.value.totalWithDiscount
      }
    }

    const removeAllProductCart = (route: string) => {
      if (route !== '') {
        productCart.value.map((v) => {
          return {
            ...v,
            prod_deleted: true
          }
        })
      } else {
        productCart.value.splice(0, productCart.value.length)
      }
      calTotalProductCart()
      updateTotalValueWithDiscount()
      stateValue.value.totalValue = 0
      stateValue.value.totalWithDiscount = ''
      discountGeralModal.value.discount = 0
      discountGeralModal.value.type = 0
    }

    const removeProductById = (product: cartItem, route: string = '') => {
      const index = productCart.value.findIndex((p) => p === product)
      if (route !== '') {
        productCart.value[index].prod_deleted = true
      } else {
        productCart.value.splice(index, 1)
        if (productCart.value.length === 0) {
          discountGeralModal.value.discount = 0
          discountGeralModal.value.type = 0
        }
      }
      calTotalProductCart()
      stateValue.value.totalWithDiscount = stateValue.value.totalValue
    }

    const getProductId = (value: IProduct) => {
      productSelectState.value = value
    }

    const removeProductId = () => {
      productSelectState.value = selectInit.value
      alterProductSelectState.value = selectInit.value
    }

    const discountComputed = computed(() =>
      discountGeralModal.value.discount === 0
        ? 'R$ 0,00'
        : real.format(parseFloat(discountGeralModal.value.discount.toString().replace(',', '.')))
    )

    onMounted(() => {
      selectInit.value = JSON.parse(JSON.stringify(productSelectState.value))
      calTotalProductCart()
      updateTotalValueWithDiscount()
    })

    return {
      budgetStateComputed,
      getBudgetChangeByIdStore,
      getAllProductStore,
      getProductId,
      productState,
      addProductCart,
      productCart,
      calTotalProductCart,
      removeAllProductCart,
      removeProductById,
      productSelectState,
      stateValue,
      calcTotalWithDiscount,
      alterProductCart,
      setProductState,
      calculateDiscountCartPercent,
      removeProductId,
      alterProductSelectState,
      discountComputed,
      discountGeralModal,
      cartProduct,
      discountBasedAmount
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['allProductComputed'], //['allProductComputed', 'productState', 'productCart', 'stateValue']
      key: 'products',
      serializer: {
        deserialize: parse,
        serialize: stringify
      }
    }
  }
)
