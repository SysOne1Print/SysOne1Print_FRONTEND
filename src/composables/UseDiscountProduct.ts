/**
 * Composable para gerenciar descontos de produtos
 * Fornece funções para verificar a existência de descontos para produtos
 */
import type { INivelDescontProduto } from '@/model/Index'
import { discountProductType } from '@/util/Util'

/**
 * Hook para gerenciar descontos de produtos
 * @returns {Object} Objeto contendo funções para verificar descontos
 */
export const useDiscountProduct = () => {
  /**
   * Verifica se existe um desconto para um produto específico
   * @param {number} prod_type - Tipo do produto
   * @param {number} prod_id - ID do produto
   * @param {INivelDescontProduto[]} productNivelDiscount - Array de níveis de desconto
   * @returns {INivelDescontProduto | undefined} Desconto encontrado ou undefined
   */
  const checkIfExistDiscount = (
    prod_type: number,
    prod_id: number,
    productNivelDiscount: INivelDescontProduto[]
  ) => {
    const x = productNivelDiscount.find((v) => {
      return v.produto.pro_id === prod_id && v.nds_prod_type === prod_type
    })
    return x
  }

  return { checkIfExistDiscount }
}
