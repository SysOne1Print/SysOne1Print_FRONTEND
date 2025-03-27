<template>
  <table class="table mb-0 thead-border-top-0 table-nowrap" v-if="orcamentoPedidoStatus.length > 0">
    <thead>
      <tr>
        <th :style="`width: ${value.px};`" v-for="(value, index) in tableInfo" :key="index">
          <a href="" class="">{{ value.nome }}</a>
        </th>
      </tr>
    </thead>
    <tbody class="list" id="search">
      <tr v-for="(value, index) in orcamentoPedidoStatus" :key="index">
        <td class="js-lists-values-codigo">
          <strong>{{ value.orc_id }}</strong>
        </td>

        <td class="js-lists-values-status">
          <div class="d-flex gap-1">
            <span
              class="w-100 h-75 p-2 mb-1 border-2 rounded text-80"
              :class="typeOrcamento(value.orcamento_status.ost_id)"
            >
              {{ value.orcamento_status.ost_descricao.toLocaleUpperCase() }}
            </span>

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

        <td class="text-50 small">
          <div class="d-flex flex-column">
            <p class="mb-0 text-100">
              <strong>{{ value.cliente.cli_nome }}</strong>
            </p>
            <small class="text-50">{{ value.cliente.cli_email }}</small>
          </div>
        </td>

        <td class="text-50 small">
          <div class="d-flex flex-column">
            <p class="mb-0 text-100">
              <strong>{{ DatePtBR(new Date(value.orc_data_aprovacao)) }}</strong>
            </p>
            <small class="text-50">{{ DateTimePtBR(new Date(value.orc_data_aprovacao)) }}</small>
          </div>
        </td>

        <td class="small">
          <strong>{{ DatePtBR(new Date(value.orc_data_validade)) }}</strong>
        </td>

        <td>{{ real.format(parseFloat(value.orc_valor_total.toString())) }}</td>

        <td>
          {{ value.users.user_nome }}
        </td>

        <td class="text-right relativandoOtrem">
          <a rule="button" style="cursor: pointer" @click.prevent="openDropDown(index)"
            ><i class="material-icons">more_vert</i></a
          >
          <DropDown
            :id_orc="value.orc_id"
            :id_cli="value.cliente.cli_id"
            ref="dropdown"
            @closeDropdown="closeDropdown(index)"
          ></DropDown>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="d-flex justify-content-center m-3" v-else>
    <span style="font-size: 18px; font-weight: 500">Não foi encontrado pedido</span>
  </div>
</template>

<script setup lang="ts">
import type { IOrcamentoPedidoStatus } from '@/model/Index'
import { dataTable } from '@/util/TableInfo'
import { ref, type PropType } from 'vue'
import { DatePtBR, DateTimePtBR } from '@/util/Data'
import { typeOrcamento } from '@/util/Util'
import DropDown from '@/components/one-print/DropDown.vue'
//prop
defineProps({
  orcamentoPedidoStatus: { type: Object as PropType<IOrcamentoPedidoStatus[]>, required: true }
})

const tableInfo = ref<{ nome: string; px: string }[]>(dataTable)

let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dropdown = ref<HTMLElement[] | any>([])
function openDropDown(index: number) {
  dropdown.value[index].$el.classList.add('activeDrop')
}

function closeDropdown(index: number) {
  dropdown.value[index].$el.classList.remove('activeDrop')
}
</script>

<style scoped>
.gap-1 {
  gap: 5px;
}
</style>
