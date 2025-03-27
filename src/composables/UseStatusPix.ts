/**
 * Composable para gerenciar status de pagamentos PIX
 * Fornece funções para verificar status, controlar temporizadores e atualizar informações de pagamento
 */
import { computed, ref } from 'vue'
import { useToast } from './Toast'
import { statusPaymentPix } from '@/api/actions/Payment'
import type { IError } from '@/model/Index'

const { notifyToast } = useToast()

/**
 * Interface para dados de pagamento PIX
 */
interface pix {
  id_pg_status: number
  txid_sicoob: string
}

/**
 * Hook para gerenciar status de pagamentos PIX
 * @returns {Object} Objeto contendo funções e estados para gerenciar pagamentos PIX
 */
export const useStatusPix = () => {
  /**
   * Referência para o intervalo de verificação de pagamento
   */
  const intervalPagamento = ref<number | NodeJS.Timeout>(0)
  
  /**
   * Temporizador para expiração do PIX
   */
  const timer = ref<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  
  /**
   * Status atual do pagamento PIX
   */
  const statusPix = ref<{
    id_pg_status: number
    txid_sicoob: string
    data_pix: Date | string | null
    pg_status?: string
  }>({
    id_pg_status: 0,
    txid_sicoob: '',
    data_pix: null,
    pg_status: ''
  })

  /**
   * Verifica o status de um pagamento PIX
   * @param {number} id_orc - ID do orçamento
   */
  const statusPixFn = async (id_orc: number) => {
    try {
      const { data } = await statusPaymentPix(id_orc)
      statusPix.value = data
      intervalPagamento.value = setInterval(updateCountdown, 1000)
    } catch (er: unknown) {
      const error = er as IError
      if (error.response === undefined) {
        notifyToast({ msg: 'Erro interno', typeToast: 'error' })
        return
      }
      if (error.response.status === 404) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })

        return
      } else {
        notifyToast({ msg: 'Erro interno ', typeToast: 'error' })
        return
      }
    }
  }

  /**
   * Atualiza o temporizador de contagem regressiva
   */
  const updateCountdown = () => {
    if (statusPix.value.data_pix === null) return

    const countDownDate = new Date(statusPix.value.data_pix as Date).getTime() + 3600000 // 1 hora em milissegundos
    const now = new Date().getTime()
    const distance = countDownDate - now

    // Cálculo de tempo
    timer.value.days = Math.floor(distance / (1000 * 60 * 60 * 24))
    timer.value.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    timer.value.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    timer.value.seconds = Math.floor((distance % (1000 * 60)) / 1000)

    // Se o tempo expirou
    if (distance < 0) {
      clearInterval(intervalPagamento.value as NodeJS.Timeout)
      timer.value = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }
  }

  /**
   * Limpa o intervalo de verificação de pagamento
   */
  const clearIntervalPagamento = () => {
    clearInterval(intervalPagamento.value as NodeJS.Timeout)
  }

  return {
    statusPixFn,
    statusPix,
    timer,
    clearIntervalPagamento
  }
}
