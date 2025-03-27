<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-separator">
    <div class="page-separator__text d-flex flex-row justify-content-between align-items-center">
      <i :class="iconText"></i> <span class="ml-2">{{ text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: { type: String, required: true },
  iconText: { type: String, required: true }
})
</script>

<style scoped></style>
