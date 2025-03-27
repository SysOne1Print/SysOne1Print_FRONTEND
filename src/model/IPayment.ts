export type IPayment = {
  bank: Array<{
    fpg_id: number
    fpg_descricao: string
  }>
  presencial: Array<{
    fpg_id: number
    fpg_descricao: string
  }>
  retirar: Array<{
    fpg_id: number
    fpg_descricao: string
  }>
}

export type IGeneratePix = {
  valorTotal: number
  valor: number
  cpf?: string
  cnpj?: string
  nome: string
  id_orc: number
  id_usuario: number
  id_client: number
}

export type IPaymentTypeCart = {
  id_usuario: number
  id_client: number
  valor: number
  cpf?: string | undefined
  cnpj?: string | undefined
  nome?: string | undefined
  comprovante?: number | undefined
}
