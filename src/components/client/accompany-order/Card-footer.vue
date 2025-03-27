<template>
  <ul>
    <li>
      <span class="titulo">Número do Pedido</span>
      <span class="desc">#{{ orcamento.orc_id }}</span>
    </li>
    <li class="separadorVertical"></li>
    <li>
      <span class="titulo">Cliente</span>
      <span class="desc">{{ client.cli_nome }}</span>
    </li>
    <li class="separadorVertical"></li>
    <li>
      <span class="pedidoRecebido"
        >Pedido <u>recebido</u> dia
        <b
          >{{ new Date(orcamento.orc_emissao)?.getDate() }} de
          {{ new Date(orcamento.orc_emissao).toLocaleString('pt-br', { month: 'long' }) }}
          de {{ new Date(orcamento.orc_emissao)?.getFullYear() }}</b
        >
        às <b>{{ DateTimePtBR(new Date(orcamento.orc_emissao)) }}</b></span
      >
      <span class="pedidoConfirmado"
        >Pagamento <u>confirmado</u> dia
        <b
          >{{ new Date(orcamento.orc_data_pagamento)?.getDate() }} de
          {{ new Date(orcamento.orc_data_pagamento).toLocaleString('pt-br', { month: 'long' }) }} de
          {{ new Date(orcamento.orc_data_pagamento)?.getFullYear() }}</b
        >
        às <b>{{ DateTimePtBR(new Date(orcamento.orc_data_pagamento)) }}</b></span
      >
      <span class="pedidoFinalizado"
        >Pedido <u>finalizado</u> dia
        <b
          >{{ new Date(orcamento.orc_data_entrega)?.getDate() }} de
          {{ new Date(orcamento.orc_data_entrega).toLocaleString('pt-br', { month: 'long' }) }} de
          {{ new Date(orcamento.orc_data_entrega)?.getFullYear() }}</b
        >
        às <b>{{ DateTimePtBR(new Date(orcamento.orc_data_entrega)) }}</b></span
      >
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { IOrcamento, orClient } from '@/model/Index'
import type { PropType } from 'vue'
import { DateTimePtBR } from '@/util/Data'
defineProps({
  orcamento: { type: Object as PropType<IOrcamento>, required: true, default: Object },
  client: { type: Object as PropType<orClient>, required: true, default: Object }
})

//let dateMonthName = new Intl.DateTimeFormat('pt-br', { month: 'long' })
</script>

<style scoped>
u {
  font-weight: bolder;
}
</style>
