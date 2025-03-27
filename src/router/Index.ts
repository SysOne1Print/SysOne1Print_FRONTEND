import { createRouter, createWebHistory } from 'vue-router'
import { prodStage } from '@/router/Production-router'
import { administradorStage } from '@/router/Administrador-router'
import { vendedorStage } from '@/router/Vendedor-router'
import { financeiroStage } from '@/router/Financeiro-router'
import { clienteRoute } from './Cliente-router'
import { useLoginStore } from '@/stores/LoginStore'
import { storeToRefs } from 'pinia'
import { expedicaoStage } from './Expedicao-router'
import { operator } from './operator/Operator-router'

const router = createRouter({
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/LoginView.vue')
    },
    ...administradorStage,
    ...operator,
    ...vendedorStage,
    ...financeiroStage,
    ...prodStage,
    ...clienteRoute,
    ...expedicaoStage,
    //...operator,
    {
      path: '/:pathMatch(.*)*',
      name: 'Pagina Error 404',
      component: () => import('@/views/PageNotFound.vue')
    }
  ]
})

// router.beforeEach(async (to, from, next) => {
//   const { checkAuthorization } = useLoginStore()
//   const { isAuthC, getToken, userData } = storeToRefs(useLoginStore())
//   await checkAuthorization()

//   if (to.meta?.auth) {
//     if (getToken && userData.value.user_nome && userData.value.user_id) {
//       if (isAuthC.value) {
//         next()
//       } else if (to.name !== 'home') {
//         next({ name: 'home' })
//       } else {
//         next()
//       }
//     } else {
//       if (to.name !== 'home') {
//         next({ name: 'home' }) // Evitar o redirecionamento se já estiver na rota de login
//       } else {
//         next()
//       }
//     }
//   } else {
//     if (isAuthC.value !== undefined && isAuthC.value) {
//       if (to.path !== userData.value.permissoes.perm_path) {
//         next({ path: userData.value.permissoes.perm_path }) // Evita redirecionar para a mesma rota
//       } else {
//         next()
//       }
//     } else {
//       next()
//     }
//   }
// })

export default router
