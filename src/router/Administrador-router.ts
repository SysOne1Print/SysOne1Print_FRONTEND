export const administradorStage = [
  {
    path: '/admin',
    meta: { auth: true },
    name: 'Layout-Administrador',
    component: () => import('@/layout/Default-layout.vue'),
    redirect: { name: 'administradorview' },
    children: [
      {
        path: '',
        name: 'administradorview',
        component: () => import('@/views/dashboard/AdministradorHomeView.vue')
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
        name: 'Produção',
        component: () => import('@/views/dashboard/producao/ProduceView.vue')
      },
      {
        path: 'qualityControlView',
        name: 'Controle de qualidade',
        component: () => import('@/views/dashboard/producao/QualityControlView.vue')
      },
      {
        path: 'orcamento-change/:id',
        name: 'alterar orçamento cliente',
        component: () => import('@/views/dashboard/orcamento/OrcamentoView.vue')
      },
      {
        path: 'change-orcamento-middle/:id_orc/:id_cli',
        name: 'Alterar Orçamento admin',
        component: () => import('@/views/dashboard/orcamento/ChangeOrcamentoMiddleView.vue')
      },
      {
        path: 'expedicao-final',
        name: 'Expedição Final',
        component: () => import('@/views/dashboard/expedicao/ExpedicaoFinalView.vue')
      },
      {
        path: 'accounting',
        name: 'Contabilidade',
        component: () => import('@/views/dashboard/financeiro/Accounting.vue')
      },
      {
        path: 'stock',
        name: 'Estoque de Produtos',
        component: () => import('@/views/dashboard/vendedor/StockView.vue')
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
      },
      {
        path: 'orcamento-initial',
        name: 'orçamento cliente',
        component: () => import('@/views/dashboard/orcamento/OrcamentoView.vue')
      },
      {
        path: 'orcamento-middle/:id',
        name: 'orçamento cliente etapa 2',
        component: () => import('@/views/dashboard/orcamento/OrcamentoMiddleView.vue')
      },
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
        path: 'carteira-one',
        name: 'Gerir Carteira One',
        component: () => import('@/views/dashboard/financeiro/ManageWallet.vue')
      },
      {
        path: 'pedido',
        name: 'pedidos',
        component: () => import('@/views/dashboard/pedido/PedidosView.vue')
      },
      {
        path: 'caixa',
        name: 'Meu Caixa',
        component: () => import('@/views/dashboard/operador/BoxView.vue')
      }
    ]
  }
]
