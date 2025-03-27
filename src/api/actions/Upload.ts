import { app, headers } from '../Axios'

export const uploadPost = async (form: FormData) => {
  return await app.postForm('upload-imagem', form, headers(true))
}

export const uploadImageProduct = async (form: FormData) => {
  return await app.postForm('create-galeria', form, headers(true))
}

export const uploadPostComprovante = async (form: FormData) => {
  return await app.postForm('upload-imagem-comprovante', form, headers(true))
}
