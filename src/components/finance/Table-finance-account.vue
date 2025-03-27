<template>
  <table class="table mb-0 thead-border-top-0 table-nowrap" v-if="forneList.length > 0">
    <Thead
      :model_type="model_type"
      @select-all-item="selectAllFn"
      :data-table="tableTitle"
      :extra="true"
    ></Thead>
    <tbody class="list" id="contasPagar">
      <tr v-for="(value, index) in forneList" :key="index">
        <td :class="{ 'pr-0': index === 0 }">
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input js-check-selected-row"
              :id="`${value.id.toString() + model_type}`"
              :value="value.id"
              v-model="selectItem"
            />
            <label class="custom-control-label" :for="`${value.id.toString() + model_type}`">
              <span class="text-hide">Check</span>
            </label>
          </div>
        </td>

        <td class="small">
          <div class="d-flex flex-column">
            <p class="mb-0 text-100">
              <strong>{{ value.produto_fornecedor.pro_for_nome }}</strong>
            </p>
            <small class="text-50">{{ value.produto_fornecedor.pro_for_empresa }}</small>
          </div>
        </td>

        <td class="js-lists-values-emissao">
          <strong>{{ DatePtBR(new Date(value.emissao as any)) }}</strong>
        </td>

        <td class="js-lists-values-vencimento">
          <strong>{{ DatePtBR(new Date(value.vencimento as any)) }}</strong>
        </td>

        <td>
          <div
            class="d-flex flex-row justify-content-center align-items-center w-100 h-75 p-2 mb-0 border-2 rounded border-success alert-success"
          >
            <span class="text-80">{{ real.format(parseFloat(value.valor?.toString())) }}</span>
          </div>
        </td>

        <td class="small">
          <span>{{ categoriaType(value.categoria) }}</span>
        </td>

        <td>
          <div class="w-100 d-flex flex-row justify-content-between align-items-center">
            <span class="font-weight-bold text-positive border-bottom"
              >{{ value.ocorrencia }} <span class="text-50">de {{ value.ocorrencia }}</span></span
            >
            <i class="fas fa-retweet text-50"></i>
          </div>
        </td>

        <td class="text-right">
          <div class="d-flex flex-row justify-content-end pr-0">
            <!-- botão de ações extras -->
            <div class="button-list">
              <div class="btn-group mb-0">
                <button
                  type="button"
                  class="p-3 btnContasPagar-ExtrasOpt btn btn-sm btn-secondary mb-0 dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-lg fa-cog"></i>
                </button>
                <!-- Dropdown subMenu Entrega final-->
                <div class="dropContasPagar-ExtrasOpt d-none dropdown-menu">
                  <a class="dropdown-item" href="#">
                    <div class="w-100 d-flex flex-row justify-content-between">
                      <i class="mt-1 fas fa-file-pdf"></i>
                      <span class="ml-2">Gerar PDF</span>
                    </div>
                  </a>
                  <a class="dropdown-item" href="#">
                    <div class="w-100 d-flex flex-row justify-content-between">
                      <i class="mt-1 fas fa-print"></i>
                      <span class="ml-2">Imprimir</span>
                    </div>
                  </a>
                  <a class="dropdown-item" href="#">
                    <div class="w-100 d-flex flex-row justify-content-between">
                      <i class="mt-1 fas fa-edit"></i>
                      <span class="ml-2">Editar</span>
                    </div>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item text-accent" href="#">
                    <div class="w-100 d-flex flex-row justify-content-between">
                      <i class="mt-1 fas fa-trash-alt"></i>
                      <span class="ml-2">Dar baixa</span>
                    </div>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item text-positive" href="#">
                    <div class="w-100 d-flex flex-row justify-content-between">
                      <i class="mt-1 fas fa-check"></i>
                      <span class="ml-2">Quitar ocorrência atual</span>
                    </div>
                  </a>
                </div>
                <!-- Fim do dropdown -->
              </div>
            </div>
            <!-- Final do botão de ações extras -->
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="d-flex justify-content-center m-3" v-else>
    <span style="font-size: 18px; font-weight: 500">Não foi encontrado produto</span>
  </div>
</template>

<script setup lang="ts">
import Thead from '@/components/table/Thead.vue'
import { ref, toRefs, type PropType } from 'vue'
import { dataTableFinanceAccount } from '@/util/TableInfo'
import { DatePtBR } from '@/util/Data'
import type { IFinanceAllList } from '@/model/Index'
import { categoriaOpStatic } from '@/util/Util'
import { useSelectItem } from '@/composables/UseSelectItemTable'

const prop = defineProps({
  forneList: { type: Object as PropType<IFinanceAllList[]>, required: true },
  model_type: { type: Number, required: true }
})

const { forneList } = toRefs(prop)
const { selectAll, selectItem } = useSelectItem()

const selectAllFn = (event: boolean) => {
  selectAll(event, forneList)
}
const tableTitle =
  ref<{ nome: string; px: string; extra: boolean; mx: string }[]>(dataTableFinanceAccount)
let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

const categoriaOp = ref(categoriaOpStatic)
//const selectItem = ref<number[]>([])

const categoriaType = (id: number) => {
  return categoriaOp.value.find((v) => v.id === id)?.cat
}

//expondo variavel para o component pai
defineExpose({
  selectItem
})
</script>

<style scoped>
.activeModal {
  display: flex;
}
</style>
