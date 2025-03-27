import { app, headers } from '../Axios'

export const getAllCategoria = async () => {
  return await app.get(`get_all_categoria/`, headers())
}

export const getTypeOption = async (id: number, cat: string | number) => {
  return await app.get(`get_type_option/${id}/${cat}`, headers())
}

export const getOptionCamisa = async (id: number) => {
  return await app.get(`get_option_camisa/${id}`, headers())
}

export const getAllProducao = async () => {
  return await app.get(`get_all_producao/`, headers())
}

export const getAllUnidadeMedida = async () => {
  return await app.get(`get_all_unidade_medida/`, headers())
}

export const getUnidadeMedidaPorPrecoUnidade = async (id: number) => {
  return await app.get(`get_unidade_medida_per_price/${id}`, headers())
}

export const getTipoServico = async () => {
  return await app.get(`get_all_tipo_servico/`, headers())
}

export const getOptionCategory = async (categ: number, sub_categ: number) => {
  return await app.get(`get_corBy_categoria/${categ}/${sub_categ}`, headers())
}
