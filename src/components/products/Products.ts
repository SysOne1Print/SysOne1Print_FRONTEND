/* eslint-disable no-unused-vars */
import type { ITypeStockParams } from '@/model/Index'

export const newOne1Stock = (value: ITypeStockParams[]) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return value?.reduce((acc = '', curr) => {
    return curr.one1_cor.one1_cor_nome
  }, {})
}
