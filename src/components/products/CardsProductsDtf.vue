<template>
  <div
    class="form-group"
    v-if="
      [6, 7, 8].some((v) => v === productSelectState.pro_categoria_item) ||
      [6, 7, 8].some((v) => v === alterProductSelectState?.pro_categoria_item) ||
      productSelectState.produto_categoria_item?.prod_tipo_descricao
        .toLocaleLowerCase()
        .includes('Impressão DTF'.toLocaleLowerCase())
    "
  >
    <label class="form-label" for="selectCOr">DEFINIR A COR</label>
    <select
      @change.prevent="$emit('defineTypeColor', produtoType.corDtf)"
      v-model="produtoType.corDtf"
      id="selectCor"
      class="form-control"
    >
      <option :value="0" :selected="true">Seleciona uma opção</option>
      <option :value="value.id" v-for="(value, index) in coresComputed" :key="index">
        {{ value?.one1_cor_nome }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { cartItem, IProduct } from '@/model/Index'
import { useProductStore } from '@/stores/ProductStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, toRefs, type PropType } from 'vue'

const props = defineProps({
  productSelectState: { type: Object as PropType<IProduct>, required: true, default: null },
  productChangeSelect: { type: Object as PropType<cartItem>, required: false, default: Object }
})

//emit
defineEmits(['defineTypeColor'])

const { productSelectState, productChangeSelect } = toRefs(props)
const { alterProductSelectState } = storeToRefs(useProductStore())

const produtoType = ref<{ corDtf: number }>({
  corDtf: 0
})

const coresComputed = computed(() =>
  productSelectState.value.pro_id > 0 && productSelectState.value.one1_produto_estoque.length > 0
    ? productSelectState.value.one1_produto_estoque.map((v) => v.one1_cor)
    : alterProductSelectState.value?.one1_produto_estoque.map((v) => v.one1_cor)
)

onMounted(() => {
  if (
    productChangeSelect?.value !== undefined &&
    productChangeSelect.value?.corDtf !== undefined &&
    productChangeSelect.value.corDtf > 0
  ) {
    produtoType.value.corDtf = productChangeSelect.value.corDtf
  }
})
</script>

<style scoped></style>
