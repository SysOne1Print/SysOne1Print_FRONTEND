<template>
  <div
    class="mdk-drawer-layout__content page-content"
    style="transform: translate3d(0px, 0px, 0px)"
  >
    <HeaderLayout></HeaderLayout>
    <div class="pt-32pt">
      <div
        class="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left"
      >
        <div class="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
          <div class="mb-24pt mb-sm-0 mr-sm-24pt">
            <h2 class="mb-0">Produto - {{ prodForChange?.pro_nome }}</h2>

            <ol class="breadcrumb p-0 m-0">
              <li class="breadcrumb-item">Dashboard</li>
              <li class="breadcrumb-item">Inventário</li>
              <li class="breadcrumb-item active">Alterar Produto</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="container page__container">
      <div class="page-section">
        <div class="col-lg-12 d-lg-flex justify-content-around pr-0 pl-0">
          <div class="col-lg-9 pl-0 pr-0">
            <StepsComponent></StepsComponent>
            <CreateProduct></CreateProduct>
          </div>

          <CardStep></CardStep>
        </div>
      </div>
    </div>

    <footer-layout></footer-layout>
  </div>
</template>

<script setup lang="ts">
import StepsComponent from '@/components/StepsComponent.vue'
import HeaderLayout from '@/layout/header/Header-layout.vue'
import footerLayout from '@/layout/Footer-layout.vue'
import CreateProduct from '@/components/form/CreateProduct.vue'
import CardStep from '@/components/form/steps/CardStep.vue'
import { onBeforeMount, onMounted, onUpdated } from 'vue'
import { useDomStore } from '@/stores/DomStore'
import { storeToRefs } from 'pinia'
import { useSidebar } from '@/composables/Sidebar'
import { useRoute } from 'vue-router'
import { useToast } from '@/composables/Toast'
import { getAllProducts } from '@/api/actions/Produtos'
import { useProductFormStore } from '@/stores/ProductFormStore'
import { useStepStore } from '@/stores/StepsForm'
import type { IError } from '@/model/Index'
const { notifyToast } = useToast()
const { sidebarDom } = storeToRefs(useDomStore())
const { removeActiveInOtherPage } = useSidebar()
const route = useRoute()
//store
//const prodStore = useProductFormStore()
const { currentStep } = storeToRefs(useStepStore())
const { productForChange, prodForChange } = storeToRefs(useProductFormStore())

onMounted(async () => {
  removeActiveInOtherPage(sidebarDom.value)
  try {
    currentStep.value = currentStep.value >= 6 ? 1 : 1

    const id = Number(route.params.id)
    //await prodStore.getInfoCreateProd()
    const { data } = await getAllProducts(id)

    productForChange.value = data
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      if (error.response.status === 404) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }
      if (error.response.status === 409) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }
    } else {
      notifyToast({ msg: 'Erro ao buscar produto', typeToast: 'error' })
    }
  }
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
</script>

<style scoped></style>
