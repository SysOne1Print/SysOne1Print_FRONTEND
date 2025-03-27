import type { IClient, IClientUpdate } from '@/model/Index'
import { app, headers } from '../Axios'

export const getAllClient = async (limit: number, skip: number, search?: string) => {
  return await app.get(`getAll-client/${limit}/${skip}${search}`)
}

export const createClientPost = async (form: IClient) => {
  return await app.post('create-client', form, headers())
}

export const getClientByid = async (id: number) => {
  return await app.get(`getById-client/${id}`, headers())
}

export const updateClientPut = async (updateItems: IClientUpdate) => {
  return await app.put(`update-client/${updateItems.cli_id}`, { update: updateItems }, headers())
}
