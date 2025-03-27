import { app, headers } from '../Axios'

export const createCarteiraClient = async (carteira: {
  cli_saldo_carteira: number
  user_usucadastro: number
  cli_id: number
  comprovante: number
}) => {
  return await app.post('create-carteira-client', carteira, headers(false))
}

export const getAllWallet = async (
  limit: number,
  skip: number,
  walletStatus: number,
  searchNome?: string
) => {
  return await app.get(
    `get-carteira-client/${limit}/${skip}/?searchItem=${searchNome}&id=${walletStatus}`
  )
}

export const updateCarteiraOne = async (updateCartOne: {
  id_cartOne: number | undefined
  user_id: number
  fpg_id: number
}) => {
  return await app.put(`update-carteira-one/${updateCartOne.id_cartOne}`, updateCartOne, headers())
}
