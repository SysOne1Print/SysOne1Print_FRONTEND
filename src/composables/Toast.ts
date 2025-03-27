/**
 * Composable para exibição de notificações toast
 * Utiliza a biblioteca vue3-toastify para exibir mensagens temporárias
 */
import { toast, type ToastOptions } from 'vue3-toastify'

/**
 * Interface que define os parâmetros para exibição de um toast
 * @property {string} msg - Mensagem a ser exibida no toast
 * @property {string} typeToast - Tipo do toast (success, error, warning, info)
 */
interface toastParams {
  msg: string
  typeToast: string
}

/**
 * Hook para gerenciar notificações toast
 * @returns {Object} Objeto contendo a função notifyToast
 */
export const useToast = () => {
  /**
   * Exibe uma notificação toast
   * @param {toastParams} param0 - Objeto contendo mensagem e tipo do toast
   * @param {number} close - Tempo em ms para fechar o toast automaticamente (padrão: 2000ms)
   */
  const notifyToast = ({ msg, typeToast }: toastParams, close?: number | undefined) => {
    toast(msg, {
      theme: toast.THEME.COLORED,
      autoClose: close === undefined || close === 0 ? 2000 : close,
      type: typeToast,
      position: toast.POSITION.TOP_RIGHT
    } as ToastOptions)
  }

  return { notifyToast }
}
