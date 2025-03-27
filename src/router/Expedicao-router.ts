export const expedicaoStage = [
  {
    path: '/expedicao',
    meta: { auth: true },
    name: 'Layout-Expedicao',
    component: () => import('@/layout/Default-layout.vue'),
    redirect: { name: 'expedicaoview' },
    children: [
      {
        path: '',
        name: 'expedicaoview',
        component: () => import('@/views/dashboard/ExpedicaoHomeView.vue')
      },
      {
        path: 'expedicao-final',
        name: 'Expedição Final',
        component: () => import('@/views/dashboard/expedicao/ExpedicaoFinalView.vue')
      }
    ]
  }
]
