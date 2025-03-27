export const prodStage = [
  {
    path: '/production',
    meta: { auth: true },
    name: 'Layout-Production',
    component: () => import('@/layout/Default-layout.vue'),
    redirect: { name: 'productionview' },
    children: [
      {
        path: '',
        name: 'productionview',
        component: () => import('@/views/dashboard/ProductionHomeView.vue')
      },
      {
        path: 'approvedRequestView',
        name: 'Pedidos Aprovados',
        component: () => import('@/views/dashboard/producao/ApprovedRequestView.vue')
      },
      {
        path: 'finalArtView',
        name: 'Arte Final',
        component: () => import('@/views/dashboard/producao/FinalArtView.vue')
      },
      {
        path: 'produceView',
        name: 'Em Produção',
        component: () => import('@/views/dashboard/producao/ProduceView.vue')
      },
      {
        path: 'qualityControlView',
        name: 'Controle de qualidade',
        component: () => import('@/views/dashboard/producao/QualityControlView.vue')
      }
      // {
      //   path: 'expeditionView',
      //   name: 'Expedição',
      //   component: () => import('@/views/dashboard/producao/ExpeditionView.vue')
      // }
    ]
  }
]
