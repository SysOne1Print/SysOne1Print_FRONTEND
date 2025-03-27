<template>
  <div class="row justify-content-around flex-nowrap camiseta">
    <div class="card w-100 rounded mb-0">
      <div class="card-header d-flex justify-content-between mp-0 p-2">
        <span class="material-icons text-50">settings</span>
        <span class="h5 text-50 mb-0">
          {{ getCategoriaComputed[Number(stepProd.pro_categoria_item) - 1]?.prod_tipo_descricao }}
        </span>
      </div>
      <div class="card-body d-flex justify-content-around mb-0">
        <div class="form-group flex-grow-1">
          <label class="form-label mb-0" for="camisetaTecido"
            ><b style="color: red; font-size: 1rem">*</b>Tecido</label
          >
          <Dropdown
            @change="fndown"
            name="CamisaTecido"
            :span-disabled="false"
            v-model:model-value="stepProd.pro_categoria_tecido"
            :maxSelectedLabels="1"
            :selectionLimit="1"
            filter
            :optionSelect="newOptionTissue.tecido"
            :label="''"
          >
          </Dropdown>
        </div>

        <div class="form-group flex-grow-1 ml-2">
          <label class="form-label mb-0" for="camisetaTecido"
            ><b style="color: red; font-size: 1rem">*</b>Cor</label
          >
          <Dropdown
            name="CamisaCor"
            @change="
              $emit('additional-desc-name-camisa', {
                tecido: 0,
                cor: stepProd.pro_categoria_cor as number
              })
            "
            :span-disabled="false"
            v-model:model-value="stepProd.pro_categoria_cor"
            :maxSelectedLabels="1"
            :selectionLimit="1"
            filter
            :optionSelect="newOptionTissue.cor"
            :label="''"
          >
          </Dropdown>
        </div>

        <div class="form-group flex-grow-1 ml-2">
          <label class="form-label mb-0" for="camisetaTamanho"
            ><b style="color: red; font-size: 1rem">*</b>Tamanho</label
          >
          <Dropdown
            name="CamisaTamanho"
            @change="fnDetailsProdAndTypeStock"
            :span-disabled="false"
            v-model:model-value="stepProd.pro_categoria_tamanho"
            :maxSelectedLabels="1"
            :selectionLimit="1"
            filter
            :optionSelect="optionExtra"
            :label="''"
          >
          </Dropdown>
        </div>
      </div>

      <div
        class="card-body d-flex flex-column border-bottom"
        v-if="Number(stepProd.pro_categoria_tamanho) > 0"
      >
        <span class="h5 text-50 mb-2"
          ><b style="color: red; font-size: 1rem">*</b>Categoria Camiseta (Estoque)</span
        >

        <div class="d-flex justify-content-around mb-0 gap row row-cols">
          <div class="form-group flex-grow-3" v-for="(value, index) in typeInputStock" :key="index">
            <div v-if="typeInputStock !== undefined || typeInputStock !== null">
              <label class="form-label mb-0" for="itemNome"
                ><b style="color: red; font-size: 1rem">*</b>{{ value.one1_tamanho_nome }}</label
              >
              <input
                v-model.number="typeInputStock[index].value"
                @input.prevent="
                  $emit('type-input-stock', { inputStock: typeInputStock, type: 'produto' })
                "
                type="number"
                class="form-control"
                id="itemNome"
                placeholder="Quantidade..."
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="card-body d-flex flex-column border-bottom"
        v-if="Number(stepProd.pro_categoria_tamanho) > 0"
      >
        <span class="h5 text-50 mb-2"
          ><b style="color: red; font-size: 1rem">*</b>Preço de venda das camisas ({{
            optionExtra.find((v) => v.id === stepProd.pro_categoria_tamanho)?.nome
          }})</span
        >

        <div class="form-group flex-grow-1 py-3 border-top">
          <label class="form-label mb-0" for="itemPrecoVenda"
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
</template>

<script setup lang="ts">
import { useCreateProd } from '@/composables/UseCreateProd'
import type { ICategoria, step1, typeOptionSafe } from '@/model/Index'
import { computed, onMounted, onUnmounted, toRefs, type PropType } from 'vue'
import Dropdown from '@/components/DropDownPrime.vue'
import { storeToRefs } from 'pinia'
import { useStepStore } from '@/stores/StepsForm'
import { getOptionCamisa } from '@/api/actions/Categoria'
import InputNumber from 'primevue/inputnumber'

interface newOption {
  cor: {
    id: number
    nome: string
  }[]

  tamanho: {
    id: number
    nome: string
  }[]

  tecido: {
    id: number
    nome: string
  }[]
}

const prop = defineProps({
  tipo: { type: Object as PropType<Array<{ id: number; descricao: string }>>, required: true },
  categoria: { type: Object as PropType<ICategoria[]>, required: true },
  stepProd: { type: Object as PropType<step1>, required: true },
  typeOptionComputed: { type: Object as PropType<typeOptionSafe[]>, required: true, default: Array }
})

//prop
const { categoria, tipo, stepProd } = toRefs(prop)
const getCategoriaComputed = computed(() => categoria.value)

//Emit
const emit = defineEmits(['additional-desc-name-camisa', 'fnDetailsProd', 'type-input-stock'])

//storeRefs
const { optionItems } = storeToRefs(useStepStore())

//composables
const {
  optionExtra,
  typeInputStock,
  typeInputStockFn,
  getCategoria,
  fnDetailsProd,
  option,
  stepProd1,
  resetFormSteps
} = useCreateProd(emit, tipo.value)

const newOptionTissue = computed<newOption>(() => ({
  cor: option.value.cor.map((v) => ({ id: v.id, nome: v.one1_cor_nome })),
  tamanho: option.value.tamanho.map((v) => ({ id: v.id, nome: v.one1_tamanho_nome })),
  tecido: option.value.tecido.map((v) => ({ id: v.id, nome: v.one1_tecido_nome }))
}))

const fndown = () => {
  emit('additional-desc-name-camisa', {
    tecido: stepProd.value.pro_categoria_tecido as number,
    cor: 0
  })
}

const fnDetailsProdAndTypeStock = () => {
  typeInputStockFn()
  emit('fnDetailsProd')
}

onMounted(async () => {
  //
  const camisa = await getOptionCamisa(Number(stepProd.value.pro_categoria_item))
  option.value.cor = camisa.data.cor
  option.value.tamanho = camisa.data.tamanho
  option.value.tecido = camisa.data.tecido
  //enviando os valores do componente filho para a composables para que as funções internas dele funcione
  stepProd1.value = stepProd.value
  optionItems.value.cor.push(...camisa.data.cor)
  //optionItems.value.outro.push(...data.outraTinta)
  if (optionItems.value.tamanho.length === 0) {
    optionItems.value.tamanho.push(...camisa.data.tamanho)
  }

  optionItems.value.tecido.push(...camisa.data.tecido)

  getCategoria(getCategoriaComputed.value)

  await fnDetailsProd()

  typeInputStockFn() // teste
})

onUnmounted(() => {
  resetFormSteps()
})
</script>

<style scoped></style>
