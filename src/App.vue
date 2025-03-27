<script setup lang="ts">
import preloader from '@/components/PreloaderComponent.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <preloader v-if="route.name !== 'acompanhar pedido do cliente'"></preloader>
  <div
    v-if="route.name !== 'acompanhar pedido do cliente'"
    class="mdk-drawer-layout js-mdk-drawer-layout"
    data-push=""
    data-responsive-width="992px"
    data-domfactory-upgraded="mdk-drawer-layout"
  >
    <router-view></router-view>
  </div>

  <router-view v-else></router-view>
</template>

<style scoped></style>
