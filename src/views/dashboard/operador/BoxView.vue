<template>
  <div
    class="mdk-drawer-layout__content page-content"
    style="transform: translate3d(0px, 0px, 0px)"
  >
    <header-layout></header-layout>

    <div class="pt-32pt">
      <div
        class="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left"
      >
        <SubTitlePage :title-icon="['Dashboard']" :title-page="nameRoute"> </SubTitlePage>
      </div>
    </div>

    <div class="container page__container">
      <div class="page-section">
        <div class="row mb-lg-8pt">
          <div class="esquerdinhasz col-lg-11">
            <div class="row">
              <div class="col-12">
                <CardLayout></CardLayout>
              </div>
            </div>
          </div>
          <div class="direitista col-lg-1">
            <div class="card">
              <div class="cardHeader">
                <button class="controlePedidosAtivos" @click="resizePedidosAtivos">
                  <i class="fechado fas fa-hand-point-left"></i>
                  <span class="tituloPedidos">Vendas</span>
                  <i class="aberto fas fa-hand-point-right"></i>
                </button>
              </div>

              <ExpandItem></ExpandItem>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer-layout></footer-layout>
  </div>
</template>

<script setup lang="ts">
import headerLayout from '@/layout/header/Header-layout.vue'
import footerLayout from '@/layout/Footer-layout.vue'
import { useRoute } from 'vue-router'
import { useDomStore } from '@/stores/DomStore'
import { useSidebar } from '@/composables/Sidebar'
import SubTitlePage from '@/layout/Sub-title-page.vue'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, onMounted, onUpdated } from 'vue'
import ExpandItem from '@/components/caixa/layout/Expand-Item.vue'
import CardLayout from '@/components/caixa/Card-layout.vue'

const route = useRoute()

const { sidebarDom } = storeToRefs(useDomStore())
const { removeActiveInOtherPage } = useSidebar()

const nameRoute = computed(() => route.name?.toString() as string)

const resizePedidosAtivos = () => {}

onMounted(async () => {
  removeActiveInOtherPage(sidebarDom.value)
})

onUpdated(() => {
  removeActiveInOtherPage(sidebarDom.value)
})

onBeforeMount(() => {
  removeActiveInOtherPage(sidebarDom.value)
  if (window.history.state.replaced) {
    useDomStore().$reset()
    useDomStore().$hydrate()
    let dom2 = []
    sidebarDom.value.forEach((el: unknown) => {
      if (el != undefined) {
        dom2.push(el)
      }
      dom2.push(el)
    })
    //sidebarDom.value = dom
  }
})
</script>

<style>
@import '@/assets/css/global-ONE-caixinha.css';
</style>
