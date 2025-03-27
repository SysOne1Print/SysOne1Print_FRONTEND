<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="d-flex justify-content-center">
    <ul class="pagination justify-content-start pagination-xsm m-0">
      <li class="page-item" :class="{ disabled: !showPrevious }">
        <a
          class="page-link"
          style="cursor: pointer"
          @click.prevent="$emit('change-page', backCurrentPage)"
          aria-label=" Previous"
        >
          <span aria-hidden="true" class="material-icons">chevron_left</span>
          <span>Prev</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="(value, index) in pages"
        :key="index"
        :class="{ active: value === current }"
      >
        <a
          class="page-link"
          style="cursor: pointer"
          :aria-label="`Page ${value}`"
          @click.prevent="$emit('change-page', index)"
        >
          <span>{{ value }}</span>
        </a>
      </li>
      <li class="page-item" :class="{ disabled: !showNext }">
        <a
          class="page-link"
          style="cursor: pointer"
          @click.prevent="$emit('change-page', current)"
          aria-label="Next"
        >
          <span>Next</span>
          <span aria-hidden="true" class="material-icons">chevron_right</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'

const prop = defineProps({
  offset: {
    type: [Number],
    default: 0
  },
  total: {
    type: [Number],
    required: true
  },
  limit: {
    type: [Number],
    default: 10
  }
})

const { limit, offset, total } = toRefs(prop)

const showPrevious = computed(() => {
  return current.value > 1
})

const showNext = computed(() => {
  return total.value > limit.value * current.value
})

const current = computed(() => {
  return offset.value ? offset.value + 1 : 1
})

const backCurrentPage = computed(() => {
  return offset.value ? offset.value - 1 : 1
})

const pages = computed(() => {
  const qty = Math.ceil(total.value / limit.value)
  if (qty <= 1) return current.value

  return Array.from(Array(qty).keys(), (i) => i + 1)
})
</script>

<style scoped></style>
