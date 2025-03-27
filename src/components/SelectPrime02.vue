<template>
  <div class="form-group">
    <label class="form-label mb-0" for="camisetaCor">{{ label }}</label>
    <MultiSelect
      @change="change"
      v-model="selectedOption"
      display="chip"
      :options="optionSelect"
      optionLabel="nome"
      optionValue="id"
      placeholder="Selecione os modelos"
      :maxSelectedLabels="3"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import MultiSelect from 'primevue/multiselect'
import { ref, toRefs, type PropType } from 'vue'
const prop = defineProps({
  optionSelect: { type: Object as PropType<{ id: number; nome: string }[]>, required: true },
  label: { type: String, required: true }
})
const emit = defineEmits(['select-emit'])

const { optionSelect } = toRefs(prop)
const selectedOption = ref<Array<number>>([])
//const option = ref(optionSelect)
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
</script>

<style scoped lang="scss">
.w-full {
  width: 100%;
  height: auto;
}
</style>
