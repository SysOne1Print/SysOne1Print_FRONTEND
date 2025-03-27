<template>
  <div @dragenter="onDragEnter" @dragleave="onDragLeave" @dragover.prevent="dragover"
    :class="{ 'active-dropzone': active }" class="dropzone" for="dz-button">
    <!-- <span>Arraste e Solte os arquivos ou Clique Aqui para upload</span> -->
    <!-- <label for="dropzoneFile">Select File</label> -->
    <div class="dz-default dz-message" for="dz-button">
      <button class="dz-button" type="button">
        <label class="mb-0 dz-label">
          Arraste e Solte os arquivos ou Clique Aqui para upload
          <input type="file" class="dropzoneFile" :accept="acceptFile" :multiple="multipleFile" />
        </label>
      </button>
    </div>
    <!-- <input type="file" id="dropzoneFile" class="dropzoneFile dz-button" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
const prop = defineProps({
  acceptFile: {
    type: String,
    required: true
  },
  multipleFile: {
    type: Boolean,
    required: true
  },
  activeDrop: {
    type: Boolean,
    required: true,
    default: false
  }
})

//prop
const { activeDrop } = toRefs(prop)

//variable
const active = ref(activeDrop.value)
const dragCounter = ref(0)

// Função chamada ao arrastar o item para dentro da dropzone
const onDragEnter = () => {
  dragCounter.value++
  active.value = true
}

// Função chamada ao sair da área da dropzone
const onDragLeave = () => {
  dragCounter.value--
  if (dragCounter.value === 0) {
    active.value = false
  }
}

const dragover = (event: DragEvent) => {
  event.preventDefault()
}

watch(
  activeDrop,
  () => {
    if (activeDrop.value === false) {
      active.value = activeDrop.value
      dragCounter.value = 0
    }
  },
  { deep: true }
)
</script>

<style scoped lang="scss">
input[type='file'] {
  display: none;
}

.dropzone {
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  text-align: center;
  padding: 2rem 1rem;
  border: 1px dashed #e9edf2;
  border-radius: 0.25rem;
  background-color: #fff;
  transition: 0.3s ease all;
  z-index: 999;

  input {
    display: none;
  }
}

.active-dropzone {
  color: #fff;
  border-color: #fff;
  background-color: #41b883;

  label {
    background-color: #fff;
    color: #41b883;
  }
}
</style>
