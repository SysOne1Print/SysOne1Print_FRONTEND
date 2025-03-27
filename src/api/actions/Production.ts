import { app, headers } from '../Axios'
import type { IOrcamentoStageUpdate, IStageProduction } from '../../model/IOrcamento'
import type { ICreatePrinterLog, ICreatePrinterVariado } from '@/model/Index'

interface IOrcamentoItensStatus {
  limit: number
  skip: number
  type: number
  type_orc: number
}

export const getOrcamentoStatusStageProduction = async ({
  limit,
  skip,
  type
}: {
  limit: number
  skip: number
  type: number
}) => {
  return await app.get(`orcamento-prod-type-dtf/${limit}/${skip}/${type}`, headers())
}

export const getOrcamentoItensStatusStageProduction = async ({
  limit,
  skip,
  type,
  type_orc
}: IOrcamentoItensStatus) => {
  return await app.get(`orcamento_itens_prod/${limit}/${skip}/${type}/${type_orc}`, headers())
}

export const getPrinter = async () => {
  return await app.get('/get-printer', headers())
}

export const createProcessForPrinterLog = async (printer: ICreatePrinterLog) => {
  return await app.post('/create-process-log', printer, headers())
}

export const deleteModeVariado = async ({ id_variado, id }: { id_variado: number; id: number }) => {
  return await app.delete(`/delete-modo-variado/${id_variado}/${id}`, headers())
}

export const updatePrinterRunning = async (printer: {
  user_id: number
  id: number
  id_variado: number
  descr_variado: string
}) => {
  return await app.put(`/update-printer-running/${printer.id}`, printer, headers())
}

export const updateQueue = async (dado: {
  id_impress: number
  impr_status: string
  user_id: number
  action_status: number
  oit_id: number
}) => {
  return await app.put(`/update-queue-printer/${dado.id_impress}`, dado, headers(false))
}

export const updateStageProduction = async (stage: IStageProduction, newSector: number) => {
  return await app.put(
    `/update-production-stage/${stage.oit_id}`,
    { ...stage, sector: newSector },
    headers()
  )
}

export const replacement_layout = async (dado: FormData) => {
  return await app.postForm('/replacement_layout', dado, headers(true))
}

export const createModoVariado = async (dados: ICreatePrinterVariado) => {
  return await app.post('/create_modo_variado', dados, headers(false))
}

export const updateModoVariadoReallocateProcess = async (dados: IOrcamentoStageUpdate) => {
  return await app.put(`/upd_modo_variado_reallocate/${dados.impr_log_id}`, dados, headers())
}
