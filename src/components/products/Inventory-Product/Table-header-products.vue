<template>
  <div
    class="card-header d-flex justify-content-between align-items-center"
    :class="!typeHeader ? 'flex-row' : 'flex-column'"
  >
    <span class="w-100 d-flex flex-row justify-content-end text-50" v-if="typeHeader">{{
      descri
    }}</span>
    <div
      class="w-100 d-flex flex-row justify-content-between align-items-center"
      :class="{ 'gap-1': !typeHeader }"
    >
      <div class="search-form flex-grow">
        <input
          v-model.lazy="searchItem"
          @change="searchStatus"
          type="text"
          class="form-control search"
          placeholder="Buscar por ..."
        />
        <button class="btn" type="button">
          <i :class="iconSearch">search</i>
        </button>
      </div>
      <div class="form-group ml-4 mb-0" v-if="typeHeader">
        <select
          v-model.number="orcStatus"
          id="itemCondicao"
          @change="searchStatus"
          name="itemCondicao"
          class="form-control SelectCondicao"
        >
          <option :value="-1" selected>Exibir Tudo.</option>
          <option :value="value.id" v-for="(value, index) in orcamentoStatus" :key="index">
            {{ value.description }}
          </option>
        </select>
      </div>
      <div class="d-flex gap-1 text-center" v-else>
        <ButtonToolTip
          v-if="
            ['/finance/accounting', '/vendedor/stock', '/vendedor/lista-produto'].some(
              (v) => v === route.path
            )
          "
          :disabled="itemSelectAction.length > 0 ? false : true"
          class="p-3 btn-accent btn-sm font-weight-normal"
          @click.prevent="$emit('delete-item')"
          :button-options="{
            tooltip: typeTextDelComp,
            icon: 'fas fa-lg fa-trash-alt'
          }"
        ></ButtonToolTip>
        <ButtonToolTip
          v-if="
            ['/finance/accounting', '/vendedor/stock', '/vendedor/lista-produto'].some(
              (v) => v === route.path
            )
          "
          class="btn btn-secondary p-3 btn-sm font-weight-normal"
          :button-options="{
            tooltip: 'Imprimir',
            icon: 'fas fa-lg fa-print'
          }"
        >
        </ButtonToolTip>
        <ButtonToolTip
          v-if="
            ['/finance/accounting', '/vendedor/stock', '/vendedor/lista-produto'].some(
              (v) => v === route.path
            )
          "
          @click.prevent="
            route.path === '/vendedor/stock' || route.path === '/vendedor/lista-produto'
              ? router.push({ name: 'criar produto' })
              : $emit('new-create', modalType)
          "
          class="btn btn-sm p-3 btn-primary font-weight-normal"
          :button-options="{
            tooltip: typeTextCreateComp,
            icon: 'far fa-lg fa-plus-square'
          }"
        >
        </ButtonToolTip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IOptionHeader } from '@/model/Index'
import ButtonToolTip from '@/components/one-print/ButtonToolTip.vue'
import { computed, ref, toRefs, type PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useDomStore } from '@/stores/DomStore'

const prop = defineProps({
  orcamentoStatus: { type: Object as PropType<IOptionHeader[]>, required: false },
  typeHeader: { type: Boolean, required: true },
  iconSearch: { type: String, required: false, default: 'material-icons' },
  modalType: { type: Number },
  descri: { type: String, required: true },
  itemSelectAction: { type: Array<number>, required: false, default: [] }
})

const { orcStatus } = storeToRefs(useDomStore())
const route = useRoute()
const router = useRouter()
const { modalType } = toRefs(prop)
const emit = defineEmits(['search-status', 'new-create', 'delete-item'])

const searchItem = ref<string>('')

const typeTextDelComp = computed(() => {
  return route.path === '/finance/accounting' ? 'Deletar Contas!' : 'Desativar Produto'
})

const typeTextCreateComp = computed(() => {
  return route.path === '/finance/accounting' ? 'Criar Contas' : 'Criar Produto'
})

const searchStatus = () => {
  if (route.name === 'Gerir Carteira One') {
    emit('search-status', searchItem.value, orcStatus.value)
    return
  }

  if (route.name === 'Estoque de Produtos') {
    emit('search-status', searchItem.value)
    return
  } else {
    emit('search-status', orcStatus.value, searchItem.value, 0, modalType?.value)
    return
  }
}
</script>

<style scoped>
.gap-1 {
  gap: 1rem;
}
</style>
