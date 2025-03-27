/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import type { IPrinter } from './IProducePrinter'
import type { IOne1_produto_estoque } from './IProduct'

export type orcamentoUpdate = {
  formaPagamento: number
}

export type pedidoOrc = {
  client: number
  corDtf: number
  orc_valor_discount: string
  orc_type_discount: number
  formaPagamento: number
  status: number
  exibirRecibo: boolean
  valorFrete: string
  valorTotal: string
  usuariocadastro: number
  produto_orcamento: Array<unknown>
  urlForItems: Array<{ diretorio: string }>
}

export type orcamentoStatus = {
  ost_id: number
  ost_descricao: string
}

export type orcamentoTypeFinal = {
  observacao: string
  exibirRecibo: boolean
  client_name: string
  user_usuultalteracao: number
  formaPagamento: number
  orc_value_parcial: number | string
  orc_check_parcial: boolean
}

export type updateOrcamentoTypeFinal = {
  orc_id: number
  observacao: string
  exibirRecibo: boolean
  client_name: string
  comprovante?: unknown
  user_usuultalteracao: number
  formaPagamento: number
  orc_check_parcial: boolean
  orc_value_parcial: number
  id_pg_status: number
}

export type saveChange = {
  observacao: string
  exibirRecibo: boolean
  formaPagamento?: {
    fpg_id: number
    fpg_descricao: string
  }
  saveChange: boolean
  orc_check_parcial: boolean
  orc_value_parcial: number
}

export type IOrcamento = {
  orc_id: number
  orc_data_validade: Date | string
  orc_data_aprovacao: Date | string
  orc_data_entrega: Date | string
  orc_data_pagamento: Date | string
  orc_valor_frete: string
  orc_observacao: string
  orc_nome_arquivo: string
  orc_emissao: Date | string
  user_dtcadastro: Date | string
  user_dtultalteracao: Date | string
  orc_value_parcial: number
  user_usucadastro: number
  user_usuultalteracao: number
  cli_id: number
  fpg_id: number
  ost_id: number
  orc_recibo: boolean
  orc_valor_total: string | number
  arquivos: Array<IArquivos>
  orc_indicator_id: number
}

export type IOrcamentoItens = {
  oit_id: number
  oit_qtde: number
  oit_valor_unitario: string | number
  oit_valor_desconto: string | number //verificar por que o valor do desconto veio junto ao inves de vim com a pontuação
  oit_valor_total: string | number
  oit_itens_type_material: number
  oit_observacao: string
  oit_cor: number
  orc_id: number
  pro_id: number
  umd_id: number | null
  one1_outros: {
    id: number
    one1_nome: string
    prod_catg_id: number
  }
  produto: {
    pro_id: number
    pro_nome: string
    pro_categoria_item: number
    produto_tipo_servico: {
      id: number
      descricao: string
    }
    one1_produto_estoque: Array<IOne1_produto_estoque>
  }
}

export type IArquivos = {
  id?: number
  orc_id: number
  diretorio: string
  type_file: string
  nome_arq: string
  url: string
  prod_type: number
  pro_id: number
  url_deleted?: boolean
  nome_arq_ficticio?: string
  uploadProgress: number
  oit_id: number
  orc_itens?: {
    produto: {
      pro_nome: string
      produto_categoria_item: {
        id: number
        prod_tipo_descricao: string
      }
      pro_categoria_item: number
    }
  }
}

export type IOrcamentoComprovanteType = {
  odo_arquivo: string
  user_usucadastro: number
  user_usuultalteracao: number
  orc_id: number
}

export enum MOOD {
  active = 'active',
  inactive = 'inactive'
}

export type produtoOrcamentoLog = {
  content: string
  oit_id: string
  pro_cor: string
  pro_desconto: string
  pro_discount_type: string
  pro_id: string
  pro_nome: string
  pro_tamanho: string
  prod_deleted: string
  'produto_preco_unidade.pro_venda': string
  produto_type: string
  qnty: string
  type: string
}

export type IOrcamentoLog = {
  changedUser: number
  nome_user: string
  content: {
    orcamento: {
      client: string
      exibirRecibo: string
      formaPagamento: string
      orc_check_parcial: string
      orc_data_aprovacao: string
      orc_data_entrega: string
      orc_data_pagamento: string
      orc_data_validade: string
      orc_nome_arquivo: string
      orc_observacao: string
      orc_type_discount: string
      orc_valor_frete: string
      orc_valor_total: string
      orc_valor_total_discount: string
      orc_value_parcial: string
      produto_orcamento: Array<produtoOrcamentoLog>
      status: string
    }
  }
  data_log: Date | string
  id: number
  id_orc: number
  operation: string
}

export type IOrcamentoPedidoStatus = {
  arquivos: Array<IArquivos>
  files: Array<IArquivos>
  orc_id: number
  orc_observacao: string
  ost_id: number
  user_usucadastro: number
  orc_valor_total: number
  orc_data_validade: Date | string
  orc_data_aprovacao: Date | string
  orc_data_entrega: string
  tempo?: string
  ref_pay_value_total?: number
  orc_data_pagamento: string
  orc_valor_frete: string | number
  impr_log_id: number
  replacement_layout: Array<{ rpl_observacao: string; created_at: Date }>
  orc_check_parcial: boolean
  orc_value_parcial: number
  orcamento_log: Array<IOrcamentoLog>
  orcamento_step?: {
    ost_id: number
    ost_descricao: string
    ost_cor: null
    ost_ordem: null
    ost_status: number
    user_dtcadastro: number
    user_dtultalteracao: number
    user_usucadastro: number
    user_usuultalteracao: number
    ost_tipo_exibicao: number
  }
  logistica: {
    id_logis: number
    name_logis: string
  }
  impressora_log: [
    {
      impressora: {
        id_impr: number
        nome_impr: string
        modelo_impr: string
        marca_impr: string
        serial_impr: string
      }
      id_orc: number
      impr_conclusao: Date
      impr_status: string
      id: number
      action_status: number
      priority: number
    }
  ]
  account_payment: {
    nome_banco_pagamento: string
    id: number
  }
  orcamento_historico_status: Array<IOrcamento_historico_status>
  orcamento_itens: Array<{
    oit_qtde: number
    oit_id: number
    oit_visible_stage: MOOD
    oit_itens_type_material: number
    oit_observacao: string
    oit_valor_desconto: number | string
    oit_type_discount: number
    oit_itens_tamanho: number
    one1_outros: {
      one1_nome: string
    }

    produto: {
      pro_visible: MOOD
      one1_tamanho: {
        id: number
        one1_tamanho_nome: string
      }
      produto_galeria: {
        id: number
        pro_galeria_all: string[]
        pro_galeria_path: string
      }
      unidade_medida: {
        umd_descricao: string
        umd_id: number
        umd_sigla?: string
      }
      pro_venda: number
      pro_quantidade: number
      pro_nome: string
      pro_id: number
      pro_categoria_item: number
      pro_unidade: number
      pro_opt_tamanho_id: number
      one1_produto_estoque: Array<IOne1_produto_estoque>
      produto_categoria_item: {
        id: number
        prod_tipo_descricao: string
      }
      produto_caracteristica: Array<{
        unidade_medida: {
          umd_descricao: string
        }
      }>
      produto_preco_unidade: Array<{
        unidade_medida: {
          umd_descricao: string
        }
      }>
      produto_tipo_servico: {
        id: number
        descricao: string
      }
    }
  }>
  producao_expedicao: Array<{
    id_prod: number
    time_expected: number
    final_delivery: number
    orc_id: number
    user_cd: number
    user_change: number
    user_create_at: number
    user_update_at: number
  }>
  forma_pagamento: {
    fpg_id: number
    fpg_descricao: string
    fpg_exibe_cliente: number
    fpg_status: number
  }
  users: {
    user_id: number
    user_nome: string
  }
  cliente: {
    cli_id: number
    cli_nome: string
    cli_email: string
    carteira_one1_cliente: ICarteiraOne
  }
  pagamento_status: {
    id_pg_status: number
    status: string
    styled_css: string
  }
  orcamento_status: {
    ost_id: number
    ost_descricao: string
    ost_cor: null
    ost_ordem: null
    ost_status: number
    user_dtcadastro: number
    user_dtultalteracao: number
    user_usucadastro: number
    user_usuultalteracao: number
    ost_tipo_exibicao: number
  }
}

// export type IOrcamentoPedidoStatusProduction = {
//   orcamento_itens_historical: Array<{
//     oit_hs_data: string,
//     oit_hs_id: number,
//     oit_itens_id: number,
//     oitHs_status_id: number,
//     orcamento_itens_status: {
//       oit_descricao: string
//     }
//   }>
//   orcamento_historico_status: Array<IOrcamento_historico_status>
//   orcamento_itens: Array<{
//     oit_qtde: number
//     oit_id: number
//     oit_visible_stage: MOOD
//     oit_itens_type_material: number
//     oit_observacao: string
//     oit_valor_desconto: number | string
//     oit_type_discount: number
//     oit_itens_tamanho: number
//     one1_outros: {
//       one1_nome: string
//     }

//     produto: {
//       pro_visible: MOOD
//       one1_tamanho: {
//         id: number
//         one1_tamanho_nome: string
//       }
//       produto_galeria: {
//         id: number
//         pro_galeria_all: string[]
//         pro_galeria_path: string
//       }
//       unidade_medida: {
//         umd_descricao: string
//         umd_id: number
//         umd_sigla?: string
//       }
//       pro_venda: number
//       pro_quantidade: number
//       pro_nome: string
//       pro_id: number
//       pro_categoria_item: number
//       pro_unidade: number
//       pro_opt_tamanho_id: number
//       one1_produto_estoque: Array<IOne1_produto_estoque>
//       produto_categoria_item: {
//         id: number
//         prod_tipo_descricao: string
//       }
//       produto_caracteristica: Array<{
//         unidade_medida: {
//           umd_descricao: string
//         }
//       }>
//       produto_preco_unidade: Array<{
//         unidade_medida: {
//           umd_descricao: string
//         }
//       }>
//       produto_tipo_servico: {
//         id: number
//         descricao: string
//       }
//     }
//   }>
//   producao_expedicao: Array<{
//     id_prod: number
//     time_expected: number
//     final_delivery: number
//     orc_id: number
//     user_cd: number
//     user_change: number
//     user_create_at: number
//     user_update_at: number
//   }>
//   users: {
//     user_id: number
//     user_nome: string
//   }
//   cliente: {
//     cli_id: number
//     cli_nome: string
//     cli_email: string
//     carteira_one1_cliente: ICarteiraOne
//   }
//   pagamento_status: {
//     id_pg_status: number
//     status: string
//     styled_css: string
//   }
//   orcamento_status: {
//     ost_id: number
//     ost_descricao: string
//     ost_cor: null
//     ost_ordem: null
//     ost_status: number
//     user_dtcadastro: number
//     user_dtultalteracao: number
//     user_usucadastro: number
//     user_usuultalteracao: number
//     ost_tipo_exibicao: number
//   }
// }
export type IArquivosOrcamentoItensTable = {
  id: number
  orc_id: number
  diretorio: string
  nome_arq: string
  id_replace: number | null
  pro_id: number
  prod_type: number
  oit_id: number
  sys_update: string | null
  sys_save: boolean | false
  sys_export: false
  type_file: boolean | null
  url: string
}

export type IOrcamentoItensTablePedidoStatus = {
  description: any
  statusQueue: any
  arquivos: Array<IArquivosOrcamentoItensTable>
  orcamento_historico_status: Array<IOrcamento_historico_status>
  oit_qtde: number
  oit_id: number
  orc_id: number
  oit_visible_stage: MOOD
  oit_itens_type_material: number
  oit_observacao: string
  oit_valor_desconto: number | string
  oit_type_discount: number
  oit_itens_tamanho: number
  action_status: number
  impressora_log: Array<{
    id: number
    priority: number
    action_status: number
    impr_status: string
    impr_conclusao: string
    impressora: {
      id_impr: number
      nome_impr: string
      marca_impr: string
      modelo_impr: string
    }
  }>
  orcamento: {
    users: {
      user_id: number
      user_nome: string
    }
    cliente: {
      cli_id: number
      cli_nome: string
      cli_email: string
    }
    producao_expedicao: Array<IProductionExpedition>
    logistica: {
      id_logis: number
      name_logis: string
    }
    orc_check_parcial: boolean
    orc_data_aprovacao: string
    orc_data_entrega: string
    orc_data_pagamento: string
    orc_data_validade: string
    orc_valor_total: string | number
    orc_value_parcial: string | number
    printer: string
    orcamento_status: {
      ost_id: number
      ost_descricao: string
      ost_cor: null
      ost_ordem: null
      ost_status: number
      user_dtcadastro: number
      user_dtultalteracao: number
      user_usucadastro: number
      user_usuultalteracao: number
      ost_tipo_exibicao: number
    }
  }
  orcamento_itens_status: {
    oit_descricao: string
    oit_status_id: number
    oit_tipo_exibicao: number
    user_dtcadastro: string
    user_dtultalteracao: string
    user_usucadastro: number
    user_usuultalteracao: number
  }
  orcamento_itens_historical: Array<{
    oit_hs_id: number
    oitHs_status_id: number
    orcamento_itens_status: {
      oit_descricao: string
    }
  }>
  one1_outros: {
    one1_nome: string
  }
  produto: {
    one1_tamanho: {
      id: number
      one1_tamanho_nome: string
    }
    produto_categoria_item: {
      id: number
      prod_tipo_descricao: string
    }
    unidade_medida: {
      umd_descricao: string
      umd_id: number
      umd_sigla?: string
    }
    pro_venda: number
    pro_quantidade: number
    pro_nome: string
    pro_id: number
    pro_categoria_item: number
    pro_unidade: number
    // produto_caracteristica: Array<{
    //   unidade_medida: {
    //     umd_descricao: string
    //   }
    // }>
    produto_preco_unidade: Array<{
      unidade_medida: {
        umd_descricao: string
      }
    }>
  }
}

export type IProductionExpedition = {
  id_prod: number
  time_expected: number
  final_delivery: number
  orc_id: number
  user_cd: number
  user_change: number
  user_create_at: number
  user_update_at: number
}

export type IOrcamentoItensPedidoStatus = {
  orc_id: number
  jobs: string
  description: string
  oit_observacao: string
  arqTotal: number
  arquivos: string
  orc_data_aprovacao: string
  status: string
  producao_expedicao: Array<IProductionExpedition>
  meters_info: {
    description: string
  }
  orcamento_status: {
    ost_id: number
    ost_descricao: string
    ost_cor: null
    ost_ordem: null
    ost_status: number
    user_dtcadastro: number
    user_dtultalteracao: number
    user_usucadastro: number
    user_usuultalteracao: number
    ost_tipo_exibicao: number
    users: {
      user_nome: string
    }
  }
  logistica: {
    id_logis: number
    name_logis: string
  }
  orcamento_historico_status: Array<{
    ohs_id: number
    ohs_data: string
    user_usucadastro: number
    orc_id: number
    ost_id: number
    users: {
      user_id: number
      user_nome: string
    }
  }>
  orcamento_itens_historical: Array<{
    oit_hs_data: string
    oit_hs_id: number
    oit_itens_id: number
    oitHs_status_id: number
    orcamento_itens_status: {
      oit_descricao: string
    }
  }>
  orcamento_itens_status: {
    oit_descricao: string
    oit_status_id: number
    oit_tipo_exibicao: number
    user_dtcadastro: string
    user_dtultalteracao: string
    user_usucadastro: number
    user_usuultalteracao: number
    users: {
      user_nome: string
    }
  }
  users: {
    user_id: number
    user_nome: string
  }
  cliente: {
    cli_id: number
    cli_nome: string
    cli_email: string
    //    carteira_one1_cliente: ICarteiraOne
  }
}

export type IOrcamento_historico_status = {
  ohs_id: number
  ohs_data: string
  user_usucadastro: number
  orc_id: number
  ost_id: number
  orcamento_status: {
    ost_id: number
    ost_descricao: string
  }
  users: {
    user_id: number
    user_nome: string
  }
}

export type IReplace_layout = {
  id: number
  rpl_observacao: string
  created_at: Date
  user_create_at: number
  orc_id: number
  users: {
    user_id: number
    user_nome: string
  }
}

export type IProdExp = {
  id_prod: number
  time_expected: number
  final_delivery: number
  orc_id: number
  user_cd: number
  user_change: number
  user_create_at: number
  user_update_at: number
}

export type IOrcamentoProductionStage = {
  orc_id: number
  impr_log_id: number
  oit_id: number
  priority: string | number
  statusId: number
  categoria_item: string
  statusQueue: string
  orcamento_status: IOrcamento_status
  printer: string
  timeFinished: string
  file_location: string
  cliente: IClientProduction
  jobs: any
  description: string
  oit_observacao: string
  producao_expedicao: IProdExp[]
  arquivos: string
  orc_data_aprovacao: string
  meters_info: { meters_info: string }
  users: {
    user_id: number
    user_nome: string
  }
  status: string
  impressora_log: Array<impressora_log>
}

export type IClientProduction = {
  cli_id: number
  cli_nome: string
  cli_email: string
}

export type IOrcamento_status = {
  ost_id: number
  ost_descricao: string
  ost_cor: null
  ost_ordem: null
  ost_status: number
  user_dtcadastro: number
  user_dtultalteracao: number
  user_usucadastro: number
  user_usuultalteracao: number
  ost_tipo_exibicao: number
}

export type IOrcamentoReallocateProcess = {
  priority: number
  impressora_log: Array<impressora_log>
}

export type IOrcamentoStage = {
  oit_id: number
  arquivos: Array<IArquivos>
  files?: Array<IArquivos>
  orcamento_historico_status: Array<IOrcamento_historico_status>
  statusId?: number
  orcCheckParcial?: boolean
  impressora?: string
  impressora_id?: number
  orc_data_pagamento?: string
  orc_observacao: string
  priority: number
  arquivo?: string
  replacement_layout?: Array<IReplace_layout>
  file_location: string
  pagamento_status: {
    id_pg_status: number
    status: string
    styled_css: string
  }
  logistica: {
    id_logis: number
    name_logis: string
  }
  producao_expedicao: IProdExp[]
  orc_id: number
  cliente: {
    cli_id: number
    cli_nome: string
    cli_email: string
    carteira_one1_cliente: ICarteiraOne
  }
  users: {
    user_id: number
    user_nome: string
  }
  orc_data_validade: string
  orc_data_aprovacao: string
  orc_data_entrega: string
  description: string
  categoria_item: string
  itens_qnt: number
  impr_log_id: number
  meters_info: {
    qnt: number
    measure: string
  }
  orcamento_status: { ost_descricao: string; ost_id: number }
  printer: string
  statusQueue: string
  timeFinished: string
  impressora_log?: Array<impressora_log>
  orcamento_itens: Array<orcItens>
}

export type IOrcamentoProduction = {
  //arquivos: string | Array<IArquivosOrcamentoItensTable>
  impr_log_id: number
  arquivos: string
  arqTotal: number
  orcamento_historico_status: Array<IOrcamento_historico_status>
  oit_qtde: number
  oit_id: number
  orc_id: number
  oit_visible_stage: MOOD
  oit_itens_type_material: number
  oit_observacao: string
  oit_valor_desconto: number | string
  oit_type_discount: number
  oit_itens_tamanho: number
  statusQueue: string
  statusId: number
  status: string
  printer: string
  printerId: number
  priority: number
  categoria_item: string
  description: string
  timeFinished: string
  file_location: string
  jobs: string
  orc_data_aprovacao: string
  orcamento_status: IOrcamentoStatus
  orcamento_itens_status: {
    oit_descricao: string
    oit_status_id: number
    oit_tipo_exibicao: number
    user_dtcadastro: string
    user_dtultalteracao: string
    user_usucadastro: number
    user_usuultalteracao: number
  }
  logistica: {
    id_logis: number
    name_logis: string
  }
  // impressora_log?: Array<impressora_log | []>
  cliente: {
    cli_id: number
    cli_nome: string
    cli_email: string
  }
  users: {
    user_id: number
    user_nome: string
  }
  orcamento: {
    producao_expedicao: Array<IProductionExpedition>

    orc_check_parcial: boolean
    orc_data_aprovacao: string
    orc_data_entrega: string
    orc_data_pagamento: string
    orc_data_validade: string
    orc_valor_total: string | number
    orc_value_parcial: string | number
  }
}

export type orcItens = {
  oit_qtde: number
  produto: {
    pro_nome: string
    pro_tipo: number
    produto_categoria_item: {
      id: number
      prod_tipo_descricao: string
    }
    produto_caracteristica: [
      {
        unidade_medida: {
          umd_descricao: string
        }
      }
    ]
  }
}
export type IOrcamentoStageUpdate = {
  statusId?: number
  orcCheckParcial: boolean
  impressora: string
  priority: number
  orc_id: number
  users: {
    user_id: number
    user_nome: string
  }
  description: string
  categoria_item: string
  itens_qnt: number
  impr_log_id: number
  meters_info: {
    qnt: number
    measure: string
  }
  printer: string
  statusQueue: string
  timeFinished: string
  impressora_log?: Array<impressora_log>
}

export type IOrcamentoVariedStage = {
  id_variado: number
  impr_variado_id: number
  descr_variado: string
  orcamento: Array<{
    oit_id: number
    arquivos: Array<IArquivos>
    orcamento_historico_status: Array<IOrcamento_historico_status>
    statusId?: number
    orcCheckParcial: boolean
    impressora: string
    impressora_id: number
    orc_data_pagamento: string
    orc_observacao: string
    replacement_layout: Array<IReplace_layout>
    priority: number
    file_location: string
    pagamento_status: {
      id_pg_status: number
      status: string
      styled_css: string
    }
    logistica: {
      id_logis: number
      name_logis: string
    }
    cliente: {
      cli_id: number
      cli_nome: string
      cli_email: string
      carteira_one1_cliente: ICarteiraOne
    }
    producao_expedicao: IProdExp[]
    orc_id: number
    users: {
      user_id: number
      user_nome: string
    }
    orc_data_validade: string
    orc_data_aprovacao: string
    orc_data_entrega: string
    description: string
    categoria_item: string
    itens_qnt: number
    impr_log_id: number
    meters_info: {
      qnt: number
      measure: string
    }
    orcamento_status: { ost_descricao: string; ost_id: number }
    impressora_log: Array<impressora_log>
    printer: string
    statusQueue: string
    timeFinished: string
    orcamento_itens: Array<orcItens>
  }>
}

export type IOrcamentoVariedStage2 = {
  id_variado: number
  impr_variado_id: number
  descr_variado: string
  priority: number
  oit_id: number
  orcamento: Array<IOrcamentoItensTablePedidoStatus>
}

export type impressora_log = {
  action_status: number
  id: number
  id_orc: number
  create_at: Date | string
  impr_conclusao: Date | string
  impr_modo_variado: Array<impressora_variado>
  impr_status: string
  priority: number | string
  impressora: IPrinter
}

export type impressora_variado = {
  action_status: number
  create_at: Date | string
  descr_variado: string
  id_variado: number
  impr_variado_id: number
  orc_id: number
  update_at: Date | string
  user_id: number
  user_id_change: number
}
export type IOrcamentoPedidoPaymentStatus = {
  orc_id: number
  ost_id?: number
  user_usucadastro: number
  orc_valor_total: number
  cart_value_parcial?: {
    diferenca: number
    cart_valor: number
  }
  forma_pagamento: {
    fpg_id: number
    fpg_descricao: string
    fpg_status: number
  }
  cliente: {
    cli_id: number
    cli_nome: string
    carteira_one1_cliente: ICarteiraOne
  }
}

export type IOrcamentoStatus = {
  ost_id: number
  ost_status: number
  ost_ordem: number
  ost_descricao: string
  ost_cor: number
  ost_tipo_exibicao: number
  user_dtcadastro: string
  user_dtultalteracao: string
  users: {
    user_nome: string
  }
}

export type ICarteiraOne = {
  cart_create_at: Date | string
  cart_status: boolean
  cart_update_at: Date | string
  cart_valor: number | string
  id_cart: number
  user_id_cadastro: number
  user_id_change: number
}

export type IOrcamentoFinanceUpdate = {
  data_payment: Date | string
  orcamento_status_id: number
  forma_pagamento_id: number
  orc_valor_total: number | string
  account_payment_id: number
  ref_pay_value_total: number
  orc_check_parcial: boolean
  orc_value_parcial: number
  user_id: number
  pagamento_status: number
}

export type IStageProduction = {
  orc_id: number
  ost_id: number
  oit_id: number
  impr_log_id?: number
  user_usucadastro: number
  //id_printer_log: number
  nextSectorProduction: {
    sectorProduction: number
    sectorOrcamento: number
  }
  stop_orc: boolean
  impr_status?: string
  action_status?: number
}
