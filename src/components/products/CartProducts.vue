<template>
  <layoutCart @discount-type="discount_clean" :discount_type="discountType" @open-modal-discount="openModalDiscount"
    @modal="openModal">
    <template v-slot:desconto>
      <modelContentDiscount :modo="modoComputed" :value-update="valueDiscount" @discount_type="type"
        @modal-discount="discountDom" @fn-close-discount="closeDiscount" @modo-type="modoType">
      </modelContentDiscount>
    </template>

    <template v-slot:pedidos>
      <modelContentConfirmed @fn-close="fnClose" :pedido-id="pedidoOrcamentoAtual">
      </modelContentConfirmed>
    </template>
  </layoutCart>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import layoutCart from '@/components/layout/cart/Layout-cart.vue'
import modelContentDiscount from '@/components/modal-content/Modal-content-discount.vue'
import modelContentConfirmed from '@/components/modal-content/Modal-content-confirmed.vue'
import { computed, ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/ProductStore'

const { discountGeralModal } = storeToRefs(useProductStore())
const discountModalArray = ref<any>()
const discountType = ref<number>(0)
const openModalConfirmed = ref<boolean>()
const pedidoOrcamentoAtual = ref<number>(0)
const openModal = (ev: { check: boolean; pedido: number }) => {
  const modal = document.querySelector('#modalConfirmarPedido')
  openModalConfirmed.value = ev.check
  pedidoOrcamentoAtual.value = ev.pedido
  modal?.classList.add('activeModal')
  window.scrollTo(0, 0)
  document.querySelector('body')?.setAttribute('style', 'overflow: hidden; height: auto')
}

const valueDiscount = ref<{ discRealNum: number | null; discPercen: number | null }>({
  discRealNum: null,
  discPercen: null
})
const modo = ref<string>('')

const modoComputed = computed(() => modo.value)

const type = (item: number) => {
  discountType.value = item
}

const discount_clean = () => {
  discountType.value = 0
}

const fnClose = () => {
  const modal = document.querySelector('#modalConfirmarPedido')
  modal?.classList.remove('activeModal')
  document.querySelector('body')?.removeAttribute('style')
}

const discountDom = (el: any) => {
  discountModalArray.value = el
}

const modoType = () => {
  modo.value = ''
}

const openModalDiscount = () => {
  if (discountModalArray.value !== null) {
    window.scrollTo(0, 0)
    document.querySelector('body')?.setAttribute('style', 'overflow: hidden; height: auto')
    discountModalArray.value.classList.add('activeModal')
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const closeDiscount = (el: any) => {
  if (discountModalArray.value !== null) {
    window.scrollTo(0, 0)
    document.querySelector('body')?.removeAttribute('style')
    discountModalArray.value.classList.remove('activeModal')
    modo.value = ''
  }
}

watchEffect(() => {
  modo.value = [1, 2].includes(discountGeralModal.value.type) ? 'change' : 'save'

  valueDiscount.value.discRealNum =
    discountGeralModal.value.type === 1 && discountGeralModal.value.discount !== 0
      ? discountGeralModal.value.discount
      : null

  valueDiscount.value.discPercen =
    discountGeralModal.value.type === 2 && discountGeralModal.value.discount !== 0
      ? discountGeralModal.value.discount
      : null
})
</script>

<style scoped>
.activeModal {
  display: flex;
}
</style>
