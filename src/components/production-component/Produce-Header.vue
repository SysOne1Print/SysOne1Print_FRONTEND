<template>
  <div class="painelSetorial d-lg-flex flex-row justify-content-between bg-light pr-0 pl-0 rounded">
    <div class="col-3">
      <form action="" class="form-group mb-0">
        <div class="form-group mb-0">
          <div class="input-group input-group-merge">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <span class="material-icons">date_range</span>
              </div>
            </div>
            <input
              id="flatpickrSample01"
              type="hidden"
              class="form-control flatpickr-input"
              data-toggle="flatpickr"
              value="2024-03-28"
            /><input
              class="form-control flatpickr-input"
              placeholder=""
              tabindex="0"
              type="text"
              :readonly="true"
            />
          </div>
        </div>
      </form>
    </div>

    <div class="divDuMei flex-grow">
      <div class="gCarrossel position-relative carousel-card p-0 mx-auto">
        <div
          class="row d-block js-mdk-carousel"
          id="carousel-feedback"
          data-interval="3000"
          style="overflow: hidden"
          data-domfactory-upgraded="mdk-carousel"
        >
          <router-link
            :class="stageType === 4 ? 'd-none' : ''"
            class="carousel-control-next js-mdk-carousel-control"
            @click.prevent="nextClick(null)"
            :to="{
              name: stepProduction[stageType === 1 ? stageType : stageType]?.router
            }"
          >
            <span class="carousel-control-icon material-icons" aria-hidden="true"
              >keyboard_arrow_right</span
            >
            <span class="sr-only">Next</span>
          </router-link>

          <div class="mdk-carousel__content" style="transition-duration: 0ms; width: 350px">
            <!-- Pedidos Aprovados -->
            <div
              class="colOneSection mdk-carousel__item"
              v-for="(value, i) in stepProduction"
              :key="i"
              :class="{ active: value.active === stageType, full: stageType > value.active }"
              :style="`width:${value.width}`"
            >
              <div class="media ml-12pt">
                <div class="media-left mr-12pt">
                  <router-link
                    class="avatar avatar-sm"
                    @click.prevent="nextClick(value)"
                    :to="{
                      name: value.router
                    }"
                    v-tooltip.bottom="{
                      value: value.nome,
                      pt: {
                        arrow: { style: { borderBottomColor: '#fff' } },
                        text: 'bg-white text-100 fw-700 '
                      }
                    }"
                  >
                    <span class="avatar-title rounded-circle">
                      <i :class="value.icon"></i>
                    </span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <!-- Final da content do carrossel -->
        </div>
      </div>
    </div>
    <!-- Final da "div do meio" -->
    <div class="divOrder col-3">
      <div class="reOrder w-100 d-flex justify-content-end">
        <div class="divReOrder active">
          <i class="material-icons">reorder</i>
        </div>
        <div class="divDate ml-3 mb-0">
          <i class="material-icons">calendar_today</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductionStageStore } from '@/stores/ProductionStageStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { stageType } = storeToRefs(useProductionStageStore())

const stepProduction = ref([
  {
    nome: 'Pedidos Aprovados',
    icon: 'far fa-lg fa-id-card',
    width: '70px',
    router: 'Pedidos Aprovados',
    active: 0
  },
  {
    nome: 'Arte final',
    icon: 'fas fa-file-image',
    width: '70px',
    router: 'Arte Final',
    active: 1
  },
  {
    nome: 'Produção',
    icon: 'fas fa-lg fa-print',
    width: '70px',
    router: 'Produção',
    active: 2
  },
  {
    nome: 'Controle de Qualidade',
    icon: 'fas fa-lg fa-hat-wizard',
    width: '70px',
    router: 'Controle de qualidade',
    active: 3
  }
  // {
  //   nome: 'Expedição',
  //   icon: 'fas fa-lg fa-thumbs-up',
  //   width: '70px',
  //   router: 'Expedição',
  //   active: 5
  // }
])

const nextClick = (value?: { active: number } | null) => {
  if (value === undefined || value === null) {
    stageType.value = stageType.value + 1
    return
  } else {
    stageType.value = value.active
    return
  }
}
</script>

<style scoped></style>
