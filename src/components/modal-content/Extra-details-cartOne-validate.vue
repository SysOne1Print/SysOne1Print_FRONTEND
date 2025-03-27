<template>
  <div
    class="w-100 d-flex flex-row justify-content-between mt-3 align-items-center pb-3 border-bottom"
  >
    <span class="font-weight-normal">Valor da recarga:</span>
    <div class="w-25 d-flex flex-row justify-content-between align-items-center mb-0">
      <span class="h5 mb-0 font-weight-normal text-black-50">R$</span>
      <span class="h5 mb-0 font-weight-normal text-positive ml-2">{{
        newFormatMoney(parseFloat(details.cart_valor_total.toString()))
      }}</span>
    </div>
  </div>

  <div
    class="w-100 d-flex flex-row justify-content-between align-items-center mt-3 pb-3 border-bottom"
  >
    <span class="font-weight-normal">Tipo de pagamento:</span>
    <div class="w-25 d-flex flex-row justify-content-between align-items-center mb-0">
      <button @click.prevent="alterType = !alterType" class="btn btn-sm btn-light btn-rounded">
        ALTERAR?
      </button>
      <span class="h5 mb-0 font-weight-normal text-positive ml-2">{{
        pagamento === '' ? forma_pagamento : pagamento
      }}</span>
    </div>
  </div>

  <div class="w-100 pt-3 pb-3 border-bottom" :class="{ 'd-none': !alterType }">
    <div class="form-group">
      <label class="form-label" for="novaFormaDePagamento">Definir a forma de pagamento</label>
      <select v-model="payment" @change.prevent="change_payment" class="form-control">
        <option :value="-1">Escolha qual a forma de pagamento foi utilizada</option>
        <option :value="value.fpg_id" v-for="(value, index) in allPaymentType" :key="index">
          {{ value.fpg_descricao }}
        </option>

        <!-- As options percorrem com as formas de pagamentos existentes no banco...-->
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, type PropType } from 'vue'
import { newFormatMoney } from '@/util/Util'
import type { ITypePayment, IWalletOne } from '@/model/Index'

const prop = defineProps({
  forma_pagamento: { type: String, required: true },
  details: { type: Object as PropType<IWalletOne>, required: true, default: Object },
  allPaymentType: { type: Array as PropType<ITypePayment[]>, required: true }
})

const { allPaymentType } = toRefs(prop)

const emit = defineEmits(['change_payment'])

const alterType = ref(false)
const payment = ref(-1)
const pagamento = ref('')

const change_payment = () => {
  const pag = allPaymentType.value.find((v) => v.fpg_id === payment.value)
  pagamento.value = pag?.fpg_descricao as string
  emit('change_payment', pag)
}
</script>

<style scoped></style>
