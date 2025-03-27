<template>
  <ul class="processosMinimizados d-flex flex-row mb-0">
    <li
      class="processoEtapa"
      style="cursor: pointer"
      :class="{
        full: typeModal.orcamento_step !== undefined && typeModal.orcamento_step?.ost_id >= 1
      }"
      v-tooltip.bottom="{
        value: 'Orçamento.',
        pt: {
          arrow: { style: { borderBottomColor: '#fff' } },
          text: 'bg-white text-100 fw-700 '
        }
      }"
    >
      <i class="fas fa-lg fa-list"></i>
    </li>
    <li
      :class="{
        full:
          (typeModal.orcamento_step &&
            typeModal.orcamento_step?.ost_id >= 4 &&
            typeModal.orcamento_step?.ost_id === 3) ||
          typeModal.pagamento_status?.id_pg_status === 2
      }"
      class="processoEtapa"
      v-tooltip.bottom="{
        value: 'Pagamento.',
        pt: {
          arrow: { style: { borderBottomColor: '#fff' } },
          text: 'bg-white text-100 fw-700 '
        }
      }"
    >
      <i class="fas fa-lg fa-cash-register"></i>
    </li>
    <li
      :class="{
        full:
          typeModal.orcamento_step?.ost_descricao?.toLowerCase() === 'Em Produção'.toLowerCase() ||
          (typeModal.orcamento_step && typeModal.orcamento_step?.ost_id >= 5)
      }"
      class="processoEtapa"
      v-tooltip.bottom="{
        value: 'Produção.',
        pt: {
          arrow: { style: { borderBottomColor: '#fff' } },
          text: 'bg-white text-100 fw-700 '
        }
      }"
    >
      <i class="fas fa-lg fa-print"></i>
    </li>
    <li
      :class="{
        full:
          typeModal.orcamento_step?.ost_descricao?.toLowerCase() === 'Expedição'.toLowerCase() ||
          (typeModal.orcamento_step && typeModal.orcamento_step?.ost_id >= 7)
      }"
      class="processoEtapa"
      v-tooltip.bottom="{
        value: 'Expedição.',
        pt: {
          arrow: { style: { borderBottomColor: '#fff' } },
          text: 'bg-white text-100 fw-700 '
        }
      }"
    >
      <i class="fas fa-lg fa-box"></i>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { IOrcamentoPedidoStatus } from '@/model/Index'
import type { PropType } from 'vue'

defineProps({
  typeModal: {
    type: Object as PropType<IOrcamentoPedidoStatus>,
    required: true
  }
})
</script>

<style scoped></style>
