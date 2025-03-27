import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { stringify, parse } from 'zipson'
//import { useToast } from '@/Composables/toast'
import { getAllClient } from '@/api/actions/Client'
import type { IClientAll } from '@/model/IClient'
//const { notifyToast } = useToast()

/**
 * Store para gerenciar dados de clientes
 * Fornece funções para buscar, selecionar e manipular informações de clientes
 */
export const useClientStore = defineStore(
  'client',
  () => {
    /**
     * Lista de todos os clientes
     */
    const clientState = ref<IClientAll[]>([])
    
    /**
     * Cliente selecionado atualmente
     */
    const clientSelect = ref<IClientAll>()
    
    /**
     * Total de clientes disponíveis
     */
    const total = ref(0)
    
    /**
     * Busca clientes com paginação
     * @param {number} limit - Limite de registros por página
     * @param {number} skip - Número de registros a pular
     */
    const getAllClientLimit = async (limit: number, skip: number) => {
      const { data } = await getAllClient(limit, skip, '')
      clientState.value = data.client
      total.value = data.total
    }

    /**
     * Busca um cliente pelo ID
     * @param {number} id - ID do cliente
     * @returns {IClientAll | undefined} Cliente encontrado ou undefined
     */
    const getClientById = (id: number): IClientAll | undefined => {
      return clientState.value?.find((value) => value.cli_id === id)
    }

    /**
     * Define o cliente selecionado pelo ID
     * @param {number} id - ID do cliente
     */
    const setClientById = (id: number) => {
      clientSelect.value = clientState.value?.find((value) => value.cli_id === id)
    }

    /**
     * Atualiza um cliente na lista pelo ID
     * @param {number} id - ID do cliente
     * @param {IClientAll} client - Dados atualizados do cliente
     */
    const setClientId = (id: number, client: IClientAll) => {
      const index: number = clientState.value?.findIndex((v) => v.cli_id === id) as number
      if (clientState.value !== undefined) {
        clientState.value[index] = client
      }
    }

    /**
     * Computed que retorna a lista de clientes
     */
    const allClientComputed = computed<IClientAll[]>(() => {
      return clientState.value as IClientAll[]
    })

    /**
     * Limpa os dados de cliente da sessão
     */
    const logoutClient = () => {
      sessionStorage.setItem('client', JSON.stringify({}))
      clientState.value = []
    }
    
    return {
      clientState,
      clientSelect,
      setClientById,
      getAllClientLimit,
      allClientComputed,
      getClientById,
      logoutClient,
      setClientId,
      total
    }
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ['clientState', 'getAllClientLimit', 'allClientComputed', 'getClientById'],
      key: 'client',
      serializer: {
        deserialize: parse,
        serialize: stringify
      }
    }
  }
)
