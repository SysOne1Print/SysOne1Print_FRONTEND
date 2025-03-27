export type IError = {
  response: {
    status: number
    data: {
      error: string
      msg: string
      meta?: {
        modelName: string
        code: number
      }
    }
  }
  code: string
}
