<template>
  <div id="stockProd" class="modal-content oneScroll">
    <div class="modal-top">
      <span class="modal-close" @click.prevent="$emit('closeModal', $event)">×</span>
    </div>
    <div class="modal-container">
      <div class="w-100 d-flex flex-column gap-1 border-bottom mb-2">
        <h4 class="mb-0">{{ title }}</h4>
      </div>

      <div class="d-flex flex-column gap-2">
        <DivComponent
          :class="'w-100 d-flex flex-row justify-content-between mt-3 pb-3 border-bottom'"
          v-for="(value, index) in modalListStock"
          :key="index"
          :span="value.nome"
          :span-value="prod[value.variable]"
        >
        </DivComponent>

        <DivComponent
          v-if="prodLog && prodLog?.length > 0"
          :class="'w-100 d-flex flex-row justify-content-between mt-3 pb-3'"
          :span="'Usuarios que alteraram'"
          :span-value="''"
        >
        </DivComponent>

        <div class="card" v-if="prodLog && prodLog?.length > 0">
          <DataTable :value="prodLog" tableStyle="min-width: 50rem">
            <Column field="id_log" header="Codigo" sortable style="width: 25%"></Column>
            <Column field="users.user_nome" header="Nome" sortable style="width: 25%"></Column>
            <Column
              field="log_change_date"
              header="Data da alteração"
              sortable
              style="width: 25%"
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DivComponent from '@/components/one-print/DivComponent.vue'
import type { IRelistProduct } from '@/model/Index'
import { DateAndHour } from '@/util/Data'
import { modal_finance_stock } from '@/util/TableInfo'
import { computed, ref, toRefs, type PropType } from 'vue'
const prop = defineProps({
  title: { type: String, required: true },
  listProductStock: { type: Object as PropType<IRelistProduct>, required: true, default: Object }
})

const { listProductStock } = toRefs(prop)
const modalListStock = ref(modal_finance_stock)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prod: any = computed(() => {
  //Analisar o codigo abaixo pois imagino que seja um array
  return listProductStock?.value as IRelistProduct
})

const prodLog = computed(() =>
  listProductStock?.value?.log?.map((v) => ({
    ...v,
    log_change_date: DateAndHour(new Date(v.log_change_date))
  }))
)

//const prod = ref()
</script>

<style scoped>
.modal-top {
  padding: 10px;
}
.modal-content {
  padding: 5px 20px;
}
</style>
