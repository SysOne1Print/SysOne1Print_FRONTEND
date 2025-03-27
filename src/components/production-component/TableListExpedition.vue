<template>
  <TableComponentProduction>
    <template #headerTable>
      <Thead :extra="false" :data-table="dataTableProductionStageExpedition"></Thead>
    </template>

    <template #content>
      <TrComponent
        v-for="(value, index) in newOrc"
        :key="index"
        class="efeito-lista"
        :class="{ wtDetalhes1: value.oit_observacao !== '' }"
      >
        <TdComponent style="width: 50px">
          <span class="mb-0 text-100">{{ value.orc_id }}</span>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="text-100">{{ value.cliente.cli_nome }}</span>
          <small class="text-50">{{ value.cliente.cli_email }}</small>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100"> {{ value.description }} </span>
        </TdComponent>

        <TdComponent
          style="width: 50px; max-width: 100px"
          :classChange="'flex-row justify-content-between'"
        >
          <span class="mb-0 text-100">
            <i :class="value.orcCheckParcial ? 'fas fa-star-half' : 'fas fa-star'"></i>
            {{ value.orcCheckParcial ? 'Parcial' : 'Total' }}
          </span>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100">
            {{ value.logistica.name_logis }}
          </span>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100">
            {{ value.users.user_nome }}
          </span>
        </TdComponent>

        <TdComponent>
          <div class="d-flex flex-row justify-content-between pr-0">
            <ButtonToolTip
              class="btn-openDir btn btn-sm"
              @click.prevent="$emit('open-modal', value, '')"
              :class="'btn-openDir btn-primary'"
              :button-options="{
                tooltip: 'Conferir os detalhes do trabalho',
                icon: 'fas fa-info-circle'
              }"
            >
            </ButtonToolTip>

            <ButtonToolTip
              class="btn-openDir btn btn-sm"
              :class="'btn-openDir btn-success'"
              @click.prevent="
                newSector({
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
              :button-options="{
                tooltip: 'Concluir trabalho.',
                icon: 'fas fa-check'
              }"
            >
            </ButtonToolTip>
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
import ButtonToolTip from '../one-print/ButtonToolTip.vue'
import type {
  IOrcamentoItensTablePedidoStatus,
  IOrcamentoStage,
  IStageProduction
} from '@/model/Index'
import { computed, toRefs, type PropType } from 'vue'
import { dataTableProductionStageExpedition } from '@/util/TableInfo'
import { DateAndHour } from '@/util/Data'
import { useRoute } from 'vue-router'
import { useLoginStore } from '@/stores/LoginStore'

const prop = defineProps({
  orcamento: {
    type: Array as PropType<IOrcamentoItensTablePedidoStatus[]>,
    required: true,
    default: Array
  }
})

const route = useRoute()
const { userData } = useLoginStore()

const { orcamento } = toRefs(prop)

const emit = defineEmits([
  'expedition-back',
  'open-modal',
  'next-sector-budget',
  'open-modal-next-sector'
])

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
          arquivos: v.arquivos?.reduce((acc, curr, index) => {
            return `${acc + curr.nome_arq}${v.arquivos.length - 1 === index ? '' : ' | '}`
          }, ''),
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

const newSector = (value: IStageProduction) => {
  emit('open-modal-next-sector', value)
}
</script>

<style scoped></style>
