<template>
  <div class="contentModalConcluirExpedicao">
    <div class="left">
      <div class="row">
        <h5 class="descInfo">
          Cliente Nome<span class="info">{{ orcamento.cliente?.cli_nome }}</span>
        </h5>
      </div>
      <div class="row" v-for="(value, index) in listFieldC" :key="index">
        <h5 class="descInfo">
          {{ value.nome }}<span class="info">{{ listFieldOrcamento[value.variable] }}</span>
        </h5>
      </div>
      <div class="row editLogistica">
        <h5 class="descInfo">Alterar logística</h5>
        <div class="form-group">
          <select v-model="logis" name="alterarLogistica" id="alterarLogistica" class="form-control"
            @change="checkChangeFn">
            <option :value="-1">Seleciona um item abaixo</option>
            <option :value="value.id_logis" v-for="(value, index) in logistica" :key="index">
              {{ value.name_logis }}
            </option>
          </select>
        </div>
        <div class="form-group jogaPaDerecha" v-if="checkChange && logis > 0">
          <button class="btn btn-primary" @click.prevent="saveLogist">
            <i class="fas fa-save"></i> SALVAR
          </button>
        </div>
      </div>
      <div class="row">
        <h5 class="descInfo">
          Entrega Final<span class="info">{{ listFieldOrcamento['entregaFinal'] }}</span>
        </h5>
      </div>
      <div class="row">
        <h5 class="descInfo">
          Vendedor<span class="info">{{ listFieldOrcamento['vendedor'] }}</span>
        </h5>
      </div>
    </div>
    <!-- // -->
    <div class="right oneScroll">
      <div class="displayVideoGrid">
        <video src="" id="video" style="border-color: rgba(255, 255, 255, 0.5); border-width: 2px"></video>
        <div class="areaButtonCaptura" @click="sendingImage">PRINT</div>
        <div id="capturaPreview" class="capturaPreview" style="display: none">
          <div class="headerPreview"><button class="btnClosePreview btn btn-danger">x</button></div>
        </div>

        <div class="form-group">
          <label for="nomeCapturaArquivo" class="form-label mb-0">Nome da imagem</label>
          <input type="text" name="nomeCapturaArquivo" id="nomeCapturaArquivo" v-model="operador.imagem"
            placeholder="Informe um nome para o arquivo dessa captura" class="form-control" />
        </div>
        <div class="form-group">
          <label for="descCapturaArquivo" class="form-label">Observação</label>
          <input type="text" v-model="operador.observacao" name="descCapturaArquivo" id="descCapturaArquivo"
            placeholder="Descreva sua captura" class="form-control" />
        </div>

        <div class="infosDisplayCaptura">
          <p class="d-flex flex-row justify-content-between">
            <span class="nomeCliente">Nome do cliente:
              <span class="refInformacao">{{ orcamento.cliente?.cli_nome }}</span></span>
            <span class="empresaCliente">Nome da Empresa:
              <span class="refInformacao">{{ orcamento.cliente?.cli_nome }}</span></span>
          </p>
          <p class="d-flex flex-row justify-content-between">
            <span class="nomeFuncionarioExpedicao">Responsável de Captura:
              <span class="refInformacao">{{ userData.user_nome }}</span></span>
            <span class="dataHoraCaptura">{{ DateAndHour(operador.data) }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRefs, watch, type PropType } from 'vue'
import { listField } from '@/util/TableInfo'
import type { IOrcamentoStage } from '@/model/Index'
import { DateAndHour } from '@/util/Data'
import { useLoginStore } from '@/stores/LoginStore'

const prop = defineProps({
  orcamento: { type: Object as PropType<IOrcamentoStage>, required: true },
  operador: {
    type: Object as PropType<{ data: Date; imagem: string; observacao: string }>,
    required: true,
    default: Object
  },
  logistica: {
    type: Array as PropType<Array<{ id_logis: number; name_logis: string }>>,
    required: true,
    default: Array
  }
})

const emit = defineEmits(['save-logistica', 'sending-img'])

const { orcamento, logistica, operador } = toRefs(prop)
const { userData } = useLoginStore()

//variable
const logis = ref(-1)
const checkClick = ref(false)
const checkChange = ref(false)

const listFieldC = computed(() => {
  return listField.filter((v) => v.id !== 6 && v.id !== 7)
})

const listFieldOrcamento = computed<{ [x: string]: unknown }>(() => ({
  company: orcamento?.value?.cliente?.cli_nome,
  orc_id: orcamento?.value?.orc_id,
  tipo_service:
    orcamento?.value?.orcamento_itens && orcamento.value.orcamento_itens.length > 0
      ? orcamento.value.orcamento_itens?.reduce((acc = '', curr, index) => {
        return `${acc + curr.produto?.pro_nome}${orcamento.value.orcamento_itens.length - 1 === index ? '' : '|'}`
      }, '')
      : '',
  status: orcamento?.value?.orcamento_status?.ost_descricao,
  logistica:
    orcamento?.value?.logistica === null && orcamento?.value?.logistica === 0
      ? ''
      : orcamento?.value?.logistica?.name_logis,
  entregaFinal: orcamento?.value?.orc_data_entrega,
  vendedor: orcamento?.value?.users?.user_nome
}))

const checkChangeFn = () => (checkChange.value = true)
const saveLogist = () => {
  emit('save-logistica', logis.value, listFieldOrcamento.value['orc_id'])
  checkClick.value = true
}

const sendingImage = async () => {
  try {
    const img = `${window.origin}/assets/teste.svg`
    console.log(img)
    const data = await fetch(img)

    const blob = await data.blob()

    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = function () {
        resolve(reader.result) // Retornar o Base64
      }
      reader.onerror = function (error) {
        reject(error)
      }
      reader.readAsDataURL(blob) // Ler o blob como uma URL Base64
    })
    //const imgTeste = await base64
    if (operador?.value?.imagem === '') {
      alert('Adicione o nome da imagem por favor!')
      return
    }
    emit('sending-img', { blob: blob, operador: operador?.value?.imagem })
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  // Função para capturar a imagem
  function capturarImagem() {
    const videoElement: HTMLVideoElement = document.getElementById('video') as HTMLVideoElement
    const canvas = document.createElement('canvas')
    canvas.width = videoElement.videoWidth
    canvas.height = videoElement.videoHeight
    const context = canvas.getContext('2d')
    context?.drawImage(videoElement, 0, 0, canvas.width, canvas.height)
    videoElement.style.borderColor = 'rgb(29, 184, 78)'
    videoElement.style.borderWidth = '2px'

    // Aqui você pode converter o canvas para um arquivo de imagem
    // e salvar no diretório desejado usando as entradas de nome e descrição

    const capturaPreview: HTMLElement = document.getElementById('capturaPreview') as HTMLElement
    capturaPreview.style.display = 'flex'
    var dataHoraAtual = new Date().toLocaleString()
    document.documentElement.style.setProperty('--dataHora', '"' + dataHoraAtual + '"')
  }

  function fecharPreviewCaptura() {
    const capturaPreview: HTMLElement = document.getElementById('capturaPreview') as HTMLElement
    capturaPreview.style.display = 'none'

    setTimeout(function () {
      const video = document.getElementById('video')
      if (video) {
        video.style.borderColor = 'rgba(255,255,255,0.5)'
      }
    }, 1000)
  }

  // Adicionar evento de clique ao botão
  document.querySelector('.areaButtonCaptura')?.addEventListener('click', capturarImagem)
  document.querySelector('.btnClosePreview')?.addEventListener('click', fecharPreviewCaptura)
})

watch(
  logis,
  () => {
    if (logis.value !== -1) {
      const index = logistica.value.findIndex((v) => v.id_logis === logis.value)
      if (index !== -1) {
        listFieldOrcamento.value['logistica'] = logistica.value[index].name_logis

        checkClick.value = false
      }
    }
  },
  { deep: true }
)
</script>

<style scoped>
h5.descInfo {
  text-transform: capitalize;
}
</style>
