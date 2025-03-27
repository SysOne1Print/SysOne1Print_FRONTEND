<template>
  <header class="cardHeader">
    <span
      >Olá, <span class="clienteOne">{{ client.cli_nome }}</span></span
    >
    <img loading="lazy" class="logoONE" src="@/assets/img/logo_azul.svg" alt="logo" />
  </header>
</template>

<script setup lang="ts">
import type { orClient } from '@/model/Index'
import type { PropType } from 'vue'

defineProps({
  client: { type: Object as PropType<orClient>, required: true, default: Object }
})
</script>

<style scoped></style>
