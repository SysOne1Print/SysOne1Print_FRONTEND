import { app, headers } from '../Axios'

export const getAllFornecedor = async () => {
  return await app.get(`get_all_fornecedor/`, headers())
}

export const createFornecedor = async (dados: {
  pro_for_nome: string
  pro_for_empresa: string
}) => {
  return await app.post(`create_fornecedor/`, dados, headers())
}
