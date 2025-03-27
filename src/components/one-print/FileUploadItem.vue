<template>
  <div class="custom-file">
    <input
      v-bind="$attrs"
      @change="handleFileChange"
      type="file"
      id="anexoComprovante"
      class="custom-file-input"
    />
    <label for="anexoComprovante" class="custom-file-label">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: { type: String, required: true, default: '' }
})

const emit = defineEmits(['files-added'])

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const files = input.files as unknown as Array<FileList | null>

  console.log('Arquivos selecionados:', Array.from(files))
  emit('files-added', files)
  //input.dispatchEvent(event)

  input.value = ''
}
</script>

<style scoped></style>
