/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IArquivos } from './IOrcamento'

export type IProducTable = {
  pro_id: number
  pro_nome: string
  pro_categoria_item: number
  pro_data_validade: string
  pro_venda: number
  pro_marca: string
  pro_minimo: number
  pro_maximo: number
  pro_quantidade: number
  pro_frete: number
  pro_observacao: number
  pro_visible: string
  pro_disponivel: boolean
  users: {
    user_nome: string
  }
  log: [
    {
      id_log: number
      log_change_date: Date
      prod_id: number
      user_id_alt: number
      users: {
        user_nome: string
      }
    }
  ]
  produto_categoria_item: {
    prod_tipo_descricao: string
  }
  user_usucadastro: number
  user_usuultalteracao: number
  one1_produto_estoque: [
    {
      pro_est_cor: number
      pro_estoque: number
      one1_cor: {
        id: number
        one1_cor_nome: string
        one1_cor_id_subcateg: null
        one1_cor_id_categ: number
      }
      one1_outros?: null
      one1_tamanho: {
        id: number
        one1_tamanho_nome: string
      }
      pro_est_qnt_cor: null
      pro_est_id_tamanho: number
      pro_est_total: number
    }
  ]
}

export type IRelistProduct = {
  pro_id: number
  nome: string
  tamanho: string
  marca: string
  categoria: string
  min: number
  max: number
  qnt: number
  orc: string
  preco: string
  log: [
    {
      id_log: number
      log_change_date: Date
      prod_id: number
      user_id_alt: number
      users: {
        user_nome: string
      }
    }
  ]
}

export type IAlterDiscount = {
  nds_id: number
  pro_nome: string
  pro_price: number
  nds_prod_id: number
  nds_prod_type: number
  nds_prod_cor: number
  user: {
    user_id: number
    user_nome: string
  }
  data: Date
  nds_valor: number
  produto: IProduct
}

export type IPrecoUnidade = {
  id: number
  id_prod: number
  one1_pro_estId: number
  ppu_preco_venda: number | string
}

export type IProductPreco = {
  produto_preco_unidade: [
    {
      id: number
      id_prod: number
      one1_pro_estId: number
      ppu_preco_venda: number | string
    }
  ]
  one1_modelo_tintas: {
    modelo_id: number
    modelo_nome: string
  }
  pro_est_id_tamanho: number
  pro_estoque: number
  pro_id: number
  one1_tamanho: {
    id: number
    one1_tamanho_nome: string
  }
  one1_outros: {
    id: number
    one1_nome: string
  }
  one1_cor: {
    id: number
    one1_cor_id_categ: number
    one1_cor_id_subcateg: number
    one1_cor_nome: string
  }
}

export type IProduct = {
  pro_id: number
  pro_nome: string
  pro_categoria_item: number
  pro_data_validade: string
  pro_frete: boolean
  pro_galeria_id: number
  pro_marca: string
  pro_observacao: string
  pro_quantidade: number
  pro_venda: number
  pro_umd_caixa: number
  orcamento_itens?: []
  pro_visible: string
  produto_galeria: {
    pro_galeria_path: string
    pro_galeria_all: []
  }
  unidade_medida: {
    umd_descricao: string
    umd_id: number
    umd_sigla: string
  }
  produto_tipo_servico: {
    id: number
    descricao: string
  }
  produto_preco_unidade: [
    {
      ppu_id: number
      umd_id: number | string
      ppu_algura: number | string
      ppu_itens_caixa: number | string
      ppu_largura: number | string
      ppu_peso_bruto: number | string
      ppu_peso_liq: number | string
      ppu_profundidade: number | string
      ppu_volume: number | string
      unidade_medida: {
        umd_descricao: string
        umd_status: number
        umd_sigla: string
      }
    }
  ]
  one1_produto_estoque: Array<IOne1_produto_estoque>
  produto_categoria_item: {
    prod_tipo_descricao: string
  }
}

export type INivelDescontProduto = {
  produto: IProduct
  nds_id: number
  nds_valor: number | null
  user_dtcadastro: Date
  user_usucadastro: number
  nds_prod_type: number
  nds_prod_cor: number
  nds_prod_id: number
  user: {
    user_id: number
    user_nome: string
  }
}

export type IOne1_produto_estoque = {
  pro_est_cor: number
  one1_insumos_tamanho: {
    id: number
    nome: string
    one1_outro_id: number
  }
  produto_preco_unidade: [
    {
      id: number
      id_prod: number
      one1_pro_estId: number
      ppu_preco_venda: number | string
    }
  ]
  one1_metros_sublimatico: {
    id_metro: number
    metro: string
  }
  one1_modelo_tintas: {
    modelo_id: number
    modelo_nome: string
  }

  pro_est_id_tamanho: number
  pro_estoque: number
  pro_id: number
  one1_tamanho: {
    id: number
    one1_tamanho_nome: string
  }
  one1_outros: {
    id: number
    one1_nome: string
  }
  one1_cor: {
    id: number
    one1_cor_id_categ: number
    one1_cor_id_subcateg: number
    one1_cor_nome: string
  }
  one1_produto_peso: {
    id: number
    peso: string
  }
}

export type IProductChangeById = {
  produto_fornecedor: {
    id: number
    pro_for_nome: string
    pro_for_empresa: string
  }
  unidade_medida: {
    umd_id: number
    umd_descricao: string
    umd_status: number
    user_dtcadastro: string
    user_dtultalteracao: string
    user_usucadastro: number
    user_usuultalteracao: number
    umd_sigla: string
  }
  pro_id: number
  pro_gtin_ean: number | null
  pro_departamento: number
  pro_gtin_ean_tributario: number | null
  pro_opt_tamanho_id: number | null
  pro_disponivel: boolean
  pro_nome: string
  pro_categoria_item: 7
  pro_data_validade: string
  pro_frete: boolean
  pro_galeria_id: number
  pro_marca: string
  pro_producao: number
  pro_observacao: string | null
  pro_grupo_produto: number
  pro_fornecedor_id: number
  pro_preco_compra_unidade: number
  pro_quantidade: number
  pro_venda: string | number
  pro_maximo: number
  pro_minimo: number
  pro_unidade: number
  pro_und_id: number
  pro_deposito: number
  orcamento_itens: Array<any>
  produto_log: Array<any>
  pro_visible: string
  produto_data_fiscal_nota: {
    id: number
    pro_fiscal_ncm: number | null
    pro_fiscal_cest: number | null
    pro_fiscal_tipo: number
    pro_fiscal_tributo: number | null
    pro_fiscal_base_icms: number | null
    pro_fiscal_base_icms_st: number | null
    pro_fiscal_icms_substituto: number | null
    pro_fiscal_excecao_tipi: number | null
    pro_origem: number | null
  }
  produto_categoria_item: {
    id: number
    prod_tipo_descricao: string
  }
  users: {
    user_id: number
    user_nome: string
  }
  produto_galeria: {
    id: number
    pro_galeria_path: string
    pro_galeria_all: Array<string>
  }
  produto_tipo_servico: {
    id: number
    descricao: string
  }
  produto_caracteristica: [
    {
      ppu_id: number
      umd_id: number
      ppu_algura: string | number
      ppu_itens_caixa: number
      ppu_largura: string | number
      ppu_peso_bruto: string | number
      ppu_peso_liq: string | number
      ppu_profundidade: string | number
      ppu_volume: string | number
      unidade_medida: {
        umd_descricao: string
        umd_status: number
        umd_sigla: string
      }
    }
  ]
  one1_produto_estoque: [
    {
      id: number
      id_insumos_tamanho: number | null
      pro_est_cor_id: number | null
      pro_estoque: number
      prod_tecido_id: number
      pro_est_outro_id: number
      id_metro: number
      one_visible: boolean
      one1_cor: {
        id: number
        one1_cor_nome: string
        one1_cor_id_subcateg: number | null
        one1_cor_id_categ: number
        id_modelo: number
      }
      one1_outros: number | null
      one1_tamanho: { id: number; one1_tamanho_nome: string }
      pro_est_qnt_cor: number | null
      pro_est_id_tamanho: number | null
      pro_est_total: number
      id_modelo_tinta: number | null
      one1_modelo_tintas: {
        modelo_id: number
        modelo_nome: string
        modelo_data_create_at: string
        modelo_data_update_at: string
        id_categ: number
      }
      one1_metros_sublimatico: number | null
      one1_produto_peso: {
        id: number
        peso: string
      }
      produto_preco_unidade: [
        {
          id: number
          ppu_preco_venda: number | string
          id_prod: number
          one1_pro_estId: number
        }
      ]
    }
  ]
}

export type IAll_one1_produto_estoque = {
  id: number
  id_insumos_tamanho: number | null
  pro_est_cor_id: number | null
  pro_estoque: number
  prod_tecido_id: number
  pro_est_outro_id: number
  id_metro: number
  one_visible: boolean
  one1_cor: {
    id: number
    one1_cor_nome: string
    one1_cor_id_subcateg: number | null
    one1_cor_id_categ: number
    id_modelo: number
  }
  one1_outros: {
    id: number
    one1_nome: string
    prod_catg_id: number
  } | null
  one1_tamanho: { id: number; one1_tamanho_nome: string }
  pro_est_qnt_cor: number | null
  pro_est_id_tamanho: number | null
  pro_est_total: number
  id_modelo_tinta: number | null
  one1_modelo_tintas: {
    modelo_id: number
    modelo_nome: string
    modelo_data_create_at: string
    modelo_data_update_at: string
    id_categ: number
  }
  one1_metros_sublimatico: number | null
  one1_produto_peso: {
    id: number
    peso: string
  }
  produto_preco_unidade: [
    {
      id: number
      ppu_preco_venda: number | string
      id_prod: number
      one1_pro_estId: number
    }
  ]
}

export type IProductCart = {
  pro_id: number
  pro_descricao: string
  produto_tipo_servico: {
    id: number
    descricao: string
    produto_tipo_especifico: [
      {
        prod_tipo_descricao: string
        produ_id_servi: number
      }
    ]
  }
  ppu_desconto_de: number
  ppu_desconto_ate: number
  ppu_valor: number
  ppu_valor1: number
  ppu_valor2: number
  ppu_valor3: number
  ppu_valor4: number
}

export type cartItem = {
  dropzoneFile?: Array<any>
  fileExist?: Array<IArquivos>
  pro_id: number
  pro_nome: string
  pro_venda: number
  corDtf?: number
  produto_tipo_servico: {
    id: number
    descricao: string
  }
  unidade_medida?: {
    umd_descricao: string
    umd_id: number
    umd_sigla?: string
  }
  orcamento_itens?: { oit_id: number }[]
  pro_quantidade: number
  produto_galeria?: {
    pro_galeria_path: string
    pro_galeria_all: string[]
  }
  one1_produto_estoque: Array<IOne1_produto_estoque>
  pro_categoria_item: number
  value_discount: number
  cor: number
  qnty: number
  type: number
  pro_opt_tamanho_id?: number
  tamanho?: number
  content: string
  value_discount_type: number
  prod_deleted?: boolean
  pro_visible: string
}

export type IStoreProduct = {
  type: number
  tamanho: number
  cor: number
  qnty: number | string
  dropzoneFile: Array<any>[]
  content: string
  value_discount: number
  value_discount_type: number
  corDtf: number
}

export type ICreateProdStep1 = {
  step1?: {
    dirStage: string
    pro_nome?: string
    pro_venda?: string | number
    pro_unidade?: string
    umd_prod_id?: string
    pro_tipo?: number | string
    pro_categoria_item?: number | string
    pro_categoria_cor?: number | string
    pro_categoria_tamanho?: number | string
    pro_categoria_tecido?: number | string
    pro_outros_id?: number | string
    pro_outros_select_id?: number | string
    stock: Array<any>
  }
  step2?: {
    pro_marca?: string
    pro_producao?: number
    pro_data_validade?: string
    pro_frete?: boolean
    pro_peso_liq?: number
    pro_peso_bruto?: number
    pro_largura?: number
    pro_altura?: number
    pro_umd_caixa?: number
    pro_itens_caixa?: number
    pro_volume?: number
    pro_profundidade?: number
    pro_gtin_ean?: number
    pro_gtin_ean_tributario?: number
    //pro_departamento?: number
  }
  step3?: {
    galeria?: Array<any>
    alreadyExistImg: Array<string>
  }

  step4?: {
    pro_minimo?: number
    pro_maximo?: number
    pro_crossdocking?: string
    pro_deposito?: number
    pro_quantidade?: number
    pro_preco_compra_unidade?: number
    // pro_custo_compra_unidade?: number
    pro_observacao?: string
    pro_fornecedor_id?: number
  }
  step5?: {
    pro_origem?: number
    pro_fiscal_ncm?: number
    pro_fiscal_cest?: number
    pro_fiscal_tipo?: number
    pro_fiscal_tributo?: number
    pro_grupo_produto?: number
    pro_fiscal_base_icms?: number
    pro_fiscal_base_icmsSt?: number
    pro_fiscal_icms_substituto?: number
    pro_fiscal_excecaoTipi?: number
  }
}

export type ITypeStockParams = {
  pro_est_id_tamanho: number
  pro_estoque: number
  pro_id: number
  one1_tamanho: {
    id: number
    one1_tamanho_nome: string
  }
  one1_outros: {
    id: number
    one1_nome: string
  }
  one1_cor: {
    id: number
    one1_cor_id_categ: number
    one1_cor_id_subcateg: number
    one1_cor_nome: string
  }
}

export type details = {
  cor: { id: number; one1_cor_nome: string }
  tamanho: { id: number; one1_tamanho_nome: string; nome: string }
  tecido: { id: number; one1_tecido_nome: string }
  outro: string
  select_outro: string
  categoria: { id: number; prod_tipo_descricao: string }
  tipo: { id: number; descricao: string }
}

export type IOptionExtra = { id: number; nome: string }

export type step4 = {
  pro_minimo: string | number
  pro_maximo: string | number
  // pro_crossdocking: string | number
  pro_deposito: string | number
  pro_quantidade: string | number
  pro_preco_compra_unidade: string | number
  // pro_custo_compra_unidade: string | number
  pro_observacao: string
  pro_fornecedor_id: string | number
}

export type step5 = {
  pro_origem: string | number
  pro_fiscal_ncm: string | number
  pro_fiscal_cest: string | number
  pro_fiscal_tipo: string | number
  pro_fiscal_tributo: string | number
  pro_grupo_produto: string | number
  pro_fiscal_base_icms: string | number
  pro_fiscal_base_icmsSt: string | number
  pro_fiscal_icms_substituto: string | number
  pro_fiscal_excecaoTipi: string | number
}

export type step1 = {
  pro_nome: string
  pro_venda: null | number
  pro_unidade: string | number
  umd_prod_id: string | number
  pro_tipo: string | number
  pro_categoria_item: string | number
  pro_categoria_cor: string | number
  pro_categoria_tamanho: string | number
  pro_categoria_tecido: string | number
  pro_outros: Array<number>
  pro_outros_select_id: string | number
  pro_outros_id: number
  prod_tamanho: number | string
  pro_tinta_id: number
  pro_metro: number
  pro_peso_id: number
  dirStage: string
}

export type stock = {
  id: number
  one1_tamanho_nome?: string
  nome?: string
  value: number
}

export type step2 = {
  pro_marca: string
  pro_producao: string | number
  pro_data_validade: string
  pro_frete: boolean
  pro_peso_liq: string | number
  pro_peso_bruto: string | number
  pro_largura: string | number
  pro_altura: string | number
  pro_umd_caixa: string | number
  pro_itens_caixa: string | number
  pro_volume: string | number
  pro_profundidade: string | number
  pro_gtin_ean: string | number
  pro_gtin_ean_tributario: string | number
  pro_departamento: number | string
}

export type typeOptionSafe = { one1_nome: string; id: number }
