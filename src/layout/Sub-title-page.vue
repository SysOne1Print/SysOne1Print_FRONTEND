<template>
  <div class="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
    <div class="mb-24pt mb-sm-0 mr-sm-24pt">
      <h2 class="mb-0">{{ titlePage }}</h2>

      <ol class="breadcrumb p-0 m-0">
        <li
          class="breadcrumb-item"
          v-for="(value, index) in titleIcon"
          :class="{ active: value === titleIcon[titleIcon.length - 1] }"
          :key="index"
        >
          {{ value }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  titlePage: { type: String, required: true },
  titleIcon: { type: Array as () => string[], required: true, default: () => ['Dashboard'] }
})
</script>

<style scoped></style>
