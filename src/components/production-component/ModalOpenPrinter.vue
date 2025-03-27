<template>
  <ModalContent>
    <div class="modal-content oneScroll">
      <div class="modal-top">
        <span class="modal-close" @click.self="$emit('close-modal', $event)">×</span>
      </div>
      <div class="modal-container">
        <div class="w-100 d-flex flex-column border-bottom">
          <h4 class="mb-0">Configurar Máquina</h4>
          <p>
            Ordem de Serviço Nº
            <span class="font-weight-bold"
              >#{{ orderId.orcId }} - #{{ orderId.oit_id }} {{ Number(orc?.statusId) }}</span
            >
          </p>
        </div>

        <div class="w-100 d-flex flex-column mt-3">
          <form>
            <div class="form-group" v-if="[1].some((v) => v !== orc?.statusId) && priority === 0">
              <label class="form-label" for="alterarLogistica"
                ><i class="fas fa-lg fa-cog mr-1"></i>
                <span class="text-50">Em qual máquina esse pedido vai rodar?</span></label
              >
              <select
                :disabled="orc?.statusId === 0"
                v-model.lazy="printerId"
                id="alterarLogistica"
                class="form-control custom-select"
                required
              >
                <option :value="0" disabled selected>Escolha uma máquina disponível ..</option>
                <option
                  :value="val.id_impr"
                  v-for="(val, index) in allCategoriaPrinter"
                  :key="index"
                >
                  {{ val?.nome_impr }} | {{ val?.marca_impr }} - {{ val?.modelo_impr }}
                </option>
              </select>
            </div>

            <div
              class="form-group bg-accent border border-accent rounded p-2"
              v-if="orc?.statusId === 1"
            >
              <label class="form-label" for="alterarLogistica"
                ><i class="fas fa-stop-circle mr-2 text-white"></i
                ><span class="text-white">Motivo da interrupção?</span></label
              >
              <select
                v-model="justificationId"
                id="alterarLogistica"
                class="form-control custom-select"
              >
                <option :value="-1" disabled selected>Justifique a interrupção ..</option>
                <option :value="value.id" v-for="(value, index) in justification" :key="index">
                  {{ value.name }}
                </option>
              </select>
            </div>

            <div class="form-group d-flex flex-row justify-content-between mb-0">
              <button
                v-if="orc?.statusId === 1"
                type="button"
                :class="{ 'w-100': orc?.statusId === 1 }"
                class="btn btn-accent mr-2"
                @click.prevent="order_stop"
              >
                <i class="fas fa-hand-paper mr-2"></i> <span>PARAR PRODUÇÃO</span>
              </button>
              <button
                class="btn btn-primary flex-grow"
                @click.prevent="order_init"
                :disabled="orc?.statusId === 0"
                v-if="orc?.statusId === 0 || orc?.statusId === null"
              >
                <i class="fas fa-play mr-2"></i> <span>INICIAR PRODUÇÃO</span>
              </button>
            </div>

            <hr v-if="priority === 0" />
            <div class="d-flex align-items-center w-100 gap-1">
              <div class="form-group col-10 mb-0 px-0" v-if="orcPriority">
                <label class="form-label" for="priority">Prioridade</label>
                <input
                  type="text"
                  name="priority"
                  id="priority"
                  class="form-control"
                  placeholder="Defina uma prioridade"
                  v-model.lazy="priority"
                />
              </div>
              <div class="col-2 align-self-end px-0 text-center">
                <button class="btn btn-primary" type="submit" @click.prevent="priorityFn">
                  Mudar Prioridade
                </button>
              </div>
            </div>

            <div class="d-flex flex-column form-group mt-2" v-if="checkModoVariado">
              <label class="form-label" for="alterarLogistica">
                <span class="text-50">Deletar o pedido do modo varido?</span>
              </label>

              <button type="submit" class="btn btn-primary" @click.prevent="deleteVariado($event)">
                Deletar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </ModalContent>
</template>

<script setup lang="ts">
import { deleteModeVariado, updatePrinterRunning } from '@/api/actions/Production'
import ModalContent from '@/components/modal-content/Modal-content.vue'
import { useToast } from '@/composables/Toast'
import { useProduction } from '@/composables/UseProduction'
import type {
  IError,
  IOrcamentoProductionStage,
  IOrcamentoReallocateProcess,
  IOrcamentoStageUpdate,
  IOrcamentoVariedStage,
  IPrinter
} from '@/model/Index'
import { useLoginStore } from '@/stores/LoginStore'
import { storeToRefs } from 'pinia'
import { computed, onUnmounted, ref, toRefs, type PropType } from 'vue'
import { type impressora_log } from '../../model/IOrcamento'
import { metragemFn } from '@/util/Metragem'
const prop = defineProps({
  allCategoriaPrinter: { type: Array as PropType<IPrinter[]>, required: true },
  newOrc: {
    type: Object as PropType<IOrcamentoProductionStage[]>,
    required: true,
    default: () => Array
  },
  arrayModoVariado: {
    type: Array as PropType<IOrcamentoVariedStage[]>,
    required: true,
    default: () => Array
  },
  orderId: {
    type: Object as PropType<{ orcId: number; index: number; oit_id: number }>,
    required: true,
    default: Array
  }
})

const emit = defineEmits(['budget-order', 'close-modal', 'stopped-order', 'init-process'])

const { orderId, allCategoriaPrinter, newOrc, arrayModoVariado } = toRefs(prop)
const { notifyToast } = useToast()
const { userData } = storeToRefs(useLoginStore())
const { getOrcamentoStatusStage } = useProduction()

const orc = computed(() => {
  return newOrc.value.find((v) => v.oit_id === orderId.value.oit_id)
})

const orcPriority = computed(() => {
  return orc.value?.impressora_log !== undefined && orc.value?.impressora_log?.length > 0
    ? orc.value?.impressora_log[0]?.priority
    : 0
})

// const checkIfModeVariado = computed(() => {
//   return (
//     orc.value &&
//     orc.value?.impressora_log?.length > 0 &&
//     orc.value?.impressora_log[0].impr_modo_variado[0].id_variado > 0
//   ) ||
// })

const modeVariadoComputed = computed(() => {
  return arrayModoVariado.value.filter((v) => {
    const des = v.orcamento.find((x) => x.oit_id === orderId.value.oit_id)
    return v.descr_variado === des?.impressora_log[0].impr_modo_variado[0].descr_variado
  })
})

const checkModoVariado = computed(() => {
  const currentOrder = newOrc.value?.find((v) => v.oit_id === orderId.value.oit_id)
  if (!currentOrder) {
    return false
  }

  const { impressora_log, orc_id, oit_id } = currentOrder

  // Verifica se impressora_log existe, tem itens e se orc_id corresponde
  if (impressora_log && impressora_log.length > 0 && oit_id === orderId.value.oit_id) {
    // Verifica se o primeiro item de impressora_log tem impr_modo_variado e se o id_variado está presente
    const firstLog = impressora_log[0]
    const modoVariado = firstLog?.impr_modo_variado?.[0]?.id_variado

    return modoVariado !== undefined
  }

  return false
})

const printerId = ref<number>(0)
const priority = ref<number>(
  orc.value?.impressora_log && orc.value.impressora_log.length > 0
    ? Number(orc.value.impressora_log[0]?.priority)
    : 0
)
const justificationId = ref<number | string>(-1)
const justification = ref<{ id: number; name: string }[]>([
  { id: 1, name: 'Troca de papel' },
  { id: 2, name: 'Reposição de material' },
  { id: 3, name: 'Pausa qualitativa' },
  { id: 4, name: 'Falta de energia' },
  { id: 5, name: 'Falta de energia' },
  { id: 6, name: 'Manutenção' },
  { id: 7, name: 'Manutenção emergencial' },
  { id: 8, name: 'Pedido cancelado' }
])

const deleteVariado = (event: unknown) => {
  const currentOrder = newOrc.value?.find((v) => v.oit_id === orderId.value.oit_id)
  if (!currentOrder) {
    notifyToast({
      msg: 'Volte e seleciona o orçamento necessario para remover do modo variado',
      typeToast: 'warning'
    })
    return
  }

  const { impressora_log } = currentOrder as {
    impressora_log: Array<impressora_log>
    orc_id: number
  }
  const desc = impressora_log[0]?.impr_modo_variado[0].descr_variado as string
  const orcLengthVariado = newOrc.value?.filter(
    (v) =>
      (v.impressora_log && (v.impressora_log[0]?.impr_modo_variado[0].descr_variado as string)) ===
      desc
  )
  if (impressora_log && impressora_log.length > 0) {
    deleteModeVariado({
      id: impressora_log[0]?.id as number,
      id_variado: impressora_log[0]?.impr_modo_variado[0].id_variado as number
    })
      .then(async (result) => {
        notifyToast({ msg: result.data.msg, typeToast: 'success' })

        if (orcLengthVariado.length >= 2) {
          await updatePrinterRunning({
            user_id: userData.value.user_id,
            id: impressora_log[0]?.id as number,
            id_variado: impressora_log[0]?.impr_modo_variado[0].id_variado as number,
            descr_variado: impressora_log[0]?.impr_modo_variado[0].descr_variado as string
          })

          await getOrcamentoStatusStage({
            limit: 10,
            offset: 0,
            type: 3,
            type_orc: 3
          })
        } else {
          await getOrcamentoStatusStage({
            limit: 10,
            offset: 0,
            type: 3,
            type_orc: 3
          })
        }
      })
      .catch((error) => {
        console.log(error)

        if (error.response === undefined) {
          notifyToast({ msg: 'Erro interno na tentativa de busca', typeToast: 'error' })
          return
        }
        if (error.response.status === 404) {
          notifyToast({ msg: error.response.data.msg, typeToast: 'error' })

          return
        } else {
          notifyToast({ msg: 'Erro interno ', typeToast: 'error' })
          return
        }
      })
  } else {
    notifyToast({
      msg: 'Volte e seleciona o orçamento necessario para remover do modo variado',
      typeToast: 'warning'
    })
  }

  emit('close-modal', event)
}

function reallocateProcessNumbers(
  processList: Array<IOrcamentoReallocateProcess>,
  changedProcessIndex: number,
  newProcessNumber: number
) {
  // Verifica se o novo número de prioridade é 1 (rodando)
  if (newProcessNumber === 1) {
    console.error('Não é permitido alterar o número de prioridade para 1.')
    return processList // Retorna a lista original sem alterações
  }

  // Ordena a lista de processos pelo número do processo, exceto pelo processo que foi alterado
  // Remove o processo que foi alterado da lista original
  const unchangedProcesses = processList.filter((_, index) => index !== changedProcessIndex)

  // Encontra o processo que está rodando (prioridade 1) para usar sua data de conclusão
  const runningProcess = processList.find(
    (process) => process.priority === 1
  ) as IOrcamentoStageUpdate
  const runningProcessEndDate =
    runningProcess && runningProcess.impressora_log
      ? new Date(runningProcess.impressora_log[0]?.impr_conclusao)
      : new Date()

  // Cria uma cópia do processo alterado com o novo número de prioridade
  const changedProcess = {
    ...processList[changedProcessIndex],
    priority: newProcessNumber
  }

  // Insere o processo alterado na posição correta na lista inalterada
  unchangedProcesses.splice(newProcessNumber - 1, 0, changedProcess)

  let lastEndDate = runningProcessEndDate

  /**
   * O tempo de adição está errado pois está colocando um tempo muito grande precisa ser verificado
   * se existe algo errado!
   */
  return unchangedProcesses.map((process, index) => {
    const [impre] = process.impressora_log !== undefined ? process.impressora_log : []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const impr_conclusao = metragemFn(impre?.impressora, process as any, lastEndDate).dataAdd
      .backend
    lastEndDate = new Date(impr_conclusao)

    return {
      ...process,
      priority: index + 1,
      impressora_log: [
        {
          ...impre,
          impr_conclusao: impr_conclusao
        }
      ]
    }
  })
}

const priorityFn = async () => {
  // reallocateProcessNumbers(processList, 1, 4)
  const [modo] = modeVariadoComputed.value
  const index = modo.orcamento.findIndex((v) => v.orc_id === orderId.value.orcId)
  if (index !== -1) {
    //modo.orcamento.splice(index, 1)
    try {
      const newArrayReallocate = reallocateProcessNumbers(modo.orcamento, index, priority.value)

      for await (const element of newArrayReallocate) {
        console.log('element:', element)
        /** Comentei pois o codigo estáva marcando erro
         */
        //await updateModoVariadoReallocateProcess(element)
      }

      await getOrcamentoStatusStage({
        limit: 10,
        offset: 0,
        type: 1,
        type_orc: 3
      })

      notifyToast({ msg: 'Sucesso ao realocar os items', typeToast: 'success' })
    } catch (er: unknown) {
      const error = er as IError
      console.log(error)
      if (error.response === undefined) {
        notifyToast({ msg: 'Erro interno na tentativa de busca', typeToast: 'error' })
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
}

const order_init = () => {
  if (printerId.value <= 0) {
    notifyToast({ msg: 'Selecione a impressora para prosseguir', typeToast: 'warning' })
    return
  }

  const printer = allCategoriaPrinter.value.find((v) => v.id_impr === Number(printerId.value))

  emit(
    'budget-order',
    {
      printer: `${printer?.nome_impr} ${printerId.value}`,
      printerId: printerId.value,
      id: printerId.value,
      oit_id: orderId.value.oit_id,
      orc_id: orderId.value.orcId
    },
    0
  )
}

const order_stop = () => {
  if (justificationId.value === -1) {
    alert('Atenção, Seleciona corretamente o motivo da pausa!')
    return
  }
  const strStop = justification.value.find((v) => {
    return v.id === justificationId.value
  })

  //modo normal
  let printer = null
  let newOrcamento = null
  let modeVariado = null
  if (modeVariadoComputed.value.length > 0) {
    for (const val of modeVariadoComputed.value) {
      modeVariado = val.orcamento.find((v) => v.oit_id === orderId.value.oit_id)
    }

    printer = modeVariado?.impressora_log[0].impressora
    printerId.value = modeVariado?.impressora_log[0].impressora.id_impr as number
    newOrcamento = modeVariado
  } else {
    printer = allCategoriaPrinter.value.find((v) => v.id_impr === printerId.value)
    newOrcamento = newOrc.value.find((v) => v.oit_id === orderId.value.oit_id)
  }

  emit('stopped-order', {
    printer: `${printer?.nome_impr} ${printerId.value}`,
    printerId_oit_id: newOrcamento?.oit_id,
    printerStr: strStop?.name,
    impr_log_id: newOrcamento?.impr_log_id || newOrcamento?.impressora_log[0]?.id,
    action_status: -1
  })
}

onUnmounted(() => {
  printerId.value = 0
  justificationId.value = 0
  priority.value = 0
})
</script>

<style scoped>
.gap-1 {
  gap: 1rem;
}
</style>
