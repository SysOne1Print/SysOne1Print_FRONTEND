/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICategoria, IProductChangeById } from '@/model/Index'
import {
  getAllCategoria,
  getAllProducao,
  getAllUnidadeMedida,
  getTipoServico
} from '@/api/actions/Categoria'

/**
 * Store para gerenciar formulários de produtos
 * Fornece funções para buscar e armazenar dados necessários para formulários de produtos
 */
export const useProductFormStore = defineStore('useProductFormStore', () => {
  /**
   * Lista de todas as categorias
   */
  const getCatAll = ref<ICategoria[]>([])
  
  /**
   * Lista de tipos de serviço para produtos
   */
  const getTipoProdServico = ref<Array<{ id: number; descricao: string }>>([])
  
  /**
   * Lista de tipos de produção
   */
  const getProducao = ref<Array<any>>([])
  
  /**
   * Lista de unidades de medida
   */
  const getUnidadeMedida = ref<Array<any>>([])
  
  /**
   * Lista de tipos de item
   */
  const getTipoItem = ref<Array<{ id: number; descricao: string }>>([])
  
  /**
   * Produto selecionado para edição
   */
  const productForChange = ref<IProductChangeById | null>()
  
  /**
   * Computed que retorna o produto para edição
   */
  const prodForChange = computed(() => productForChange.value)
  
  /**
   * Computed que retorna a lista de categorias
   */
  const getComputed = computed(() => {
    return getCatAll.value
  })
  
  /**
   * Computed que retorna a lista de tipos de item
   */
  const getTipoItemComputed = computed<Array<{ id: number; descricao: string }>>(
    () => getTipoItem.value
  )

  /**
   * Busca todas as informações necessárias para o formulário de criação de produtos
   */
  const getInfoCreateProd = async () => {
    // busca todos os dados necessarios para pagina
    const categoria = getAllCategoria()
    const producao = getAllProducao()
    const unidadeMedida = getAllUnidadeMedida()
    const tipoProduto = getTipoServico()
    const [cat, prod, uni, tipoProd] = (await Promise.allSettled([
      await categoria,
      await producao,
      await unidadeMedida,
      await tipoProduto
    ])) as any
    if (
      getCatAll.value.length === 0 &&
      getProducao.value.length === 0 &&
      getUnidadeMedida.value.length === 0 &&
      getTipoProdServico.value.length === 0
    ) {
      getCatAll.value.push(...cat.value.data)
      getProducao.value.push(...prod.value.data)

      getUnidadeMedida.value.push(...uni.value.data)
      getTipoProdServico.value.push(...tipoProd.value.data)
    }
  }

  return {
    getTipoItemComputed,
    getInfoCreateProd,
    getCatAll,
    getComputed,
    getTipoProdServico,
    getUnidadeMedida,
    getProducao,
    getTipoItem,
    productForChange,
    prodForChange
  }
})
