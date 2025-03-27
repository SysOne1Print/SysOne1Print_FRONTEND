import { app, headers } from '../Axios'

export const createOperadorOrcamento = async (data: FormData) => {
  return await app.postForm('createOperadorOrcamento/', data, headers(true))
}
