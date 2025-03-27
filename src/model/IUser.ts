export type UserData = {
  user_id: number
  user_nome: string
  user_login: string
  user_isadmin: number
  permissoes: {
    perm_id: number
    perm_descricao: string
    perm_path: string
  }
}

export type LoginUser = {
  user: string
  password: string
}

export type IClient = {
  cli_id?: number
  cli_tipo_pessoa: number
  cli_nome: string
  cli_razao_social: string
  cli_nome_fantasia: string
  cli_celular: string
  cli_whatsapp: string
  cli_cnpj_and_cpf: string
  cli_inscricao_estadual: number | string
  cli_email: string
  cli_cep: string
  cli_telefone: string
  user_usucadastro: number
  cli_imagem: string
  cli_uuid: string
  cli_bairro: string
  cli_cidade: string
  cli_estado: string
  cli_endereco: string
  cli_isento: boolean
  cli_valor_prod?: string | number
  cli_prod_id?: number
  cli_saldo_carteira?: number
  user_usuultalteracao?: number
  cli_contact: string
  cli_transportadora: string
}

export type IClientUpdate = {
  cli_id?: number
  cli_tipo_pessoa: number
  cli_nome: string
  cli_razao_social: string
  cli_nome_fantasia: string
  cli_celular: string
  cli_whatsapp: string
  cli_cnpj_and_cpf: string
  cli_inscricao_estadual: number | string
  cli_email: string
  cli_cep: string
  cli_telefone: string
  user_usucadastro: number
  cli_imagem: string
  cli_uuid: string
  cli_bairro: string
  cli_cidade: string
  cli_estado: string
  cli_endereco: string
  cli_isento: boolean
}

export type IClientSaveUpdate = {
  cli_id: number
  cli_valor_prod: string | number
  cli_prod_id: number
}

export type orClient = {
  cli_id: number
  cli_nome: string
  cli_nome_fantasia: string
  carteira_one1_cliente: {
    cart_create_at: Date | string
    cart_status: false
    cart_update_at: Date | string
    cart_valor: number
    id_cart: number
    user_id_cadastro: number
    user_id_change: number
  }
  cli_cpf: string
  cli_endereco: string
  cli_cnpj_and_cpf: string
  nivel_desconto: Array<{
    nds_id: number
    nds_valor: string
    nds_status: number
    nds_prod_id: number
    nds_prod_type: number
    nds_prod_cor: number
  }>
}
