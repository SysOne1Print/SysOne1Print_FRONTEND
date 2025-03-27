export type IClientAll = {
  cli_id: number
  cli_nome: string
  cli_razao_social: string
  cli_nome_fantasia: string
  cli_tipo_pessoa: number
  cli_whatsapp: string
  carteira_one1_cliente: {
    cart_valor: number
  }
  nivel_desconto: Array<{
    nds_id: number
    nds_valor: string
    nds_status: number
    nds_prod_id: number
    nds_prod_type: number
    nds_prod_cor: number
  }>
  cli_email: string
  cli_imagem: string
  cli_celular: string
  cli_cnpj_and_cpf: string
  cli_inscricao_estadual: number | string
  cli_cep: string
  cli_telefone: string
  user_usucadastro: number
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
