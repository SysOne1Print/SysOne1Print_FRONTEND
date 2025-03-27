export const clienteRoute = [
  {
    path: '/acompanhar-pedido/:id',
    name: 'acompanhar pedido do cliente',
    component: () => import('@/views/AccompanyOrderView.vue')
  }
]
