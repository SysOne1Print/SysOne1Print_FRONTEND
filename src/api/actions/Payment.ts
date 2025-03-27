import { app, headers } from '@/api/Axios'
import type { IGeneratePix, IPaymentTypeCart } from '@/model/Index'

export const getAllPaymentType = async () => {
  return await app.get('get-type-payment', headers())
}

export const pixGenerate = async (dados: IGeneratePix) => {
  return await app.post('pix/qrCode-generate', dados, headers())
}

export const createQRCodeCart = async (params: string, dados: IPaymentTypeCart) => {
  return await app.post(`pix/qrCode-generateCart?${params}`, dados, headers())
}
export const statusPayment = async () => {
  return await app.get('index-payment', headers())
}

export const statusPaymentPix = async (id_orc: number) => {
  return await app.get(`/pix/pix-approve/${id_orc}`, headers())
}

export const pixReceived = async (
  data_inicio: string,
  data_fim: string,
  page: number,
  rows: number,
  cpf: string,
  cnpj: string
) => {
  const inicio =
    data_inicio && data_inicio !== '' ? `inicio=${encodeURIComponent(data_inicio)}` : ''
  const fim = data_fim && data_fim !== '' ? `fim=${encodeURIComponent(data_fim)}` : ''
  const cnpjParams = cnpj && cnpj !== '' ? `&cnpj=${cnpj}` : ''
  const cpfParams = cpf && cpf !== '' ? `&cpf=${cpf}` : ''

  const uri =
    inicio && fim
      ? `?${inicio}&${fim}&paginaAtual=${page}&itensPorPagina=${rows}${cnpjParams}${cpfParams}`
      : ''
  return await app.get(`/pix-received${uri}`)
}
