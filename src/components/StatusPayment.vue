<template>
  <div class="d-flex flex-column" v-if="[1, 2].some((v) => v === orcamentoStatusProp.ost_id)">
    <small class="js-lists-values-status text-100 mb-4pt">Aguardando Aprovação</small>
    <span class="w-100 indicator-line rounded bg-warning"></span>
  </div>

  <div class="d-flex flex-column" v-if="[3, 4].some((v) => v === orcamentoStatusProp.ost_id)">
    <small class="js-lists-values-status text-100 mb-4pt">Aprovados</small>
    <span class="w-100 indicator-line rounded bg-success"></span>
  </div>

  <div class="d-flex flex-column" v-if="[5, 6].some((v) => v === orcamentoStatusProp.ost_id)">
    <small class="js-lists-values-status text-100 mb-4pt">Em Produção</small>
    <span class="w-100 indicator-line rounded bg-primary"></span>
  </div>

  <div class="d-flex flex-column" v-if="[7, 8].some((v) => v === orcamentoStatusProp.ost_id)">
    <small class="js-lists-values-status text-100 mb-4pt">Finalizados</small>
    <span class="w-100 indicator-line rounded bg-accent"></span>
  </div>
</template>

<script setup lang="ts">
import type { orcamentoStatus } from '@/model/Index'
import type { PropType } from 'vue'

defineProps({
  orcamentoStatusProp: {
    type: Object as PropType<orcamentoStatus>,
    required: true
  }
})
</script>

<style scoped></style>
