<template>
  <div class="esq">
    <div class="infosVendedor">
      <span
        >Vendedor Responsável:
        <span class="destq">{{ user }}</span>
      </span>
    </div>
  </div>
  <div class="dir">
    <div class="suporteOne">
      <a href="" target="_blank" class="whatsapp">
        <span><i class="fa-brands fa-whatsapp"></i></span>
        <span>WhatsApp</span>
      </a>
      <a href="https://www.instagram.com/one1.print" target="_blank" class="instagram">
        <span><i class="fa-brands fa-instagram"></i></span>
        <span>Instagram</span>
      </a>
    </div>
    <div class="linhaProgressiva">
      <ul class="processosMinimizados">
        <li
          class="processoEtapa"
          :class="{
            full: orcamento_status.ost_id > 1 || orcamento_status.ost_id > 2,
            active: orcamento_status.ost_id === 1
          }"
        >
          <i class="fa-solid fa-headset"></i>
          <span class="setorNome">Pedido Realizado</span>
        </li>
        <li
          class="processoEtapa"
          :class="{
            full: orcamento_status.ost_id > 3,
            active: orcamento_status.ost_id === 6 || orcamento_status.ost_id === 3
          }"
        >
          <i class="fa-solid fa-comments-dollar"></i>
          <span class="setorNome">Pagamento Confirmado</span>
        </li>
        <li
          class="processoEtapa"
          :class="{
            full: orcamento_status.ost_id > 4 && orcamento_status.ost_id !== 6,
            active: orcamento_status.ost_id === 4
          }"
        >
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span class="setorNome">Pedido em Produção</span>
        </li>
        <li
          class="processoEtapa"
          :class="{ full: [5, 7, 9].some((v) => v === orcamento_status.ost_id) }"
        >
          <i class="fa-solid fa-medal"></i>
          <span class="setorNome">Controle de Qualidade</span>
        </li>
        <li
          class="processoEtapa"
          :class="{ active: orcamento_status.ost_id === 7 || orcamento_status.ost_id === 5 }"
        >
          <i class="fa-solid fa-circle-check"></i>
          <span class="setorNome">Pronto para Retirada (Expedição)</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { orcamentoStatus } from '@/model/Index'
import type { PropType } from 'vue'

defineProps({
  orcamento_status: { type: Object as PropType<orcamentoStatus>, required: true, default: Object },
  user: { type: String, required: true, default: '' }
})
</script>

<style scoped></style>
