<template>
  <div class="d-flex">
    <small class="text-50 valorAtual" v-if="isFixedDiscount">
      {{ real.format(value.pro_venda - value.value_discount) }}
      <span class="valorAnterior"
        >{{ real.format(value.pro_venda) }}
        <span class="text-50">/Un.</span>
      </span>
    </small>

    <small class="text-50 valorAtual" v-else-if="isPercentageDiscount">
      {{ real.format(value.pro_venda - fnDiscountPercent(value)) }}
      <span class="valorAnterior">
        {{ real.format(value.pro_venda) }}
        <span class="text-50">/Un.</span>
      </span>
    </small>

    <small class="text-50 valorAtual" v-else-if="isNivelDiscount">
      {{
        (value.value_discount > 0 && value.value_discount_type === 1) ||
        (value.value_discount > 0 && value.value_discount_type === 2)
          ? discountValueSpecific(value, Number(getNivelDiscountByProduct?.nds_valor))
          : real.format(Number(getNivelDiscountByProduct?.nds_valor))
      }}
      <span class="text-50">/Un.</span>
      <span class="valorAnterior">
        {{ real.format(value.pro_venda) }}
      </span>
    </small>
    <small class="text-50 valorAtual" v-else-if="value.pro_categoria_item === 4">
      {{ real.format(value.pro_venda) }}
      <span class="text-50">/Un.</span>
    </small>
    <small class="text-50 valorAtual" v-else>
      {{ real.format(value.pro_venda) }}
      <span class="text-50">/Un.</span>
    </small>
  </div>
</template>

<script setup lang="ts">
import type { cartItem, IClientAll } from '@/model/Index'
import { discountProductType, modeloFilmeDtfUtil } from '@/util/Util'
import { computed, toRefs, type PropType } from 'vue'

const props = defineProps({
  value: { type: Object as PropType<cartItem>, required: true, default: () => {} },
  getClient: { type: Object as PropType<IClientAll>, required: true, default: () => {} }
})

const { value: valueProp, getClient } = toRefs(props)

//variable
let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

// Computeds
const isFixedDiscount = computed(() => {
  return (
    valueProp.value.value_discount > 0 &&
    valueProp.value.value_discount_type === 1 &&
    (!getClient?.value?.nivel_desconto ||
      getNivelDiscountByProduct.value?.nds_prod_id !== valueProp.value.pro_id)
  )
})

const isPercentageDiscount = computed(() => {
  return (
    valueProp.value.value_discount > 0 &&
    valueProp.value.value_discount_type === 2 &&
    (!getClient?.value?.nivel_desconto ||
      getNivelDiscountByProduct.value?.nds_prod_id !== valueProp.value.pro_id)
  )
})

const isNivelDiscount = computed(() => {
  return (
    getClient?.value?.nivel_desconto.length > 0 &&
    getNivelDiscountByProduct?.value?.nds_prod_id === valueProp.value.pro_id
  )
})

const discountValueSpecific = (value: cartItem, nivel_desconto: number) => {
  if (value.value_discount > 0 && value.value_discount_type === 1)
    return real.format(nivel_desconto - value.value_discount)

  if (value.value_discount > 0 && value.value_discount_type === 2)
    return real.format(nivel_desconto - fnDiscountPercent(value))
}

const getNivelDiscountByProduct = computed(() => {
  const category = modeloTintas()
  const categoryFilme = modeloFilmeDtf()

  const prop = {
    pro_id: valueProp.value.pro_id,
    cor: category,
    corDtf: valueProp.value.corDtf === undefined ? 0 : valueProp.value.corDtf,
    type: categoryFilme
  }

  return getClient?.value?.nivel_desconto.find((v) => discountProductType(v, prop))
})

const modeloTintas = () => {
  return valueProp.value.pro_categoria_item === 8
    ? valueProp.value.one1_produto_estoque[0].one1_modelo_tintas.modelo_id
    : valueProp.value.cor
}

const modeloFilmeDtf = () => {
  return modeloFilmeDtfUtil(valueProp.value)
}

//function
const fnDiscountPercent = (value: cartItem) => {
  return calculateDiscountCartPercent(value)
}

const calculateDiscountCartPercent = (object: cartItem) => {
  return object.pro_venda * (parseFloat(object.value_discount.toString().replace(',', '.')) / 100)
}
</script>

<style scoped></style>
