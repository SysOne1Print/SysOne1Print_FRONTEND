/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  cartItem,
  IArquivos,
  IOne1_produto_estoque,
  IOrcamento_historico_status,
  IOrcamentoPedidoStatus,
  IProduct,
  MOOD
} from '@/model/Index'

interface nivel_desconto {
  nds_id: number
  nds_valor: string
  nds_status?: number
  nds_prod_id: number
  nds_prod_type: number
  nds_prod_cor: number
}

interface cartItemDiscount {
  pro_id: number
  cor: number | null
  corDtf?: number | null
  type: number
}

interface IModeloFilmeDtfUtil {
  pro_categoria_item: number
  one1_produto_estoque: Array<IOne1_produto_estoque>
  type: number
  oit_cor?: number
}

interface IFinanceOrc {
  orc_value_parcial: number
  formaPagamento: number
  orc_valor: number
  cliente: { carteira_one1_cliente: { cart_valor: number | string } }
}

export const fnMinusSignValue = (real: Intl.NumberFormatPart[]) => {
  console.log(real)
  console.log(
    'teste: ',
    `${real[1]?.value}${real[2]?.value} ${real[0]?.value} ${real[3]?.value}${real[4]?.value}${real[5]?.value}`
  )
  return `${real[1]?.value}${real[2]?.value} ${real[0]?.value} ${real[3]?.value}${real[4]?.value}${real[5]?.value}`
}

export const cartMaxValueUtil = (
  financeOrc: IFinanceOrc,
  editFinance: { orc_parcial: number; orc_check_parcial: boolean }
) => {
  let cart_valor = parseFloat(financeOrc.cliente.carteira_one1_cliente.cart_valor.toString())
  //testando codigo:
  if (financeOrc.formaPagamento === 10) {
    editFinance.orc_parcial =
      cart_valor < financeOrc.orc_valor ? cart_valor : editFinance.orc_parcial
  }

  const diferenca = editFinance.orc_parcial - financeOrc?.orc_value_parcial

  // Garante que a diferença seja positiva
  if (diferenca > 0) {
    // Subtrai a diferença da carteira, limitado pelo saldo
    const valorUsadoCarteira = Math.min(diferenca, cart_valor)
    cart_valor -= valorUsadoCarteira
    // Atualiza o valor inicial com o novo valor
    //valorInicial = novoValorEntrada;
  }

  return { diferenca, cart_valor }
}

export const discountProductType = (v: nivel_desconto, product: cartItemDiscount) => {
  if (
    v.nds_prod_cor !== null &&
    v.nds_prod_id === product.pro_id &&
    v.nds_prod_cor === (product.corDtf || product.cor)
  ) {
    return v
  }

  if (
    v.nds_prod_type !== null &&
    v.nds_prod_id === product.pro_id &&
    v.nds_prod_type === product.type
  ) {
    return v
  }

  if (
    (v.nds_prod_cor === null || v.nds_prod_cor === 0) &&
    (v.nds_prod_type === null || v.nds_prod_type === 0) &&
    v.nds_prod_id === product.pro_id
  ) {
    return v
  }
}

export const modeloFilmeDtfUtil = (valueProp: IModeloFilmeDtfUtil) => {
  return valueProp.pro_categoria_item === 5
    ? valueProp.one1_produto_estoque[0].one1_outros.id
    : valueProp.type
}

export const modeloTintaPolitilenoUtil = (valueProp: IModeloFilmeDtfUtil) => {
  return valueProp.pro_categoria_item === 8
    ? valueProp.one1_produto_estoque[0].one1_modelo_tintas.modelo_id
    : valueProp.oit_cor
}

export const typeOrcamento = (orc_status: number) => {
  if (orc_status === 1 || orc_status === 7) return 'border-secondary alert-secondary'
  if (orc_status === 2) return 'border-warning alert-warning'
  if (orc_status === 3) return 'border-warning alert-warning'
  if (orc_status === 4) return 'border-primary alert-primary'
  if (orc_status === 5) return 'border-success alert-success'
  if (orc_status === 6) return 'border-accent alert-danger'
}

export const discount_orc = (num: number) => {
  return num === 1 || num === 2 ? num : 0
}

export const typePagamento = (id_pg: number) => {
  if (id_pg === 5) return 'border-success alert-success' //Pix
  if (id_pg === 6 || id_pg === 11) return 'border-primary alert-primary' //dinheiro ou carteira one1
  if (id_pg === 9 || id_pg === 10) return 'border-secondary alert-secondary' //orçamento
  return 'border-warning alert-warning'
}

export const typeIcon = (orc_status: number) => {
  if (orc_status === 5) return 'fas fa-lg fa-robot'
  if (orc_status === 6 || orc_status === 11) return 'fas fa-lg fa-money-bill-alt'
  if (orc_status === 9 || orc_status === 10) return 'fab fa-cc-visa fa-lg text-secondary ml-2'
  return ''
}

export const categoriaOpStatic = [{ id: 1, cat: 'Compra de material' }]

export const balanceCalcule = (newBalance: number, oldBalance: number) => {
  return newBalance + oldBalance
}

export const newFormatMoney = (value: number) => {
  const real = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })
  return real
    .formatToParts(parseFloat(value.toString()))
    .filter((v) => v.type !== 'currency' && v.type !== 'literal')
    .map((v) => v.value)
    .join('')
}

export const copyFile = (desc: string, notifyToast: CallableFunction, typeContent: string = '') => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(desc as string)
      .then(() => {
        notifyToast({ msg: 'Texto Copiado com sucesso!', typeToast: 'success' })
      })
      .catch((err) => {
        console.error('Falha ao copiar o texto: ', err)
      })
  } else {
    const inputTemp = document.createElement('input')
    inputTemp.value = desc
    document.body.appendChild(inputTemp)

    // Seleciona o texto no input
    inputTemp.select()
    inputTemp.setSelectionRange(0, 99999) // Para dispositivos móveis

    // Executa o comando de cópia
    try {
      const sucesso = document.execCommand('copy')
      if (sucesso) {
        notifyToast({ msg: `${typeContent} Texto Copiado com sucesso!`, typeToast: 'success' })
      } else {
        notifyToast({ msg: 'Falha ao copiar o texto.', typeToast: 'success' })
      }
    } catch (err) {
      console.error(err)
      notifyToast({ msg: 'Erro ao copiar o texto.', typeToast: 'success' })
    }

    // Remove o input temporário
    document.body.removeChild(inputTemp)
  }
}

export const typeProductCategory = (
  produtoSelectItem: IProduct,
  prod_type: number,
  prod_cor?: number
) => {
  if ([1, 2, 3, 10].some((v) => v === produtoSelectItem.pro_categoria_item)) {
    return produtoSelectItem?.one1_produto_estoque.find((v) => {
      return v.one1_outros.id === prod_type
    })?.produto_preco_unidade[0]?.ppu_preco_venda
  }

  if ([6, 7, 8].some((v) => v === produtoSelectItem.pro_categoria_item)) {
    const x = produtoSelectItem.one1_produto_estoque.find((v) => {
      return v.one1_cor === null
        ? v.one1_modelo_tintas.modelo_id === prod_type
        : v.one1_cor.id === prod_type
    })?.produto_preco_unidade[0]?.ppu_preco_venda

    return x
  }

  if ([4, 5].includes(Number(produtoSelectItem?.pro_categoria_item))) {
    return produtoSelectItem?.pro_venda
  }
}

export const maskNumbersCNPJ = (searchItem: string) => {
  const apenasDigitos = searchItem.replace(/\D/g, '')
  //Regex para numeros inteiros de 1 a 6 digitos
  if (apenasDigitos.length >= 1 && apenasDigitos.length < 6) {
    return
  }

  //regex para verificar se é um numero de telefone ou CNPJ
  // Formatar como CNPJ XX.XXX.XXX/XXXX-XX
  if (apenasDigitos.length > 12) {
    searchItem = apenasDigitos.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  } else if (apenasDigitos.length > 8) {
    searchItem = apenasDigitos.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4')
  } else if (apenasDigitos.length > 5) {
    searchItem = apenasDigitos.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3')
  } else if (apenasDigitos.length > 2) {
    searchItem = apenasDigitos.replace(/(\d{2})(\d{0,3})/, '$1.$2')
  } else {
    searchItem = apenasDigitos.replace(/(\d*)/, '$1')
  }
  return searchItem
}

export const maskNumberCPF = (searchItem: string) => {
  const apenasDigitos = searchItem.replace(/\D/g, '')

  if (apenasDigitos.length > 11) {
    return apenasDigitos.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  } else if (apenasDigitos.length > 6) {
    return apenasDigitos.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3')
  } else if (apenasDigitos.length > 3) {
    return apenasDigitos.replace(/(\d{3})(\d{0,3})/, '$1.$2')
  }
}
