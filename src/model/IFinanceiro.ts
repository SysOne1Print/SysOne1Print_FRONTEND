export type IFinanceCreate = {
  id?: number
  emissao: Date | undefined
  vencimento: Date | undefined
  valor: number | string
  categoria: number
  ocorrencia: number | string
  fornecedor_id: number
  user_id: number
}

export type IFinanceAllList = {
  id: number
  emissao: Date | undefined
  vencimento: Date | undefined
  valor: number | string
  categoria: number
  ocorrencia: number | string
  fornecedor_id: number
  user_id: number
  produto_fornecedor: {
    pro_for_nome: string
    pro_for_empresa: string
  }
}

export type ILogWallet = {
  created_at: string
  description_change: string
  id_log: number
  id_user_change: number
  users: {
    user_nome: string
  }
}

export type IWalletOne = {
  cart_user_id: number
  cart_valor: number | string
  cart_valor_total: number | string
  chave: string | null
  created_at: string | Date
  id_cart: number
  id_client: number
  id_pg_status: number
  updated_at: string | Date
  status_cart: number
  log: ILogWallet
  cliente_comprovante: {
    cli_compro_id: number
    cli_compro_url: string
  }
  forma_pagamento: {
    fpg_descricao: string
    fpg_id: number
    fpg_status: number
  }
  pagamento_status: {
    id_pg_status: number
    status: string
    styled_css: string
  }
  cliente: {
    cli_nome: string
    cli_id: number
    cli_email: string
    carteira_one1_cliente: {
      cart_valor: number | string
      cart_status: boolean
      id_cart: number
    }
  }
}

export type ITypePayment = {
  fpg_descricao: string
  fpg_id: number
}
