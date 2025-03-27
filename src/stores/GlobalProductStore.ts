import { ref, computed } from 'vue'
import { getModeloTintas } from '@/api/actions/Tinta'
import { defineStore } from 'pinia'
import { useToast } from '@/composables/Toast'
import type { IError, ITintasType } from '@/model/Index'
import { getOptionCategory } from '@/api/actions/Categoria'

/**
 * Store para gerenciar dados globais de produtos
 * Fornece funções para buscar e armazenar informações de tintas e cores
 */
export const useGlobalProduct = defineStore('GlobalProduct', () => {
  const { notifyToast } = useToast()
  
  /**
   * Lista de modelos de tintas disponíveis
   */
  const modeloTintas = ref<ITintasType[]>([])
  
  /**
   * Cores extras para produtos
   */
  const newCoresExt = ref<{ id: number; nome: string; value: number }[]>([])
  
  /**
   * Cores extras com informações adicionais
   */
  const coresExtr = ref<
    Array<{ id: number; one1_cor_nome: string; value: number; id_modelo: number }>
  >([])
  
  /**
   * Computed que formata os modelos de tintas para uso em componentes
   */
  const newModeloTintas = computed(() =>
    modeloTintas.value.map((v) => ({ id: v.modelo_id, nome: v.modelo_nome }))
  )

  /**
   * Busca modelos de tintas por ID
   * @param {number} id - ID do modelo de tinta
   */
  const getTintas = async (id: number) => {
    try {
      const { data } = await getModeloTintas(id)
      modeloTintas.value = data
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

  /**
   * Busca opções de cores para uma categoria específica
   * @param {number} pro_categoria_item - ID da categoria do produto
   * @param {number} pro_outros_id - ID de outros atributos do produto
   */
  const getCorOptionsCategoryStore = async (pro_categoria_item: number, pro_outros_id: number) => {
    try {
      const { data } = await getOptionCategory(pro_categoria_item, pro_outros_id)
      coresExtr.value = data
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
  
  return {
    modeloTintas,
    newModeloTintas,
    getTintas,
    coresExtr,
    getCorOptionsCategoryStore,
    newCoresExt
  }
})
