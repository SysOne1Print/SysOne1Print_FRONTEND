import { app, headers } from '../Axios'

export const getAllDeposito = async () => {
  return await app.get(`get_all_deposito/`, headers())
}

export const CreateDeposito = async (dados: { nome: string }) => {
  return await app.post(`create_deposito/`, dados, headers())
}
