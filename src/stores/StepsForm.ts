/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, onBeforeUpdate, onUnmounted, ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICreateProdStep1 } from '@/model/Index'

/**
 * Store para gerenciar o fluxo de etapas em formulários multi-etapas
 * Controla a navegação, estado e validação entre etapas de formulários
 */
export const useStepStore = defineStore('step', () => {
  /**
   * Lista de depósitos disponíveis
   */
  const allDeposito = ref<Array<{ dep_id: number; dep_nome: string }>>([])

  /**
   * Opções de metragem disponíveis
   */
  const metros = ref<Array<{ id: number; metro: string }>>([
    { id: 1, metro: '250mts' },
    { id: 2, metro: '300mts' },
    { id: 3, metro: '350mts' }
  ])

  /**
   * Opções de peso disponíveis
   */
  const peso = ref<Array<{ id: number; peso: string }>>([
    {
      id: 1,
      peso: '1kg'
    },
    { id: 2, peso: '5kg' }
  ])

  /**
   * Referências para os elementos DOM das etapas
   */
  const refsStep = ref<Array<any>>([])

  /**
   * Referências para as linhas de progresso entre etapas
   */
  const lineRefs = ref<Array<any>>([])

  /**
   * Referências para os inputs de cada etapa
   */
  const etapaInputsRefs = ref<Array<HTMLInputElement>>([])

  /**
   * Número total de etapas no formulário
   */
  const numberOfSteps = ref<number>(6)

  /**
   * Etapa atual do formulário
   */
  const currentStep = ref<number>(1)

  /**
   * Opções de tamanho para insumos
   */
  const optionsInsumosTamanho = ref<{ id: number; nome: string; one1_outro_id: number }[]>([])

  /**
   * Opções de itens categorizados (cor, tamanho, tecido, outros)
   */
  const optionItems = ref<{
    cor: Array<any>
    tamanho: Array<any>
    tecido: Array<any>
    outro: Array<any>
  }>({
    cor: [],
    tamanho: [],
    tecido: [],
    outro: []
  })

  /**
   * Lista de fornecedores disponíveis
   */
  const allFornecedor = ref<Array<{ id: number; pro_for_nome: string }>>([])

  /**
   * Dados do produto sendo criado, organizados por etapas
   */
  const prod = ref<ICreateProdStep1 | any>({
    //{ step1: {}; step2: {}; step3: {}; step4: {}; step5: {} }
    step1: {},
    step2: {},
    step3: {},
    step4: {},
    step5: {}
  })

  /**
   * Computed que retorna a lista de fornecedores
   */
  const allForneComput = computed(() => allFornecedor.value)

  /**
   * Avança para a próxima etapa e salva os dados da etapa atual
   * @param {object} value - Dados da etapa atual
   * @param {string} step - Nome da etapa atual (ex: 'step1')
   */
  const nextStep = (value: object, step: string) => {
    currentStep.value += 1
    prod.value[step] = { ...value }
    goToStep()
  }

  /**
   * Retorna para a etapa anterior
   */
  const goPrevious = () => {
    currentStep.value -= 1
    goToStep()
  }

  /**
   * Atualiza a interface para exibir a etapa atual
   * Gerencia classes CSS para indicar progresso e visibilidade dos elementos
   */
  const goToStep = () => {
    const inputs: any = document.getElementsByClassName(`etapa${currentStep.value}`)

    // Remove a classe 'active' das etapas futuras
    refsStep.value.slice(currentStep.value).forEach((v: any) => {
      v.classList.remove('active')
    })

    // Adiciona a classe 'active' às etapas já concluídas e atual
    refsStep.value.slice(0, currentStep.value).forEach((v, index) => {
      v.classList.add('active')
      lineRefs.value[index].classList.add('preenchido')
    })

    // Remove a classe 'preenchido' das linhas de progresso futuras
    lineRefs.value.slice(currentStep.value).forEach((v) => {
      v.classList.remove('preenchido')
    })

    // Oculta todos os inputs
    etapaInputsRefs.value.forEach((input) => {
      hide(input)
    })

    // Caso especial para a primeira etapa
    lineRefs.value.forEach((v, index) => {
      if (index === 0 && currentStep.value === 1) lineRefs.value[0].classList.remove('preenchido')
    })

    // Exibe apenas os inputs da etapa atual
    Array.from(inputs).forEach((input) => {
      show(input)
    })
  }

  /**
   * Exibe um elemento removendo a classe 'd-none'
   * @param {any} elem - Elemento DOM a ser exibido
   */
  function show(elem: any) {
    elem?.classList.remove('d-none')
  }

  /**
   * Oculta um elemento adicionando a classe 'd-none'
   * @param {any} elem - Elemento DOM a ser ocultado
   */
  function hide(elem: any) {
    elem?.classList.add('d-none')
  }

  /**
   * Computed que retorna a etapa atual
   */
  const currentStepComput = computed(() => currentStep.value)

  /**
   * Limpa todas as referências DOM e reseta o estado das etapas
   */
  function removeAllDom() {
    refsStep.value = []
    lineRefs.value = []
    etapaInputsRefs.value = []
    numberOfSteps.value = 6
    currentStep.value = 1
  }

  /**
   * Lifecycle hook que limpa as referências DOM quando o componente é desmontado
   */
  onUnmounted(() => {
    removeAllDom()
  })

  /**
   * Lifecycle hook que limpa as referências de inputs antes da atualização do componente
   */
  onBeforeUpdate(() => {
    console.log('testes')
    etapaInputsRefs.value = []
  })

  return {
    allDeposito,
    numberOfSteps,
    currentStep,
    refsStep,
    nextStep,
    lineRefs,
    etapaInputsRefs,
    currentStepComput,
    goPrevious,
    prod,
    allFornecedor,
    optionItems,
    allForneComput,
    optionsInsumosTamanho,
    metros,
    peso,
    goToStep,
    removeAllDom
  }
})
