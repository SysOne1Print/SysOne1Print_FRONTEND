export type IGrupo = {
  id?: number
  nome_grupo: string
}

export type IGrupoArray = {
  id?: number
  nome_grupo: string
  produto_sub_grupo: Array<ISubGrupo>
}

export type ISubGrupo = {
  id?: number
  nome_sub_grupo: string
  group_id: number
}
