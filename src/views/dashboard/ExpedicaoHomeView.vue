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
import { storeToRefs } from 'pinia'
import { useDomStore } from '@/stores/DomStore'
import { useSidebar } from '@/composables/Sidebar'
import { onBeforeMount, onMounted } from 'vue'

const { sidebarDom } = storeToRefs(useDomStore())
const { removeActiveInOtherPage } = useSidebar()

onMounted(async () => {
  removeActiveInOtherPage(sidebarDom.value)
})

onBeforeMount(() => {
  removeActiveInOtherPage(sidebarDom.value)
  if (window.history.state.replaced) {
    useDomStore().$reset()
    useDomStore().$hydrate()
    let dom2 = []
    sidebarDom.value.forEach((el) => {
      if (el != undefined) {
        dom2.push(el)
      }
      dom2.push(el)
    })
    //sidebarDom.value = dom
  }
})
</script>

<style lang="scss" scoped></style>
