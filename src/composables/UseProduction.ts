import type {
  ICategoria,
  ICreatePrinterLog,
  IError,
  IOptionHeader,
  IOrcamentoItensPedidoStatus,
  IOrcamentoItensTablePedidoStatus,
  IOrcamentoVariedStage,
  IOrcamentoVariedStage2,
  IPrinter,
  IStageProduction
} from '@/model/Index'
import { computed, ref, type ComputedRef } from 'vue'
import { useToast } from './Toast'
import { storeToRefs } from 'pinia'
import { useProductionStageStore } from '@/stores/ProductionStageStore'
//import { getAllCategoria } from '@/api/actions/Categoria'
import {
  createProcessForPrinterLog,
  getOrcamentoItensStatusStageProduction,
  updateQueue,
  updateStageProduction
} from '@/api/actions/Production'
import { useLoginStore } from '@/stores/LoginStore'

/**
 * Composable para gerenciar operações de produção
 * Fornece funções para controlar o fluxo de produção, etapas e filas de impressão
 */
import type {
  ICategoria,
  ICreatePrinterLog,
  IError,
  IOptionHeader,
  IOrcamentoItensPedidoStatus,
  IOrcamentoItensTablePedidoStatus,
  IOrcamentoVariedStage,
  IOrcamentoVariedStage2,
  IPrinter,
  IStageProduction
} from '@/model/Index'
import { computed, ref, type ComputedRef } from 'vue'
import { useToast } from './Toast'
import { storeToRefs } from 'pinia'
import { useProductionStageStore } from '@/stores/ProductionStageStore'
import {
  createProcessForPrinterLog,
  getOrcamentoItensStatusStageProduction,
  updateQueue,
  updateStageProduction
} from '@/api/actions/Production'
import { useLoginStore } from '@/stores/LoginStore'

/**
 * Hook para gerenciar operações de produção
 * @returns {Object} Objeto contendo funções e estados para gerenciar produção
 */
export const useProduction = () => {
  /**
   * Tipo de setor de produção (3 = padrão)
   */
  const typeSector = ref(3)
  const { notifyToast } = useToast()

  /**
   * Store de produção com dados de orçamentos e itens variados
   */
  const { orcamento, computedArrayVariado, orcamentoModoVariado } =
    storeToRefs(useProductionStageStore())

  /**
   * Store de usuário para acesso aos dados do usuário logado
   */
  const { userData } = useLoginStore()

  /**
   * Armazena IDs de ordens para processamento
   */
  const orderIds = ref<{ orcId: number; index: number; oit_id: number }>({
    index: 0,
    orcId: 0,
    oit_id: 0
  })
  
  /**
   * Armazena dados do orçamento anterior para comparação
   */
  const oldOrcamento = ref<{
    id: number
    id_orc: number
    modoVariado: boolean
  }>()
  
  /**
   * Lista de categorias de produtos
   */
  const categoria = ref<ICategoria[]>([])
  
  /**
   * Item de orçamento selecionado
   */
  const selectItemOrc = ref() // ref<IOrcamentoStage>
  
  /**
   * Lista de impressoras disponíveis
   */
  const allPrinter = ref<IPrinter[]>([])

  /**
   * Converte categorias para formato de opções de cabeçalho
   */
  const newCategoria = computed<IOptionHeader[]>(() =>
    categoria.value.map((v) => ({
      id: v.id,
      description: v.prod_tipo_descricao
    }))
  )

  /**
   * Computed que retorna o orçamento atual
   */
  const newOrc = computed(() => orcamento.value)
  
  /**
   * Computed que retorna os itens variados do orçamento
   */
  const newOrcVariado = computed(() => computedArrayVariado.value) as ComputedRef<
    IOrcamentoVariedStage[] | []
  >

  /**
   * Abre um modal para um item de orçamento
   * @param {IOrcamentoItensPedidoStatus} value - Item de orçamento
   * @param {string} classname - Classe CSS opcional para o modal
   */
  const openModal = (value: IOrcamentoItensPedidoStatus, classname: string = '') => {
    selectItemOrc.value = value
    window.scrollTo(0, 0)
    document.querySelector('body')?.setAttribute('style', 'overflow: hidden; height: auto')
    
    // Adiciona classe ao modal se fornecida
    if (classname !== '') {
      document.querySelector(`.${classname}`)?.classList.add('active')
    } else {
      document.querySelector('.modal-production')?.classList.add('active')
    }
  }

  /**
   * Atualiza o status de produção de um item
   * @param {IStageProduction} value - Dados da etapa de produção
   */
  const updateStage = async (value: IStageProduction) => {
    try {
      const { data, status } = await updateStageProduction(value)
      if (status === 200) {
        notifyToast({ msg: data.msg, typeToast: 'success' })
        return { data, status }
      }
    } catch (er: unknown) {
      const error = er as IError
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
    }
  }

  return {
    typeSector,
    categoria,
    newCategoria,
    newOrc,
    newOrcVariado,
    openModal,
    updateStage,
    orderIds,
    oldOrcamento,
    selectItemOrc,
    allPrinter
  }
}
