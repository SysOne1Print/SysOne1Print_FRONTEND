<template>
  <div v-bind="$attrs">
    <SpanComponent :class-list="classSpan" v-if="span !== ''" :title_span="span"></SpanComponent>

    <slot name="cartOne"></slot>
  </div>
</template>

<script setup lang="ts">
import SpanComponent from './SpanComponent.vue'
defineProps({
  span: { type: String, required: true },
  spanValue: { type: [String, Number], required: true, default: '' },
  classList: { type: String, required: false },
  classSpan: { type: String, required: false },
  headerArray: { type: String, required: false, default: '' }
})
</script>

<style scoped></style>
