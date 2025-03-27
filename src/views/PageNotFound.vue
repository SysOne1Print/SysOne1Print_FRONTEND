<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <h1
      style="
        font-weight: 700;
        font-family: 'Courier New', Courier, monospace;
        font-style: normal;
        font-size: 2rem;
      "
    >
      404 Ops! Não encontramos essa pagina
    </h1>

    <img width="40%" height="auto" src="@/assets/img/4041.png" alt="Pagina não encontrada" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.querySelector('body')?.classList.remove('login-form')
})
</script>

<style>
#app {
  height: 100%;
}

body {
  background-color: #ffff;
}
</style>
