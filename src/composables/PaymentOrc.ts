/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Composable para gerenciar pagamentos de orçamentos
 */
import { getAlreadyReceipts, updateOrcamentoComprovante } from '@/api/actions/Orcamento'
import { useToast } from '@/composables/Toast'
import { useRoute, useRouter } from 'vue-router'
import { uploadImagem } from './Upload-base64'
import type { IError, IOrcamento, IUploadImagem } from '@/model/Index'
import { ref } from 'vue'

const { notifyToast } = useToast()

/**
 * Hook para gerenciar pagamentos de orçamentos
 * @returns {Object} Objeto contendo funções e estados para gerenciar pagamentos
 */
export const usePaymentOrc = () => {
  const router = useRouter()
  const route = useRoute()
  const { fileImgBase64, objectImg, objectFile } = uploadImagem()
  const imgComprovante = ref<IUploadImagem[]>([])
  const receipts = ref<
    {
      odo_arquivo: string
      odo_id: number
      orc_id: number
      user_usucadastro: number
      user_usuultalteracao: number
    }[]
  >([])

  /**
   * Processa o upload de comprovante de pagamento
   * @param {HTMLInputElement | any} evt - Elemento de input ou evento contendo arquivos
   */
  const comprovante = (evt: HTMLInputElement | any) => {
    let comprovante = evt || evt.files || evt.target.files
    fileImgBase64(comprovante as FileList)
    imgComprovante.value = objectImg.value
    comprovante = null
  }

  /**
   * Envia comprovante de pagamento para o servidor
   * @param {number} user_id - ID do usuário que está enviando o comprovante
   * @param {IOrcamento} orcamentoCom - Objeto de orçamento
   */
  const sendingComprovante = async (user_id: number, orcamentoCom: IOrcamento) => {
    try {
      if (user_id <= 0) {
        notifyToast({ msg: 'Faça o login novamente no painel!', typeToast: 'info' })
        setTimeout(() => {
          router.push({ name: 'home' })
        }, 800)
        return
      }

      if (orcamentoCom.orc_id === undefined) {
        orcamentoCom.orc_id = Number(route.params.id)
      }
      
      const form = new FormData()
      form.append('user_usucadastro', user_id.toString())
      form.append('user_usuultalteracao', user_id.toString())
      form.append('orc_id', orcamentoCom.orc_id.toString())
      objectFile.value.forEach((v) => {
        form.append('comprovante', v)
      })

      const { data, status } = await updateOrcamentoComprovante(orcamentoCom.orc_id, form)
      if (status === 200) {
        notifyToast({ msg: data.msg, typeToast: 'success' })
        const { data: payment } = await getAlreadyReceipts(Number(route.params.id))
        receipts.value = payment

        setTimeout(() => {
          resetImgComprovante()
        }, 500)
      }
    } catch (er: unknown) {
      const error = er as IError
      // Tratamento de erros
      // ...
    }
  }

  /**
   * Reseta o estado dos comprovantes
   */
  const resetImgComprovante = () => {
    // Implementação do reset
    // ...
  }

  return {
    comprovante,
    sendingComprovante,
    resetImgComprovante,
    receipts,
    // Outras propriedades e métodos
  }
}
