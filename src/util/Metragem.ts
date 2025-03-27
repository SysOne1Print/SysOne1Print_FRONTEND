import type {
  IDateReturn,
  IMetragemImpressora,
  IOrcamentoItensTablePedidoStatus,
  IPrinter
} from '@/model/Index'
import { AddTimeInDateTime } from './Data'

interface IOrcamentoProductionMetragem {
  one1_outros: {
    one1_nome: string
  }
  oit_qtde: number
}

export const metragemFn = (
  printerOnly: IPrinter | undefined,
  orcamentoCalc: IOrcamentoProductionMetragem,
  startDate = new Date()
): IDateReturn => {
  if (printerOnly === undefined) {
    return {
      dataAdd: { view: '', backend: '' },
      additionalHour: { h: 0, m: 0 },
      printerMetragrem: {
        id_mts_h: 0,
        mts_h: 0,
        id_imprs: 0
      }
    }
  }

  console.log('orçamento: ', orcamentoCalc)
  let printerMetragrem: IMetragemImpressora | null = null
  if (printerOnly?.modelo_impr === '2Head' && printerMetragrem === null) {
    printerMetragrem = printerOnly?.metragem_impressora.find(
      (val) =>
        (val.mts_h === 5 &&
          orcamentoCalc?.one1_outros.one1_nome.toLocaleLowerCase() === 'Premium'.toLowerCase()) ||
        (val.mts_h === 7 &&
          orcamentoCalc?.one1_outros.one1_nome.toLocaleLowerCase() === 'Clássica'.toLowerCase()) ||
        (val.mts_h === 9 &&
          orcamentoCalc?.one1_outros.one1_nome.toLocaleLowerCase() === 'Econômica'.toLowerCase())
    ) as IMetragemImpressora // forçando tipagem
  } else if (printerOnly?.modelo_impr === '4Head') {
    printerMetragrem = printerOnly?.metragem_impressora.find(
      (val) =>
        (val.mts_h === 13 &&
          orcamentoCalc?.one1_outros.one1_nome.toLocaleLowerCase() === 'Premium'.toLowerCase()) ||
        (val.mts_h === 17 &&
          orcamentoCalc?.one1_outros.one1_nome.toLocaleLowerCase() === 'Clássica'.toLowerCase()) ||
        (val.mts_h === 20 &&
          orcamentoCalc?.one1_outros.one1_nome.toLocaleLowerCase() === 'Econômica'.toLowerCase())
    ) as IMetragemImpressora // forçando tipagem
  } else {
    printerMetragrem = printerOnly?.metragem_impressora[0]
  }

  //calculo de metragem
  const metragem = (
    parseFloat(orcamentoCalc?.oit_qtde.toString() as string) /
    Number(printerMetragrem?.mts_h as number)
  ).toFixed(2)

  //valor horario horas e minutos
  const additionalHour = {
    h: Number(metragem.toString().split('.')[0]),
    m: Number(metragem.toString().split('.')[1])
  }

  //adiciona o tempo a hora
  const dataAdd = AddTimeInDateTime(startDate, additionalHour)
  return { dataAdd, additionalHour, printerMetragrem }
}
