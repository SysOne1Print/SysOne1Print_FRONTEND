import type { LoginUser } from '@/model/IUser'
import { app, headers } from '../Axios'

export const loginUser = async <T>(user: LoginUser) => {
  return await app.post<T>('auth', { ...user }, headers())
}

export const loginAuthCheck = async (token: string) => {
  return await app.get('auth/check', {
    headers: {
      'Content-type': 'application/json',
      Authorization: `bearer ${token}`
    }
  })
}
