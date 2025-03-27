import { app, headers } from '../Axios'

export const getModeloTintas = async (id: number) => {
  return await app.get(`get-modelo-tintas/${id}`, headers())
}
