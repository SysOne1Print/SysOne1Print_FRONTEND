<template>
  <div class="d-flex flex-column">
    <div class="form-group d-flex flex-column">
      <label class="form-label" for="descValue">Desc. em VALOR</label>

      <InputNumber
        :disabled="blockIfDiscount"
        v-model:model-value="localDiscount.discRealNum"
        @change="changeValue"
        @update:modelValue="changeValue"
        inputId="currency-usd"
        mode="currency"
        currency="BRL"
        locale="pt-BR"
        :placeholder="'R$ 0,00'"
      />
    </div>

    <div class="form-group d-flex flex-column">
      <label class="form-label" for="descPercentage">Desc. PERCENTUAL</label>
      <InputNumber
        :disabled="blockIfDiscount"
        v-model:model-value="localDiscount.discPercen"
        @update:modelValue="changeValue"
        @change="changeValue"
        inputId="percent"
        suffix="%"
        :placeholder="'0%'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from '@/model/Index'
import { onMounted, ref, toRefs, type PropType } from 'vue'
import { useRoute } from 'vue-router'

const prop = defineProps({
  precoUnidade: { type: Object as PropType<IProduct>, required: true },
  blockIfDiscount: { type: Boolean, required: true },
  modelValue: {
    // Prop para receber o valor do pai
    type: Object as PropType<{
      discPercen: number | null
      discRealNum: number | null
    }>,
    required: true
  }
})

//rotas
const route = useRoute()

const emit = defineEmits(['update:model-value'])

const { modelValue } = toRefs(prop)

// Variáveis
const localDiscount = ref<{ discPercen: number | null; discRealNum: number | null }>({
  discPercen: modelValue.value.discPercen,
  discRealNum: modelValue.value.discRealNum
})

// Função para emitir o valor atualizado
const changeValue = () => {
  emit('update:model-value', localDiscount.value) // Emitindo o valor atualizado
}

onMounted(() => {
  // Inicializa com o valor recebido do pai
  localDiscount.value = {
    discPercen: modelValue.value.discPercen,
    discRealNum: modelValue.value.discRealNum
  }
})
</script>

<style scoped></style>
