<template>
  <div class="stepper d-flex flex-column mt-0 mr-2">
    <div class="d-flex mb-1">
      <div class="d-flex flex-column pr-4 align-items-center">
        <div
          @click="step(1)"
          :ref="setRef"
          class="rounded-circle pontoRefMarcador active mb-0"
          title="Dados Básicos"
        >
          1
        </div>
        <div :ref="setRefLine" class="line h-100"></div>
      </div>
    </div>
    <div class="d-flex mb-1">
      <div class="d-flex flex-column pr-4 align-items-center">
        <div
          @click="step(2)"
          :ref="setRef"
          class="rounded-circle pontoRefMarcador mb-0"
          title="Características"
        >
          2
        </div>
        <div :ref="setRefLine" class="line h-100"></div>
      </div>
    </div>
    <div class="d-flex mb-1">
      <div class="d-flex flex-column pr-4 align-items-center">
        <div
          @click="step(3)"
          :ref="setRef"
          class="rounded-circle pontoRefMarcador mb-0"
          title="Imagens"
        >
          3
        </div>
        <div :ref="setRefLine" class="line h-100"></div>
      </div>
    </div>
    <div class="d-flex mb-1">
      <div class="d-flex flex-column pr-4 align-items-center">
        <div
          @click="step(4)"
          :ref="setRef"
          class="rounded-circle pontoRefMarcador mb-0"
          title="Estoque"
        >
          4
        </div>
        <div :ref="setRefLine" class="line h-100"></div>
      </div>
    </div>
    <div class="d-flex mb-1">
      <div class="d-flex flex-column pr-4 align-items-center">
        <div
          @click="step(5)"
          :ref="setRef"
          class="rounded-circle pontoRefMarcador mb-0"
          title="Tributação"
        >
          5
        </div>
        <div :ref="setRefLine" class="line h-100"></div>
      </div>
    </div>
    <div class="d-flex mb-1">
      <div class="d-flex flex-column pr-4 align-items-center">
        <div
          @click="step(6)"
          :ref="setRef"
          class="rounded-circle pontoRefMarcador mb-0"
          title="Revisão"
        >
          6
        </div>
        <div :ref="setRefLine" class="line h-100 d-none"></div>
      </div>
    </div>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { useStepStore } from '@/stores/StepsForm'
import { storeToRefs } from 'pinia'
import { onUnmounted } from 'vue'

//store
const { refsStep, lineRefs, currentStep } = storeToRefs(useStepStore())
const stepStore = useStepStore()

const setRef = (el: any) => {
  refsStep.value.push(el)
}

const step = (index: number) => {
  currentStep.value = index
  stepStore.goToStep()
}

const setRefLine = (el: any) => {
  lineRefs.value.push(el)
}

onUnmounted(() => {
  stepStore.removeAllDom()
  stepStore.$reset()
})
</script>

<style scoped></style>
