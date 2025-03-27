import { app, headers } from '../Axios'

export const getAllUsers = async () => {
  return await app.get('/get-all-users', headers())
}

export const getUsersById = async (user_id: number) => {
  return await app.get(`/get-users-byId/${user_id}`, headers())
}

export const createIndicators = async ({
  user_id,
  orc_id
}: {
  user_id: number
  orc_id: number
}) => {
  return await app.post('/create-user-indicators', { user_id, orc_id }, headers())
}
