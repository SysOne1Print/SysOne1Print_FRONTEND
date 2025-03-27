/**
 * Composable para gerenciar grupos de produtos
 * Fornece funções para criar, editar, excluir e listar grupos e subgrupos de produtos
 */
import type { IError, IGrupo, IGrupoArray, ISubGrupo } from '@/model/Index'
import { computed, ref } from 'vue'
import { useToast } from '@/composables/Toast'
import {
  getGrupoProdutos,
  postCreateGrupo,
  postCreateSubGrupo,
  deleteGrupo,
  deleteSubGrupo,
  updateGrupo
} from '@/api/actions/GrupoProduto'

const { notifyToast } = useToast()

/**
 * Hook para gerenciar grupos de produtos
 * @returns {Object} Objeto contendo funções e estados para gerenciar grupos de produtos
 */
export const useGrupoProduto = () => {
  /**
   * Dados do grupo atual
   */
  const grupo = ref<IGrupo>({
    nome_grupo: ''
  })
  
  /**
   * Lista de todos os grupos
   */
  const allGrupo = ref<IGrupoArray[]>([])

  /**
   * Dados do subgrupo atual
   */
  const subGrupo = ref<ISubGrupo>({
    nome_sub_grupo: '',
    group_id: 0
  })

  /**
   * Computed que retorna a lista de grupos
   */
  const grupoComputed = computed(() => {
    return allGrupo.value.map((v) => v)
  })

  /**
   * Cria um novo grupo de produtos
   */
  const createGrupo = async () => {
    try {
      const { data, status } = await postCreateGrupo(grupo.value)
      if (status === 201) {
        notifyToast({ msg: data.msg, typeToast: 'success' })
        grupo.value.nome_grupo = ''

        setTimeout(async () => {
          const { data: grupoData } = await getGrupoProdutos()
          allGrupo.value = grupoData
        }, 500)
      }
    } catch (er: unknown) {
      const error = er as IError
      console.log(error.response)
      if (error.response === undefined) {
        notifyToast({ msg: 'Erro interno', typeToast: 'error' })
        return
      }
      if (error.response.status === 404) {
        const msg =
          error.response === undefined ? 'Erro ao criar grupo de produtos' : error.response.data.msg
        notifyToast({
          msg: msg,
          typeToast: 'error'
        })

        return
      } else {
        notifyToast({ msg: 'Erro interno ', typeToast: 'error' })
        return
      }
    }
  }

  /**
   * Edita um grupo de produtos existente
   */
  const editarGrupo = async () => {
    try {
      const { data, status } = await updateGrupo(grupo.value)

      if (status === 200) {
        notifyToast({ msg: data.msg, typeToast: 'success' })
        grupo.value.nome_grupo = ''

        const { data: grupoData } = await getGrupoProdutos()
        allGrupo.value = grupoData
      }
    } catch (er: unknown) {
      const error = er as IError
      console.log(error.response)
      if (error.response === undefined) {
        notifyToast({ msg: 'Erro interno', typeToast: 'error' })
        return
      }
      if (error.response.status === 404) {
        const msg =
          error.response === undefined ? 'Erro ao criar grupo de produtos' : error.response.data.msg
        notifyToast({
          msg: msg,
          typeToast: 'error'
        })

        return
      } else {
        notifyToast({ msg: 'Erro interno ', typeToast: 'error' })
        return
      }
    }
  }

  /**
   * Cria um novo subgrupo de produtos
   * @param {ISubGrupo} dados - Dados do subgrupo a ser criado
   */
  const createSubGrupo = async (dados: ISubGrupo) => {
    try {
      subGrupo.value = dados
      const { data, status } = await postCreateSubGrupo(subGrupo.value)

      if (status === 201) {
        notifyToast({ msg: data.msg, typeToast: 'success' })
      }
    } catch (er: unknown) {
      const error = er as IError
      console.log(error)
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
   * Exclui um grupo de produtos
   * @param {number} id - ID do grupo a ser excluído
   * @returns {Promise} Promise com os dados da resposta da API
   */
  const deleteGrupoFn = async (
    id: number
  ): Promise<{ data: object; status: number } | undefined> => {
    try {
      if (id === undefined || id === 0) {
        notifyToast({ msg: 'selecione um Grupo de produto', typeToast: 'warning' })
        return
      }
      const { data, status } = await deleteGrupo(id)
      if (status === 200) {
        notifyToast({ msg: data.msg, typeToast: 'success' })
        removeGrupoById(id)
      }

      return { data, status }
    } catch (error: unknown) {
      const er = error as IError

      if (er.response === undefined) {
        notifyToast({ msg: 'Erro interno', typeToast: 'error' })
        return
      }
      if (er.response.status === 404) {
        const msg =
          er.response !== undefined ? er.response.data.msg : 'Erro ao deletar grupo de produtos'
        notifyToast({
          msg: msg,
          typeToast: 'error'
        })

        return
      } else {
        notifyToast({ msg: 'Erro interno ', typeToast: 'error' })
        return
      }
    }
  }

  /**
   * Exclui um subgrupo de produtos
   * @param {number} id - ID do subgrupo a ser excluído
   */
  const deleteSubGrupoFn = async (id: number) => {
    try {
      if (id !== undefined || id > 0) {
        notifyToast({ msg: 'selecione um Sub-Grupo', typeToast: 'warning' })
        return
      }
      const { data, status } = await deleteSubGrupo(id)
      if (status === 200) {
        notifyToast({ msg: data.msg, typeToast: 'success' })
      }
    } catch (er: unknown) {
      const error = er as IError
      console.log(error.response)
      if (error.response === undefined) {
        notifyToast({ msg: 'Erro interno', typeToast: 'error' })
        return
      }
      if (error.response.status === 404) {
        const msg =
          error.response === undefined ? 'Erro ao deletar sub-grupo' : error.response.data.msg
        notifyToast({
          msg: msg,
          typeToast: 'error'
        })

        return
      } else {
        notifyToast({ msg: 'Erro interno ', typeToast: 'error' })
        return
      }
    }
  }

  /**
   * Obtém a lista de grupos de produtos
   */
  const getGrupo = async () => {
    try {
      const { data: grupoData } = await getGrupoProdutos()
      allGrupo.value = grupoData
    } catch (er: unknown) {
      const error = er as IError
      console.log(error.response)
      if (error.response === undefined) {
        notifyToast({ msg: 'Erro interno', typeToast: 'error' })
        return
      }
      if (error.response.status === 404) {
        const msg =
          error.response === undefined ? 'Erro ao deletar sub-grupo' : error.response.data.msg
        notifyToast({
          msg: msg,
          typeToast: 'error'
        })

        return
      } else {
        notifyToast({ msg: 'Erro interno ', typeToast: 'error' })
        return
      }
    }
  }

  /**
   * Remove um grupo da lista local pelo ID
   * @param {number} id - ID do grupo a ser removido
   */
  const removeGrupoById = (id: number) => {
    const indexToDelete: number = allGrupo.value?.findIndex((n) => n.id === id) as number
    if (indexToDelete !== -1) {
      allGrupo.value?.splice(indexToDelete, 1)
    }
  }

  return {
    grupo,
    createGrupo,
    allGrupo,
    createSubGrupo,
    deleteGrupoFn,
    deleteSubGrupoFn,
    getGrupo,
    editarGrupo,
    grupoComputed
  }
}
