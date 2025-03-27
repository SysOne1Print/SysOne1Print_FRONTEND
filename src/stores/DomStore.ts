/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { stringify, parse } from 'zipson'

/**
 * Store para gerenciar elementos DOM e estados globais da interface
 * Fornece funções para manipular elementos da sidebar e status de orçamentos
 */
export const useDomStore = defineStore(
  'dom',
  () => {
    /**
     * Status global do orçamento (-1 = padrão)
     */
    const orcStatus = ref<number | string>(-1)
    
    /**
     * Elementos DOM da sidebar
     */
    const sidebarDom = ref<Array<any>>([])
    
    /**
     * Adiciona elementos à sidebar
     * @param {Array<any>} sidebar - Array de elementos DOM
     */
    const addSidebar = (sidebar: Array<any>) => {
      sidebarDom.value = sidebar
    }
    
    /**
     * Adiciona um elemento individual à sidebar
     * @param {any} el - Elemento DOM a ser adicionado
     */
    const addSidebarEl = (el: any) => {
      sidebarDom.value.push(el)
    }
    
    /**
     * Computed que retorna os elementos da sidebar
     */
    const sidebarDomComputed = computed(() => sidebarDom.value)

    return { sidebarDom, sidebarDomComputed, addSidebar, addSidebarEl, orcStatus }
  },

  {
    persist: {
      storage: localStorage,
      paths: ['sidebarDom', 'sidebarComputed', 'addSidebar'],
      key: 'dom',
      serializer: {
        deserialize: parse,
        serialize: stringify
      }
    }
  }
)
