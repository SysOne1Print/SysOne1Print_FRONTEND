<template>
  <div
    class="mdk-drawer-layout__content page-content"
    style="transform: translate3d(0px, 0px, 0px)"
  >
    <header-layout></header-layout>

    <footer-layout></footer-layout>
  </div>
</template>

<script lang="ts" setup>
import headerLayout from '@/layout/header/Header-layout.vue'
import footerLayout from '@/layout/Footer-layout.vue'
import { useDomStore } from '@/stores/DomStore'
import { useSidebar } from '@/composables/Sidebar'

useDomStore()
useSidebar()
</script>

<style lang="scss" scoped></style>
