export const operator = [
  {
    path: '/operator',
    name: 'Layout-Operador',
    meta: { auth: true },
    component: () => import('@/layout/Default-layout.vue'),
    redirect: { name: 'operatorview' },
    children: [
      {
        path: '',
        name: 'operatorview',
        component: () => import('@/views/dashboard/operador/OperatorHomeView.vue')
      },
      {
        path: 'caixa',
        name: 'Meu Caixa',
        component: () => import('@/views/dashboard/operador/BoxView.vue')
      }
    ]
  }
]
