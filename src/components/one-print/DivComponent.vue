<template>
  <div v-bind="$attrs">
    <SpanComponent :title_span="span"></SpanComponent>

    <div
      class="d-flex flex-column"
      v-if="headerArray === 'orcamento_itens'"
      style="flex-basis: 50%; flex-wrap: nowrap; text-align: end"
    >
      <SpanComponent
        :title_span="spanValue"
        :class="classList"
        :class-list="`font-weight-bold ${balanceCartColor}`"
      ></SpanComponent>
    </div>

    <SpanComponent
      v-else
      :title_span="spanValue"
      :class="classList"
      :class-list="`font-weight-bold ${balanceCartColor}`"
    >
      <i class="fas fa-dolly-flatbed" v-if="span?.toLowerCase() === 'logística'"></i>
    </SpanComponent>
  </div>
</template>

<script setup lang="ts">
import SpanComponent from './SpanComponent.vue'
defineProps({
  span: { type: String, required: true },
  spanValue: { type: [String, Number], required: true, default: '' },
  classList: { type: String, required: false },
  headerArray: { type: String, required: false, default: '' },
  balanceCartColor: { type: String, required: false, default: '' }
})
</script>

<style scoped></style>
