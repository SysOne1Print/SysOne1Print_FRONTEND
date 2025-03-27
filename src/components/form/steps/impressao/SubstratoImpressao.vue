<template>
  <div class="row justify-content-around flex-nowrap i-dtf">
    <div class="card w-100 rounded mb-0">
      <div class="card-header d-flex justify-content-between mp-0 p-2">
        <span class="material-icons text-50">settings</span>
        <span class="h5 text-50 mb-0">
          <b style="color: red; font-size: 1rem">*</b
          >{{
            getCategoriaComputed[Number(stepSubstrato.pro_categoria_item) - 1].prod_tipo_descricao
          }}
        </span>
      </div>
      <div class="card-body mb-2">
        <div class="d-flex justify-content-between mb-0">
          <div
            class="custom-control custom-radio mt-1"
            v-for="(value, index) in typeOptionComputed"
            :key="index"
          >
            <input
              @change.prevent="cleanValue"
              :id="`radio_${index}`"
              v-model="stepSubstrato.pro_outros_id"
              name="radio-stacked"
              type="radio"
              :value="value.id"
              class="custom-control-input"
            />

            <label :for="`radio_${index}`" class="custom-control-label h6 fxLabelCheck">
              <span>{{ value.one1_nome }}</span>
            </label>
          </div>
        </div>
      </div>

      <div
        class="card-body mb-0 border-bottom"
        v-if="stepSubstrato.pro_outros_id === 4 || stepSubstrato.pro_outros_id === 5"
      >
        <div class="form-group flex-grow-1">
          <label class="form-label p-1" for="camisetaTamanho"
            ><b style="color: red; font-size: 1rem">*</b>Tipo</label
          >
          <Dropdown
            name="CamisaTamanho"
            @change="$emit('fnDetailsProd')"
            :span-disabled="false"
            v-model:model-value="stepSubstrato.pro_outros_select_id"
            :maxSelectedLabels="1"
            :selectionLimit="1"
            filter
            :optionSelect="optionComputed"
            :label="''"
          >
          </Dropdown>
        </div>
      </div>

      <div
        class="card-body mb-0 border-bottom"
        v-if="stepSubstrato.pro_outros_id === 4 || stepSubstrato.pro_outros_id === 5"
      >
        <div class="form-group flex-grow-1">
          <label class="form-label p-1" for="camisetaTamanho"
            ><b style="color: red; font-size: 1rem">*</b>Tamanho</label
          >
          <Dropdown
            name="CamisaTamanho"
            @change="$emit('fnDetailsProd')"
            :span-disabled="false"
            v-model:model-value="stepSubstrato.prod_tamanho"
            :maxSelectedLabels="1"
            :selectionLimit="1"
            filter
            :optionSelect="insumosTamanhoComputed"
            :label="''"
          >
          </Dropdown>
        </div>
      </div>

      <div class="card-body mb-0 border-bottom" v-if="stepSubstrato.pro_outros_id === 5">
        <div class="form-group flex-grow-1">
          <label class="form-label p-1" for="camisetaTamanho"
            ><b style="color: red; font-size: 1rem">*</b>Metro</label
          >
          <Dropdown
            name="CamisaTamanho"
            @change="$emit('fnDetailsProd')"
            :span-disabled="false"
            v-model:model-value="stepSubstrato.pro_metro"
            :maxSelectedLabels="1"
            :selectionLimit="1"
            filter
            :optionSelect="metroComput"
            :label="''"
          >
          </Dropdown>
        </div>
      </div>

      <div class="card-body mb-0 border-bottom" v-if="stepSubstrato.pro_outros_id === 6">
        <div class="form-group flex-grow-1">
          <label class="form-label p-1" for="camisetaTamanho"
            ><b style="color: red; font-size: 1rem">*</b>Peso</label
          >
          <Dropdown
            name="peso"
            @change="$emit('fnDetailsProd')"
            :span-disabled="false"
            v-model:model-value="stepSubstrato.pro_peso_id"
            :maxSelectedLabels="1"
            :selectionLimit="1"
            filter
            :optionSelect="pesoComput"
            :label="''"
          >
          </Dropdown>
        </div>
      </div>

      <!--Quantidade em estoque-->
      <div
        class="card-body mb-0 border-bottom"
        v-if="[4, 5, 6].some((v) => v === stepSubstrato.pro_outros_id)"
      >
        <div class="form-group flex-grow-3">
          <label class="form-label p-1" for="itemNome"
            ><b style="color: red; font-size: 1rem">*</b>Estoque ({{
              typeOptionComputed.find((v) => v.id === stepSubstrato.pro_outros_id)?.one1_nome
            }})</label
          >
          <input
            v-model.number="typeInputStock.value"
            @input="
              $emit(
                'type-input-stock',
                typeof typeInputStock === 'object'
                  ? {
                      inputStock: [
                        {
                          id: stepSubstrato.pro_outros_id,
                          value: typeInputStock.value,
                          nome: typeOptionComputed.find((v) => v.id === stepSubstrato.pro_outros_id)
                            ?.one1_nome
                        }
                      ]
                    }
                  : typeInputStock
              )
            "
            type="text"
            class="form-control"
            id="itemNome"
            placeholder="Quantidade em estoque do item"
          />
        </div>
      </div>

      <div
        class="card-body d-flex flex-column border-bottom"
        v-if="stepSubstrato.pro_outros_id > 0"
      >
        <div class="form-group flex-grow-1 py-3 border-top">
          <label class="form-label mb-0" for="itemPrecoVenda"
            ><b style="color: red; font-size: 1rem">*</b>Preço de venda</label
          >

          <InputNumber
            :class="'w-100'"
            v-model:model-value="stepSubstrato.pro_venda"
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
import type { ICategoria, step1, typeOptionSafe } from '@/model/Index'
import { computed, onMounted, ref, toRefs, type PropType } from 'vue'
import Dropdown from '@/components/DropDownPrime.vue'
import { storeToRefs } from 'pinia'
import { useStepStore } from '@/stores/StepsForm'
import InputNumber from 'primevue/inputnumber'
import { useRoute } from 'vue-router'
import { useProductFormStore } from '@/stores/ProductFormStore'

const prop = defineProps({
  categoria: { type: Object as PropType<ICategoria[]>, required: true },
  stepSubstrato: { type: Object as PropType<step1>, required: true },
  typeOptionComputed: {
    type: Object as PropType<typeOptionSafe[]>,
    required: true,
    default: Array
  },
  option: {
    type: Object as PropType<
      Array<{
        id: number
        nome: string
        one1_cor_id_categ: number | undefined
        one1_cor_id_subcateg: number | undefined
      }>
    >,
    required: true,
    default: Array
  }
})

//router
const route = useRoute()

//emit
const emit = defineEmits(['type-input-stock', 'fnDetailsProd'])

//store pinia
const { optionsInsumosTamanho, metros, peso } = storeToRefs(useStepStore())
const { prodForChange } = storeToRefs(useProductFormStore())

//prop
const { categoria, option, stepSubstrato, typeOptionComputed } = toRefs(prop)

const typeInputStock = ref<{ id: number; value: number | string; nome: string }>({
  id: stepSubstrato.value.pro_outros_id,
  value: '',
  nome: ''
})

const pesoComput = computed(() => peso.value.map((v) => ({ id: v.id, nome: v.peso })))
const metroComput = computed(() => metros.value.map((v) => ({ id: v.id, nome: v.metro })))
const getCategoriaComputed = computed(() => categoria.value)
const optionComputed = computed(() =>
  option.value.filter((v) =>
    v.one1_cor_id_categ === stepSubstrato.value.pro_categoria_item &&
    v.one1_cor_id_subcateg === stepSubstrato.value.pro_outros_id
      ? {
          id: v.id,
          nome: v.nome
        }
      : ''
  )
)

const insumosTamanhoComputed = computed(() =>
  optionsInsumosTamanho.value.filter((v) => v.one1_outro_id === stepSubstrato.value.pro_outros_id)
)

const cleanValue = () => {
  typeInputStock.value.value = ''
}

onMounted(() => {
  if (route.name === 'Alterar Produtos') {
    if (
      prodForChange.value !== undefined &&
      prodForChange.value !== null &&
      Number(prodForChange.value.pro_categoria_item) === 5
    ) {
      typeInputStock.value.id = stepSubstrato.value.pro_outros_id
      typeInputStock.value.nome = typeOptionComputed.value.find(
        (v) => v.id === stepSubstrato.value.pro_outros_id
      )?.one1_nome as string
      typeInputStock.value.value = prodForChange.value.one1_produto_estoque[0].pro_estoque

      emit('type-input-stock', {
        inputStock: [
          {
            id: stepSubstrato.value.pro_outros_id,
            value: typeInputStock.value.value,
            nome: typeOptionComputed.value.find((v) => v.id === stepSubstrato.value.pro_outros_id)
              ?.one1_nome
          }
        ]
      })
    }
  }
})
</script>

<style scoped>
.gap-1 {
  gap: 1.5rem;
}
</style>
