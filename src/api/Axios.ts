/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
const baseURLAPI = import.meta.env.VITE_APP_API_BASE

export const app = axios.create({
  baseURL: baseURLAPI,
  headers: {
    'Content-Type': 'application/json',
    Accept: true
  }
})

export const headers = (
  multipart = false,
  uploadProgress: boolean = false,
  onUploadProgress?: any
) => {
  return {
    headers: {
      Authorization: null,
      Accept: 'application/json',
      ContentType: multipart ? 'multipart/form-data' : 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    ...(uploadProgress && onUploadProgress !== undefined ? onUploadProgress : {})
  }
}
export { axios }
