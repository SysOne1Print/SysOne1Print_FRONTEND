<template>
  <div class="row justify-content-around flex-nowrap insumos">
    <div class="card w-100 rounded mb-0">
      <div class="card-header d-flex justify-content-between mp-0 p-2">
        <span class="material-icons text-50">settings</span>
        <span class="h5 text-50 mb-0"
          ><b style="color: red; font-size: 1rem">*</b>
          {{ categoriaProp[Number(stepProd.pro_categoria_item) - 1]?.prod_tipo_descricao }}
        </span>
      </div>
      <div class="card-body mb-0">
        <div class="form-group mb-3" style="border-bottom-width: 2px; border-bottom-style: inset">
          <Dropdown
            :span-disabled="true"
            v-model:model-value="stepProd.pro_tinta_id"
            :maxSelectedLabels="1"
            :selectionLimit="1"
            filter
            :optionSelect="newModeloTintas"
            :label="'Modelo'"
          >
          </Dropdown>
        </div>

        <div
          class="d-flex flex-column"
          v-if="
            stepProd.pro_categoria_item !== 8 &&
            [1, 2, 5, 6].some((v) => v === stepProd.pro_tinta_id)
          "
        >
          <span class="h5 text-50 mb-2 align-self-end"
            ><b style="color: red; font-size: 1rem">*</b>Cores</span
          >
          <div class="d-flex flex-wrap justify-content-center gap mb-0">
            <div class="col-3 form-group" v-for="(value, index) in newCoresExt" :key="index">
              <label class="form-label mb-0" for="itemNome">{{ value.nome }}</label>
              <InputNumber
                :input-class="'w-50'"
                v-model:model-value="newCoresExt[index].value"
                :placeholder="'R$ 0,00'"
                inputId="currency-usd"
                mode="currency"
                currency="BRL"
                locale="pt-BR"
                fluid
              />
            </div>
          </div>
        </div>

        <div
          class="d-flex flex-column"
          v-if="
            Number(stepProd.pro_categoria_item) > 0 &&
            stepProd.pro_categoria_item !== 7 &&
            stepProd.pro_categoria_item !== 6
          "
        >
          <div class="form-group flex-grow-1">
            <label class="form-label py-1 mb-0" for="itemPrecoVenda"
              ><b style="color: red; font-size: 1rem">*</b>Preço de venda</label
            >

            <InputNumber
              :class="'w-100'"
              v-model:model-value="stepProd.pro_venda"
              :placeholder="'R$ 0,00'"
              inputId="currency-usd"
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              fluid
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCreateProd } from '@/composables/UseCreateProd'
import { useGlobalProduct } from '@/stores/GlobalProductStore'
import { useProductFormStore } from '@/stores/ProductFormStore'
import { storeToRefs } from 'pinia'
import { ref, toRefs, type PropType, watchEffect } from 'vue'
import Dropdown from '@/components/DropDownPrime.vue'
import type { ICategoria, step1, typeOptionSafe } from '@/model/Index'
import { useRoute } from 'vue-router'

const prop = defineProps({
  tipo: { type: Object as PropType<Array<{ id: number; descricao: string }>>, required: true },
  categoriaProp: { type: Object as PropType<ICategoria[]>, required: true },
  stepProdInsumos: { type: Object as PropType<step1>, required: true },
  typeOption: { type: Object as PropType<typeOptionSafe[]>, required: true, default: Array }
})

const emit = defineEmits(['fnDetailsProd'])
const route = useRoute()
const { tipo, stepProdInsumos } = toRefs(prop)

//Composables and Store
const { newModeloTintas, newCoresExt } = storeToRefs(useGlobalProduct())
const { coresExtrComputed, stepProd1 } = useCreateProd(emit, tipo.value)
const { prodForChange } = storeToRefs(useProductFormStore())

//variable
const pro_outros_id_insumos = ref(0)

const stepProd = ref<step1>(stepProdInsumos.value)
//adiciona os mesmo dados no composables
stepProd1.value = stepProdInsumos.value

//defineExpose exportar a variavel para component pai (StepProd)
defineExpose({
  pro_outros_id_insumos
})

watchEffect(() => {
  let cores = coresExtrComputed.value
    .filter((v) => {
      return (
        v.id_modelo !== undefined &&
        (v.id_modelo === null || v.id_modelo === stepProd.value.pro_tinta_id)
      )
    })
    .map((val) => ({
      id: val.id,
      nome: val.one1_cor_nome,
      value: val.value !== undefined ? 0 : val.value
    }))
  newCoresExt.value = cores
  if (route.name === 'Alterar Produtos') {
    if (
      prodForChange.value !== undefined &&
      prodForChange.value !== null &&
      prodForChange.value.one1_produto_estoque.length > 0 &&
      Number(prodForChange.value.pro_categoria_item) !== 8
    ) {
      newCoresExt.value = prodForChange.value?.one1_produto_estoque.map((v) => {
        return {
          id: v.one1_cor.id as number,
          value: Number(v.produto_preco_unidade[0].ppu_preco_venda) as number,
          nome: v.one1_cor.one1_cor_nome as string
        }
      })
      //newCoresExt.value = x
    }
  }
})
</script>

<style scoped>
.gap-1 {
  gap: 0.25rem;
}
</style>
