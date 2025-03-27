<template>
  <div class="flex d-flex flex-column">
    <a href="" class="card-title fs-7 text-capitalize">{{ value.pro_nome }}</a>
    <div class="d-flex" :class="lengthText">
      <small class="text-50 text-break" v-if="isCategoryIn([1, 2, 3, 10], value.pro_categoria_item)"
        >item: {{ dtfOpt?.one1_outros.one1_nome }}
      </small>
      <div class="d-flex flex-column" v-else-if="isCategoryIn([5, 8], value.pro_categoria_item)">
        <small class="text-50">Item: {{ substratoAndImpressao.nome }} </small>

        <div
          class="d-flex gap-1"
          :class="{
            'flex-wrap':
              substratoAndImpressao.tamanhoObj !== null && substratoAndImpressao.metroObj !== null
          }"
        >
          <small
            class="text-50"
            v-if="
              substratoAndImpressao.pesoObj !== undefined && substratoAndImpressao.pesoObj !== null
            "
            >Peso: {{ substratoAndImpressao.pesoObj?.peso }}</small
          >
          <small
            class="text-50"
            v-if="
              substratoAndImpressao.tamanhoObj !== undefined &&
              substratoAndImpressao.tamanhoObj !== null
            "
            >Tamanho: {{ substratoAndImpressao.tamanhoObj?.nome }}
          </small>

          <small
            class="text-50"
            v-if="
              substratoAndImpressao.tamanhoObj !== null && substratoAndImpressao.metroObj !== null
            "
            >|</small
          >
          <small
            class="text-50"
            v-if="
              substratoAndImpressao.metroObj !== undefined &&
              substratoAndImpressao.metroObj !== null
            "
            >Metro: {{ substratoAndImpressao.metroObj?.metro }}
          </small>
          <small class="text-50">|</small>
          <small class="text-50">QNT: x{{ value.qnty }}</small>
        </div>
      </div>
      <small class="text-50" v-else-if="isCategoryIn([6, 7], value.pro_categoria_item)"></small>
      <small class="text-50" v-if="dtfOpt && dtfOpt?.one1_outros.one1_nome.length <= 6"> | </small>
      <small class="text-50" v-if="isCategoryIn([1, 2, 3, 4, 6, 7, 10], value.pro_categoria_item)">
        QNT: x{{ value.qnty }}</small
      >
    </div>

    <DiscountCart :value="value" :getClient="getClient"></DiscountCart>
  </div>
</template>

<script setup lang="ts">
import type { cartItem, IClientAll } from '@/model/Index'
import { computed, toRefs, type PropType } from 'vue'
import DiscountCart from './DiscountCart.vue'

const props = defineProps({
  value: { type: Object as PropType<cartItem>, required: true, default: Object },
  getClient: { type: Object as PropType<IClientAll>, required: true, default: Object }
})

const { value: valueProp } = toRefs(props)

const dtfOpt = computed(() => {
  return valueProp?.value?.one1_produto_estoque.find(
    (v) => v?.one1_outros?.id === valueProp.value?.type
  )
})

const lengthText = computed(() =>
  dtfOpt.value && dtfOpt.value?.one1_outros.one1_nome.length <= 6 ? 'flex-row gap-1' : 'flex-column'
)

const substratoAndImpressao = computed(() => {
  return {
    other_id: valueProp?.value?.one1_produto_estoque[0]?.one1_outros?.id,
    nome: valueProp?.value?.one1_produto_estoque[0]?.one1_outros?.one1_nome,
    pesoObj: valueProp?.value?.one1_produto_estoque[0]?.one1_produto_peso,
    tamanhoObj: valueProp?.value?.one1_produto_estoque[0]?.one1_insumos_tamanho,
    metroObj: valueProp?.value?.one1_produto_estoque[0]?.one1_metros_sublimatico
  }
})

const isCategoryIn = (categories: number[], categoriaItem: number | undefined): boolean => {
  return categories.includes(categoriaItem || 0)
}
</script>

<style scoped>
.gap-1 {
  gap: 5px;
}

.fs-7 {
  font-size: 15px;
}
</style>
