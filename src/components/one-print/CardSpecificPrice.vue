<template>
  <Card role="region" class="text-center" style="width: 100%; overflow: hidden">
    <template #header>
      <img
        class="text-center"
        width="150px"
        height="auto"
        alt="user header"
        :src="produtoSelectItem.produto_galeria.pro_galeria_path"
      />
    </template>
    <template #title>{{ produtoSelectItem.pro_nome }}</template>
    <template #subtitle>{{
      produtoSelectItem.produto_categoria_item.prod_tipo_descricao
    }}</template>
    <template #content>
      <div class="d-flex justify-content-center align-items-center">
        <div>
          <div class="m-0" v-if="product_type_dtf">
            <p>Preço (Atual):{{ real.format(Number(itemType?.price)) }}</p>
          </div>
          <Skeleton v-if="!product_type_dtf" width="10rem" class="mb-2"></Skeleton>

          <div class="m-0" v-if="newPrice !== null">
            <p>Preço (Novo): {{ real.format(Number(newPrice)) }}</p>
          </div>
          <Skeleton v-if="newPrice === null" width="10rem" class="mb-2"></Skeleton>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { IProduct } from '@/model/Index'
import { typeProductCategory } from '@/util/Util'
import { computed, toRefs, type PropType } from 'vue'

const prop = defineProps({
  produtoSelectItem: { type: Object as PropType<IProduct>, required: true, default: Object },
  product_type_dtf: { type: Boolean, required: true, default: false },
  prod_type: { type: Number, required: true },
  newPrice: { type: Number as PropType<number | null>, required: false }
})

const { prod_type, produtoSelectItem } = toRefs(prop)

//real money
let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

const itemType = computed(() => {
  return {
    price: typeProductCategory(produtoSelectItem?.value as IProduct, prod_type.value)
  }
})
</script>

<style scoped></style>
