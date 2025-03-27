<template>
  <button
    class="btn ml-1"
    v-tooltip.bottom="{
      value: buttonOptions.tooltip,
      pt: {
        arrow: { style: { borderBottomColor: '#fff' } },
        text: 'bg-white text-100 fw-700 '
      }
    }"
  >
    <slot></slot>
    {{ content }}
    <i v-if="content === ''" :class="buttonOptions.icon">{{ buttonOptions.contentTag }} </i>
  </button>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'

defineProps({
  content: {
    type: String,
    required: false,
    default: ''
  },
  buttonOptions: {
    type: Object as PropType<{ tooltip: string; icon: string; contentTag?: string }>,
    required: true
  }
  // disabled:{

  // }
})
</script>

<style scoped></style>
