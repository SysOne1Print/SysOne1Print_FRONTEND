<template>
  <div class="mdk-drawer-layout__content page-content" style="transform: translate3d(0px, 0px, 0px)">
    <header-layout></header-layout>
    <div class="pt-32pt">
      <div
        class="container container-xl page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
        <div class="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
          <div class="mb-24pt mb-sm-0 mr-sm-24pt">
            <h2 class="mb-0">Orçamento 2/3</h2>

            <ol class="breadcrumb p-0 m-0">
              <li class="breadcrumb-item"><a href="">Vender</a></li>
              <li class="breadcrumb-item"><a href="">Definir Cliente</a></li>
              <li class="breadcrumb-item active">Orçamento</li>
            </ol>
          </div>
        </div>

        <div class="row" role="tablist">
          <div class="col-auto">
            <button type="button" class="btn btn-primary" @click.prevent="router.push({ name: 'orçamento cliente' })">
              <i class="material-icons sidebar-menu-icon sidebar-menu-icon--left">arrow_back</i>
              ALTERAR CLIENTE
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container container-xl page__container">
      <searchProduct></searchProduct>
      <cardsProducts></cardsProducts>
    </div>

    <footer-layout></footer-layout>
  </div>
</template>

<script setup lang="ts">
import headerLayout from '@/layout/header/Header-layout.vue'
import footerLayout from '@/layout/Footer-layout.vue'
import searchProduct from '@/components/products/ChooseGroupProduct.vue'
import cardsProducts from '@/components/products/CardsProducts.vue'
import { useProductStore } from '@/stores/ProductStore'
import { onBeforeMount, onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { useToast } from '@/composables/Toast'
import { useRouter } from 'vue-router'
import { useDomStore } from '@/stores/DomStore'
import { useSidebar } from '@/composables/Sidebar'
import { storeToRefs } from 'pinia'
import type { IError } from '@/model/Index'

//Hooks
const { notifyToast } = useToast()
const router = useRouter()
const { sidebarDom } = storeToRefs(useDomStore())
const { removeActiveInOtherPage } = useSidebar()
//variable
const limit = ref<number>(8)

//store
const productStore = useProductStore()

onMounted(async () => {
  try {
    await productStore.getAllProductStore(limit.value)
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'warning' })
      return
    }
    notifyToast({ msg: 'Erro ao buscar dados do cep', typeToast: 'error' })
  }
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
    sidebarDom.value.forEach((el) => {
      if (el != undefined) {
        dom2.push(el)
      }
      dom2.push(el)
    })
    //sidebarDom.value = dom
  }
})

onUnmounted(() => {
  productStore.removeAllProductCart('')
  productStore.$reset()
})
</script>

<style scoped>
.container-xl {
  max-width: 1280px;
}
</style>
