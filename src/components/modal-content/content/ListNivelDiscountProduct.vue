<template>
  <ul class="listagemProdutosInseridos oneScroll">
    <li class="itemProdutoInserido" v-for="(value, index) in listProduct" :key="index">
      <div class="prodInseridoInfo">
        <span class="nomeItemInserido mr-3">{{ value.pro_nome }}</span>
        <span class="descontoAplicadoItemInserido text-positive mr-3"
          >{{ real.format(parseFloat(value.nds_valor?.toString())) }} (com desc.)</span
        >
        <span class="valorOriginalItemInserido text-info mr-3">{{
          real.format(parseFloat(value.pro_price?.toString()))
        }}</span>
        <span class="responsavelAplicacaoItem text-secondary"
          >inserido por <b>{{ value.user.user_nome }}</b> em:
          <b>{{ DatePtBR(value.data) }}</b></span
        >
      </div>

      <div class="acoesItemInserido">
        <button
          class="btn btn-sm btn-primary"
          @click.prevent="$emit('alter-nivel-discount', value)"
        >
          <i class="fas fa-pen"></i>
        </button>
        <button
          type="submit"
          @click.prevent="$emit('delete-nivel-discount', value.nds_id)"
          class="btn btn-sm btn-accent"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { INivelDescontProduto } from '@/model/Index'
import { DatePtBR } from '@/util/Data'
import { typeProductCategory } from '@/util/Util'
import { computed, toRefs, type PropType } from 'vue'

const prop = defineProps({
  produto: {
    type: Array as PropType<Array<INivelDescontProduto>>,
    required: true
  }
})

defineEmits(['delete-nivel-discount', 'alter-nivel-discount'])

const { produto } = toRefs(prop)

const listProduct = computed(() => {
  return produto.value.map((val) => {
    return {
      nds_id: val.nds_id,
      pro_nome: val.produto.pro_nome,
      pro_price: typeProductCategory(val.produto, val.nds_prod_type || val.nds_prod_cor) as number,
      user: val.user,
      data: new Date(val.user_dtcadastro),
      nds_valor: val.nds_valor?.toString() as string,
      nds_prod_id: val.produto.pro_id,
      nds_prod_type: val.nds_prod_type,
      nds_prod_cor: val.nds_prod_cor,
      produto: val.produto
    }
  })
})

//real money
let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})
</script>

<style scoped>
.acoesItemInserido {
  display: flex;
  gap: 1rem;
}
</style>
