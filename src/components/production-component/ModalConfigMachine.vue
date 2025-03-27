<template>
  <div id="modalConfigurarMaquinaModoVariado" class="modal">
    <div class="modal-content oneScroll">
      <div class="modal-top">
        <span class="modal-close" @click.prevent="$emit('close-modal', $event)">×</span>
      </div>
      <div class="modal-container">
        <div class="w-100 d-flex flex-column border-bottom">
          <h4 class="mb-0">
            Configurar Máquina <span class="text-primary small">MODO VARIADO</span>
          </h4>
        </div>

        <div class="w-100 d-flex flex-column mt-3">
          <form action="">
            <div class="form-group">
              <label class="form-label" for="grupoVariadoMaquinaSet"
                ><i class="fas fa-lg fa-cog mr-1"></i>
                <span class="text-50">Em qual máquina esse pedido vai rodar?</span></label
              >
              <select
                v-model="printer"
                id="grupoVariadoMaquinaSet"
                class="form-control custom-select"
              >
                <option :value="-1">Escolha uma máquina disponível ..</option>
                <option
                  :value="val.id_impr"
                  v-for="(val, index) in allCategoriaPrinter"
                  :key="index"
                >
                  {{ val.nome_impr }} | {{ val.marca_impr }} - {{ val.modelo_impr }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="listGroupVariadosInfo"></label>
              <ul id="listGroupVariadosInfo" class="listaGrupoVariado">
                <li class="itemListaVariado" v-for="(value, index) in orderId" :key="index">
                  <span class="identifyPedido"
                    >{{ value.orc_id }} - {{ value.description }} /{{ orderId.length }}</span
                  >

                  -
                  <span class="positionFila"
                    >{{ index + 1 }}/{{ orderId.length }} {{ value.statusQueue }}</span
                  >
                </li>
              </ul>
            </div>

            <!-- Apenas em caso de PARADA (quando o botão PAUSE for acionado) -->
            <div class="form-group bg-accent border border-accent rounded p-2">
              <label class="form-label" for="grupoVariadoJustificativaDeEstado"
                ><i class="fas fa-stop-circle mr-2 text-white"></i
                ><span class="text-white">Motivo da interrupção?</span></label
              >
              <select id="grupoVariadoJustificativaDeEstado" class="form-control custom-select">
                <option>Justifique a interrupção ..</option>
                <option value="semPapel">Troca de papel</option>
                <option value="reposicao">Reposição de material</option>
                <option value="pausaQualitativa">Pausa qualitativa</option>
                <option value="energia">Falta de energia</option>
                <option value="manutencao">Manutenção</option>
                <option value="manutencaoEmergencial">Manutenção emergencial</option>
                <option value="pedidoCancelado">Pedido cancelado</option>
              </select>
            </div>

            <div class="form-group d-flex flex-row justify-content-between mb-0">
              <!-- Botão parar produção, apenas visível se o status for "RODANDO" , após escolher o motivo de parada ele recebe o texto "Confirmar parada"-->
              <button class="btn btn-accent mr-2" @click.prevent="stoppedProductionVariado">
                <i class="fas fa-hand-paper mr-2"></i> <span>PARAR PRODUÇÃO</span>
              </button>
              <!-- Botão "Iniciar produção" SE o STATUS for "PARADO" altera o texto para "RETOAMR PRODUÇÃO" -->
              <button class="btn btn-primary flex-grow" @click.prevent="createProductionVariado">
                <i class="fas fa-play mr-2"></i> <span>INICIAR PRODUÇÃO</span>
              </button>
            </div>
          </form>
        </div>
        <!-- Fim do conteúdo Detalhes -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createModoVariado } from '@/api/actions/Production'
import { useToast } from '@/composables/Toast'
import { useProduction } from '@/composables/UseProduction'
import type { IError, IOrcamentoItensTablePedidoStatus, IPrinter } from '@/model/Index'
import { ref, toRefs, type PropType } from 'vue'

const prop = defineProps({
  allCategoriaPrinter: { type: Array as PropType<IPrinter[]>, required: true },
  orderId: {
    type: Object as PropType<IOrcamentoItensTablePedidoStatus[]>,
    required: true,
    default: () => Array
  },
  totalModeVariado: {
    type: Number,
    required: true,
    default: Array
  }
})

//props
const { orderId, allCategoriaPrinter, totalModeVariado } = toRefs(prop)

//composables
const { allPrinter, getOrcamentoStatusStage } = useProduction()
const { notifyToast } = useToast()

const printer = ref(-1)

const stoppedProductionVariado = () => {}

function gerarNomeAleatorio(prefixo: string, numero: number) {
  let numeroFormatado = numero.toString().padStart(2, '0')

  return `${prefixo} ${numeroFormatado}`
}

const createProductionVariado = async () => {
  let prefixo = 'Modo Variado'
  try {
    let contador = 1

    if (printer.value === -1 || printer.value === 0) {
      alert('Selecione qual impressora será adicionado a fila!')
      return
    }
    const printerVariado = allCategoriaPrinter.value.find(
      (v) => v.id_impr === Number(printer.value)
    )
    console.log('printerVariado: ', printerVariado)
    allPrinter.value = allCategoriaPrinter.value

    //gerar nome aleatorio
    let nome = gerarNomeAleatorio(prefixo, totalModeVariado.value + 1)
    for await (const elem of orderId.value) {
      const orcamento = {
        oit_id: elem.oit_id,
        orc_id: elem.orc_id,
        oit_qtde: elem.oit_qtde,
        one1_outros: {
          one1_nome: elem.one1_outros.one1_nome
        }
      }
      await createModoVariado({
        user_id: elem.orcamento.users.user_id,
        oit_id: elem.oit_id,
        action_status: contador == 1 ? 1 : 0,
        printerOnly: printerVariado !== undefined ? printerVariado : undefined,
        orcamentoCalc: orcamento,
        descricao_variado: nome,
        priority: contador++
      })

      await getOrcamentoStatusStage({
        limit: 10,
        offset: 0,
        type: 3,
        type_orc: 3
      })
    }
    notifyToast({ msg: 'Modo variado criado com sucesso!', typeToast: 'success' })
  } catch (er: unknown) {
    const error = er as IError
    console.log(error)
    if (error.response !== undefined) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
    } else {
      notifyToast({ msg: 'Erro ao cadastrar modo variado', typeToast: 'error' })
    }
  }
}
</script>

<style scoped>
.itemListaVariado {
  display: flex;
  gap: 1rem;
}
</style>
