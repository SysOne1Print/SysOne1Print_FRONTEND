<template>
  <div
    :ref="etapa"
    style="padding: 1rem 1rem 0.25rem"
    class="etapa etapa2 d-none card-body card-minimoH bg-white rounded oneScroll"
  >
    <!-- STEP 2 - Características -->
    <div class="w-100 d-flex justify-content-end">
      <small class="o-size text-right text-50 mb-0 mt-0"
        >AO CONFIRMAR O CADASTRO, O ITEM OCUPARÁ ESSE CÓDIGO DE PRODUTO</small
      >
    </div>
    <div class="h5 d-flex justify-content-between mt-0 mb-0 p-0 border-bottom">
      <span class="text-50 mb-0">
        <span class="material-icons text-50 mb-1">edit</span>
      </span>
      <span class="h5 text-right mb-0"></span>
    </div>
    <div class="col-lg-12 mt-3 mb-4">
      <div class="row justify-content-between">
        <div class="form-group flex-grow-1">
          <label class="form-label mb-0" for="itemMarca">Marca</label>
          <input
            v-model="stepProd.pro_marca"
            name="pro_marca"
            type="text"
            class="form-control"
            id="itemMarca"
            placeholder="Marca do item .."
          />
        </div>

        <div class="form-group flex-grow-1 ml-2">
          <label class="form-label mb-0" for="itemProducao"
            ><b style="color: red">*</b>Produção</label
          >
          <select
            v-model.number="stepProd.pro_producao"
            id="itemProducao"
            data-toggle="select"
            class="form-control"
          >
            <option :value="value.id" v-for="(value, index) in producao" :key="index">
              {{ value.nome }}
            </option>
          </select>
        </div>

        <div class="form-group flex-grow ml-2">
          <label class="form-label mb-0">Data de validade</label>
          <input
            v-model="stepProd.pro_data_validade"
            class="form-control flatpickr-input"
            type="date"
          />
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="form-group flex-grow">
          <label class="form-label mb-0" for="freteGratis">Frete grátis</label><br />
          <div class="custom-control custom-checkbox-toggle custom-control-inline mr-1">
            <input
              v-model="stepProd.pro_frete"
              type="checkbox"
              id="freteGratis"
              class="custom-control-input"
              required
              checked
            />
            <label class="custom-control-label" for="freteGratis">{{
              stepProd.pro_frete ? 'SIM' : 'NÃO'
            }}</label>
          </div>
          <label class="form-label text-right border-bottom ms-1" for="freteGratis">{{
            stepProd.pro_frete ? 'SIM' : 'NÃO'
          }}</label>
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="form-group flex-grow">
          <label class="form-label mb-0" for="itemPesoLiquido">Peso líquido</label>
          <input
            v-model.number="stepProd.pro_peso_liq"
            id="itemPesoLiquido"
            type="text"
            class="form-control"
            placeholder="0,00"
            :disabled="
              prod['step1'].pro_categoria_item === 4 || prod['step1'].pro_categoria_item === 9
            "
          />
        </div>

        <div class="form-group flex-grow ml-2">
          <label class="form-label mb-0" for="itemPesoBruto">Peso bruto</label>
          <input
            v-model.number="stepProd.pro_peso_bruto"
            id="itemPesoBruto"
            type="text"
            class="form-control"
            placeholder="0,00"
            :disabled="
              prod['step1'].pro_categoria_item === 4 || prod['step1'].pro_categoria_item === 9
            "
          />
        </div>

        <div class="form-group flex-grow ml-2">
          <label class="form-label mb-0" for="itemLargura">Largura</label>
          <input
            v-model.number="stepProd.pro_largura"
            id="itemLargura"
            type="text"
            class="form-control"
            placeholder="0,00"
            :disabled="
              prod['step1'].pro_categoria_item === 4 || prod['step1'].pro_categoria_item === 9
            "
          />
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="form-group flex-grow">
          <label class="form-label mb-0" for="itemAltura">Altura</label>
          <input
            v-model.number="stepProd.pro_altura"
            id="pro_altura"
            type="text"
            name="pro_altura"
            class="form-control"
            placeholder="0,00"
            :disabled="
              prod['step1'].pro_categoria_item === 4 || prod['step1'].pro_categoria_item === 9
            "
          />
        </div>
        <div class="form-group flex-grow ml-2">
          <label class="form-label mb-0" for="itemProfundidade">Profundidade</label>
          <input
            v-model.number="stepProd.pro_profundidade"
            id="itemProfundidade"
            type="text"
            class="form-control"
            placeholder="0,00"
            :disabled="
              prod['step1'].pro_categoria_item === 4 || prod['step1'].pro_categoria_item === 9
            "
          />
        </div>
        <div class="form-group flex-grow ml-2">
          <label class="form-label mb-0" for="itemVolume">Volume</label>
          <input
            v-model.number="stepProd.pro_volume"
            type="text"
            class="form-control"
            id="itemVolume"
            placeholder=".."
            :disabled="
              prod['step1'].pro_categoria_item === 4 || prod['step1'].pro_categoria_item === 9
            "
          />
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="form-group flex-grow">
          <label class="form-label mb-0" for="item-pCaixa">Itens p/ caixa</label>
          <input
            v-model.number="stepProd.pro_itens_caixa"
            id="item-pCaixa"
            type="text"
            class="form-control"
            placeholder="0,00"
            :disabled="
              prod['step1'].pro_categoria_item === 4 || prod['step1'].pro_categoria_item === 9
            "
          />
        </div>
        <div class="form-group flex-grow-1 ml-2">
          <label class="form-label mb-0" for="itemUnidadeMedida"
            ><b style="color: red">*</b>Unidade de medida</label
          >
          <select
            v-model="stepProd.pro_umd_caixa"
            id="itemUnidadeMedida"
            data-toggle="select"
            class="form-control"
          >
            <option :value="value.umd_id" v-for="(value, index) in unidade" :key="index">
              {{ value.umd_descricao }}
            </option>
          </select>
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="form-group flex-grow">
          <label class="form-label mb-0" for="GTIN-EAN">GTIN/EAN</label>
          <input
            v-model.number="stepProd.pro_gtin_ean"
            type="text"
            class="form-control"
            id="GTIN-EAN"
            placeholder=".."
          />
        </div>
        <div class="form-group flex-grow ml-2">
          <label class="form-label mb-0" for="GTIN-EAN_tributario">GTIN/EAN tributário</label>
          <input
            v-model.number="stepProd.pro_gtin_ean_tributario"
            type="text"
            class="form-control"
            id="GTIN-EAN_tributario"
            placeholder=".."
          />
        </div>
        <!-- <div class="form-group flex-grow-1 ml-2">
          <label class="form-label mb-0" for="itemDepartamento"
            ><b style="color: red">*</b>Departamento</label
          >
          <select
            v-model.number="stepProd.pro_departamento"
            id="itemDepartamento"
            data-toggle="select"
            class="form-control"
          >
            <option value="1">Expedição</option>
            <option value="2">Produção</option>
            <option value="3">Prensagem</option>
          </select>
        </div> -->
      </div>
    </div>

    <div class="card-footer d-flex flex-row justify-content-between">
      <button
        @click.prevent="goPrevious"
        class="btn btn-secondary"
        :class="{ disabled: currentStep === 1 }"
        :disabled="currentStep === 1 ? true : false"
      >
        Voltar
      </button>
      <button @click.prevent="step" v-if="currentStep !== numberOfSteps" class="btn btn-primary">
        AVANÇAR
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCreateProd } from '@/composables/UseCreateProd'
import type { IUnidade } from '@/model/Index'
import { useStepStore } from '@/stores/StepsForm'
import { storeToRefs } from 'pinia'
import { onUnmounted, ref, type PropType } from 'vue'
type IProducao = {
  id: number
  nome: string
}
defineProps({
  unidade: { type: Object as PropType<Array<IUnidade>>, required: true },
  producao: { type: Object as PropType<Array<IProducao>>, required: true }
})

const { stepProd2 } = useCreateProd()
const { nextStep, goPrevious } = useStepStore()
const { currentStep, numberOfSteps, etapaInputsRefs, prod } = storeToRefs(useStepStore())

const stepProd = ref(stepProd2.value)

const step = () => {
  nextStep(stepProd.value, 'step2')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const etapa = (el: HTMLElement | any) => {
  if (el && !etapaInputsRefs.value.includes(el)) {
    etapaInputsRefs.value.push(el)
  }
}

onUnmounted(() => {
  useStepStore().removeAllDom()
  useStepStore().$reset()
})

// onBeforeUpdate(() => {
//   etapaInputsRefs.value = []
// })
</script>

<style scoped></style>
