<template>
  <TableComponentProduction>
    <template #headerTable>
      <Thead :extra="false" :data-table="dataTableWalletOne"></Thead>
    </template>

    <template #content>
      <TrComponent v-for="(value, index) in cWallet" :key="index">
        <TdComponent style="width: 50px">
          <span class="mb-0 text-100">{{ value.id_cart }}</span>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100 text-center"
            >{{ DateAndHour(new Date(value.created_at)) }}
          </span>
        </TdComponent>

        <TdComponent style="width: 50px">
          <div
            :class="value.pagamento_status.styled_css"
            class="d-flex flex-row justify-content-center align-items-center w-100 h-75 p-2 mb-1 border-2 rounded"
          >
            {{ value.pagamento_status.status }}
          </div>
        </TdComponent>

        <TdComponent style="width: 50px">
          <span class="mb-0 text-100">
            <strong>{{ value.cliente?.cli_nome }}</strong></span
          >
          <small class="text-50">{{ value.cliente?.cli_email }}</small>
        </TdComponent>

        <TdComponent
          style="width: 50px; max-width: 150px"
          :classChange="'flex-row justify-content-between'"
        >
          <span class="text-100">Sicoob</span>
        </TdComponent>

        <TdComponent style="width: 80px">
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
          </div>
        </TdComponent>

        <TdComponent>
          <span class="mb-0 text-100"
            >Valor dessa recarga
            <strong class="text-positive">{{
              real.format(parseFloat(value.cart_valor_total.toString()))
            }}</strong>
          </span>
        </TdComponent>

        <TdComponent class="small" :check-div="true" style="min-width: 130px; width: 150px">
          <div class="d-flex flex-column" v-if="value.status_cart !== 3">
            <span class="mb-0 text-100"
              >Saldo anterior a recarga:
              <strong class="text-primary">{{
                value.cliente.carteira_one1_cliente === null
                  ? 'R$ 0,00'
                  : real.format(
                      parseFloat(value.cliente.carteira_one1_cliente?.cart_valor.toString())
                    )
              }}</strong></span
            >
            <small class="text-70"
              >Saldo final, será de:
              <strong
                :class="
                  verifyBalanceExistOrNot(
                    value.cliente.carteira_one1_cliente === null
                      ? 0
                      : parseFloat(value.cliente.carteira_one1_cliente?.cart_valor.toString()),
                    parseFloat(value.cart_valor_total.toString())
                  )
                "
              >
                {{
                  real.format(
                    balanceCalcule(
                      parseFloat(value.cart_valor_total.toString()),
                      value.cliente.carteira_one1_cliente === null
                        ? 0
                        : parseFloat(value.cliente.carteira_one1_cliente?.cart_valor.toString())
                    )
                  )
                }}</strong
              >
            </small>
          </div>

          <div class="d-flex flex-column" v-else>
            <span class="mb-0 text-100"> Valor já adicionado na carteira </span>
          </div>
        </TdComponent>

        <TdComponent style="min-width: 100px">
          <div class="d-flex flex-row justify-content-center pr-0">
            <ButtonToolTip
              type="button"
              @click.prevent="$emit('selectCartOne', value, '')"
              :class="'btnObsExiste btn-primary btn-sm'"
              :button-options="{
                tooltip: 'Detalhes.',
                icon: 'fas fa-eye'
              }"
            >
            </ButtonToolTip>

            <ButtonToolTip
              type="button"
              v-bind:disabled="value.status_cart === 3 ? true : false"
              @click.prevent="$emit('selectCartOne', value, 'validate')"
              :class="'btn-success btn-sm'"
              :button-options="{
                tooltip: value.status_cart === 3 ? 'Pagamento Aprovado' : 'Aprovar',
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
import { typePagamento, typeIcon } from '@/util/Util'
import { computed, toRefs, type PropType } from 'vue'
import type { IWalletOne } from '@/model/Index'
import { DateAndHour } from '@/util/Data'
import { balanceCalcule } from '@/util/Util'
import { dataTableWalletOne } from '@/util/TableInfo'
import ButtonToolTip from '../one-print/ButtonToolTip.vue'

const prop = defineProps({
  wallet: { type: Array as PropType<IWalletOne[]>, required: true }
})
const { wallet } = toRefs(prop)

defineEmits(['selectCartOne'])

let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

const cWallet = computed(() => {
  return wallet.value
})

const verifyBalanceExistOrNot = (value: string | number, newBalance: number) => {
  if (value === 0) {
    return 'text-positive'
  } else {
    const balance = balanceCalcule(newBalance, parseFloat(value.toString()))
    if (balance > Number(value) && value !== null) {
      return 'text-positve'
    }
  }
}
</script>

<style scoped></style>
