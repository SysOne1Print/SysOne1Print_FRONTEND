<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <thead>
    <tr>
      <th
        :style="`width: ${value.px}; max-width:${value.mx}`"
        v-for="(value, index) in dataTable"
        :key="index"
        :class="[
          {
            'text-center': value.nome.toLocaleLowerCase() === 'Ação'.toLocaleLowerCase()
          },
          classTh
        ]"
      >
        <div
          class="custom-control custom-checkbox"
          v-if="
            value.extra &&
            value.nome.toLowerCase() !== 'ação' &&
            route.path !== '/production/qualityControlView'
          "
        >
          <input
            type="checkbox"
            class="custom-control-input js-toggle-check-all"
            v-model="select"
            :id="`customCheckAll_contasPagar${model_type}`"
            @change="$emit('select-all-item', select)"
          />

          <label class="custom-control-label" :for="`customCheckAll_contasPagar${model_type}`">
            <span class="text-hide">{{ value.nome.toLocaleUpperCase() }}</span>
          </label>
        </div>
        <div
          v-else-if="value.extra && value.nome.toLowerCase() === 'ação' && selectItem.length > 0"
        >
          <ButtonToolTip
            v-if="route.name !== 'Produção' && route.path !== '/production/qualityControlView'"
            :class="'btn-success btn-md'"
            :type="'submit'"
            @click.prevent="$emit('next-section-all-selection')"
            :button-options="{
              tooltip: 'Concluir as tarefas selecionadas?',
              icon: 'fas fa-location-arrow'
            }"
          >
            <i :class="value.icon"></i>
          </ButtonToolTip>
          <ButtonToolTip
            v-else-if="route.path !== '/production/qualityControlView'"
            :class="'btn-primary btn-md'"
            :type="'submit'"
            @click.prevent="$emit('config-machine')"
            :button-options="{
              tooltip: 'Configurar maquina em modo variado!',
              icon: 'fas fa-cogs'
            }"
          >
            <i :class="value.icon"></i>
            {{ value.nome }}
          </ButtonToolTip>
        </div>
        <div v-else>
          <span
            class=""
            v-if="value.icon !== '' && route.name !== 'Produção'"
            v-tooltip.top="{
              value: 'Status do Pagamento',
              pt: {
                arrow: { style: { borderBottomColor: '#fff' } },
                text: 'bg-white text-100 fw-700 '
              }
            }"
          >
            <i :class="value.icon"></i>
            {{ value.nome }}</span
          >

          <span class="" v-else> {{ value.nome }}</span>
        </div>
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import { ref, toRefs, type PropType } from 'vue'
import ButtonToolTip from '@/components/one-print/ButtonToolTip.vue'
import { useRoute } from 'vue-router'
interface ITable {
  nome: string
  px: string
  extra?: boolean
  mx?: string
  icon?: string
}
const prop = defineProps({
  dataTable: {
    type: Object as PropType<Array<ITable>>,
    required: true
  },
  extra: { type: Boolean, required: true, default: false },
  model_type: { type: Number, required: false },
  classTh: { type: String, required: false, default: '' },
  selectItem: { type: Array as PropType<Array<number>>, required: false, default: Array<number> }
})

defineEmits(['next-section-all-selection', 'select-all-item', 'config-machine'])

const { dataTable } = toRefs(prop)
const route = useRoute()
const select = ref(0)
//const tableInfo = ref<{ nome: string, px: string }[]>(dataTableProduct);
</script>

<style scoped></style>
