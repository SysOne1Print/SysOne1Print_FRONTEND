/* eslint-disable @typescript-eslint/no-explicit-any */
export type IPixReceived = {
  parametros: {
    inicio: Date | string
    fim: Date | string
    paginacao: {
      paginaAtual: number
      itensPorPagina: number
      quantidadeDePaginas: number
      quantidadeTotalDeItens: number
    }
  }
  pix: Array<{
    endToEndId: string
    valor: string
    horario: Date | string
    nomePagador: string
    pagador: {
      nome: string
      cpf: string
      cnpj:string
    }
    devolucoes: Array<any>
  }>
}
