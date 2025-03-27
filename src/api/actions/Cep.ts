import { app, headers } from '../Axios'

export const getCep = async (cep: string) => {
  return app.get(`cep/${cep}`, headers())
}
