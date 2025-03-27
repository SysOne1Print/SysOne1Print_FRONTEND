<template>
  <div class="col-lg-6">
    <div class="etapaHeader">
      <ul>
        <li class="text-center">
          <a
            href="#"
            @click="click = 'client'"
            class="decoration-none polygon"
            :class="{ selected: click === 'client' }"
            data-shortcut="alt+c"
            >Cliente</a
          >
        </li>
        <li class="text-center">
          <a
            href="#"
            @click="click = 'product'"
            :class="{ selected: click === 'product' }"
            class="decoration-none polygon"
            data-shortcut="alt+z"
            >Produto</a
          >
        </li>
        <li class="text-center">
          <a
            href="#"
            @click="click = 'payment'"
            :class="{ selected: click === 'payment' }"
            class="decoration-none polygon"
            data-shortcut="alt+b"
            >Pagamento</a
          >
        </li>
      </ul>
    </div>

    <div class="etapaContent oneScroll wardScrollY" style="padding-right: 10px">
      <StepsClient v-if="click === 'client'"></StepsClient>
      <StepsProduct v-else-if="click === 'product'"></StepsProduct>
      <StepsPayment v-else></StepsPayment>
    </div>
  </div>
</template>

<script lang="ts" setup>
import StepsClient from '@/components/caixa/steps/Steps-client.vue'
import StepsProduct from '@/components/caixa/steps/Steps-product.vue'
import StepsPayment from '@/components/caixa/steps/Steps-payment.vue'
import { ref } from 'vue'

const click = ref<string>('client')
</script>

<style scoped>
.polygon {
  clip-path: polygon(calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 0% 100%, 8px 50%, 0% 0%);
}
</style>
