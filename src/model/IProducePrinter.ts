import type { IOrcamentoItensTablePedidoStatus } from './IOrcamento'

export type IPrinter = {
  id_impr: number
  nome_impr: string
  modelo_impr: string
  serial_impr: string
  marca_impr: string
  impressora_log: [
    {
      id_orc: number
      id_impress: number
      impr_status: string
      user_id: number
      action_status: number
    }
  ]
  metragem_impressora: [
    {
      id_mts_h: number
      mts_h: number
      id_imprs: number
    }
  ]
}

export type IPrinterBasic = {
  id_impr: number
  nome_impr: string
  modelo_impr: string
  serial_impr: string
  marca_impr: string
  impressora_log: [
    {
      id_orc: number
      id_impress: number
      impr_status: string
      user_id: number
      action_status: number
    }
  ]
  metragem_impressora: [
    {
      id_mts_h: number
      mts_h: number
      id_imprs: number
    }
  ]
}

export type ICreatePrinterLog = {
  user_id: number
  id_impress: number
  orc: {
    orc_id: number
    oit_id: number
  }
  //action_status: number
  descricao?: string
  id?: number
  modoVariado: boolean
  priority: number
  printerOnly: IPrinterBasic
  orcamentoCalc: IOrcamentoItensTablePedidoStatus
}

export type ICreatePrinterVariado = {
  user_id: number
  oit_id: number
  descricao_variado: string
  action_status: number
  printerOnly?: IPrinter
  priority: number
  orcamentoCalc: {
    orc_id: number
    oit_id: number
    one1_outros: {
      one1_nome: string
    }
  }
}
