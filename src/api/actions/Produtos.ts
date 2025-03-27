/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, headers } from '../Axios'

export const getAllProducts = async (id: number) => {
  return await app.get(`get-product/${id}`, headers(false))
}

export const getAllProductsById = async (limit: number, disponivel: boolean = true) => {
  return await app.get(`getAll-product-limit/${limit}?disponivel=${disponivel}`, headers())
}

export const sendAllProductFile = async (
  form: FormData,
  uploadProgress: boolean = false,
  onUpload?: any
) => {
  return await app.postForm('upload-files-orcamento', form, headers(true, uploadProgress, onUpload))
}

export const getProductByName = async (
  name: string,
  limit: number,
  typeCategory: number | null,
  disponivel: boolean | string = true,
  skip?: number
) => {
  if (disponivel === false) {
    const disponivelFn = `disponivel=${disponivel}`

    const type_category =
      typeCategory === 0 || typeCategory === null ? '' : `&category=${typeCategory}`
    const name_dis = name === '' ? '' : `&name=${name}`
    console.log(typeCategory)
    console.log(name_dis)
    return await app.get(`getAll-product-limit/${limit}?${disponivelFn}`, headers())
  }
  return await app.get(
    `getAll-product-limit/${limit}?category=${typeCategory}&name=${name}&disponivel=${disponivel}`,
    headers()
  )
}

export const getListProductsTable = async (
  limit: number,
  skip: number,
  categoriaProd?: number | string,
  searchItem?: string
) => {
  return await app.get(
    `getAllProduct/${limit}/${skip}?category=${categoriaProd}&searchItem=${searchItem}`,
    headers()
  )
}

export const createProduction = async (produto: object) => {
  return await app.post('create-product', produto, headers())
}

export const updateProduction = async (produto: object, prod_id: number) => {
  return await app.put(`update-product/${prod_id}`, produto, headers())
}

export const deleteProductUpdateVisible = async (id: number) => {
  return await app.put(`delete-produto-update-visible/${id}`, headers())
}

export const specificProductPut = async (
  id: number,
  data: {
    nsd_id?: number
    specificPrice: number
    prod_id: number
    prod_type: number | null
    nds_prod_cor: number | null
  }
) => {
  return await app.put(`specific-product/${id}`, data, headers())
}

export const specificProduct = async (data: {
  nsd_id?: number
  specificPrice: number
  prod_id: number
  prod_type: number | null
  nds_prod_cor: number | null
}) => {
  return await app.post(`specific-product`, data, headers())
}

export const getSpecificProduct = async (id: number) => {
  return await app.get(`specific-product/${id}`, headers())
}

export const deleteSpecificProduct = async (id: number) => {
  return await app.delete(`specific-product/${id}`, headers())
}
