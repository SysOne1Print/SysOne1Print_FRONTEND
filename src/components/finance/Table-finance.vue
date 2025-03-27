<template>
  <table class="table mb-0 thead-border-top-0 table-nowrap" v-if="financeList.length > 0">
    <Thead :data-table="tableTitle" :extra="false"></Thead>
    <tbody class="list" id="search">
      <tr v-for="(value, index) in financeList" :key="index">
        <td class="js-lists-values-codigo">
          {{ value.orc_id }}
        </td>

        <td class="js-lists-values-status">
          <span class="w-100 h-75 p-2 mb-1 text-100">
            <strong>{{
              value.orc_data_aprovacao === null
                ? 'Pagamento não aprovado ainda'
                : DateAndHour(new Date(value.orc_data_aprovacao))
            }}</strong>
          </span>
        </td>

        <td>
          <div
            class="d-flex flex-row justify-content-center align-items-center w-100 h-75 p-2 mb-1 border-2 rounded"
            :class="value.pagamento_status?.styled_css"
          >
            <span class="text-80">{{ value.pagamento_status?.status }}</span>
          </div>
        </td>

        <td class="small">
          <div class="d-flex flex-column">
            <p class="mb-0 text-100">
              <strong>{{ value.cliente.cli_nome }}</strong>
            </p>
            <small class="text-50">{{ value.cliente.cli_email }}</small>
          </div>
        </td>

        <td>
          {{ value.account_payment.nome_banco_pagamento }}
        </td>

        <td>
          <div class="d-flex gap-1">
            <div
              class="d-flex flex-row align-items-center w-100 h-75 p-2 border-2 rounded text-80"
              :class="[
                typePagamento(value.forma_pagamento.fpg_id),
                value.forma_pagamento.fpg_id === 7
                  ? 'justify-content-center'
                  : 'justify-content-between'
              ]"
            >
              <span>{{ value.forma_pagamento.fpg_descricao }}</span>
              <i :class="typeIcon(value.forma_pagamento.fpg_id)"></i>
            </div>

            <div
              v-if="value.orc_check_parcial"
              style="height: 100%"
              class="align-self-center"
              v-tooltip.top="{
                value: 'Pagamento Parcial.',
                pt: {
                  arrow: { style: { borderBottomColor: '#fff' } },
                  text: 'bg-white text-100 fw-700 '
                }
              }"
            >
              <img
                width="24"
                height="auto"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACdklEQVR4nO1Xy27TUBDN7/BYg6PYlJZHSkL6kFKBaIEuQh4FfgGpCEUpBTcPGrWJRGkbO4iasoElBQoSCiyb+FvYDRpLkW7stPY4DgExR5rVyGfuuTN3ZhwKMRgMBoPBYDBCkipDUHZuVT4tXqmkRjpB8kuqDI6UBUm+oN35JHLPN+5+HpmA2GYCNLNJsobZbIvcekc/Q+XQzCbEatODCxirTJADo+223/SUkWbqHSqHUp4YXMDcqxukoOXWOtwzcpDaS38Q+ZcPHtfQR+Ga3UoOJiBSHAP1e8lTsO2jXUjtZSGsKta30c34L5E/u3//enhNgbSRhZ12wxPnytdVwG9IApLbN+HqRgxuNW5DqVXxfHj8TgwQ3egVkNlfmhZjeBXx9NszmN2as8opXp9yF+Cn3vHmHZ1IXzyxE2EmNB+xAheAdd0tG9FyxsOEyI8ZEf1YGmXimxiKALxJ++FPKp+eLLxdGr6AJ18KcKk6CZfXo5A/LDj812oJ34MsVpsixyMLQKKu70p10uGXi+Pk8umaXBwnxwtcgFK66FuAUvoDAjCNSIpk+cMVhx9XDfvBsGT8llDeJV7gjxinruMR9xli/QRkjNzou1DlZ7XvtPTURn/8BW30uFbqVkaYOc1HLFcBuMLi2MZFCncRr6sELn1ey4iyShSsVSJpnUlcr48VYE8z7iJeRWAmuuVkH2bpdw9m0Ic3Tzl8mLrM2Q0XKdKbaL2wJmzKyLwX+R99XK6jj8I183LAddrq1eV//IcmXnf2alfr6Eci9475+uzIfiklH7agLx6I3PP6CH/qJR92fu3CqR7u5xFz6AIYDAaDwWAw/kP8Bqa7xx5Iuf8XAAAAAElFTkSuQmCC"
              />
            </div>
          </div>
        </td>

        <td>
          <strong>{{ real.format(value.orc_valor_total) }}</strong>
        </td>

        <td class="text-center">
          <div class="d-flex flex-row justify-content-between pr-0">
            <!-- modal do financeiro -->
            <ModalFinanceEdit
              @recharge-table="$emit('recharge-table')"
              :orcamento-status="orcamentoStatus"
              :financeOrc="value"
              @list-orc="listOrcFn"
              @fnClose="close"
              :bank-list="bankList"
              :payment-list="paymentList"
              :pay-status-list="payStatusList"
            >
            </ModalFinanceEdit>

            <button
              @click.prevent="openModal(value)"
              class="btnObsExiste btn btn-sm btn-primary ml-1"
              v-tooltip.bottom="{
                value: 'Detalhes.',
                pt: {
                  arrow: { style: { borderBottomColor: '#fff' } },
                  text: 'bg-white text-100 fw-700 '
                }
              }"
            >
              <i class="fas fa-asterisk"></i>
            </button>

            <button
              @click.prevent="openModalEdit(index)"
              class="btn btn-sm btn-secondary ml-1"
              v-tooltip.bottom="{
                value: 'Editar.',
                pt: {
                  arrow: { style: { borderBottomColor: '#fff' } },
                  text: 'bg-white text-100 fw-700 '
                }
              }"
            >
              <i class="fas fa-pen"></i>
            </button>

            <button
              @click.prevent="$emit('next-status-budget', value)"
              class="btn btn-sm btn-success ml-1"
              :disabled="disabledFn(value)"
              v-tooltip.bottom="{
                value: `${disabledFn(value) ? 'Pedido Aprovado' : 'Aprovar'}`,
                pt: {
                  arrow: { style: { borderBottomColor: '#fff' } },
                  text: 'bg-white text-100 fw-700 '
                }
              }"
            >
              <i class="fas fa-check"></i>
            </button>
          </div>
        </td>
      </tr>

      <ModalFinance :financeOrc="selectItem" @fnClose="close"></ModalFinance>
    </tbody>
  </table>
  <div class="d-flex justify-content-center m-3" v-else>
    <span style="font-size: 18px; font-weight: 500">Não foi encontrado produto</span>
  </div>
</template>

<script setup lang="ts">
import Thead from '@/components/table/Thead.vue'
import { ref, type PropType } from 'vue'
import { DateAndHour } from '@/util/Data'
import { dataTableFinance } from '@/util/TableInfo'
import type { IOrcamentoPedidoStatus, IOrcamentoStatus } from '@/model/Index'
import { typePagamento, typeIcon } from '@/util/Util'
import ModalFinance from '../modal-content/Modal-finance.vue'
import ModalFinanceEdit from '../modal-content/Modal-finance-edit.vue'

defineProps({
  financeList: { type: Object as PropType<IOrcamentoPedidoStatus[]>, required: true },
  bankList: {
    type: Object as PropType<{ id: number; nome_banco_pagamento: string }[]>,
    required: true
  },
  paymentList: {
    type: Array as PropType<{ fpg_descricao: string; fpg_id: number }[]>,
    required: true
  },
  orcamentoStatus: { type: Object as PropType<IOrcamentoStatus[]>, required: true },
  payStatusList: {
    type: Array as PropType<{ id_pg_status: number; status: string; styled_css: string }[]>,
    required: true
  }
})

const emit = defineEmits(['delete-produto', 'recharge-table', 'next-status-budget', 'list-orc'])

const selectItem = ref<IOrcamentoPedidoStatus>()
//renderiza topo da tabela
const tableTitle =
  ref<{ nome: string; px: string; extra?: boolean; mx?: string }[]>(dataTableFinance)

let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

const disabledFn = (value: IOrcamentoPedidoStatus) => {
  if (value.orc_value_parcial === null || value.orc_value_parcial === 0) {
    if (
      value.orc_check_parcial === false &&
      value.pagamento_status.id_pg_status !== 2 &&
      value.forma_pagamento.fpg_id === 11
    ) {
      return false
    }
    return true
  } else {
    if (
      value.orc_check_parcial === true &&
      parseFloat(value.orc_valor_total.toString()) > parseFloat(value.orc_value_parcial.toString())
    ) {
      return false
    }

    if (value.pagamento_status.id_pg_status === 2) {
      return true
    }

    if (
      parseFloat(value.orc_valor_total.toString()) ===
      parseFloat(value.orc_value_parcial.toString())
    ) {
      return true
    }

    return false
  }
}

const listOrcFn = (value: []) => {
  emit('list-orc', value)
}

const openModal = (value: IOrcamentoPedidoStatus) => {
  selectItem.value = value
  window.scrollTo(0, 0)
  document.querySelector('body')?.setAttribute('style', 'overflow: hidden; height: auto')
  document.querySelector('#modalDetalhes1')?.classList.add('activeModal')
}

const openModalEdit = (index: number) => {
  window.scrollTo(0, 0)
  document.querySelector('body')?.setAttribute('style', 'overflow: hidden; height: auto')
  const edit = document.querySelectorAll('#modalEditar3')

  edit[index]?.classList.add('activeModal')
}

const close = (evt: Event | null): void => {
  if (evt && evt.target instanceof HTMLElement) {
    const parent = evt.target.offsetParent as HTMLElement | null
    if (parent && parent.offsetParent instanceof HTMLElement) {
      parent.offsetParent.classList.remove('activeModal')
    }
  } else {
    document.querySelector('#modalEditar3')?.classList.remove('activeModal')
  }

  document.querySelector('body')?.removeAttribute('style')
}
</script>

<style scoped>
.activeModal {
  display: flex;
}

.gap-1 {
  gap: 8px;
}
</style>
