/**
 * Composable para exibição de diálogos modais usando SweetAlert2
 */
import Swal, { type SweetAlertIcon, type SweetAlertResult } from 'sweetalert2'

/**
 * Interface que define as opções para um diálogo SweetAlert
 * @property {string} title - Título do diálogo
 * @property {string} text - Texto principal do diálogo
 * @property {SweetAlertIcon} icon - Ícone a ser exibido (success, error, warning, info, question)
 * @property {string|HTMLElement|JQuery} html - Conteúdo HTML opcional para o diálogo
 */
interface option {
  title: string
  text: string
  icon: SweetAlertIcon
  html?: string | HTMLElement | JQuery
}

/**
 * Interface que define o resultado do clique em um diálogo SweetAlert
 */
interface swalClick {
  isConfirmed: boolean
  isDenied: boolean
  isDismissed: boolean
  dismiss: Swal.DismissReason
  value: boolean
}

/**
 * Hook para gerenciar diálogos SweetAlert
 * @returns {Object} Objeto contendo funções para exibir diferentes tipos de diálogos
 */
export const useSwal = () => {
  /**
   * Exibe um diálogo de confirmação com botões Sim/Cancelar
   * @param {option} param0 - Opções do diálogo
   * @returns {Promise<SweetAlertResult<swalClick>>} Resultado da interação do usuário
   */
  const swalConfirmed = async ({
    title,
    text,
    icon
  }: option): Promise<SweetAlertResult<swalClick>> => {
    return await Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!'
    })
  }

  /**
   * Exibe um diálogo simples de alerta
   * @param {option} param0 - Opções do diálogo
   */
  const swal = ({ title, text, icon, html }: option) => {
    Swal.fire({
      title: title,
      html: html,
      text: text,
      icon: icon
    })
  }

  return { swalConfirmed, swal }
}
