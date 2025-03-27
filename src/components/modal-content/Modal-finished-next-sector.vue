<template>
  <ModalContent>
    <div class="modal-content oneScroll">
      <div class="modal-top">
        <span class="modal-close" @click.prevent="$emit('close-modal', $event)">×</span>
      </div>
      <div class="modal-container">
        <div class="w-100 d-flex flex-column border-bottom">
          <h4 class="mb-0">Concluir Trabalho</h4>
          <p>
            Ordem de Serviço Nº
            <span class="font-weight-bold">{{ orcamento.orc_id }}</span>
          </p>
        </div>

        <ContentModalConcluirExpedicao @save-logistica="saveLogistica" :orcamento="orcamento" :logistica="logistica"
          :operador="{ data: dateNow, imagem, observacao }" @sending-img="sendingImg"></ContentModalConcluirExpedicao>
        <!--contentModalConcluirExpedicao-->

        <div class="modalConcluirFooter w-100 d-flex flex-column mt-3">
          <div class="form-group mb-0">
            <div class="w-100 d-flex flex-row justifycontent-between align-items-center">
              <button class="btn btn-primary flex-grow mr-2">
                <i class="fas fa-print mr-2"></i> <span>Imprimir cupom fiscal</span>
              </button>
              <button class="btn btn-success flex-grow" @click.prevent="finishedOrcamento">
                <i class="fas fa-check mr-2"></i> <span>Concluir</span>
              </button>
            </div>
          </div>
        </div>
        <!-- Fim do conteúdo Detalhes -->
      </div>
    </div>
  </ModalContent>
</template>

<script setup lang="ts">
import ModalContent from '@/components/modal-content/Modal-content.vue'
import ContentModalConcluirExpedicao from './content/Content-modal-concluir-expedicao.vue'
import type { IError, IOrcamentoItensTablePedidoStatus, IOrcamentoStage } from '@/model/Index'
import { onMounted, ref, toRefs, type PropType } from 'vue'
import { getLogistic } from '@/api/actions/Logistica'
import { useToast } from '@/composables/Toast'
import { useLoginStore } from '../../stores/LoginStore'
import { createOperadorOrcamento } from '@/api/actions/Expedicao'

const prop = defineProps({
  orcamento: {
    type: Object as PropType<IOrcamentoItensTablePedidoStatus>,
    required: true,
    default: Object
  }
})

const emit = defineEmits(['save-logistica', 'close-modal', 'recharge-orcamento'])
const { orcamento } = toRefs(prop)
const { userData } = useLoginStore()
//composables
const { notifyToast } = useToast()

//logistica
const logistica = ref<Array<{ id_logis: number; name_logis: string }>>([])
const dateNow = ref(new Date())
const observacao = ref('')
const imagem = ref('')
const imgBase64 = ref()

const saveLogistica = (event: number, orc_id: number) => {
  emit('save-logistica', event, orc_id)
}

const sendingImg = (obj: { blob: Blob; operador: string }) => {
  observacao.value = `Foto Capturada por ${userData.user_nome}`
  imagem.value = obj.operador
  imgBase64.value = obj.blob
}

const finishedOrcamento = async () => {
  try {
    const formData = new FormData()
    if (orcamento?.value !== undefined) {
      formData.append('nome_img_operador', imagem.value)
      formData.append('observacao_operador', observacao.value)
      formData.append('user_operador_id', userData.user_id.toString())
      formData.append('cli_id', orcamento.value.orcamento.cliente.cli_id.toString())
      formData.append('operador', 'expedição')
    }

    if (!imagem.value && !imgBase64.value) {
      alert(`Primeiro tire uma print vendedor: ${userData.user_nome}`)
      return
    }

    formData.append('file', imgBase64.value, imagem.value)

    const { data } = await createOperadorOrcamento(formData)
    notifyToast({ msg: data.msg, typeToast: 'success' })
    emit('recharge-orcamento', {
      orc_id: orcamento?.value?.orc_id,
      ost_id: orcamento?.value?.orcamento?.orcamento_status.ost_id,
      user_usucadastro: userData.user_id,
      id_printer_log: 0,
      sectorActual: 7
    })
  } catch (er: unknown) {
    console.log('err: ', er)
    const error = er as IError
    if (error.response !== undefined) {
      if (error.response.status === 404) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }

      if (error.response.status === 409) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }
    } else {
      notifyToast({ msg: 'Erro ao buscar produto', typeToast: 'error' })
    }
  }
}

onMounted(async () => {
  try {
    const { data } = await getLogistic()
    logistica.value = data
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      if (error.response.status === 404) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }
      if (error.response.status === 409) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }
    } else {
      notifyToast({ msg: 'Erro ao buscar produto', typeToast: 'error' })
    }
  }
})
</script>

<style scoped>
.active {
  display: flex;
}

.modal-content {
  margin: 10vh auto;
  padding: 20px;
  width: 90%;
}
</style>
