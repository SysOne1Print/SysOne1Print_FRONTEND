<template>
  <div class="cardBody">
    <div class="row">
      <StepsLayout></StepsLayout>
      <ProductList></ProductList>
    </div>
  </div>
</template>

<script setup lang="ts">
import StepsLayout from '../steps/Steps-layout.vue'
import ProductList from './Product-list.vue'
</script>

<style scoped></style>
