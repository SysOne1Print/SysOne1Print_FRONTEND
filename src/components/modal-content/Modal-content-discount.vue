<template>
  <!-- MODAL DESCONTO -->
  <div id="modalDescontoCarrinho" :ref="fnDomDiscount" class="modal">
    <div class="modal-content">
      <div class="modal-top">
        <span class="modal-close" @click="$emit('fn-close-discount')">×</span>
      </div>
      <div class="modal-container">
        <h4>Desconto sobre: {{ totalCart }}</h4>
        <hr />

        <form ref="form">
          <div class="d-flex flex-column flex-lg-row col-lg-12">
            <div class="col-sm-12 col-lg-6">
              <div class="d-flex flex-column form-group">
                <label class="form-label" for="descValue">Desc. em VALOR</label>
                <InputNumber
                  :disabled="changeValueDiscount"
                  v-model:model-value="generalDiscount.discRealNum"
                  @change="changeValue"
                  @update:modelValue="changeValue"
                  inputId="descValue"
                  mode="currency"
                  currency="BRL"
                  locale="pt-BR"
                  :placeholder="'R$ 0,00'"
                />
              </div>
            </div>
            <div class="col-sm-12 col-lg-6">
              <div class="d-flex flex-column form-group">
                <label class="form-label" for="descPercentage">Desc. PERCENTUAL</label>
                <InputNumber
                  :disabled="changeValueRealNum"
                  v-model:model-value="generalDiscount.discPercen"
                  @update:modelValue="changeValue"
                  @change="changeValue"
                  inputId="percent"
                  suffix="%"
                  :placeholder="'0%'"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-12 d-flex justify-content-center">
            <button type="button" class="btn btn- btn-light">Cancelar</button>

            <button @click.prevent="calcDiscount" type="submit" class="btn btn- btn-primary ml-2">
              Aplicar Desconto
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { useToast } from '@/composables/Toast'
import { useProductStore } from '@/stores/ProductStore'
import { storeToRefs } from 'pinia'
import { computed, ref, toRefs, watchEffect, type PropType } from 'vue'

const prop = defineProps({
  modo: { type: String, required: true, default: '' },
  valueUpdate: {
    type: Object as PropType<{ discPercen: number | null; discRealNum: number | null }>,
    required: true
  }
})

const { valueUpdate, modo } = toRefs(prop)

const emit = defineEmits([
  'update:model-value',
  'modal-discount',
  'fn-close-discount',
  'discount_type',
  'modo-type'
])

const { stateValue, calcTotalWithDiscount, calTotalProductCart } = useProductStore()
const { discountGeralModal } = storeToRefs(useProductStore())
const { notifyToast } = useToast()

const totalCart = computed(() => real.format(parseFloat(stateValue.totalValue.toString())))

//variable
const form = ref()
const generalDiscount = ref<{ discPercen: number | null; discRealNum: number | null }>({
  discPercen: null,
  discRealNum: null
})

let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})
//

const changeValueRealNum = computed(() =>
  generalDiscount.value.discRealNum !== null ? true : false
)
const changeValueDiscount = computed(() =>
  generalDiscount.value.discPercen !== null ? true : false
)

//function
const fnDomDiscount = (el: any) => {
  emit('modal-discount', el)
}

// Função para emitir o valor atualizado
const changeValue = () => {
  emit('update:model-value', generalDiscount.value) // Emitindo o valor atualizado
}

const calcDiscount = (el: any) => {
  if (
    changeValueRealNum.value &&
    generalDiscount.value.discRealNum !== null &&
    parseFloat(generalDiscount.value.discRealNum.toString()) > 0
  ) {
    discountGeralModal.value.discount = parseFloat(generalDiscount.value.discRealNum.toString())
    discountGeralModal.value.type = 1
    calTotalProductCart(discountGeralModal.value.type)
    calcTotalWithDiscount(parseFloat(generalDiscount.value.discRealNum.toString()), 0, modo.value)
    emit('discount_type', 1)
  }

  if (
    changeValueDiscount.value &&
    generalDiscount.value.discPercen !== null &&
    parseFloat(generalDiscount.value.discPercen.toString()) > 0
  ) {
    discountGeralModal.value.discount = parseFloat(generalDiscount.value.discPercen.toString())
    discountGeralModal.value.type = 2

    calcTotalWithDiscount(0, parseFloat(generalDiscount.value.discPercen.toString()), modo.value)
    emit('discount_type', 2)
  }

  generalDiscount.value.discRealNum = null
  generalDiscount.value.discPercen = null
  notifyToast({ msg: 'Desconto aplicado com sucesso!', typeToast: 'info' })

  setTimeout(() => {
    emit('fn-close-discount', el)
    emit('modo-type')
  }, 500)
}

watchEffect(() => {
  generalDiscount.value.discPercen =
    valueUpdate.value.discPercen !== null
      ? parseFloat(valueUpdate.value.discPercen.toString())
      : null
  generalDiscount.value.discRealNum =
    valueUpdate.value.discRealNum !== null
      ? parseFloat(valueUpdate.value.discRealNum.toString())
      : null
})
</script>

<style scoped></style>
