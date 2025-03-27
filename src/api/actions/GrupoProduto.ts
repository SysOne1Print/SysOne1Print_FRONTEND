import type { IGrupo, ISubGrupo } from '@/model/Index'
import { app, headers } from '../Axios'

export const getGrupoProdutos = async () => {
  return app.get(`get_all_grupo_produto`, headers())
}

export const getSubGrupo = async () => {
  return app.get(`get_all_subGrupo_produto`, headers())
}

export const getGrupoProdutosById = async (id: number) => {
  return app.get(`get_grupo_produto/${id}`, headers())
}

export const getSubGrupoById = async (id: number) => {
  return app.get(`get_subGrupo_produto/${id}`, headers())
}

export const postCreateGrupo = async (data: IGrupo) => {
  return app.post('create-group-product', data, headers())
}

export const postCreateSubGrupo = async (data: ISubGrupo) => {
  return app.post('create-sub-group-product', data, headers())
}

export const deleteGrupo = async (id: number) => {
  return app.delete(`delete_grupo/${id}`, headers())
}

export const deleteSubGrupo = async (id: number) => {
  return app.delete(`delete_subGrupo/${id}`, headers())
}

export const updateGrupo = async (data: IGrupo) => {
  return app.put(`update-grupo/${data.id}`, { nome_grupo: data.nome_grupo }, headers())
}
