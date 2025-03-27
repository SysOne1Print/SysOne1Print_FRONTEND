<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="row justify-content-around flex-nowrap i-dtf">
    <div class="card w-100 rounded mb-0">
      <div class="card-header d-flex justify-content-between mp-0 p-2">
        <span class="material-icons text-50">settings</span>
        <span class="h5 text-50 mb-0">
          {{
            getCategoriaComputed.find((v) => v.id === stepDtf.pro_categoria_item)
              ?.prod_tipo_descricao
          }}
        </span>
      </div>
      <div class="card-body mb-0">
        <div
          class="d-flex justify-content-center gap-1 mb-0"
          :class="{ 'flex-wrap': typeOptionComputed.length > 3 }"
        >
          <div
            :class="[
              {
                'd-flex flex-column flex-auto': typeOptionComputed.length > 3,
                'col-4': typeOptionComputed.length === 3
              }
            ]"
            class="form-group"
            v-for="(value, index) in typeOptionComputed"
            :key="index"
          >
            <label :for="value.one1_nome" class="form-label mb-0">
              <b style="color: red; font-size: 1rem">*</b>{{ value.one1_nome }}
            </label>

            <InputNumber
              :inputClass="'w-100'"
              v-model="stepDtf.pro_outros[index]"
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
import type { ICategoria, step1, typeOptionSafe } from '@/model/Index'
import { computed, toRefs, type PropType } from 'vue'
import InputNumber from 'primevue/inputnumber'

const prop = defineProps({
  categoria: { type: Object as PropType<ICategoria[]>, required: true },
  stepDtf: { type: Object as PropType<step1>, required: true },
  typeOptionComputed: { type: Object as PropType<typeOptionSafe[]>, required: true, default: Array }
})

//prop
const { categoria, stepDtf } = toRefs(prop)

const getCategoriaComputed = computed(() => categoria.value)
</script>

<style scoped>
.flex-auto {
  flex: 1 1 auto;
}

.gap-1 {
  gap: 1rem;
}
</style>
