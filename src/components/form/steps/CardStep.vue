<template>
  <div class="col-lg-3 ml-lg-2 pl-0 pr-0">
    <div class="card rounded">
      <div class="card-header mb-0 mp-0 p-1 pl-3 pr-3">
        <div class="row justify-content-between pl-2 pr-2 border-bottom border-light">
          <span class="material-icons text-50">linear_scale</span>
          <small class="text-50"
            >ETAPA <span class="text-100 pl-1 pr-1">{{ currentStep }}</span> de
            <span class="text-100 pl-1 pr-1">6</span></small
          >
        </div>
        <div class="row mb-0 pl-2 pr-2">
          <span class="h4 mt-2 mb-0">{{ descri[currentStep - 1] }}</span>
          <!-- Nome da etapa atual -->
        </div>
      </div>
      <!-- <div class="card-body mb-0">
                <div class="w-100 h-100 d-flex flex-column mb-0">
                    <div class="text-50">PRÉVIA DO CÓDIGO (SKU)</div>
                    <div class="h5 mb-0">#0A-35C3PO</div>
                </div>
            </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStepStore } from '@/stores/StepsForm'
import { storeToRefs } from 'pinia'
import { onUnmounted, ref } from 'vue'

const { currentStep } = storeToRefs(useStepStore())

const descri = ref([
  'Dados Básicos',
  'Características',
  'Imagens',
  'Estoque',
  'Tributação',
  'Revisão'
])

onUnmounted(() => {
  useStepStore().removeAllDom()
  useStepStore().$reset()
})
</script>

<style scoped></style>
