import type { IFinanceCreate } from '@/model/Index'
import { app, headers } from '../Axios'

export const createAccountToPay = async (account: IFinanceCreate, modelType: number) => {
  return await app.post(
    'createAccountToPay/',
    { ...account, typeAccountTopay: modelType },
    headers()
  )
}

export const deleteAccounting = async (id: number) => {
  return await app.delete(`/deleteAccounting/${id}`)
}

export const getClientInOrder = async (
  limit: number,
  skip: number,
  modalType: number,
  searchItem?: string
) => {
  return await app.get(
    `get-client-in-order/${limit}/${skip}/?searchItem=${searchItem}&modalType=${modalType}`,
    headers()
  )
}
