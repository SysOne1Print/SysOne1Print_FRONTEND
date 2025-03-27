<template>
  <div class="w-100 form-group flex-grow-1 mb-0">
    <label
      for="itemUniade"
      class="form-label font-weight-light text-50 mb-0"
      style="font-size: 12px"
      >Unidade:</label
    >
    <p id="itemUniade" class="h5 text-uppercase text-truncate mb-0">
      {{ prodC.step1.pro_unidade }}
    </p>
  </div>
  <div class="d-flex w-100">
    <div class="d-flex w-100 flex-row justify-content-between">
      <div class="d-flex flex-column gap-1 col-6 p-0">
        <label
          for="itemNome"
          class="form-label font-weight-light text-50 mb-0"
          style="font-size: 12px"
          >Nome:</label
        >
        <p
          class="h6 text-uppercase text-truncate mb-0"
          v-for="(value, index) in prodC.step1?.stock"
          :key="index"
        >
          {{ value?.nome }}
        </p>
      </div>
      <div class="d-flex flex-column col-6 p-0 align-items-end">
        <div class="d-flex w-50">
          <label
            for="itemPrecoVenda"
            class="form-label font-weight-light text-50 mb-0"
            style="font-size: 12px"
            >Preço de venda:</label
          >
        </div>
        <div
          class="d-flex flex-column gap-1 w-50"
          v-if="
            prodC.step1?.pro_outros_id !== 4 &&
            prodC.step1?.pro_outros_id !== 5 &&
            prodC.step1?.pro_outros_id !== 6
          "
        >
          <p
            id="itemPrecoVenda"
            class="h6 w-100 text-uppercase text-truncate mb-0"
            v-for="(item, index) in prodC.step1?.stock"
            :key="index"
          >
            {{ real.format(item?.value) }}
          </p>
        </div>

        <div class="d-flex flex-column gap-1 w-50" v-else>
          <p id="itemPrecoVenda" class="h6 w-100 text-uppercase text-truncate mb-0">
            {{ real.format(prodC.step1?.pro_venda) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStepStore } from '@/stores/StepsForm'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { prod } = storeToRefs(useStepStore())
const prodC = computed(() => prod.value)

let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})
</script>

<style scoped>
.gap-1 {
  gap: 0.25rem;
}
</style>
