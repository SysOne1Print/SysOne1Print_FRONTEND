export const vendedorStage = [
  {
    path: '/vendedor',
    name: 'Layout',
    meta: { auth: true },
    component: () => import('@/layout/Default-layout.vue'),
    redirect: { name: 'homeview' },
    children: [
      {
        path: '',
        name: 'homeview',
        component: () => import('@/views/dashboard/HomeView.vue')
      },
      {
        path: 'orcamento-initial',
        name: 'orçamento cliente',
        component: () => import('@/views/dashboard/orcamento/OrcamentoView.vue')
      },
      {
        path: 'orcamento-change/:id',
        name: 'alterar orçamento cliente',
        component: () => import('@/views/dashboard/orcamento/OrcamentoView.vue')
      },
      {
        path: 'orcamento-middle/:id',
        name: 'orçamento cliente etapa 2',
        component: () => import('@/views/dashboard/orcamento/OrcamentoMiddleView.vue')
      },
      {
        path: 'change-orcamento-middle/:id_orc/:id_cli',
        name: 'Alterar Orçamento',
        component: () => import('@/views/dashboard/orcamento/ChangeOrcamentoMiddleView.vue')
      },
      // {
      //   path: 'finaliza-change-orcamento/:id',
      //   name: 'Finalizar mudança do orçamento',
      //   component: () => import('@/views/dashboard/orcamento/PaymentView.vue')
      // },
      {
        path: 'finaliza-orcamento/:id',
        name: 'Finalizar Orçamento',
        component: () => import('@/views/dashboard/orcamento/PaymentView.vue')
      },
      {
        path: 'criar-produto',
        name: 'criar produto',
        component: () => import('@/views/dashboard/produto/CreateProdutoView.vue')
      },
      {
        path: 'lista-produto',
        name: 'Listagem de Produtos',
        component: () => import('@/views/dashboard/vendedor/ListAllProductview.vue')
      },
      {
        path: 'stock',
        name: 'Estoque de Produtos',
        component: () => import('@/views/dashboard/vendedor/StockView.vue')
      },
      {
        path: 'pedido',
        name: 'pedidos',
        component: () => import('@/views/dashboard/pedido/PedidosView.vue')
      }
    ]
  }
]
