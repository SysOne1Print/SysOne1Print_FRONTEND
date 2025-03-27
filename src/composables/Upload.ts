/**
 * Composable para gerenciar upload de arquivos
 * Fornece funções para manipular uploads, validar arquivos e preparar dados para envio
 */
import { useToast } from '@/composables/Toast'
import type { IError, IUploadImagem } from '@/model/Index'
import { ref } from 'vue'

const { notifyToast } = useToast()

/**
 * Hook para gerenciar uploads de arquivos
 * @returns {Object} Objeto contendo funções e estados para gerenciar uploads
 */
export const useUpload = () => {
  /**
   * Tamanho máximo de arquivo permitido (15GB)
   */
  const MAX_FILE = ref(15 * 1024 * 1024 * 1024)
  
  /**
   * Flag para indicar erro de tamanho de arquivo
   */
  const bol = ref(false)
  
  /**
   * Referência para o input de arquivo
   */
  const fileInput = ref<any>(null)
  
  /**
   * Lista de objetos de imagem
   */
  const objectImg = ref<IUploadImagem[]>([])
  
  /**
   * Lista de objetos de arquivo
   */
  const objectFile = ref<Array<any>>([])
  
  /**
   * FormData para envio de arquivos
   */
  const formData = new FormData()

  /**
   * Processa arquivos para conversão em base64 ou armazenamento
   * @param {FileList} event - Lista de arquivos selecionados
   */
  const fileImgBase64 = (event: FileList): void => {
    bol.value = false
    const file = event
    try {
      if (file.length > 0) {
        // Array.from foi usado ao invés de foreach, pois o element dom é um HTMLCOLLECTION e não um array.
        Array.from(file).forEach((v: any) => {
          // Processa imagens
          if (v.type.includes('image/')) {
            if (v.size > MAX_FILE.value) {
              msg()
              return
            }
            objectFile.value.push(v)
            create(v)
          }

          // Processa PDFs ou outros tipos de arquivo
          if (v.type == 'application/pdf' || v.type == '') {
            if (v.size > MAX_FILE.value) {
              msg()
              return
            }
            objectFile.value.push(v)
            objectImg.value.push({
              img: '',
              name: v.name,
              nameImg: v.name,
              size: v.size,
              type: v.type
            })
          }
        })
      }
    } catch (error: any) {
      console.log(error)
      notifyToast({
        msg: `Erro ao adicionar a imagem! ${error}`,
        typeToast: 'error'
      })
    }
  }

  /**
   * Exibe mensagem de erro para arquivos muito grandes
   */
  const msg = () => {
    bol.value = true
    notifyToast({
      msg: 'A imagem é muito grande ou você não selecionou uma!',
      typeToast: 'error'
    })
  }

  /**
   * Cria um objeto de imagem a partir do arquivo
   * @param {File} file - Arquivo de imagem
   */
  const create = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      objectImg.value.push({
        img: e.target?.result as string,
        name: file.name,
        nameImg: file.name,
        size: file.size,
        type: file.type
      })
    }
    reader.readAsDataURL(file)
  }

  /**
   * Adiciona um arquivo ao FormData para comprovante
   * @param {string} str - Nome do campo no FormData
   * @param {File} file - Arquivo a ser adicionado
   */
  const formDataComprovante = async (str: string, file: File) => {
    if (formData.get(str) === null) {
      formData.append(str, file)
    } else {
      formData.set(str, file)
    }
  }

  return {
    fileImgBase64,
    objectImg,
    objectFile,
    formDataComprovante,
    formData,
    fileInput,
    bol
  }
}
