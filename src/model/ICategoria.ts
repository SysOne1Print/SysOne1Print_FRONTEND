export type ICategoria = {
  id: number
  prod_tipo_descricao: string
}

export type IGetCamisaType = {
  cor: Array<{
    id: number
    one1_cor_nome: string
  }>
  tecido: Array<{ id: number; one1_tecido_nome: string }>
  tamanho: Array<{ id: number; one1_tamanho_nome: string; value: number }>
  outro: Array<{
    id: number
    one1_nome: string
    one1_cor_id_categ?: number
    one1_cor_id_subcateg?: number
  }>
}

export type corTypeCategory = {
  id: number
  one1_cor_nome: string
  value?: number | string
}

export type option = {
  tecido: [{ id: number; one1_tecido_nome: string }]
  cor: [{ id: number; one1_cor_nome: string }]
}

export type ISelect = {
  id: number
  nome: string
  stock?: number
}
