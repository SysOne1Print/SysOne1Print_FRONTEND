<template>
  <TableComponentProduction>
    <template #headerTable>
      <Thead
        @select-all-item="selectFnAll"
        @config-machine="configMachine"
        :extra="false"
        :data-table="dataTableProductionStageProduce"
      ></Thead>
    </template>

    <template #content>
      <TrComponent
        class="efeito-lista"
        :class="{ wtDetalhes1: value.oit_observacao !== '' }"
        v-for="(value, index) in orcamento"
        :key="index"
      >
        <TdComponent :class="{ 'pr-0': index === 0 }">
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              :id="value.oit_id?.toString()"
              :value="value.oit_id"
              v-model="selectItem"
              :disabled="value.statusId === -1"
              class="custom-control-input js-check-selected-row"
            />
            <label class="custom-control-label" :for="value.oit_id?.toString()">
              <span class="text-hide">Check</span>
            </label>
          </div>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100">{{ value.orc_id }} - {{ value.oit_id }}</span>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100 text-center">{{ value.priority }} </span>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="text-100">{{ value.cliente?.cli_nome }}</span>
          <small class="text-50">{{ value.cliente?.cli_email }}</small>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100"> {{ value.description }} - {{ value.categoria_item }} </span>
        </TdComponent>

        <TdComponent
          style="width: 50px; max-width: 150px"
          :classChange="'flex-row justify-content-between'"
        >
          <span
            class="text-truncate w-75"
            :class="{
              'text-primary':
                value.statusQueue?.toLocaleLowerCase() === 'rodando'.toLocaleLowerCase() ||
                value.statusId === -1,
              'text-70': value.statusQueue === ''
            }"
          >
            {{ value.printer }}
          </span>
          <button
            :id="`item-${index}`"
            class="btn btn-sm btn-secondary ml-1"
            @click.prevent="$emit('open-modal', value.orc_id, index, value.oit_id, `item-${index}`)"
          >
            <i class="fas fa-cog"></i>
          </button>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span
            class="mb-0"
            :class="{ 'text-accent ': value.statusId === -1, 'text-100': value.statusId !== -1 }"
          >
            {{ value.statusQueue }}
          </span>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100" v-if="value.timeFinished !== ''">
            {{ value.timeFinished }} (H:M:S)
          </span>
          <span class="mb-0 text-100" v-else></span>
        </TdComponent>

        <TdComponent>
          <div class="d-flex flex-row justify-content-between pr-0">
            <a
              class="btn-openDir btn btn-sm btn-secondary"
              target="_blank"
              :href="value.file_location"
              v-tooltip.bottom="{
                value: 'Abrir pasta onde o arquivo se encontra.',
                pt: {
                  arrow: { style: { borderBottomColor: '#fff' } },
                  text: 'bg-white text-100 fw-700 '
                }
              }"
            >
              <i class="fas fa-folder-open"></i>
            </a>

            <ButtonToolTip
              @click.prevent="$emit('open-modal-details', { modal: 'modalDetalhes1', orc: value })"
              :class="[
                'btnObsExiste',
                value.oit_observacao !== '' ? 'btn-primary' : 'btn-secondary'
              ]"
              class="btn btn-sm ml-1"
              :button-options="{
                tooltip: 'Conferir detalhes do pedido',
                icon: 'fas fa-info-circle'
              }"
            >
            </ButtonToolTip>

            <ButtonToolTip
              :class="'btn-accent'"
              class="btn btn-sm ml-1"
              @click.prevent="
                finalProcessProduction({
                  orc_id: value.orc_id,
                  oit_id: value.oit_id,
                  ost_id: value.orcamento_status.ost_id,
                  user_usucadastro: userData.user_id,
                  impr_log_id: value.impr_log_id,
                  nextSectorProduction: {
                    sectorOrcamento: 3,
                    sectorProduction: route.path === '/production/qualityControlView' ? 6 : 2
                  },
                  stop_orc: false
                })
              "
              :button-options="{ tooltip: 'Mover para setor anterior', icon: 'fas fa-arrow-left' }"
            >
            </ButtonToolTip>

            <ButtonToolTip
              v-if="value.statusQueue?.toLocaleLowerCase() === 'rodando'.toLowerCase()"
              @click.prevent="
                nextSector({
                  orc_id: value.orc_id,
                  oit_id: value.oit_id,
                  ost_id: value.orcamento_status.ost_id,
                  user_usucadastro: userData.user_id,
                  impr_log_id: value.impr_log_id,
                  nextSectorProduction: {
                    sectorOrcamento: 3,
                    sectorProduction: 3
                  },
                  stop_orc: false
                })
              "
              :class="{
                'btn-primary': value.statusQueue === '',
                'btn-success': ['rodando'].includes(value.statusQueue.toLocaleLowerCase())
              }"
              :button-options="{ tooltip: 'Finalize o trabalho', icon: 'fas fa-location-arrow' }"
            ></ButtonToolTip>

            <ButtonToolTip
              v-if="value?.statusQueue?.toLocaleLowerCase() === 'na fila'.toLowerCase()"
              @click.prevent="
                $emit(
                  'init-process',
                  {
                    printer: `${value.printer}`,
                    printerId: value.printerId,
                    id: value.impr_log_id,
                    oit_id: value.oit_id,
                    orc_id: value.orc_id
                  },
                  1
                )
              "
              :class="{
                'btn-secondary': value.statusQueue === '',
                'btn-primary': ['na fila'].includes(value.statusQueue.toLocaleLowerCase())
              }"
              :button-options="{
                tooltip: 'Iniciar Trabalho',
                icon: 'fas fa-play'
              }"
            ></ButtonToolTip>

            <ButtonToolTip
              v-if="value.statusId === -1"
              @click.prevent="
                $emit('work-return-printer', {
                  printerLogId: value.impr_log_id,
                  oit_id: value.oit_id
                })
              "
              :class="'btn-primary'"
              :button-options="{
                tooltip: 'Retornar trabalho',
                icon: 'fas fa-play'
              }"
            ></ButtonToolTip>
          </div>
        </TdComponent>
      </TrComponent>
    </template>

    <template v-for="(value, indexVariado) in orcamentoC" :key="indexVariado">
      <!-- Inserir linha "Variado" após o segundo item -->
      <TrComponent
        class="efeito-lista"
        :class="{ groupPedidos: value.descr_variado !== '' }"
        @click.prevent="toggleDropdown(indexVariado)"
      >
        <TdComponent :colspan="9" :check-div="false" class="text-center">
          <div class="d-flex w-100 justify-content-center">
            <span style="width: 55%">{{ value.descr_variado }}</span>
            <span>{{ totalHours[indexVariado] }}</span>
          </div>
        </TdComponent>
      </TrComponent>

      <TrComponent
        class="efeito-lista"
        :class="{ wtDetalhes1: orc.orc_observacao !== '' }"
        v-for="(orc, i) in value.orcamento"
        :key="i"
        :data-set="indexVariado"
      >
        <TdComponent :class="{ 'pr-0': i === 0 }">
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              :id="orc.oit_id?.toString()"
              :value="orc.oit_id"
              v-model="selectItem"
              :disabled="orc.statusId === -1"
              class="custom-control-input js-check-selected-row"
            />
            <label class="custom-control-label" :for="orc.oit_id?.toString()">
              <span class="text-hide">Check</span>
            </label>
          </div>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100">{{ orc.orc_id }}</span>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100 text-center">{{ orc.priority }}</span>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="text-100">{{ orc.cliente?.cli_nome }}</span>
          <small class="text-50">{{ orc.cliente?.cli_email }}</small>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100"> {{ orc.description }} {{ orc.categoria_item }} </span>
        </TdComponent>

        <TdComponent
          style="width: 50px; max-width: 150px"
          :classChange="'flex-row justify-content-between'"
        >
          <span
            class="text-truncate w-75"
            :class="{
              'text-primary':
                orc.statusQueue.toLocaleLowerCase() === 'rodando'.toLocaleLowerCase() ||
                orc.statusId === -1,
              'text-70': orc.statusQueue === ''
            }"
          >
            {{ orc.printer }}
          </span>
          <button
            :id="`itemVariado-${i}`"
            class="btn btn-sm btn-secondary ml-1"
            @click.prevent="$emit('open-modal', orc.orc_id, i, orc.oit_id, `itemVariado-${i}`)"
          >
            <i class="fas fa-cog"></i>
          </button>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span
            class="mb-0"
            :class="{ 'text-accent ': orc.statusId === -1, 'text-100': orc.statusId !== -1 }"
          >
            {{ orc.statusQueue }}
          </span>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100" v-if="orc.timeFinished !== ''">
            {{ orc.timeFinished }} (H:M:S)
          </span>
          <span class="mb-0 text-100" v-else></span>
        </TdComponent>

        <TdComponent>
          <div class="d-flex flex-row justify-content-between pr-0">
            <a
              class="btn-openDir btn btn-sm btn-secondary"
              target="_blank"
              :href="orc.file_location"
              v-tooltip.bottom="{
                value: 'Abrir pasta onde o arquivo se encontra.',
                pt: {
                  arrow: { style: { borderBottomColor: '#fff' } },
                  text: 'bg-white text-100 fw-700 '
                }
              }"
            >
              <i class="fas fa-folder-open"></i>
            </a>

            <ButtonToolTip
              @click.prevent="$emit('open-modal-details', { modal: 'modalDetalhes1', orc: orc })"
              :class="['btnObsExiste', orc.orc_observacao !== '' ? 'btn-primary' : 'btn-secondary']"
              class="btn btn-sm ml-1"
              :button-options="{
                tooltip: 'Conferir detalhes do pedido',
                icon: 'fas fa-info-circle'
              }"
            >
            </ButtonToolTip>

            <ButtonToolTip
              :class="'btn-accent'"
              class="btn btn-sm ml-1"
              @click.prevent="
                finalProcessProduction({
                  orc_id: orc.orc_id,
                  oit_id: orc.oit_id,
                  ost_id: orc.orcamento_status.ost_id,
                  user_usucadastro: userData.user_id,
                  impr_log_id: value.impr_variado_id,
                  nextSectorProduction: {
                    sectorOrcamento: 3,
                    sectorProduction: 2
                  },
                  stop_orc: true
                })
              "
              :button-options="{ tooltip: 'Mover para setor anterior', icon: 'fas fa-arrow-left' }"
            >
            </ButtonToolTip>

            <ButtonToolTip
              v-if="orc.statusQueue.toLocaleLowerCase() === 'rodando'.toLowerCase()"
              @click.prevent="
                nextSector({
                  impr_log_id: orc.impressora_log[0].id,
                  orc_id: orc.orc_id,
                  oit_id: orc.oit_id,
                  ost_id: orc.orcamento_status.ost_id,
                  user_usucadastro: userData.user_id,
                  nextSectorProduction: {
                    sectorOrcamento: 3,
                    sectorProduction: 3
                  },
                  stop_orc: false
                })
              "
              :class="{
                'btn-primary': orc.statusQueue === '',
                'btn-success': ['rodando'].includes(orc.statusQueue.toLocaleLowerCase())
              }"
              :button-options="{ tooltip: 'Finalize o trabalho', icon: 'fas fa-location-arrow' }"
            ></ButtonToolTip>

            <ButtonToolTip
              v-if="orc.statusQueue.toLocaleLowerCase() === 'na fila'.toLowerCase()"
              @click.prevent="
                $emit(
                  'init-process',
                  {
                    printer: `${orc.impressora}`,
                    printerId: orc.impressora_log[0]?.impressora.id_impr,
                    orc_id: orc.orc_id,
                    id_variado: value.id_variado,
                    oit_id: orc.oit_id,
                    id: orc.impressora_log[0]?.id
                  },
                  1
                )
              "
              :class="{
                'btn-secondary': orc.statusQueue === '',
                'btn-primary': ['na fila'].includes(orc.statusQueue.toLocaleLowerCase())
              }"
              :button-options="{
                tooltip: 'Iniciar Trabalho',
                icon: 'fas fa-play'
              }"
            ></ButtonToolTip>

            <ButtonToolTip
              v-if="orc.statusId === -1"
              @click.prevent="
                $emit('work-return-printer', {
                  printerLogId: orc.impressora_log[0]?.id,
                  oit_id: orc.oit_id,
                  id_variado: value.id_variado
                })
              "
              :class="'btn-primary'"
              :button-options="{
                tooltip: 'Retornar trabalho',
                icon: 'fas fa-play'
              }"
            ></ButtonToolTip>
          </div>
        </TdComponent>
        <!-- Seus TdComponents aqui -->
      </TrComponent>
    </template>
  </TableComponentProduction>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import TableComponentProduction from '@/components/table/Table-component-mod.vue'
import TrComponent from '@/components/table/Tr-component-teste.vue'
import Thead from '@/components/table/Thead.vue'
import TdComponent from '@/components/table/Td-component.vue'
import type { IOrcamentoProduction, IOrcamentoVariedStage, IStageProduction } from '@/model/Index'
import { computed, toRefs, type PropType } from 'vue'
import { dataTableProductionStageProduce } from '@/util/TableInfo'
import { useLoginStore } from '@/stores/LoginStore'
import ButtonToolTip from '../one-print/ButtonToolTip.vue'
import { storeToRefs } from 'pinia'
import { useSelectItem } from '@/composables/UseSelectItemTable'
import { useRoute } from 'vue-router'

const prop = defineProps({
  orcamento: {
    type: Object as PropType<IOrcamentoProduction[]>,
    required: true,
    default: () => Array
  },
  orcamentoVariado: {
    type: Object as PropType<IOrcamentoVariedStage[]>,
    required: true,
    default: Array
  }
})
//emits
const emit = defineEmits([
  'open-modal',
  'back-budget-byId',
  'next-sector-budget',
  'init-process',
  'work-return-printer',
  'open-modal-details',
  'config-machine'
])

const route = useRoute()
const { userData } = storeToRefs(useLoginStore())
const { selectAll, selectItem } = useSelectItem()

const { orcamento, orcamentoVariado } = toRefs(prop)

const orcamentoC = computed(() => {
  const variado = orcamentoVariado.value.map((v) => {
    return {
      ...v,
      orcamento: v.orcamento.sort(
        (a, b) =>
          (new Date(a.impressora_log ? a.impressora_log[0].impr_conclusao : '') as any) -
          (new Date(b.impressora_log ? b.impressora_log[0].impr_conclusao : '') as any)
      )
    }
  })
  return orcamentoVariado.value.length > 0 ? variado : []
})
const totalHours = computed(() => {
  // Mapeia todos os modos variados e calcula a diferença de horas para cada um
  const hoursPerVariado = orcamentoVariado.value.map((val) => {
    // Coleta todos os logs de impressão para o modo variado atual
    const allLogs = val.orcamento.flatMap((orc) => orc.impressora_log)

    if (allLogs.length === 0) {
      return 0
    }

    // Ordena todos os logs por data
    const sortedLogs = allLogs.sort(
      (a, b) => (new Date(a.impr_conclusao) as any) - (new Date(b.impr_conclusao) as any)
    )

    // Calcula a diferença em horas entre o primeiro e o último log
    const startTime = new Date(sortedLogs[0].create_at) as any
    const endTime = new Date(sortedLogs[sortedLogs.length - 1].impr_conclusao) as any

    const hoursDiff = (endTime - startTime) / (1000 * 60 * 60)

    return formatTimeDifference(hoursDiff)
  })

  return hoursPerVariado
})

function formatTimeDifference(hours: number) {
  // Converte as horas para minutos e segundos
  const totalMinutes = Math.floor(hours * 60)
  const totalSeconds = Math.floor(hours * 3600)

  const formattedHours = Math.floor(totalMinutes / 60)
  const formattedMinutes = totalMinutes % 60
  const formattedSeconds = totalSeconds % 60

  return `${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`
}

const finalProcessProduction = (value: IStageProduction) => {
  //const impr_log_id = false
  console.log(value)
  emit(
    'back-budget-byId',
    {
      orc_id: value.orc_id,
      ost_id: value.ost_id,
      oit_id: value.oit_id,
      user_usucadastro: userData.value.user_id,
      id_printer_log: value.impr_log_id,
      impr_status: 'Movido',
      nextSectorProduction: value.nextSectorProduction,
      action_status: -99,
      stop_orc: value?.impr_log_id && value?.impr_log_id > 0 ? true : false
    },
    2,
    3
  )
}

const selectFnAll = (event: any) => {
  selectAll(event, orcamento, 'Produção')
}

const nextSector = (value: IStageProduction) => {
  console.log('nextSectors: ', value)
  if (value !== undefined) {
    emit('next-sector-budget', {
      orc_id: value.orc_id,
      ost_id: value.ost_id,
      oit_id: value.oit_id,
      user_usucadastro: userData.value.user_id,
      id_printer_log: value.impr_log_id, //value.impr_log_id,
      sectorActual: 3,
      stop_orc: false
    })
  } else {
    emit('next-sector-budget', selectItem.value)
    selectItem.value = []
  }
}

const toggleDropdown = (index: number) => {
  var rows = document.getElementsByClassName('groupPedidos')
  rows[index].querySelector('td')?.classList.toggle('setaCima')

  const elementos = document.querySelectorAll(`[data-set="${index}"].efeito-lista`)
  elementos.forEach((v) => {
    v.classList.toggle('d-not')
  })
}

const configMachine = () => {
  emit('config-machine', selectItem.value)
}
</script>

<style lang="scss" scoped>
.efeito-lista {
  &.wtDetalhes1 {
    &.d-not {
      display: none;
    }

    &.groupPedidos {
      & td.setaCima {
        &:before {
          content: '▲';
        }

        &:after {
          content: '▲';
        }
      }

      & td {
        &:after {
          margin-top: -1.65rem;
        }
      }
    }
  }

  &.d-not {
    display: none;
  }

  &.groupPedidos {
    & td.setaCima {
      &:before {
        content: '▲';
      }

      &:after {
        content: '▲';
      }
    }

    & td {
      &:after {
        margin-top: -1.65rem;
      }
    }
  }
}
</style>
