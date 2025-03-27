<template>
  <td v-bind="$attrs">
    <div v-if="checkDiv" class="d-flex" :class="classChange">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </td>
</template>

<script setup lang="ts">
defineProps({
  classChange: { type: String, required: false, default: 'flex-column' },
  checkDiv: { type: Boolean, required: false, default: true }
})
</script>

<style scoped></style>
