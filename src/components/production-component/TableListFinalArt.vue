<template>
  <TableComponentProduction>
    <template #headerTable>
      <Thead
        :extra="false"
        @next-section-all-selection="nextSector"
        @select-all-item="selectFnAll"
        :data-table="
          route.path != '/production/qualityControlView'
            ? dataTableProductionStageFinalArt01
            : dataTableProductionStageFinalArt
        "
        :selectItem="selectItem"
      ></Thead>
    </template>

    <template #content>
      <TrComponent
        class="efeito-lista"
        v-for="(value, index) in newOrc"
        :key="index"
        :class="{ wtDetalhes1: value.oit_observacao !== '' }"
      >
        <TdComponent
          :class="{ 'pr-0': index === 0 }"
          v-if="route.path !== '/production/qualityControlView'"
        >
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              :id="value.oit_id.toString()"
              :value="value.oit_id"
              v-model="selectItem"
              class="custom-control-input js-check-selected-row"
            />
            <label class="custom-control-label" :for="value.oit_id.toString()">
              <span class="text-hide">Check</span>
            </label>
          </div>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100">#{{ value.orc_id }} - #{{ value.oit_id }}</span>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="text-100">{{ value.cliente.cli_nome }}</span>
          <small class="text-50">{{ value.cliente.cli_email }}</small>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100"> {{ value.jobs }} </span>
        </TdComponent>

        <TdComponent
          style="width: 50px; max-width: 100px"
          :classChange="'flex-row justify-content-between'"
        >
          <span v-if="value.arqTotal > 0" class="badge badge-notifications badge-accent mr-1">{{
            value.arqTotal
          }}</span>
          <span class="text-truncate text-100 w-75"> {{ value.arquivos }} </span>
          <button
            @click.prevent="
              copyFileName(value.arqTotal > 0 && value.arquivos ? value.arquivos : '')
            "
            class="btn btn-sm btn-secondary"
            title="Copiar nome do Arquivo."
          >
            <i class="fas fa-copy"></i>
          </button>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100">
            {{ value.meters_info.description }}
          </span>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100">
            {{ value.users.user_nome }}
          </span>
        </TdComponent>

        <TdComponent>
          <div class="d-flex flex-row justify-content-between pr-0">
            <!-- início Botão Abrir Diretório do arquivo -->
            <a
              v-if="route.path !== '/production/qualityControlView'"
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
              v-else
              class="btn-openDir btn btn-sm"
              @click.prevent="$emit('open-modal', value, 'mdContent')"
              :class="'btn-openDir btn-secondary'"
              :button-options="{
                tooltip: 'Em caso de reposição',
                icon: 'fas fa-pencil-alt'
              }"
            >
            </ButtonToolTip>
            <!-- /btnOpenDir, início Botão DETALHES -->
            <button
              class="btnObsExiste btn btn-sm btn-primary ml-1"
              @click.prevent="$emit('open-modal', value)"
              v-tooltip.bottom="{
                value: 'Conferir os detalhes do trabalho.',
                pt: {
                  arrow: { style: { borderBottomColor: '#fff' } },
                  text: 'bg-white text-100 fw-700 '
                }
              }"
            >
              <i class="fas fa-info-circle"></i>
            </button>
            <!-- /btnDetalhes , início Botão Mudar para o setor anterior ou próximo setor-->
            <button
              class="btn btn-sm btn-accent ml-1"
              @click.prevent="
                finalArt({
                  orc_id: value.orc_id,
                  oit_id: value.oit_id,
                  ost_id: value.orcamento_status.ost_id,
                  user_usucadastro: userData.user_id,
                  nextSectorProduction: {
                    sectorOrcamento: 3,
                    sectorProduction: route.path === '/production/qualityControlView' ? 6 : 2
                  },
                  stop_orc: false
                })
              "
              v-tooltip.bottom="{
                value: 'Mover para setor anterior',
                pt: {
                  arrow: { style: { borderBottomColor: '#fff' } },
                  text: 'bg-white text-100 fw-700 '
                }
              }"
            >
              <i class="fas fa-arrow-left"></i>
            </button>
            <button
              class="btn btn-sm btn-success ml-1"
              @click.prevent="
                nextSector({
                  orc_id: value.orc_id,
                  oit_id: value.oit_id,
                  ost_id: value.orcamento_status.ost_id,
                  user_usucadastro: userData.user_id,
                  nextSectorProduction: {
                    sectorOrcamento: 3,
                    sectorProduction: route.path === '/production/qualityControlView' ? 6 : 2
                  },
                  stop_orc: false
                })
              "
              v-tooltip.bottom="{
                value: 'Mover para o proximo setor',
                pt: {
                  arrow: { style: { borderBottomColor: '#fff' } },
                  text: 'bg-white text-100 fw-700 '
                }
              }"
            >
              <i class="fas fa-location-arrow"></i>
            </button>
          </div>
        </TdComponent>
      </TrComponent>
    </template>
  </TableComponentProduction>
</template>

<script setup lang="ts">
import TableComponentProduction from '@/components/table/Table-component-mod.vue'
import TrComponent from '@/components/table/Tr-component-teste.vue'
import Thead from '@/components/table/Thead.vue'
import TdComponent from '@/components/table/Td-component.vue'
import type { IOrcamentoItensTablePedidoStatus, IStageProduction } from '@/model/Index'
import { computed, toRefs, type PropType } from 'vue'
import {
  dataTableProductionStageFinalArt,
  dataTableProductionStageFinalArt01
} from '@/util/TableInfo'
import { useLoginStore } from '@/stores/LoginStore'
import { useRoute } from 'vue-router'
import ButtonToolTip from '../one-print/ButtonToolTip.vue'
import { useSelectItem } from '@/composables/UseSelectItemTable'
import { copyFile } from '@/util/Util'
import { useToast } from '@/composables/Toast'
import { DateAndHour } from '@/util/Data'

const prop = defineProps({
  orcamento: {
    type: Array as PropType<IOrcamentoItensTablePedidoStatus[]>,
    required: true,
    default: Array
  }
})
//emits
const emit = defineEmits(['open-modal', 'back-budget-byId', 'next-sector-budget'])

const route = useRoute()
const { orcamento } = toRefs(prop)
const { userData } = useLoginStore()

//composables
const { selectAll, selectItem } = useSelectItem()
//hooks
const { notifyToast } = useToast()

const newOrc = computed(() =>
  orcamento.value.length > 0
    ? orcamento.value.map((v) => {
        return {
          orcamento_status: v.orcamento.orcamento_status,
          orc_id: v.orc_id,
          oit_id: v.oit_id,
          cliente: v.orcamento.cliente,
          jobs: `${v.produto.pro_nome} - ${v.one1_outros === null ? '' : v.one1_outros.one1_nome}`,
          description: v.produto.pro_nome,
          oit_observacao: v.oit_observacao,
          arqTotal: v.arquivos?.length, // Total de arquivos no orçamento
          producao_expedicao:
            v.orcamento.producao_expedicao?.length === 0 ? [] : v.orcamento.producao_expedicao,
          arquivos:
            v.arquivos.length > 0
              ? v.arquivos.find((val) => val.oit_id === v.oit_id)?.nome_arq
              : '',
          orc_data_aprovacao: DateAndHour(new Date(v.orcamento.orc_data_aprovacao)),
          meters_info: {
            description: `${v.oit_qtde}x ${v.produto.unidade_medida.umd_descricao}`
          },
          users: {
            user_id: v?.orcamento?.users.user_id,
            user_nome: v?.orcamento?.users.user_nome
          },
          orcamento_historico_status: v.orcamento_historico_status,
          logistica: v.orcamento.logistica,
          status: `${v.orcamento.orcamento_status?.ost_descricao}/${v.orcamento_itens_status?.oit_descricao}`,
          file_location:
            v.arquivos.length > 0
              ? v.arquivos[0].url.split(v.arquivos[0].nome_arq)[0].replace('public', 'upload')
              : '',
          orcamento_itens_status: v.orcamento_itens_status
        }
      })
    : []
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectFnAll = (event: any) => {
  selectAll(event, orcamento, 'Arte Final')
}

//IOrcamentoStage | IOrcamentoPedidoStatus
const finalArt = (value: IStageProduction) => {
  let backStage = 0
  let actualStage = 0

  if (route.name?.toString().toLocaleLowerCase() === 'Arte Final'.toLocaleLowerCase()) {
    backStage = 1
  } else {
    backStage = 3
  }

  if (route.name?.toString().toLocaleLowerCase() === 'Controle de qualidade'.toLocaleLowerCase()) {
    actualStage = 6
  } else {
    actualStage = 2
  }

  emit(
    'back-budget-byId',
    {
      orc_id: value.orc_id,
      ost_id: value.ost_id,
      oit_id: value.oit_id,
      user_usucadastro: userData.user_id,
      nextSectorProduction: {
        sectorProduction: value.nextSectorProduction.sectorProduction,
        sectorOrcamento: value.nextSectorProduction.sectorOrcamento
      },
      sectorActual: actualStage
    },
    backStage,
    actualStage
  )
}

const copyFileName = (desc: string) => {
  copyFile(desc, notifyToast)
}

const nextSector = (value: IStageProduction) => {
  const ActualStage = route.path === '/production/qualityControlView' ? 7 : 2
  console.log('value: ', value)
  if (value !== undefined) {
    emit('next-sector-budget', {
      orc_id: value.orc_id,
      ost_id: value.ost_id,
      oit_id: value.oit_id,
      user_usucadastro: userData.user_id,
      nextSectorProduction: {
        sectorProduction: value.nextSectorProduction.sectorProduction,
        sectorOrcamento: value.nextSectorProduction.sectorOrcamento
      },
      sectorActual: ActualStage
    })
  } else {
    emit('next-sector-budget', selectItem.value)
    selectItem.value = []
  }
}
</script>

<style scoped></style>
