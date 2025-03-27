<template>
  <div class="form-group">
    <span v-if="spanDisabled" :class="spanClass" for="select">{{ label }}</span>
    <Dropdown
      v-bind="$attrs"
      @update:model-value="fnOnInput"
      :modelValue="modelValue"
      :options="optionSelect"
      optionValue="id"
      optionLabel="nome"
      placeholder="Selecione Opção"
      optionDisabled="disabled"
      class="w-full"
    >
      <template #option="slotProps">
        <!--lista de opções-->
        <div
          class="d-flex flex flex-row justify-content-between align-items-center"
          v-if="
            route.path !== '/vendedor/criar-produto' &&
            route.path !== '/vendedor/change-product' &&
            route.name !== 'Alterar Produtos' &&
            route.name !== 'Finalizar Orçamento' &&
            route.path !== '/finance/client'
          "
        >
          <div>{{ slotProps.option.nome }}</div>

          <div>Estoque ({{ slotProps.option.stock }})</div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import type { ISelect } from '@/model/Index'
import Dropdown from 'primevue/dropdown'
import { type PropType } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  spanClass: { type: String, required: false, default: 'h5 text-50 mb-2 align-self-end' },
  optionSelect: { type: Object as PropType<ISelect[]>, required: true, default: Array },
  maxSelectedLabels: { type: Number, required: true, default: 3 },
  selectionLimit: { type: Number, required: true, default: 3 },
  label: { type: String, required: true },
  modelValue: {
    type: [String, Number],
    required: true
  },
  spanDisabled: { type: Boolean, required: true, default: true }
  //stockItens:{required:false, default:{}}
})

const route = useRoute()
// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
const emit = defineEmits<{ (e: 'update:modelValue', value: any): void }>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fnOnInput(value: any) {
  emit('update:modelValue', value)
}
</script>

<style scoped lang="scss">
.w-full {
  width: 100%;
  height: auto;
}
</style>
