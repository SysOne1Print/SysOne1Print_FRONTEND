/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Composable para gerenciar a barra lateral de navegação
 * Fornece funções para controlar o estado e comportamento da sidebar
 */
import { computed, onBeforeMount, onUpdated, ref } from 'vue'
import { menu, adminRoutes } from '@/util/Sidebar'
import type { ISideBarSelection } from '@/model/Index'
import { useLoginStore } from '@/stores/LoginStore'
import { useDomStore } from '@/stores/DomStore'
import { storeToRefs } from 'pinia'

/**
 * Hook para gerenciar a barra lateral
 * @returns {Object} Objeto contendo funções e estados para gerenciar a sidebar
 */
export const useSidebar = () => {
  const { sidebarDom } = storeToRefs(useDomStore())
  const userLogin = useLoginStore()
  
  /**
   * Referência para os elementos da sidebar
   */
  const sidebar = ref<Array<any>>([])
  
  /**
   * Estado da seleção atual na sidebar
   */
  const sidebarSelection = ref<ISideBarSelection>({
    titulo: '',
    sub_route: [],
    index: 0
  })

  /**
   * Ativa a segunda camada da sidebar (submenu)
   * @param {number} index - Índice do item selecionado
   * @param {HTMLElement} bodyHasOpened - Elemento do corpo da página
   * @param {string} path - Caminho opcional da rota
   */
  const activeSecondSidebar = (index: number, bodyHasOpened: any, path?: string) => {
    try {
      sidebarSelection.value.titulo =
        path !== '' ? sidebarComputed.value[index].titulo : sidebarComputed.value[index].titulo

      sidebarSelection.value.sub_route = [...sidebarComputed.value[index].sub_route]

      if (
        index >= 0 &&
        sidebar.value &&
        sidebar.value[index - 1] !== undefined &&
        getPathSession() !== ''
      ) {
        sidebar.value[index - 1].firstChild.className = 'sidebar-menu-button'

        if (getPathSession() === '') {
          sidebar.value[index].classList.toggle('active')
          sidebarSelection.value.index = index
        }
      }

      if (getPathSession() !== '') {
        runningList(getMenuSession())
      } else {
        runningList(index)
      }

      if (getMenuSession() <= 0 || index > getMenuSession()) {
        if (sidebar.value[index] !== undefined) {
          sidebar.value[index].firstChild.className =
            'sidebar-menu-button active exact-active' as any
        }
      }

      if (index > 0) {
        setMenuSession(index)

        !bodyHasOpened?.classList.contains('layout-compact--open')
          ? bodyHasOpened?.classList.add('layout-compact--open')
          : ''
      }

      if (index === 0) {
        if (bodyHasOpened?.classList.contains('layout-compact--open'))
          bodyHasOpened?.classList.remove('layout-compact--open')
      }
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Percorre a lista de itens da sidebar para atualizar classes
   * @param {number} index - Índice do item selecionado
   */
  const runningList = (index: number) => {
    sidebar.value.forEach((el: HTMLElement, i: number) => {
      if (el !== undefined) {
        if (getPathSession() === '') {
          if (index !== i && el?.classList?.contains('active') && getPathSession() !== '') {
            el.classList.remove('active')
            if (sidebar.value[i] !== undefined || sidebar.value[i] !== null) {
              sidebar.value[i].firstChild.className = 'sidebar-menu-button'
            }
          }
          deleteMenuSession()

          if (index !== i && sidebar.value[i]?.firstChild?.classList?.contains('active')) {
            sidebar.value[i].firstChild.className = 'sidebar-menu-button'
          }
        } else {
          const span = el.querySelector('span')?.textContent?.toLocaleLowerCase()
          if (sidebarComputed.value[getMenuSession()].nome.toLocaleLowerCase() !== span) {
            //sidebar.value[i].firstChild = 'sidebar-menu-button'
            sidebar.value[i]?.firstChild.classList.remove('active')
            sidebar.value[i]?.firstChild.classList.remove('exact-active')
          }
        }
      }
    })
  }

  /**
   * Armazena o menu selecionado na sessão
   * @param {number} num - Índice do menu selecionado
   */
  const setMenuSession = (num: number) => {
    sessionStorage.setItem('menuSelect', num.toString())
  }

  /**
   * Remove o menu selecionado da sessão
   */
  const deleteMenuSession = () => {
    sessionStorage.removeItem('menuSelect')
  }

  /**
   * Obtém o menu selecionado da sessão
   * @returns {number} Índice do menu selecionado
   */
  const getMenuSession = () => {
    return Number(sessionStorage.getItem('menuSelect'))
  }

  /**
   * Adiciona classes ao elemento antes do recarregamento da página
   */
  const addClassElemenBeforeReload = () => {
    sidebar.value[getMenuSession()]?.firstChild?.classList.add(...['active', 'exact-active'])
  }

  /**
   * Obtém o caminho do menu da sessão
   * @returns {string} Caminho do menu
   */
  const getPathSession = () => {
    return sessionStorage.getItem('pathMenu')
  }

  /**
   * Computed que retorna os itens da sidebar com base nas permissões do usuário
   */
  const sidebarComputed = computed(() => {
    return userLogin.userData.user_isadmin === 1 // verifica se o usuario e um admin se nao for ele mostra outro menu
      ? adminRoutes.map((v) => {
          return v
        })
      : menu.filter((v) => {
          return v.permission === userLogin.userData.permissoes.perm_id
          //return v.route.includes(userLogin.userData.permissoes.perm_path)
        })
  })

  /**
   * Remove a classe 'active' de outros itens da página
   * @param {Array<any>} sidebar - Array de elementos da sidebar
   */
  const removeActiveInOtherPage = (sidebar: Array<any>) => {
    document.querySelector('body')?.classList.add('oneScroll')
    const act =
      (document.querySelector('a[href="/dash"]') as any) ||
      document.querySelector('a[href="/finance"]')

    const act2 =
      document.querySelector('a[href="/dash"]') || document.querySelector('a[href="/finance"]')

    sidebar.forEach((el: HTMLElement) => {
      if (el !== undefined) {
        if (
          el?.firstElementChild?.querySelector('span')?.textContent?.toLocaleLowerCase() ===
            act?.querySelector('span')?.textContent?.toLocaleLowerCase() ||
          el?.firstElementChild?.querySelector('span')?.textContent?.toLocaleLowerCase() ===
            act2?.querySelector('span')?.textContent?.toLocaleLowerCase()
        ) {
          if (act !== null && act !== undefined) {
            act.className = 'sidebar-menu-button'
            act?.classList.remove('active')
            act?.classList.remove('exact-active')
          }
          if (act2 !== null && act2 !== undefined) {
            act2.className = 'sidebar-menu-button'
            act2.classList.remove('active')
            act2.classList.remove('exact-active')
          }
        }
      }
    })
  }

  /**
   * Lifecycle hook que executa após cada atualização
   */
  onUpdated(() => {
    removeActiveInOtherPage(sidebarDom.value)
  })

  /**
   * Lifecycle hook que executa antes da montagem do componente
   */
  onBeforeMount(() => {
    removeActiveInOtherPage(sidebarDom.value)
    if (window.history.state.replaced) {
      useDomStore().$reset()
      useDomStore().$hydrate()
      const dom2 = []
      sidebarDom.value.forEach((el: any) => {
        if (el != undefined) {
          dom2.push(el)
        }
        dom2.push(el)
      })
      //sidebarDom.value = dom
    }
  })

  return {
    runningList,
    addClassElemenBeforeReload,
    activeSecondSidebar,
    sidebarComputed,
    sidebarSelection,
    sidebar,
    getMenuSession,
    removeActiveInOtherPage
  }
}
