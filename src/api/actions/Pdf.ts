import { app } from '../Axios'

export const pdfAxios = async (file: object) => {
  return await app.post('pdf-view', file, {
    responseType: 'blob'
  })
}
