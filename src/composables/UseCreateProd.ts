/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Composable para gerenciar criação e edição de produtos
 * Fornece funções para manipular formulários de produtos em múltiplas etapas
 */
import { getTypeOption } from '@/api/actions/Categoria'
import { useGlobalProduct } from '@/stores/GlobalProductStore'
import type {
  ICategoria,
  IError,
  IGetCamisaType,
  IOptionExtra,
  step1,
  step2,
  step4,
  step5,
  stock,
  typeOptionSafe
} from '@/model/Index'
import { useProductFormStore } from '@/stores/ProductFormStore'
import { useStepStore } from '@/stores/StepsForm'
import { storeToRefs } from 'pinia'
import { computed, ref, getCurrentInstance, watch, onUnmounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from './Toast'
import { DateModel } from '@/util/Data'
import { defaultValues } from '@/util/RefsDefaultProduct'

/**
 * Interface para tipos de produtos
 */
interface ITipo {
  id: number
  descricao: string
}

/**
 * Tipo para função de emissão de eventos
 */
type Emit = (event: 'fnDetailsProd', ...args: any[]) => void

/**
 * Hook para gerenciar criação e edição de produtos
 * @param {Emit} emit1 - Função opcional para emitir eventos
 * @param {ITipo[]} tipo - Array opcional de tipos de produtos
 * @returns {Object} Objeto contendo funções e estados para gerenciar produtos
 */
export const useCreateProd = (emit1?: Emit, tipo?: ITipo[]) => {
  // Store
  const { coresExtr } = storeToRefs(useGlobalProduct())
  const { getCorOptionsCategoryStore, getTintas } = useGlobalProduct()
  // Ending store

  const { emit } = getCurrentInstance() as { emit: Emit }
  
  /**
   * Cores extras disponíveis
   */
  const newCoresExtr = ref<{ id: number; nome: string; value: number }[]>([])
  
  /**
   * Tipos de estoque para o produto
   */
  const typeInputStock = ref<Array<stock>>([])
  
  /**
   * Objeto de categoria
   */
  const obj_categoria = ref()
  
  /**
   * Opções para camisetas (cores, tamanhos, tecidos, etc.)
   */
  const option = ref<IGetCamisaType>({
    cor: [
      {
        id: 0,
        one1_cor_nome: ''
      }
    ],
    tamanho: [],
    tecido: [],
    outro: []
  })
  
  const { notifyToast } = useToast()
  const route = useRoute()
  
  /**
   * Opções extras para produtos
   */
  const optionExtra = ref<IOptionExtra[]>([
    {
      id: 1,
      nome: 'Qualidade',
      value: 0
    },
    {
      id: 2,
      nome: 'Tipo de Papel',
      value: 0
    },
    {
      id: 3,
      nome: 'Tipo de Impressão',
      value: 0
    }
  ])

  const typeOption = ref<typeOptionSafe[]>()
  const coresExtrComputed = computed(() => {
    return coresExtr.value
  })

  const { optionItems, optionsInsumosTamanho } = storeToRefs(useStepStore())
  const {
    getComputed,
    prodForChange,
    getTipoProdServico,
    getTipoItemComputed,
    getTipoItem,
    productForChange
  } = storeToRefs(useProductFormStore())

  const stepProdComp = computed(() => stepProd1.value)

  // Crie os refs reativos com base nos valores padrão
  const stepProd1 = ref<step1>({ ...defaultValues.stepProd1 })
  const stepProd2 = ref<step2>({ ...defaultValues.stepProd2 })
  const stepProd3 = ref({ ...defaultValues.stepProd3 })
  const stepProd4 = ref<step4>({ ...defaultValues.stepProd4 })
  const stepProd5 = ref<step5>({ ...defaultValues.stepProd5 })
  const stepProd6 = ref({ ...defaultValues.stepProd6 })

  //Zerar dados e desmontar ele
  const stepsMapping: any = {
    stepProd1,
    stepProd2,
    stepProd3,
    stepProd4,
    stepProd5,
    stepProd6
  }

  //onUnmounted
  function resetFormSteps() {
    // Object.keys(stepsMapping).forEach((key) => {
    //   const step = stepsMapping[key] // Ref reativo
    //   const defaults = defaultValues[key] // Valores padrão
    //   step.value = { ...defaults } // Reinicializa os valores
    // })

    typeInputStock.value = []
    newCoresExtr.value = []
    option.value.cor = []
    option.value.outro = []
    option.value.tamanho = []
    option.value.tecido = []
  }

  const typeInputStockFn = () => {
    const opt: Array<stock> = option.value.tamanho.filter((v) => {
      if (Number(stepProd1.value.pro_categoria_tamanho) === 1) return v
      if (Number(stepProd1.value.pro_categoria_tamanho) === 2) {
        return v.one1_tamanho_nome.toLocaleLowerCase().includes('baby look')
      }
      if (Number(stepProd1.value.pro_categoria_tamanho) === 3) {
        return v.one1_tamanho_nome.toLocaleLowerCase().includes('tradicional')
      }
    })

    //teste
    if (productForChange.value !== undefined && productForChange.value !== null) {
      if (typeInputStock.value.length <= 0) {
        productForChange.value?.one1_produto_estoque.forEach((val) => {
          if (val.one_visible)
            typeInputStock.value.push({
              id: val.pro_est_id_tamanho as number,
              value: val.pro_estoque,
              one1_tamanho_nome: val.one1_tamanho.one1_tamanho_nome
            })
        })

        return
      }

      typeInputStock.value = opt
      return
    }
    typeInputStock.value = opt
    return
  }

  const filterTypeCategory = (itemSelect: number) => {
    console.log(itemSelect)
    getTipoItem.value = []
    getTipoProdServico.value.forEach((v) => {
      if (
        (itemSelect === 1 || itemSelect === 2 || itemSelect === 3 || itemSelect === 10) &&
        v.descricao.toLowerCase() === 'Serviço'.toLowerCase()
      ) {
        getTipoItem.value.push(v)
      }

      if (itemSelect === 2 && v.descricao.toLowerCase() === 'Serviço especial'.toLowerCase()) {
        getTipoItem.value.push(v)
      }

      if (
        (itemSelect === 4 ||
          itemSelect === 5 ||
          itemSelect === 6 ||
          itemSelect === 7 ||
          itemSelect === 8 ||
          itemSelect === 9) &&
        v.descricao.toLowerCase() === 'Produto'.toLowerCase()
      ) {
        getTipoItem.value.push(v)
      }
    })
  }
  const getCorOptionsCategory = async (pro_categoria_item: number, pro_outros_id: number) => {
    await getCorOptionsCategoryStore(pro_categoria_item, pro_outros_id)
  }

  const fnDetailsProd = async () => {
    let outro = null
    const cor = optionItems.value.cor.find(
      (v) => v.id === Number(stepProd1.value.pro_categoria_cor)
    )

    const select_outro = optionItems.value.outro.find(
      (v) => v.id === stepProd1.value.pro_outros_select_id
    )

    const tamanho = optionExtra.value.find((v) => v.id === stepProd1.value.pro_categoria_tamanho)

    const tecido = optionItems.value.tecido.find(
      (v) => v.id === stepProd1.value.pro_categoria_tecido
    )

    if (typeOption.value?.length !== undefined && typeOption.value?.length > 0) {
      outro = typeOption.value.find((v) => v.id === stepProd1.value.pro_outros_id)
    }

    if (stepProd1.value.pro_categoria_item === 5 && stepProd1.value.pro_outros_id > 0) {
      await getCorOptionsCategory(
        Number(stepProd1.value.pro_categoria_item),
        stepProd1.value.pro_outros_id
      )
    }

    if (stepProd1.value.pro_categoria_item !== 5 && stepProd1.value.pro_categoria_item !== 8) {
      await getCorOptionsCategory(
        Number(stepProd1.value.pro_categoria_item),
        stepProd1.value.pro_outros_id
      )
    }

    emit('fnDetailsProd', {
      cor,
      tamanho,
      tecido,
      outro,
      select_outro,
      categoria: obj_categoria.value,
      tipo: getTipoItemComputed.value.find((v) => v.id === Number(stepProd1.value.pro_tipo))
    })
  }

  const getOptionSelect = async () => {
    filterTypeCategory(
      (stepProd1.value.pro_categoria_item as number) ||
        (prodForChange.value?.pro_categoria_item as number)
    )
    try {
      //
      let dataOp: any
      if (stepProd1.value.pro_categoria_item !== 8) {
        console.log('asdasdsadasdasda')
        dataOp = await getTypeOption(
          Number(stepProd1.value.pro_categoria_item || prodForChange.value?.pro_categoria_item),
          getComputed.value[
            ((stepProd1.value.pro_categoria_item as number) ||
              (prodForChange.value?.pro_categoria_item as number)) - 1
          ]?.prod_tipo_descricao || 0
        )

        const { categ, tamanho } = dataOp.data
        typeOption.value = categ

        let outro: any = []

        if (Number(stepProd1.value.pro_categoria_item) === 5) {
          Array.from(categ).forEach((v: any) => {
            Array.from(v.one1_cor).forEach((val: any) => {
              outro.push({
                id: val.id,
                one1_nome: val.one1_cor_nome,
                one1_cor_id_categ: val.one1_cor_id_categ,
                one1_cor_id_subcateg: val.one1_cor_id_subcateg
              })
            })
          })
        }
        if (option.value.outro.length > 0) {
          option.value.outro = []
        }
        option.value.outro.push(...outro)
        optionsInsumosTamanho.value = tamanho
        outro = []
      }

      getCategoria(getComputed.value)
      fnDetailsProd()

      await getTintas(Number(stepProd1.value.pro_categoria_item))
      return
    } catch (er: unknown) {
      const error = er as IError
      console.log(error)
      if (error.response === undefined) {
        notifyToast({ msg: 'Erro interno na tentativa de busca', typeToast: 'error' })
        return
      } else {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
        return
      }
    }
  }

  const getCategoria = (categoria: ICategoria[]) => {
    obj_categoria.value = categoria.find(
      (v) => v.id === Number(stepProd1.value?.pro_categoria_item)
    )
  }

  const typeOptionComputed = computed(() => typeOption.value)

  const updateContent = (html: any) => {
    if (html === undefined || html.textValue === '') return

    stepProd4.value.pro_observacao = html.textValue
  }

  const stockTintaDTFAndCamiseta = () => {
    if (
      prodForChange.value !== undefined &&
      prodForChange.value !== null &&
      prodForChange.value.one1_produto_estoque.length > 0
    ) {
      if (Number(prodForChange.value.pro_categoria_item) === 7) {
        typeInputStock.value = prodForChange.value?.one1_produto_estoque.map((v) => {
          return {
            id: v.one1_cor.id as number,
            value: Number(v.produto_preco_unidade[0].ppu_preco_venda) as number,
            one1_tamanho_nome: v.one1_cor.one1_cor_nome as string,
            nome: ''
          }
        })
      }

      if (Number(prodForChange.value.pro_categoria_item) === 4) {
        const arrayVisible = prodForChange.value.one1_produto_estoque.filter(
          (v) => v.one_visible === true
        )

        typeInputStock.value = arrayVisible.map((v) => {
          return {
            id: v.one1_tamanho.id as number,
            value: Number(v.produto_preco_unidade[0].ppu_preco_venda) as number,
            one1_tamanho_nome: v.one1_tamanho.one1_tamanho_nome as string,
            nome: ''
          }
        })

        console.log(typeInputStock.value)
      }
    }
  }

  watch(
    prodForChange,
    () => {
      if (route.name === 'Alterar Produtos' && prodForChange.value) {
        stepProd1.value.pro_nome = prodForChange.value?.pro_nome as string
        stepProd1.value.pro_venda = Number(prodForChange.value?.pro_venda) as number

        stepProd1.value.pro_unidade = prodForChange.value?.pro_unidade as number
        stepProd1.value.umd_prod_id = prodForChange.value?.pro_und_id as number
        stepProd1.value.pro_tipo = Number(prodForChange.value?.produto_tipo_servico.id) as number

        stepProd1.value.pro_categoria_item = prodForChange.value?.pro_categoria_item as number
        stepProd1.value.dirStage = prodForChange.value?.pro_visible as string

        //option

        //categoria camiseta
        if (
          prodForChange.value !== undefined &&
          prodForChange.value !== null &&
          Number(prodForChange.value.pro_categoria_item) === 4
        ) {
          //stepProd1.value.pro_venda = Number(prodForChange.value?.pro_venda) as number

          stepProd1.value.pro_categoria_cor = Number(
            prodForChange.value.one1_produto_estoque[0].pro_est_cor_id
          ) //-> cor

          stepProd1.value.pro_categoria_tecido =
            prodForChange.value.one1_produto_estoque[0].prod_tecido_id
          stepProd1.value.pro_outros = prodForChange.value?.one1_produto_estoque.map(
            (v: { pro_estoque: number }) => v.pro_estoque
          ) as Array<number>

          stockTintaDTFAndCamiseta()
        }

        //Categoria Impressão DTF
        if (
          prodForChange.value !== undefined &&
          prodForChange.value !== null &&
          (Number(prodForChange.value.pro_categoria_item) === 1 ||
            Number(prodForChange.value.pro_categoria_item) === 2 ||
            Number(prodForChange.value.pro_categoria_item) === 3)
        ) {
          stepProd1.value.pro_outros = prodForChange.value.one1_produto_estoque.map((v) => {
            return Number(v.produto_preco_unidade[0].ppu_preco_venda)
          })
        }

        //Categoria Tinta DTF
        if (
          prodForChange.value !== undefined &&
          prodForChange.value !== null &&
          Number(prodForChange.value.pro_categoria_item) === 7
        ) {
          //tinta dtf
          stepProd1.value.pro_categoria_tecido = ''

          stepProd1.value.pro_tinta_id = prodForChange.value?.one1_produto_estoque[0]
            .id_modelo_tinta as number // dtf e etc

          //função para estoque de tintas
          stockTintaDTFAndCamiseta()
        }

        //Categoria Substrato de impressão
        if (
          stepProd1.value !== undefined &&
          stepProd1.value.pro_categoria_item === 5 &&
          Number(prodForChange.value?.one1_produto_estoque.length) > 0
        ) {
          stepProd1.value.pro_outros_id = Number(
            prodForChange.value?.one1_produto_estoque[0].pro_est_outro_id
          )

          stepProd1.value.pro_metro = prodForChange.value?.one1_produto_estoque[0]
            .id_metro as number

          if (stepProd1.value.pro_outros_id !== 6) {
            stepProd1.value.pro_outros_select_id = prodForChange.value?.one1_produto_estoque[0]
              .one1_cor.id as number
          }

          if (stepProd1.value.pro_outros_id === 6) {
            stepProd1.value.pro_peso_id = prodForChange.value?.one1_produto_estoque[0]
              .one1_produto_peso.id as number
          }

          stepProd1.value.prod_tamanho = prodForChange.value?.one1_produto_estoque[0]
            .id_insumos_tamanho as number
        }

        if (
          stepProd1.value !== undefined &&
          (stepProd1.value.pro_categoria_item === 6 || stepProd1.value.pro_categoria_item === 8) &&
          Number(prodForChange.value?.one1_produto_estoque.length) > 0
        ) {
          stepProd1.value.pro_tinta_id = prodForChange.value?.one1_produto_estoque[0]
            ?.id_modelo_tinta as number
        }
        //id_modelo_tinta

        stepProd1.value.pro_categoria_tamanho = prodForChange.value?.pro_opt_tamanho_id as number

        stepProd2.value.pro_marca = prodForChange.value?.pro_marca as string

        stepProd2.value.pro_producao = Number(prodForChange.value?.pro_producao as number)

        stepProd2.value.pro_data_validade = DateModel(
          new Date(prodForChange.value?.pro_data_validade as string)
        )

        stepProd2.value.pro_frete = prodForChange.value?.pro_frete as boolean

        stepProd2.value.pro_peso_liq = Number(
          prodForChange.value?.produto_caracteristica[0].ppu_peso_liq as number
        )

        stepProd2.value.pro_peso_bruto = Number(
          prodForChange.value?.produto_caracteristica[0].ppu_peso_bruto as number
        )

        stepProd2.value.pro_largura = Number(
          prodForChange.value?.produto_caracteristica[0].ppu_largura as number
        )

        stepProd2.value.pro_altura = Number(
          prodForChange.value?.produto_caracteristica[0].ppu_algura as number
        )

        stepProd2.value.pro_umd_caixa = prodForChange.value?.produto_caracteristica[0]
          .umd_id as number

        stepProd2.value.pro_itens_caixa = prodForChange.value?.produto_caracteristica[0]
          .ppu_itens_caixa as number

        stepProd2.value.pro_volume = Number(
          prodForChange.value?.produto_caracteristica[0].ppu_volume as number
        )

        stepProd2.value.pro_profundidade = Number(
          prodForChange.value?.produto_caracteristica[0].ppu_profundidade as number
        )

        stepProd2.value.pro_gtin_ean = prodForChange.value?.pro_gtin_ean as number

        stepProd2.value.pro_gtin_ean_tributario = prodForChange.value
          ?.pro_gtin_ean_tributario as number

        stepProd2.value.pro_departamento = prodForChange.value?.pro_departamento as number

        stepProd3.value.alreadyExistImg = prodForChange.value?.produto_galeria.pro_galeria_all.map(
          (v) => ({
            id: prodForChange.value?.produto_galeria.id,
            url: v,
            url_deleted: false
          })
        ) as []

        stepProd4.value.pro_minimo = prodForChange.value?.pro_minimo as number
        stepProd4.value.pro_maximo = prodForChange.value?.pro_maximo as number
        stepProd4.value.pro_deposito = prodForChange.value?.pro_deposito as number
        stepProd4.value.pro_quantidade = Number(prodForChange.value?.pro_quantidade) as number
        stepProd4.value.pro_preco_compra_unidade = Number(
          prodForChange.value?.pro_preco_compra_unidade as number
        )

        // //Olhar o campo da observação pois nao está setando
        stepProd4.value.pro_observacao = prodForChange.value?.pro_observacao as string
        stepProd4.value.pro_fornecedor_id = prodForChange.value?.pro_fornecedor_id as number

        //step tela 5
        stepProd5.value.pro_origem =
          prodForChange.value?.produto_data_fiscal_nota.pro_origem === null
            ? ''
            : (prodForChange.value?.produto_data_fiscal_nota.pro_origem as number)

        stepProd5.value.pro_fiscal_ncm = prodForChange.value?.produto_data_fiscal_nota
          .pro_fiscal_ncm as number

        stepProd5.value.pro_fiscal_cest = prodForChange.value?.produto_data_fiscal_nota
          .pro_fiscal_cest as number

        stepProd5.value.pro_fiscal_tipo = prodForChange.value?.produto_data_fiscal_nota
          .pro_fiscal_tipo as number

        stepProd5.value.pro_fiscal_tributo = prodForChange.value?.produto_data_fiscal_nota
          .pro_fiscal_tributo as number

        stepProd5.value.pro_grupo_produto = prodForChange.value?.pro_grupo_produto as number

        stepProd5.value.pro_fiscal_base_icms = prodForChange.value?.produto_data_fiscal_nota
          .pro_fiscal_base_icms as number

        stepProd5.value.pro_fiscal_base_icmsSt = prodForChange.value?.produto_data_fiscal_nota
          .pro_fiscal_base_icms_st as number

        stepProd5.value.pro_fiscal_icms_substituto = prodForChange.value?.produto_data_fiscal_nota
          .pro_fiscal_icms_substituto as number

        stepProd5.value.pro_fiscal_excecaoTipi = prodForChange.value?.produto_data_fiscal_nota
          .pro_fiscal_excecao_tipi as number

        stepProd6.value.disponivel = prodForChange.value?.pro_disponivel as boolean

        getOptionSelect()
      }
    },
    { deep: true }
  )

  // watchEffect(
  //   () => {
  //     //option
  //     if (route.name === 'Alterar Produtos' && prodForChange.value) {
  //       stepProd1.value.pro_categoria_item = prodForChange.value?.pro_categoria_item as number
  //       getOptionSelect()
  //     }
  //     // onCleanup(() => {
  //     //   productForChange.value = null
  //     //   resetFormSteps()
  //     // })
  //   },
  //   { flush: 'sync' }
  // )

  onUnmounted(() => {
    productForChange.value = null
    resetFormSteps()
  })
  return {
    newCoresExtr,
    typeInputStock,
    typeInputStockFn,
    stepProdComp,
    optionExtra,
    filterTypeCategory,
    stepProd1,
    getCategoria,
    getOptionSelect,
    fnDetailsProd,
    getCorOptionsCategory,
    obj_categoria,
    typeOption,
    coresExtrComputed,
    typeOptionComputed,
    stepProd2,
    stepProd4,
    updateContent,
    stepProd5,
    stepProd6,
    stepProd3,
    option,
    resetFormSteps
  }
}
