import { app, headers } from '../Axios'

export const getLogistic = async () => {
  return await app.get('/logistica', headers(false))
}

export const regLogistica = async (dados: { id_logis: number; id_orc: number }) => {
  return await app.post('/logistica', dados, headers(false))
}
