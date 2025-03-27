export const menu = [
  {
    id: 1,
    titulo: 'Home',
    nome: 'Dashboard',
    route: '/vendedor',
    icon: 'dashboard',
    permission: 2,
    sub_route: []
  },
  {
    id: 2,
    nome: 'Inventário',
    titulo: 'Inventário',
    route: '',
    icon: 'inventory',
    permission: 2,
    sub_route: [
      {
        route_path: 'criar produto',
        nome: 'Cadastrar novo item',
        icon: 'add'
      },
      {
        route_path: 'Listagem de Produtos',
        nome: 'Listagem de Produtos',
        icon: 'list'
      },
      {
        route_path: 'Estoque de Produtos',
        nome: 'Estoque de Produtos',
        icon: 'list'
      }
    ]
  },
  {
    id: 3,
    nome: 'Ger. Vendas',
    titulo: 'Gerenciar Vendas',
    route: '',
    permission: 2,
    icon: 'phonelink',
    sub_route: [
      {
        route_path: 'orçamento cliente',
        nome: 'Frente de Caixa',
        icon: 'send'
      },
      {
        route_path: 'pedidos',
        nome: 'Pedidos',
        icon: 'library_books'
      }
    ]
  },
  {
    id: 5,
    titulo: 'Home',
    nome: 'Dashboard',
    route: '/finance',
    icon: 'dashboard',
    permission: 1,
    sub_route: []
  },
  {
    id: 6,
    titulo: 'Financeiro',
    nome: 'Financeiro',
    route: '',
    icon: 'account_balance',
    permission: 1,
    sub_route: [
      {
        route_path: 'Contabilidade',
        nome: 'Contabilidade',
        icon: 'fas fa-book'
      },
      {
        route_path: 'Gerir Carteira One',
        nome: 'Gerir Carteira One',
        icon: 'fa-wallet'
      },
      {
        route_path: 'Clientes cadastrados',
        nome: 'Clientes cadastrados',
        icon: 'fa fa-list'
      },
      {
        route_path: 'Pix Recebidos',
        nome: 'Pix Recebidos',
        icon: 'fas fa-wallet'
      }
    ]
  },
  {
    id: 7,
    titulo: 'Home',
    nome: 'Dashboard',
    route: '/operator',
    icon: 'dashboard',
    permission: 4,
    sub_route: []
  },
  {
    id: 8,
    nome: 'Caixa',
    titulo: 'Caixa',
    route: '',
    permission: 4,
    icon: 'store',
    sub_route: [
      {
        route_path: 'Meu Caixa',
        nome: 'Meu Caixa',
        icon: 'fas fa-cash-register'
      }
    ]
  }
]

export const adminRoutes = [
  {
    id: 7,
    titulo: 'Home',
    nome: 'Dashboard',
    route: '/admin',
    icon: 'dashboard',
    permission: 4,
    sub_route: []
  },
  {
    id: 8,
    nome: 'Inventário',
    titulo: 'Inventário',
    route: '',
    icon: 'inventory',
    permission: 4,
    sub_route: [
      {
        route_path: 'criar produto',
        nome: 'Cadastrar novo item',
        icon: 'add'
      },
      {
        route_path: 'Listagem de Produtos',
        nome: 'Listagem de Produtos',
        icon: 'list'
      },
      {
        route_path: 'Estoque de Produtos',
        nome: 'Estoque de Produtos',
        icon: 'list'
      }
    ]
  },
  {
    id: 9,
    nome: 'Ger. Vendas',
    titulo: 'Gerenciar Vendas',
    route: '',
    permission: 4,
    icon: 'phonelink',
    sub_route: [
      {
        route_path: 'orçamento cliente',
        nome: 'Frente de Caixa',
        icon: 'send'
      },
      {
        route_path: 'pedidos',
        nome: 'Pedidos',
        icon: 'library_books'
      }
    ]
  },
  {
    id: 10,
    titulo: 'Financeiro',
    nome: 'Financeiro',
    route: '',
    icon: 'account_balance',
    permission: 4,
    sub_route: [
      {
        route_path: 'financeview',
        nome: 'Dashboard financeiro',
        icon: 'fas fa-book'
      },
      {
        route_path: 'Contabilidade',
        nome: 'Contabilidade',
        icon: 'fas fa-book'
      },
      {
        route_path: 'Gerir Carteira One',
        nome: 'Gerir Carteira One',
        icon: 'fas fa-wallet'
      },
      {
        route_path: 'Clientes cadastrados',
        nome: 'Clientes cadastrados',
        icon: 'fa fa-list'
      },
      {
        route_path: 'Pix Recebidos',
        nome: 'Pix Recebidos',
        icon: 'fas fa-wallet'
      }
    ]
  },
  {
    id: 8,
    nome: 'Produção',
    titulo: 'Produção',
    route: '',
    icon: 'print',
    permission: 4,
    sub_route: [
      {
        route_path: 'Pedidos Aprovados',
        nome: 'Pedidos Aprovados',
        icon: 'far fa-id-card'
      },
      {
        route_path: 'Arte Final',
        nome: 'Arte Final',
        icon: 'fas fa-file-image'
      },

      {
        route_path: 'Produção',
        nome: 'Em Produção',
        icon: 'fas fa-print'
      },
      {
        route_path: 'Controle de qualidade',
        nome: 'Controle de qualidade',
        icon: 'fas fa-hat-wizard'
      }
    ]
  },
  {
    id: 9,
    nome: 'Expedição',
    titulo: 'Expedição',
    route: '',
    icon: 'widgets',
    permission: 4,
    sub_route: [
      {
        route_path: 'Expedição Final',
        nome: 'Expedição Final',
        icon: 'fas fa-lg fa-box'
      }
    ]
  },
  {
    id: 10,
    nome: 'Caixa',
    titulo: 'Caixa',
    route: '',
    icon: 'widgets',
    permission: 4,
    sub_route: [
      {
        route_path: 'Meu Caixa',
        nome: 'Meu Caixa',
        icon: 'fas fa-lg fa-box'
      }
    ]
  }
]
