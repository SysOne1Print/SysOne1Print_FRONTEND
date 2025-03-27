export const financeiroStage = [
  {
    path: '/finance',
    meta: { auth: true },
    name: 'Layout-Finance',
    component: () => import('@/layout/Default-layout.vue'),
    redirect: { name: 'financeview' },
    children: [
      {
        path: '',
        name: 'financeview',
        component: () => import('@/views/dashboard/FinanceHomeView.vue')
      },
      {
        path: 'accounting',
        name: 'Contabilidade',
        component: () => import('@/views/dashboard/financeiro/Accounting.vue')
      },
      {
        path: 'carteira-one',
        name: 'Gerir Carteira One',
        component: () => import('@/views/dashboard/financeiro/ManageWallet.vue')
      },
      {
        path: 'change-product/:id',
        name: 'Alterar Produtos',
        component: () => import('@/views/dashboard/financeiro/AlterProduct.vue')
      },
      {
        path: 'client',
        name: 'Clientes cadastrados',
        component: () => import('@/views/dashboard/financeiro/ClientUsers.vue')
      },
      {
        path: 'pix-recebidos',
        name: 'Pix Recebidos',
        component: () => import('@/views/dashboard/financeiro/PixReceived.vue')
      }
    ]
  }
]
