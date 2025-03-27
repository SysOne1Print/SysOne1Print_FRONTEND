<template>
  <div>
    <span class="modalTitle" v-if="productSelectState.pro_categoria_item !== 5">
      {{
        [6, 7, 8].some((v) => v === productSelectState.pro_categoria_item)
          ? productSelectState.pro_nome +
            ' - ' +
            productSelectState.one1_produto_estoque[0]?.one1_modelo_tintas.modelo_nome
          : productSelectState.pro_nome || alterProductSelectState?.pro_nome
      }}
    </span>
    <span class="modalTitle" v-else>
      {{ nomeConcat }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { cartItem, IProduct } from '@/model/Index'
import { computed, toRefs, type PropType } from 'vue'
const prop = defineProps({
  productSelectState: { type: Object as PropType<IProduct>, required: true, default: Object },
  alterProductSelectState: { type: Object as PropType<cartItem>, required: false, default: Object }
})

const { productSelectState } = toRefs(prop)

const nomeConcat = computed(() => {
  let nome = ''
  if (
    productSelectState?.value &&
    productSelectState.value.one1_produto_estoque[0]?.one1_outros.id === 4
  ) {
    nome = nomeFilmeDTF()
  }
  if (
    productSelectState?.value &&
    productSelectState.value.one1_produto_estoque[0]?.one1_outros.id === 5
  ) {
    nome = nomePapelSublimatico()
  }

  if (
    productSelectState?.value &&
    productSelectState.value.one1_produto_estoque[0]?.one1_outros.id === 6
  ) {
    nome = nomePoliamida()
  }

  return nome
})

const nomePapelSublimatico = (): string => {
  return (
    productSelectState?.value?.pro_nome +
    ' - ' +
    productSelectState?.value?.one1_produto_estoque[0]?.one1_outros.one1_nome +
    ' - ' +
    productSelectState?.value?.one1_produto_estoque[0]?.one1_cor.one1_cor_nome +
    ' - ' +
    productSelectState?.value?.one1_produto_estoque[0]?.one1_metros_sublimatico.metro
  )
}

const nomeFilmeDTF = (): string => {
  return (
    productSelectState?.value?.pro_nome +
    ' - ' +
    productSelectState?.value?.one1_produto_estoque[0]?.one1_outros?.one1_nome +
    ' - ' +
    productSelectState?.value?.one1_produto_estoque[0]?.one1_cor.one1_cor_nome
  )
}

const nomePoliamida = (): string => {
  return (
    productSelectState?.value?.pro_nome +
    ' - ' +
    productSelectState?.value?.one1_produto_estoque[0]?.one1_produto_peso?.peso +
    ' - ' +
    productSelectState?.value?.one1_produto_estoque[0]?.one1_outros.one1_nome
  )
}
</script>

<style scoped></style>
