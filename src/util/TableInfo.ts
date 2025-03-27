export const dataTable = [
  {
    nome: 'Código',
    px: '51px'
  },
  {
    nome: 'Status',
    px: '30px'
  },
  {
    nome: 'Cliente',
    px: ''
  },
  {
    nome: 'Emissão',
    px: '30px'
  },
  {
    nome: 'Validade',
    px: '30px'
  },
  {
    nome: 'Valor',
    px: '30px'
  },
  {
    nome: 'Vendedor',
    px: '160px'
  },
  {
    nome: '',
    px: '24px'
  }
]

export const dataTableProduct = [
  {
    nome: 'Código',
    px: '30px'
  },
  {
    nome: 'Nome',
    px: '30px'
  },
  {
    nome: 'Marca',
    px: '30px'
  },
  {
    nome: 'Categoria',
    px: '30px'
  },
  {
    nome: 'Validade',
    px: '30px'
  },
  {
    nome: 'Preço',
    px: '30px'
  },
  {
    nome: 'Vendedor',
    px: '30px'
  },
  {
    nome: 'Ação',
    px: '30px'
  }
]

export const dataTableFinance = [
  {
    nome: 'ID',
    px: '30px'
  },
  {
    nome: 'Data',
    px: '30px'
  },
  {
    nome: 'Status',
    px: '30px'
  },
  {
    nome: 'Cliente/Fornecedor',
    px: '30px'
  },
  {
    nome: 'Conta',
    px: '30px'
  },
  {
    nome: 'Tipo PGMT.',
    px: '30px'
  },
  {
    nome: 'Valor',
    px: '30px'
  },
  {
    nome: 'Ação',
    px: '10px'
  }
]

export const modal_finance = [
  { nome: 'Nome do Cliente', variable: 'cliente' },
  { nome: 'Aprovação', variable: 'orc_data_aprovacao' },
  { nome: 'Data de Pagamento', variable: 'orc_data_pagamento' },
  { nome: 'Status', variable: 'orcamento_status' },
  { nome: 'Tipo de Pagamento', variable: 'forma_pagamento' },
  { nome: 'Saldo na Carteira ONE1', variable: 'cart_valor_banknotes' },
  { nome: 'Valor do trabalho', variable: 'orc_valor_total' },
  { nome: 'Valor de entrada', variable: 'orc_parcial' },
  { nome: 'Conta Bancária', variable: 'account_payment' },
  { nome: 'Referências de pagamento', variable: 'orc_check_parcial' },
  { nome: 'Trabalho/Produto', variable: 'orcamento_itens' },
  { nome: 'Logística', variable: 'logistica' },
  { nome: 'Data de Aprovação e Horário', variable: 'orc_data_aprovacao1' },
  { nome: 'Tempo de trabalho', variable: 'tempo' },
  { nome: 'Entrega final', variable: 'orc_data_entrega' }
]

export const listField = [
  {
    id: 1,
    variable: 'company',
    nome: 'Empresa'
  },
  {
    id: 2,
    variable: 'orc_id',
    nome: 'Nº Ordem de Serviço'
  },
  {
    id: 3,
    variable: 'tipo_service',
    nome: 'Produto/Serviço'
  },
  {
    id: 4,
    variable: 'status',
    nome: 'Status'
  },
  {
    id: 5,
    variable: 'logistica',
    nome: 'Logística'
  },

  {
    id: 6,
    variable: 'entregaFinal',
    nome: 'Entrega Final'
  },
  {
    id: 7,
    variable: 'vendedor',
    nome: 'Vendedor'
  }
]

export const production_stage = [
  {
    nome: 'Cliente',
    variable: 'cliente'
  },
  {
    nome: 'Trabalho',
    variable: 'description'
  },
  {
    nome: 'Logística',
    variable: "logistica"
  },
  {
    nome: 'Aprovação',
    variable: 'orc_data_aprovacao'
  },
  {
    nome: 'Tempo previsto',
    variable: 'prod_expected_time'
  },
  {
    nome: 'Entrega final',
    variable: 'prod_final_delivery'
  },
  {
    nome: 'Status',
    variable: 'ost_descricao'
  }
]

export const production_stage_producation = [
  {
    nome: 'Cliente',
    variable: 'cliente'
  },
  {
    nome: 'Trabalho',
    variable: 'description'
  },
  {
    nome: 'Logística',
    variable: 'logistica'
  },
  {
    nome: 'Aprovação',
    variable: 'orc_data_aprovacao'
  },
  {
    nome: 'Tempo previsto',
    variable: 'prod_expected_time'
  },
  {
    nome: 'Histórico de Reposição(Qualidade)',
    variable: 'history'
  },
  {
    nome: 'Entrega final',
    variable: 'prod_final_delivery'
  },
  {
    nome: 'Status',
    variable: 'ost_descricao'
  }
]

export const modal_finance_stock = [
  { nome: 'Nome', variable: 'nome' },
  { nome: 'Marca', variable: 'marca' },
  { nome: 'Categoria', variable: 'categoria' },
  { nome: 'QNT MIN.', variable: 'min' },
  { nome: 'QNT MAX.', variable: 'max' },
  { nome: 'QNT (TOTAL)', variable: 'qnt' },
  { nome: 'EM ORÇAMENTO', variable: 'orc' },
  { nome: 'Data Validade', variable: 'pro_data_validade' },
  { nome: 'Observação', variable: 'pro_observacao' },
  { nome: 'Usuario que cadastrou', variable: 'user_nome' }
  // { nome: 'Usuario que alterou', variable: 'log' }
]

export const mDetailsCartOne = [
  { nome: 'Saldo, antes dessa recarga:', variable: 'oldCartOne' },
  { nome: 'Saldo, depois dessa recarga:', variable: 'newCartOne' }
  //{ nome: 'Valor dessa transação:', variable: 'nowCartOne' }

  // { nome: 'Usuario que alterou', variable: 'log' }
]

export const dataTableFinanceAccount = [
  {
    nome: 'Selecionar todas',
    px: '15px',
    mx: '10px',
    extra: true
  },
  {
    nome: 'Fornecedor',
    px: '30px',
    mx: '',
    extra: false
  },
  {
    nome: 'Emissão',
    px: '30px',
    mx: '',
    extra: false
  },
  {
    nome: 'Vencimento',
    mx: '',
    px: '30px',
    extra: false
  },
  {
    nome: 'Valor',
    mx: '',
    px: '30px',
    extra: false
  },
  {
    nome: 'Categoria',
    mx: '',
    px: '30px',
    extra: false
  },
  {
    nome: 'Ocorrência',
    mx: '',
    px: '30px',
    extra: false
  },
  {
    nome: 'Ação',
    mx: '',
    px: '30px',
    extra: false
  }
]

export const dataTableStock = [
  {
    nome: '',
    px: '20px',
    mx: '200px',
    extra: true
  },
  {
    nome: 'Código',
    px: '20px'
  },
  {
    nome: 'Nome',
    px: '20px',
    mx: '200px'
  },
  {
    nome: 'Marca',
    px: '20px',
    mx: '200px'
  },
  {
    nome: 'Categoria',
    px: '20px',
    mx: '200px'
  },
  {
    nome: 'Qnt Min.',
    px: '20px',
    mx: '200px'
  },
  {
    nome: 'Qnt Max.',
    px: '20px',
    mx: '200px'
  },
  {
    nome: 'Qnt (Total)',
    px: '20px',
    mx: '200px'
  },
  {
    nome: 'em Orçamento',
    px: '20px',
    mx: '200px'
  },
  {
    nome: 'Preço',
    px: '20px',
    mx: '200px'
  }
  // {
  //   nome: 'Ação',
  //   px: '20px',
  //   mx: '200px'
  // }
]

export const dataTableClient = [
  { nome: '', px: '30px', mx: '30px', extra: true },
  { nome: 'ID', px: '30px', mx: '30px', extra: false },
  { nome: 'CLIENTE', px: '30px', mx: '30px', extra: false },
  { nome: 'WHATSAPP', px: '30px', mx: '30px', extra: false },
  { nome: 'EMAIL', px: '30px', mx: '30px', extra: false },
  { nome: 'SALDO', px: '30px', mx: '30px', extra: false },
  { nome: 'AÇÃO', px: '30px', mx: '30px', extra: false }
]

export const dataTableClient1 = [
  { nome: 'ID', variable: '' },
  { nome: 'CLIENTE', variable: '' },
  { nome: 'WHATSAPP', variable: '' },
  { nome: 'SALDO', variable: '' },
  { nome: 'AÇÃO', variable: '' }
]

export const dataTableProductionStage = [
  { nome: ' ', px: '47px', mx: '47px', extra: true },
  { nome: 'O.S.', px: '', mx: '' },
  { nome: 'CLIENTE', px: '200px', mx: '200px' },
  { nome: 'TRABALHO', px: '200px', mx: '200px' },
  { nome: 'Nome do Arquivo', px: '182px', mx: '182px' },
  { nome: 'Data', px: '100px', mx: '100px' },
  { nome: 'METRAGEM', px: '60px', mx: '' },
  { nome: 'VENDEDOR', px: '120px', mx: '' },
  { nome: 'AÇÃO', px: '24px', mx: '', extra: true }
]

export const dataTableProductionStageFinalArt = [
  // { nome: ' ', px: '50px', mx: '50px', extra: true },
  { nome: 'O.S.', px: '50px', mx: '50px' },
  { nome: 'CLIENTE', px: '100px', mx: '100px' },
  { nome: 'TRABALHO', px: '100px', mx: '100px' },
  { nome: 'Nome do arquivo', px: '100px', mx: '' },
  { nome: 'METRAGEM', px: '50px', mx: '' },
  { nome: 'VENDEDOR', px: '50px', mx: '' },
  { nome: 'AÇÃO', px: '50px', mx: '', extra: false }
]

export const dataTableProductionStageFinalArt01 = [
  { nome: ' ', px: '50px', mx: '50px', extra: true },
  { nome: 'O.S.', px: '50px', mx: '50px' },
  { nome: 'CLIENTE', px: '100px', mx: '100px' },
  { nome: 'TRABALHO', px: '100px', mx: '100px' },
  { nome: 'Nome do arquivo', px: '100px', mx: '' },
  { nome: 'METRAGEM', px: '50px', mx: '' },
  { nome: 'VENDEDOR', px: '50px', mx: '' },
  { nome: 'AÇÃO', px: '50px', mx: '', extra: true }
]

export const dataTableProductionStageExpedition = [
  { nome: 'O.S.', px: '100px', mx: '', icon: '' },
  { nome: 'CLIENTE', px: '100px', mx: '', icon: '' },
  { nome: 'PRODUTO/SERVIÇO', px: '100px', mx: '', icon: '' },
  { nome: 'PGMT', px: '100px', mx: '', icon: 'far fa-star' },
  { nome: 'LOGÍSTICA', px: '100px', mx: '', icon: '' },
  { nome: 'VENDEDOR', px: '100px', mx: '', icon: '' },
  { nome: 'AÇÃO', px: '100px', mx: '', icon: '' }
]

export const dataTableProductionStageProduce = [
  { nome: ' ', px: '50px', mx: '50px', extra: true },
  { nome: 'O.S.', px: '100px', mx: '' },
  { nome: 'Processo', px: '50px', mx: '' },
  { nome: 'CLIENTE', px: '100px', mx: '' },
  { nome: 'TRABALHO', px: '100px', mx: '' },
  { nome: 'Máquina', px: '100px', mx: '' },
  { nome: 'Status', px: '100px', mx: '' },
  { nome: 'Conclusão', px: '100px', mx: '' },
  { nome: 'AÇÃO', px: '100px', mx: '', extra: true }
]

export const dataTableWalletOne = [
  { nome: 'ID', px: '', mx: '' },
  { nome: 'Data e Hora', px: '200px', mx: '200px' },
  { nome: 'Status', px: '200px', mx: '200px' },
  { nome: 'Cliente', px: '182px', mx: '182px' },
  { nome: 'Conta', px: '100px', mx: '100px' },
  { nome: 'Tipo PGMT.', px: '', mx: '' },
  { nome: 'Valor de Recarga', px: '120px', mx: '' },
  { nome: 'Saldo disponível', px: '150px', mx: '150px' },
  { nome: 'AÇÃO', px: '120px', mx: '', extra: false }
]
