/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  IOrcamentoFinanceUpdate,
  IOrcamentoPedidoPaymentStatus,
  pedidoOrc,
  updateOrcamentoTypeFinal
} from '@/model/Index'
import { app, headers } from '../Axios'
export const createOrcamento = async (data: any) => {
  return await app.post('/create-orcamento', data, headers())
}

export const updateBudgetCompletely = async (data: pedidoOrc, id: number) => {
  return await app.put(`/update-budget-completely/${id}`, data, headers())
}

export const updateOrcamentoShippingValue = async (
  id: number,
  orc: { orc_valor_frete: string }
) => {
  return await app.put(`/update-orcamento-shippingValue/${id}`, orc, headers())
}

export const updateOrcamento = async ({
  orc_id,
  formaPagamento
}: {
  orc_id: number
  formaPagamento: number
}) => {
  return await app.put(`update-orcamento/${orc_id}`, { formaPagamento }, headers())
}

export const updateOrcamentoStatus = async (
  { orc_id }: { orc_id: number },
  orcamento: IOrcamentoPedidoPaymentStatus
) => {
  return await app.put(
    `update-orcamento-status/${orc_id}?status=updateStatus`,
    orcamento,
    headers(false)
  )
}

export const updateOrcamentoFinanceiro = async ({
  orc_id,
  orc_final
}: {
  orc_id: number
  orc_final: IOrcamentoFinanceUpdate
}) => {
  return await app.put(`update-orcamento-financeiro/${orc_id}`, orc_final, headers())
}

export const getPedidoOrc = async (pedidoId: number) => {
  return await app.get(`get-preview-orcamento/${pedidoId}`, headers())
}

export const getOrcamentoPedidoStatus = async (
  limit: number,
  user_id: number | string,
  skip: number,
  orc_status?: number | string,
  searchItem?: string
) => {
  return await app.get(
    `orcamento-pedido-status/${limit}/${skip}?orcstatus=${orc_status}&searchItem=${searchItem}&id=${user_id}`,
    headers()
  )
}

export const getOrcamentoStatus = async () => {
  return await app.get(`orcamento-status`, headers())
}

export const getAccountBank = async () => {
  return await app.get('get-bank', headers())
}

export const updateOrcamentoFinalStep = async (orc: updateOrcamentoTypeFinal) => {
  return await app.put(`updateOrcamentoFinal/${orc.orc_id}`, orc, headers(false)) //orc, headers(true)
}

export const updateOrcamentoComprovante = async (orc_id: number, comprovante: FormData) => {
  return await app.putForm(`updateOrcamentoComprovante/${orc_id}`, comprovante, headers(true))
}

export const getAlreadyReceipts = async (orc_id: number) => {
  return await app.get(`getAlreadyReceipts/${orc_id}`)
}

export const removeFileDisk = async (id: number) => {
  return await app.delete(`/remove-file-disk/${id}`, headers())
}
