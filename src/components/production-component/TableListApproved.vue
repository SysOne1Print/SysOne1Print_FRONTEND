<template>
  <TableComponentProduction>
    <template #headerTable>
      <Thead @next-section-all-selection="nextSector" :extra="false" @select-all-item="selectFnAll"
        :data-table="dataTableProductionStage" :selectItem="selectItem"></Thead>
    </template>

    <template #content v-if="newOrc.length > 0">
      <!-- :class="{ wtDetalhes1: value.orc_observacao !== '' }"-->
      <TrComponent class="efeito-lista" v-for="(value, index) in newOrc" :key="index"
        :class="{ wtDetalhes1: value.oit_observacao && value.oit_observacao !== '' }">
        <TdComponent :class="{ 'pr-0': index === 0 }">
          <div class="custom-control custom-checkbox">
            <input type="checkbox" :id="value.orc_id.toString()" :value="value.orc_id" v-model="selectItem"
              class="custom-control-input js-check-selected-row" />
            <label class="custom-control-label" :for="value.orc_id.toString()">
              <span class="text-hide">Check</span>
            </label>
          </div>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100">{{ value.orc_id }}</span>
        </TdComponent>

        <TdComponent class="mb-0 text-100">
          <span>{{ value.cliente.cli_nome }}</span>
          <small class="text-50">{{ value.cliente.cli_email }}</small>
        </TdComponent>

        <TdComponent class="mb-0 text-100">
          {{ value.jobs }}
        </TdComponent>

        <TdComponent style="min-width: 182px; max-width: 250px" :class-change="'flex-row justify-content-between'">
          <!-- {{ value.arquivos }} -->

          <span v-if="value.arqTotal > 0" class="badge badge-notifications badge-accent mr-1">{{
            value.arqTotal
          }}</span>
          <span class="text-truncate w-100">{{ value.arquivos }} </span>
          <button @click.prevent="copyFileName(value.arqTotal > 0 ? value.arquivos : '')"
            class="btn btn-sm btn-secondary" title="Copiar nome do Arquivo.">
            <i class="fas fa-copy"></i>
          </button>
        </TdComponent>

        <TdComponent class="mb-0 text-100"> {{ value.orc_data_aprovacao }} </TdComponent>

        <TdComponent class="mb-0 text-100">
          {{ value.meters_info.description }}
        </TdComponent>

        <TdComponent class="mb-0 text-100">
          {{ value.users?.user_nome }}
        </TdComponent>

        <TdComponent class="text-center">
          <div class="">
            <button class="btnObsExiste btn btn-sm btn-primary ml-1" @click.prevent="$emit('open-modal', value)"
              data-original-title="Conferir os detalhes do trabalho." v-tooltip.bottom="{
                value: 'Conferir os detalhes do trabalho.',
                pt: {
                  arrow: { style: { borderBottomColor: '#fff' } },
                  text: 'bg-white text-100 fw-700 '
                }
              }">
              <i class="fas fa-info-circle"></i>
            </button>
            <!-- <ButtonToolTip class="btn btn-sm ml-1" @click.prevent="$emit('open-modal', value, 'mdContent')"
              :class="'btn-openDir btn-accent'" :button-options="{
                tooltip: 'Recusa, por detalhes',
                icon: 'fas fa-ban'
              }">
            </ButtonToolTip> -->
            <button class="btn btn-sm btn-success ml-1" @click.prevent="
              nextSector(
                {
                  orc_id: value.orc_id,
                  oit_id: value.oit_id,
                  ost_id: value.orcamento_status.ost_id,
                  user_usucadastro: userData.user_id,
                  nextSectorProduction: nextSectorProduction,
                  stop_orc: false
                },
                []
              )
              " v-tooltip.bottom="{
                value: 'Mover para o próximo setor.',
                pt: {
                  arrow: { style: { borderBottomColor: '#fff' } },
                  text: 'bg-white text-100 fw-700 '
                }
              }">
              <i class="fas fa-location-arrow"></i>
            </button>
          </div>
        </TdComponent>
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
import { dataTableProductionStage } from '@/util/TableInfo'
import type { IError, IOrcamentoItensTablePedidoStatus, IStageProduction } from '@/model/Index'
import { computed, toRefs, type PropType, defineExpose, ref } from 'vue'
import { DateAndHour } from '@/util/Data'
import { useToast } from '@/composables/Toast'
import { updateStageProduction } from '@/api/actions/Production'
import { useLoginStore } from '@/stores/LoginStore'
import { storeToRefs } from 'pinia'
import { useProduction } from '@/composables/UseProduction'
import { useSelectItem } from '@/composables/UseSelectItemTable'
import { copyFile } from '@/util/Util'
//import ButtonToolTip from '../one-print/ButtonToolTip.vue'

//props
const prop = defineProps({
  orcamento: {
    type: Array as PropType<IOrcamentoItensTablePedidoStatus[]>,
    required: true,
    default: Array
  }
})

//emits
defineEmits(['open-modal'])

//
const nextSectorProduction = ref({
  sectorProduction: 2,
  sectorOrcamento: 3
})

const limit = ref<number>(10)
const offset = ref<number>(0)
// const total = ref<number>(0)

//composables
const { getOrcamentoStatusStage } = useProduction()
//composables
const { selectAll, selectItem } = useSelectItem()

//prop store
const { orcamento } = toRefs(prop)
const { userData } = storeToRefs(useLoginStore())

//hooks
const { notifyToast } = useToast()

const newOrc = computed(() =>
(orcamento.value.length > 0 ? orcamento.value.map((v) => {
  return {
    orcamento_status: v.orcamento.orcamento_status,
    orc_id: v.orc_id,
    oit_id: v.oit_id,
    cliente: v.orcamento.cliente,
    jobs: `${v.produto.pro_nome} - ${v.one1_outros === null ? '' : v.one1_outros.one1_nome}`,
    description: v.produto.pro_nome,
    oit_observacao: v.oit_observacao,
    arqTotal: v.arquivos?.length, // Total de arquivos no orçamento
    producao_expedicao: v.orcamento.producao_expedicao?.length === 0 ? [] : v.orcamento.producao_expedicao,
    arquivos: v.arquivos?.reduce((acc, curr, index) => {
      return `${acc + curr.nome_arq}${v.arquivos.length - 1 === index ? '' : ' | '}`
    }, ''),
    orc_data_aprovacao: DateAndHour(new Date(v.orcamento.orc_data_aprovacao)),
    meters_info: {
      description: `${v.oit_qtde}x ${v.produto.unidade_medida.umd_descricao}`,
    },
    users: {
      user_id: v?.orcamento?.users.user_id,
      user_nome: v?.orcamento?.users.user_nome
    },
    orcamento_historico_status: v.orcamento_historico_status,
    logistica: v.orcamento.logistica,
    status: `${v.orcamento.orcamento_status?.ost_descricao}/${v.orcamento_itens_status?.oit_descricao}`,
    orcamento_itens_status: v.orcamento_itens_status
  };
}) : []))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectFnAll = (event: any) => {
  selectAll(event, newOrc, 'Pedidos Aprovados')
}

const copyFileName = (desc: string) => {
  copyFile(desc, notifyToast)
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const nextSector = async (stage: IStageProduction | string, headerList: Array<number>) => {
  try {
    let newSector = 0

    if (selectItem.value.length > 0 && typeof stage !== 'string') {
      let newFilterArray: Array<IOrcamentoItensTablePedidoStatus> = []
      selectItem.value.forEach((v) => {
        orcamento.value.forEach((c) => {
          if (v === c.orc_id) {
            newFilterArray.push(c)
          }
        })
      })

      if (newFilterArray.length === 1) {
        newSector =
          newFilterArray[0].produto.produto_categoria_item.id === 4 ? 7 : 2
      } else {
        newFilterArray.forEach((v: any) => {
          if (v.produto.produto_categoria_item.id !== 4) {
            newSector = 2
          }
        })
      }

      if (newFilterArray.length > 0) {
        for (const element of newFilterArray) {
          console.log('element: ', element)
          await updateStageProduction({
            orc_id: element.orc_id,
            oit_id: element.oit_id,
            ost_id: element.orcamento.orcamento_status.ost_id,
            user_usucadastro: userData.value.user_id,
            nextSectorProduction: nextSectorProduction.value,
            stop_orc: false
          }, newSector)
        }

        await getOrcamentoStatusStage({
          limit: limit.value,
          offset: offset.value,
          type: 1,
          type_orc: 3
        })

        notifyToast({ msg: 'Pedido foi para o proximo estagio da produção', typeToast: 'success' })
        selectItem.value = []
        newFilterArray = []
      } else {
        notifyToast({ msg: 'Não foi selecionado pedido', typeToast: 'warning' })
      }
    } else {
      if (typeof stage !== 'string') {
        let newSector = 0
        const orc = orcamento.value.filter((c) => {
          return stage.orc_id === c.orc_id
        })

        orc.forEach((v) => {
          if (v.produto.produto_categoria_item.id !== 4) {
            newSector = stage.nextSectorProduction.sectorProduction // proximo setor
          }
        })

        // if (orc.length === 1) {
        //   newSector = orc[0].produto.produto_categoria_item.id === 4 ? 7 : 2
        // } else {

        // }

        const { data } = await updateStageProduction(stage, newSector)
        await getOrcamentoStatusStage({
          limit: limit.value,
          offset: offset.value,
          type: 1,
          type_orc: 3
        })
        notifyToast({ msg: data.msg, typeToast: 'success' })
      }
    }
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

//expondo variavel para o component pai
defineExpose({
  selectItem
})
</script>

<style scoped></style>
