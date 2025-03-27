export type IDateReturn = {
  dataAdd: { view: string; backend: Date | string }
  additionalHour: {
    h: number
    m: number
  }
  printerMetragrem: {
    id_mts_h: number
    mts_h: number
    id_imprs: number
  }
}

export type IMetragemImpressora = {
  id_mts_h: number
  mts_h: number
  id_imprs: number
}
