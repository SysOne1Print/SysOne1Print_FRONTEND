<template>
  <div class="form-group">
    <span class="h5 text-50 mb-2 align-self-end" for="select">{{ label }}</span>

    <MultiSelect
      v-bind="$attrs"
      @change="selectionLimit > 1 ? change : changeOne"
      v-model="selectedOption"
      :options="option"
      optionLabel="nome"
      optionValue="id"
      placeholder="Selecione os modelos"
      :maxSelectedLabels="maxSelectedLabels"
      :selectionLimit="selectionLimit"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import MultiSelect from 'primevue/multiselect'
import { ref, toRefs, type PropType } from 'vue'
interface ISelect {
  id: number
  nome: string
}
const prop = defineProps({
  optionSelect: { type: Object as PropType<ISelect[]>, required: true },
  maxSelectedLabels: { type: Number, required: true, default: 3 },
  selectionLimit: { type: Number, required: true, default: 3 },
  label: { type: String, required: true }
})
const emit = defineEmits(['select-emit'])

const { optionSelect } = toRefs(prop)
const selectedOption = ref<Array<number>>([])
const option = ref(optionSelect)
const selectOptionOld = ref<Array<number>>([])
const change = () => {
  let indexToDelete = 0
  if (selectOptionOld.value < selectedOption.value) {
    selectOptionOld.value = selectedOption.value
  }
  if (selectedOption.value < selectOptionOld.value) {
    indexToDelete = selectOptionOld.value.findIndex((v, index) => {
      return v !== selectedOption.value[index]
    })
  }
  emit('select-emit', selectedOption.value, indexToDelete)
}

const changeOne = () => {
  emit('select-emit', selectedOption.value)
}
</script>

<style scoped lang="scss">
.w-full {
  width: 100%;
  height: auto;
}

.p-icon {
  &.p-multiselect-filter-icon {
    margin-top: -0.5rem !important;
  }
}
</style>
