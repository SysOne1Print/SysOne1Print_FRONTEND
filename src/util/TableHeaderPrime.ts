export const headerReplacement = [
  { field: 'id', header: 'Código', style: 'width: 23rem' },
  { field: 'observacao', header: 'Nome do Usuário', style: 'width: 23rem' },
  { field: 'orc_id', header: 'Orça. Id', style: 'width: 23rem' },
  { field: 'data', header: 'Data da Reposição', style: 'width: 23rem' }
]

export const headerReplacementLog = [
  { field: 'id', header: 'Código', style: 'width: 23rem' },
  { field: 'id_orc', header: 'Orça. Id', style: 'width: 23rem' },
  { field: 'data_log', header: 'Data Operação', style: 'width: 23rem' },

  { field: 'operation', header: 'Operação', style: 'width: 23rem' }
  // { field: 'orcamento_log', header: 'Log dos Arquivos', style: 'width: 23rem' }
]

export const headerHistoricalCart = [
  // { field: 'id_cart', header: 'Código', style: 'width: 23rem' },
  { field: 'client', header: 'Cliente', style: 'width: 23rem' },
  { field: 'cart_valor', header: 'Valor', style: 'width: 23rem' },
  // { field: 'fpg_descricao', header: 'F/. Pagamento', style: 'width: 23rem' },
  { field: 'pg_status', header: 'Pagamento', style: 'width: 23rem' },
  //{ field: 'client_url', header: 'Link do Comprovante', style: 'width: 23rem' },
  { field: 'created_at', header: 'Dta. Criação', style: 'width: 23rem' },
  { field: 'update_at', header: 'Dta. Atualização', style: 'width: 23rem' },
  { field: 'user_id_validate', header: 'Quem Alterou', style: 'width: 23rem' }
  // { field: 'description', header: 'Desc. do pagamento', style: 'width: 23rem' }
]
