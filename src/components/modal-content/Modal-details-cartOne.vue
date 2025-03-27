<template>
  <div id="detailsCartOne" class="modal-content oneScroll">
    <div class="modal-top">
      <span class="modal-close" @click.prevent="$emit('closeModal', $event)">×</span>
    </div>
    <div class="modal-container">
      <div class="w-100 d-flex flex-column border-bottom">
        <h4 class="mb-0">{{ detailsCartOne?.cliente?.cli_nome }}</h4>
        <p>
          {{ detailsCartOne?.id_cart }} - RECARGA DA CARTEIRA ONE
          <span class="font-weight-bold">#{{ detailsCartOne?.id_cart }}</span>
        </p>
      </div>

      <div class="d-flex flex-column gap-2">
        <div v-if="typeModal === 'details' && detailsCartOne.status_cart !== 3">
          <DivComponent02 v-for="(value, index) in mDetailsCartOne" :key="index"
            :class="'w-100 d-flex flex-row justify-content-between mt-3 align-items-center pb-3 border-bottom'"
            :span="value.nome" :span-value="listCartOne[value.variable as keyof ListCartOne]?.toString()"
            header-array="detailsCartOne">
            <template v-slot:cartOne>
              <div class="w-25 d-flex flex-row justify-content-between align-items-center mb-0">
                <span class="h5 mb-0 font-weight-normal text-black-50">R$</span>
                <span class="h5 mb-0 font-weight-normal text-positive ml-2">{{
                  newFormatMoney(
                    parseFloat(
                      listCartOne[value.variable as keyof ListCartOne]?.toString() as string
                    )
                  )
                }}</span>
              </div>
            </template>
          </DivComponent02>
        </div>

        <div v-if="typeModal === 'details' && detailsCartOne.status_cart !== 3">
          <DivComponent02
            :class="'w-100 d-flex flex-row justify-content-between mt-3 align-items-center pb-1 border-bottom'"
            :span="''" :span-value="''" header-array="detailsCartOne">
            <template v-slot:cartOne>
              <div class="w-100 d-flex flex-column justify-content-start">
                <div class="form-group">
                  <label for="valorTransa" class="form-label">Valor dessa transação:</label>
                  <div class="input-group input-group-merge border border-primary rounded">
                    <input type="text" :value="newFormatMoney(Number(detailsCartOne.cart_valor_total))"
                      class="form-control text-positive" disabled />
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <span>R$</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </DivComponent02>
        </div>

        <div v-if="typeModal === 'details' && detailsCartOne.status_cart === 3">
          <DivComponent02
            :class="'w-100 d-flex flex-row justify-content-between mt-3 align-items-center pb-1 border-bottom'"
            :span="''" :span-value="''" header-array="detailsCartOne">
            <template v-slot:cartOne>
              <div class="w-100 d-flex flex-column justify-content-start">
                <div class="form-group">
                  <label for="valorTransa" class="form-label">Valor Atual da carteira:</label>
                  <div class="input-group input-group-merge border border-primary rounded">
                    <input type="text" :value="newFormatMoney(
                      Number(detailsCartOne.cliente.carteira_one1_cliente.cart_valor)
                    )
                      " class="form-control text-positive" disabled />
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <span>R$</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </DivComponent02>
        </div>

        <ExtraDetailsCartOneValidate v-if="typeModal === 'validate'"
          :forma_pagamento="detailsCartOne.forma_pagamento.fpg_descricao" @change_payment="change_payment_method"
          :details="detailsCartOne" :allPaymentType="allPaymentType">
        </ExtraDetailsCartOneValidate>

        <div class="w-100 pb-3 border-bottom">
          <IMGAnexo @click-img="clickImg" :detailsCartOne="detailsCartOne"></IMGAnexo>
        </div>

        <DivComponent02 :class="'w-100 d-flex flex-row justify-content-between align-items-center mt-3 pb-3'"
          :span="'Data da ocorrência:'" :span-value="''" :class-span="'h5 mb-0 font-weight-normal text-black-50'">
          <template v-slot:cartOne>
            <div class="w-25 d-flex flex-row justify-content-end align-items-center mb-0">
              <span class="h5 mb-0 font-weight-normal text-black-50">{{
                DateAndHour(new Date(detailsCartOne.created_at))
              }}</span>
            </div>
          </template>
        </DivComponent02>

        <div class="d-flex flex-column">
          <label class="h5 text-black-100">Logs de ativação da carteira one</label>
          <HistoricalCart :headers="headerHistoricalCart" :cart-one-log="cartOneLog">
          </HistoricalCart>
        </div>

        <ButtonToolTip v-if="typeModal === 'validate'" type="button" :disabled="btnClick"
          @click.prevent="validateCartOne" content="VALIDAR NOVO Saldo" :class="'w-100 btn btn-success'"
          :button-options="{
            tooltip: 'Validar novo saldo',
            icon: 'fas fa-eye'
          }">
          <i class="h4 text-white fas fa-check m-2"></i>
        </ButtonToolTip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, toRefs, type PropType } from 'vue'
import DivComponent02 from '@/components/one-print/DivComponent02.vue'
import { mDetailsCartOne } from '@/util/TableInfo'
import type { ITypePayment, IWalletOne } from '@/model/Index'
import { balanceCalcule, newFormatMoney } from '@/util/Util'
import IMGAnexo from '../one-print/IMGAnexo.vue'
import { DateAndHour } from '@/util/Data'
import ExtraDetailsCartOneValidate from './Extra-details-cartOne-validate.vue'
import ButtonToolTip from '../one-print/ButtonToolTip.vue'
import { useLoginStore } from '@/stores/LoginStore'
import HistoricalCart from "@/components/one-print/HistoricalCart.vue"
import { headerHistoricalCart } from "@/util/TableHeaderPrime";

interface ListCartOne {
  oldCartOne: number | null
  newCartOne: number
  nowCartOne: number | null
}

const { userData } = useLoginStore()
const prop = defineProps({
  detailsCartOne: { type: Object as PropType<IWalletOne>, required: true, default: Object },
  typeModal: { type: String, required: true, default: 'details' },
  allPaymentType: { type: Array as PropType<ITypePayment[]>, required: true }
})

const { detailsCartOne } = toRefs(prop)

const emit = defineEmits(['closeModal', 'validateUpdateCarteiraOne'])

const paymentOne = ref<{ fpg_descricao: string; fpg_id: number }>()
const btnClick = ref(false)

const cartOneLog = computed(() => {
  return detailsCartOne?.value && detailsCartOne?.value !== undefined && detailsCartOne?.value !== null ? [{
    // id_cart: detailsCartOne.value.id_cart,
    cart_valor: detailsCartOne.value?.cart_valor,
    // fpg_descricao: detailsCartOne.value.forma_pagamento.fpg_descricao,
    pg_status: detailsCartOne.value?.pagamento_status?.status,
    client: detailsCartOne.value?.cliente?.cli_nome,
    client_url: detailsCartOne.value?.cliente_comprovante?.cli_compro_url,
    created_at: DateAndHour(new Date(detailsCartOne.value?.created_at)),
    update_at: DateAndHour(new Date(detailsCartOne.value?.updated_at)),
    user_id_validate: detailsCartOne.value?.log?.users?.user_nome,
    // description: detailsCartOne.value.log.description_change
  }] : null
});

const listCartOne = computed<ListCartOne>(() => ({
  oldCartOne: detailsCartOne?.value?.cliente?.carteira_one1_cliente?.cart_valor
    ? parseFloat(
      detailsCartOne?.value?.cliente?.carteira_one1_cliente?.cart_valor.toString() ?? '0'
    )
    : 0,
  newCartOne: detailsCartOne?.value
    ? balanceCalcule(
      parseFloat(detailsCartOne?.value?.cart_valor_total?.toString() ?? '0'),
      detailsCartOne?.value?.cliente?.carteira_one1_cliente === null
        ? 0
        : parseFloat(
          detailsCartOne?.value?.cliente?.carteira_one1_cliente?.cart_valor?.toString() ?? '0'
        )
    )
    : 0,
  nowCartOne: detailsCartOne?.value?.cart_valor_total
    ? parseFloat(detailsCartOne.value.cart_valor_total.toString())
    : 0
}))

const clickImg = (url: string) => {
  window.open(url, '_blank')
}

const change_payment_method = (item: { fpg_descricao: string; fpg_id: number }) => {
  paymentOne.value = item
}

const validateCartOne = async () => {
  btnClick.value = true

  const updateCartOne = {
    id_cartOne: detailsCartOne?.value?.id_cart,
    user_id: userData.user_id,
    fpg_id:
      paymentOne.value && paymentOne.value.fpg_id > 0
        ? paymentOne.value.fpg_id
        : detailsCartOne?.value?.forma_pagamento.fpg_id
  }

  emit('validateUpdateCarteiraOne', updateCartOne)
}

onUnmounted(() => {
  btnClick.value = false
})
</script>

<style scoped>
@media (min-width: 1366px) {
  .modal-content {
    width: 70%;
  }
}
</style>
