<template>
  <div
    :ref="etapa"
    class="etapa etapa1 card-body card-minimoH bg-white rounded oneScroll"
    style="padding: 1rem 1rem 0.25rem"
  >
    <!-- STEP 1 - Dados básicos -->
    <div class="w-100 d-flex justify-content-end">
      <small class="o-size text-right text-50 mb-0 mt-0" v-if="description === ''"
        >AO CONFIRMAR O CADASTRO, O ITEM OCUPARÁ ESSE CÓDIGO DE PRODUTO</small
      >
      <small class="o-size text-right text-50 mb-0 mt-0 text-uppercase" v-else>{{
        description
      }}</small>
    </div>
    <div class="h5 d-flex justify-content-between mt-0 mb-0 p-0 border-bottom">
      <span class="text-50 mb-0">
        <span class="material-icons text-50 mb-1">keyboard</span>
      </span>
      <!-- <span class="h5 text-right mb-0">#0A-35C3PO</span> -->
    </div>
    <div class="col-lg-12 mt-3 mb-4">
      <div class="row justify-content-between">
        <div class="form-group flex-grow-1">
          <label class="form-label mb-0" for="itemNome">
            <b style="color: red; font-size: 1rem">*</b>Nome do Item</label
          >
          <input
            v-model="stepProd.pro_nome"
            required
            type="text"
            name="itemNome"
            class="form-control"
            id="itemNome"
            placeholder="Nome para o item .."
          />
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="form-group flex-grow-1">
          <label class="form-label mb-0" for="itemUnidade"
            ><b style="color: red; font-size: 1rem">*</b>Unidade</label
          >
          <input
            :disabled="true"
            v-model.number="stepProd.pro_unidade"
            type="text"
            class="form-control"
            id="itemUnidade"
            placeholder="Unidade própria"
          />
        </div>
      </div>

      <div class="row justify-content-around flex-nowrap">
        <div class="form-group flex-grow-1">
          <label class="form-label mb-0" for="itemTipo"
            ><b style="color: red; font-size: 1rem">*</b>Tipo do item</label
          >
          <select
            v-model.number="stepProd.pro_tipo"
            id="itemTipo"
            @change="fnDetailsProd"
            data-toggle="select"
            class="form-control"
          >
            <option value="" disabled selected>Escolha uma categoria do item Primeiro</option>
            <option :value="value.id" v-for="(value, index) in tipo" :key="index">
              {{ value.descricao }}
            </option>
          </select>
        </div>

        <div class="form-group flex-grow-1 ml-2">
          <label class="form-label mb-0" for="itemCondicao"
            ><b style="color: red; font-size: 1rem">*</b>Categoria do item</label
          >
          <select
            id="itemCondicao"
            v-model.number="stepProd.pro_categoria_item"
            @change="getOptionSelect"
            :disabled="prodForChange !== undefined && prodForChange !== null"
            name="itemCondicao"
            data-toggle="select"
            class="form-control SelectCondicao"
          >
            <option value="" disabled selected>Escolha uma categoria</option>
            <option :value="value.id" v-for="(value, index) in getComputed" :key="index">
              {{ value.prod_tipo_descricao }}
            </option>
          </select>
        </div>
      </div>

      <div class="row justify-content-around flex-nowrap align-items-end" v-if="stepProd.pro_tipo">
        <div class="form-group flex-grow-1 ml-2">
          <label class="form-label mb-0" for="unidadeMedidaProd"
            ><b style="color: red; font-size: 1rem">*</b>Unidade de medida (Produto)</label
          >
          <select v-model="stepProd.umd_prod_id" id="unidadeMedidaProd" class="form-control">
            <option value="" disabled selected>Escolha uma unidade de medida</option>
            <option :value="value.umd_id" v-for="(value, index) in getUnidade" :key="index">
              {{ value.umd_descricao }}
            </option>
          </select>
        </div>

        <div class="form-group flex-grow-1 ml-2">
          <label class="form-label mb-0" for="dirStage">
            <b style="color: red">*</b>Departamento
          </label>

          <select v-model="stepProd.dirStage" id="dirStage" class="form-control">
            <option value="-1" disabled selected>Escolha um estado da produção</option>
            <option value="Expedição">Expedição</option>
            <option value="Produção">Produção</option>
            <option value="Prensagem">Prensagem</option>
          </select>
        </div>
      </div>
      <!--Formulario DTF's-->
      <Dtf
        :categoria="getComputed"
        :step-dtf="stepProd"
        :type-option-computed="typeOptionComputed"
        v-if="shouldRenderDtf"
      ></Dtf>
      <!--Ending Formulario DTF's-->

      <!--Produto como camisas e etc-->
      <Produto
        @type-input-stock="getCalcStock"
        :tipo="tipo"
        :step-prod="stepProd"
        :type-option-computed="typeOptionComputed"
        :categoria="getComputed"
        @fn-details-prod="fnDetailsProd"
        @additional-desc-name-camisa="additionalDescIntNameCamisa"
        v-if="Number(stepProd.pro_categoria_item) === 4"
      ></Produto>
      <!--Ending Produto como camisas e etc-->

      <!--Formulario Insumos's-->
      <StepInsumos
        :categoria-prop="getComputed"
        :step-prod-insumos="stepProd"
        :type-option="typeOption"
        :tipo="tipo"
        v-if="[6, 7, 8].some((v) => v === stepProd.pro_categoria_item)"
      ></StepInsumos>
      <!--Ending Formulario Insumos's-->

      <!--Formulario Substrato's-->
      <Substrato
        :option="newOptionOutro"
        :categoria="getComputed"
        :step-substrato="stepProd"
        @type-input-stock="getCalcStock"
        :type-option-computed="typeOptionComputed"
        v-if="Number(stepProd.pro_categoria_item) === 5 && stepProd.pro_categoria_item !== ''"
      ></Substrato>
      <!--Ending Formulario Substrato's-->
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
      <button
        type="submit"
        @click.prevent="step"
        v-if="currentStep !== numberOfSteps"
        class="btn btn-primary"
      >
        AVANÇAR
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICategoria, IUnidade, step1, stock } from '@/model/Index'
import { useStepStore } from '@/stores/StepsForm'
import { useGlobalProduct } from '@/stores/GlobalProductStore'
import { storeToRefs } from 'pinia'
import { computed, ref, toRefs, type PropType, onMounted, onUnmounted } from 'vue'
import { useCreateProd } from '@/composables/UseCreateProd'
import { useProductFormStore } from '@/stores/ProductFormStore'
import { useRoute } from 'vue-router'
import StepInsumos from '@/components/form/steps/outros/StepInsumos.vue'
import Produto from '@/components/form/steps/produto/ProdutoSteps.vue'
import Dtf from './impressao/Dtf.vue'
import Substrato from './impressao/SubstratoImpressao.vue'

const prop = defineProps({
  categoria: { type: Object as PropType<ICategoria[]>, required: true },
  tipo: { type: Object as PropType<Array<{ id: number; descricao: string }>>, required: true },
  unidade: { type: Object as PropType<Array<IUnidade>>, required: true },
  description: { type: String, required: false }
})

const emit = defineEmits(['fnDetailsProd'])
const { categoria, tipo, unidade } = toRefs(prop)

//composables
const {
  filterTypeCategory,
  fnDetailsProd,
  getCategoria,
  getOptionSelect,
  obj_categoria,
  typeOption,
  typeOptionComputed,
  option,
  typeInputStock,
  stepProd1
} = useCreateProd(emit, tipo.value)

const route = useRoute()
const { prodForChange } = storeToRefs(useProductFormStore())

const { nextStep, goPrevious, numberOfSteps, optionItems } = useStepStore()
const { etapaInputsRefs, currentStep } = storeToRefs(useStepStore())

const pro_outros_id_insumos = ref<number>(0)

stepProd1.value.pro_outros_id = pro_outros_id_insumos.value
const stepProd = ref<step1>(stepProd1.value)

//const selectMultiCores = ref<{ id: number; nome: string; value: number | string }[]>([])

const { modeloTintas, newCoresExt } = storeToRefs(useGlobalProduct())

//const stockType = computed(() => typeInputStock.value)

const newOptionTissue = computed(() =>
  optionItems.tecido.map((v) => ({ id: v.id, nome: v.one1_tecido_nome }))
) //Tecido

const shouldRenderDtf = computed(() => {
  const validItems = [1, 2, 3, 10]
  return (
    stepProd.value.pro_categoria_item !== '' &&
    validItems.includes(Number(stepProd.value.pro_categoria_item))
  )
})

const newOptionTissueCor = computed(() =>
  optionItems.cor.map((v) => ({ id: v.id, nome: v.one1_cor_nome }))
) //cor

const newOptionOutro = computed(() =>
  option.value.outro.map((v) => ({
    id: v.id,
    nome: v.one1_nome,
    one1_cor_id_categ: v.one1_cor_id_categ,
    one1_cor_id_subcateg: v.one1_cor_id_subcateg
  }))
) //cor

const getComputed = computed(() => {
  return categoria.value
})

const getUnidade = computed(() => {
  const isCategoryItemSix = stepProd.value.pro_categoria_item === 6
  return unidade.value.filter((v) => (isCategoryItemSix ? v.umd_id === 4 : true))
})

const step = () => {
  let array_outros: Array<{
    id: number | undefined
    value: number | null
    nome: string | undefined
    id_est?: number
  }> = []
  let array_modelo: Array<never> = []
  let array_cores: Array<never> = []

  getCategoria(categoria.value)
  if (stepProd.value.pro_outros.length > 0 || obj_categoria.value?.id > 0) {
    const item = categoria.value.find(
      (v) =>
        v.prod_tipo_descricao.toLocaleLowerCase() ===
        obj_categoria.value?.prod_tipo_descricao.toLocaleLowerCase()
    )

    if (
      item?.prod_tipo_descricao
        .toLocaleLowerCase()
        .includes(obj_categoria.value?.prod_tipo_descricao.toLocaleLowerCase())
    ) {
      if (
        stepProd.value.pro_outros.length > 0 &&
        (stepProd.value.pro_categoria_item === 1 ||
          stepProd.value.pro_categoria_item === 2 ||
          stepProd.value.pro_categoria_item === 3 ||
          stepProd.value.pro_categoria_item === 10)
      ) {
        array_outros = stepProd.value.pro_outros.map((v, index) => {
          return {
            id: typeOption.value?.[index]?.id,
            value: Number(v),
            nome: typeOption.value?.[index]?.one1_nome,
            id_est: prodForChange.value?.one1_produto_estoque[index].produto_preco_unidade[0]
              .one1_pro_estId as number
          }
        })
      } else {
        if (stepProd1.value.pro_categoria_item !== 5) {
          array_outros.push({
            id: stepProd.value.pro_tinta_id,
            value: Number(stepProd.value.pro_venda),
            nome: modeloTintas.value.find((v) => v.modelo_id === stepProd.value.pro_tinta_id)
              ?.modelo_nome
          })
        }
      }
    }
  }

  let newStock: unknown
  if (array_outros.length > 0) {
    newStock = array_outros
  }

  if (
    // (obj_categoria.value !== undefined && obj_categoria.value?.id > 0) ||
    obj_categoria.value?.id === 4
  ) {
    newStock = typeInputStock.value?.map((v) => ({
      id: v.id,
      nome: v.one1_tamanho_nome ?? v?.nome,
      value: v.value === undefined ? 0 : Number(v.value)
    }))
  }

  //Categoria item Tinta DTF
  if (
    obj_categoria.value !== undefined &&
    obj_categoria.value?.id === 7 &&
    [5, 6].some((v) => v === stepProd.value.pro_tinta_id)
  ) {
    const cores = newCoresExt.value.map((v) => ({
      id: v.id,
      nome: v.nome,
      value: v.value === undefined ? 0 : v.value
    }))

    newStock = cores
  }

  if (obj_categoria.value !== undefined && obj_categoria.value.id === 6) {
    const cores = newCoresExt.value.map((v) => ({
      id: v.id,
      nome: v.nome,
      value: v.value === undefined ? 0 : v.value
    }))

    newStock = cores
  }

  if (stepProd1.value.pro_categoria_item === 5) {
    newStock = typeInputStock.value
  }

  const updatedStepProd = {
    ...stepProd.value,
    stock: newStock,
    modelo_tintas: array_modelo,
    prod_cores: array_cores
  }

  nextStep(updatedStepProd, 'step1')
}

const getCalcStock = ({ inputStock, type = '' }: { inputStock: stock[]; type: string }) => {
  if (typeof inputStock === 'object' && type === '') {
    typeInputStock.value = inputStock
  } else {
    typeInputStock.value = inputStock
  }
}

const additionalDescIntNameCamisa = (camisa: { tecido: number; cor: number }) => {
  if (camisa.tecido > 0) {
    const nameTissues: { id: number; nome: string } | undefined = newOptionTissue.value.find(
      (v) => v.id === Number(stepProd.value.pro_categoria_tecido)
    )
    if (nameTissues !== undefined && nameTissues.id > 0) {
      //
      const op = newOptionTissue.value.find((v) => {
        return stepProd.value.pro_nome.toLocaleLowerCase().includes(v.nome.toLocaleLowerCase())
      })

      if (
        op !== undefined &&
        op?.id > 0 &&
        stepProd.value.pro_nome.toLocaleLowerCase().includes(op?.nome.toLocaleLowerCase() as string)
      ) {
        stepProd.value.pro_nome = stepProd.value.pro_nome.replace(op?.nome, nameTissues.nome)
        return
      }
      stepProd.value.pro_nome = `${stepProd.value.pro_nome} - ${nameTissues?.nome}`
      return
    }
  }

  if (camisa.cor > 0) {
    //newOptionTissueCor
    const nameTissuesCor: { id: number; nome: string } | undefined = newOptionTissueCor.value.find(
      (v) => v.id === Number(stepProd.value.pro_categoria_cor)
    )

    if (nameTissuesCor !== undefined && nameTissuesCor.id > 0) {
      //
      const opCor = newOptionTissueCor.value.find((v) => {
        return stepProd.value.pro_nome.toLocaleLowerCase().includes(v.nome.toLocaleLowerCase())
      })

      if (
        opCor !== undefined &&
        opCor?.id > 0 &&
        stepProd.value.pro_nome
          .toLocaleLowerCase()
          .includes(opCor?.nome.toLocaleLowerCase() as string)
      ) {
        stepProd.value.pro_nome = stepProd.value.pro_nome.replace(opCor?.nome, nameTissuesCor.nome)
        return
      }

      stepProd.value.pro_nome = `${stepProd.value.pro_nome} - ${nameTissuesCor?.nome}`
      return
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const etapa = (el: HTMLElement | any) => {
  if (el && !etapaInputsRefs.value.includes(el)) {
    etapaInputsRefs.value.push(el)
  }
}
onMounted(() => {
  if (route.name === 'Alterar Produtos') {
    const categoria = prodForChange.value?.pro_categoria_item as number
    if (categoria !== undefined) {
      filterTypeCategory(categoria)
    }
  }
})

onUnmounted(() => {
  useStepStore().removeAllDom()
  useStepStore().$reset()
})

// onBeforeUpdate(() => {
//   etapaInputsRefs.value = []
// })
</script>

<style scoped lang="scss">
.border-bottom {
  border-bottom: 1px solid #dfe2e6;
}

.gap {
  gap: 1rem;
  row-gap: 0.25rem;
}
</style>
