/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Composable para gerenciar upload de arquivos e conversão para base64
 */
import { computed, ref } from 'vue'
import { useToast } from '@/composables/Toast'
import type { IUploadImagem } from '@/model/Index'

const { notifyToast } = useToast()

/**
 * Hook para gerenciar upload de imagens e conversão para base64
 * @returns {Object} Objeto contendo funções e estados para gerenciar uploads
 */
export const uploadImagem = () => {
  // Tamanho máximo de arquivo: 15GB
  const MAX_FILE = ref(15 * 1024 * 1024 * 1024)
  const bol = ref(false)
  const fileInput = ref<any>(null)
  const objectImg = ref<IUploadImagem[]>([])
  const objectFile = ref<Array<any>>([])

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
    // Implementação da função create
    // ...
  }

  /**
   * Manipula eventos de colar (paste) para capturar imagens
   * @param {Event} event - Evento de colar
   */
  const handlePaste = (event: any) => {
    // Implementação do handlePaste
    // ...
  }

  return { 
    fileImgBase64, 
    objectImg, 
    objectFile, 
    handlePaste,
    // Outros métodos e propriedades
  }
}
