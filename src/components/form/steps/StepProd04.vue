<template>
  <div
    :ref="etapa"
    style="padding: 1rem 1rem 0.25rem"
    class="etapa etapa4 d-none card-body card-minimoH bg-white rounded oneScroll"
  >
    <!-- STEP 4 - Estoque -->
    <div class="w-100 d-flex justify-content-end">
      <small class="o-size text-right text-50 mb-0 mt-0"
        >AO CONFIRMAR O CADASTRO, O ITEM OCUPARÁ ESSE CÓDIGO DE PRODUTO</small
      >
    </div>
    <div class="h5 d-flex justify-content-between mt-0 mb-0 p-0 border-bottom">
      <span class="text-50 mb-0">
        <span class="material-icons text-50 mb-1">inventory</span>
      </span>
      <span class="h5 text-right mb-0"></span>
    </div>
    <div class="col-lg-12 mt-3 mb-4">
      <div class="row justify-content-between">
        <div class="form-group flex-grow">
          <label class="form-label mb-0" for="itemMinimo"
            ><b style="color: red">*</b>Estoque Mín</label
          >
          <input
            v-model.number="stepProd.pro_minimo"
            id="itemMinimo"
            type="text"
            class="form-control"
            placeholder="0,00"
            data-mask="#.##0,00"
            data-mask-reverse="true"
          />
        </div>

        <div class="form-group flex-grow ml-2">
          <label class="form-label mb-0" for="itemMaximo"
            ><b style="color: red">*</b>Estoque Máx</label
          >
          <input
            v-model.number="stepProd.pro_maximo"
            id="itemMaximo"
            type="text"
            class="form-control"
            placeholder="0,00"
            data-mask="#.##0,00"
            data-mask-reverse="true"
          />
        </div>
      </div>
      <div class="page-separator">
        <div class="page-separator__text bg-white text-50 pr-0 pl-0">Saldo inicial</div>
      </div>
      <div class="row justify-content-between gap-1">
        <div class="form-group flex-grow-1">
          <label class="form-label mb-0" for="itemDeposito"
            ><b style="color: red">*</b>Depósito</label
          >
          <select
            v-model.number="stepProd.pro_deposito"
            id="itemDeposito"
            data-toggle="select"
            class="form-control"
          >
            <option :value="-1" selected>Seleciona um depósito</option>
            <option :value="value.dep_id" v-for="(value, index) in allDeposito" :key="index">
              {{ value.dep_nome }}
            </option>
          </select>
        </div>

        <div class="d-flex flex-column form-group">
          <small class="text-center">Não encontrou seu deposito?!</small>
          <ButtonToolTip
            :type="'button'"
            @click.prevent="openModalDeposito"
            :class="'btn-primary btn-md'"
            :button-options="{
              tooltip: 'Cadastrar Deposito',
              icon: ''
            }"
            :content="'Cadastrar deposito'"
          >
          </ButtonToolTip>
        </div>
      </div>
      <div class="row justify-content-between">
        <div class="form-group flex-grow">
          <label class="form-label mb-0" for="itemMaximo"
            ><b style="color: red">*</b>Quantidade</label
          >
          <input
            v-model.number="stepProd.pro_quantidade"
            id="itemQNT"
            type="text"
            class="form-control"
            placeholder="Quantidade EM estoque"
            data-mask="#.##0,00"
            data-mask-reverse="true"
          />
        </div>

        <div class="form-group flex-grow ml-2">
          <label class="form-label mb-0" for="itemMaximo"
            ><span class="text-70"><b style="color: red">*</b>Preço</span> de compra Un.</label
          >
          <input
            v-model.number="stepProd.pro_preco_compra_unidade"
            id="itemMaximo"
            type="text"
            class="form-control"
            placeholder="0,00"
            data-mask="#.##0,00"
            data-mask-reverse="true"
          />
        </div>
      </div>
      <div class="row d-flex flex-column mb-3">
        <label class="form-label">Observação do saldo inicial</label>
        <Editor
          @load="onLoad"
          v-model="stepProd.pro_observacao"
          @text-change="updateContent"
          placeholder="Escreva aqui uma observação referente ao serviço."
          editorStyle="height: 180px"
        />
      </div>
      <div class="page-separator">
        <div class="page-separator__text bg-white text-50 pr-0 pl-0">Fornecedor</div>
      </div>
      <div class="row justify-content-between">
        <div class="form-group flex-grow-1">
          <label class="form-label mb-0" for="itemNomeDoFornecedor"
            ><b style="color: red">*</b>Nome do fornecedor</label
          >
          <select
            v-model.number="stepProd.pro_fornecedor_id"
            id="itemNomeDoFornecedor"
            data-toggle="select"
            class="form-control"
          >
            <option :value="-1">Seleciona o fornecedor</option>
            <option
              :value="value.id"
              selected
              v-for="(value, index) in allForneComput"
              :key="index"
            >
              {{ value.pro_for_nome }}
            </option>
          </select>
        </div>
        <div class="form-group ml-2" style="position: relative; padding-top: 21px">
          <small style="position: absolute; top: 0; right: 14px; text-align: right"
            >Não encontrou seu fornecedor?!</small
          >
          <button
            @click.prevent="openModalFornecedor"
            id="btnCadastrarFornecedor"
            class="btn btn-secondary modal-toggle"
          >
            Cadastrar fornecedor
          </button>
        </div>
      </div>

      <CreateFornecedor @openModalFornecedor="openModalFornecedor"></CreateFornecedor>
      <CreateDeposito @openModalDeposito="openModalDeposito"></CreateDeposito>
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
      <!-- <button type="submit" class="btn btn-success" v-if="currentStep === numberOfSteps">
                CADASTRAR
            </button> -->
    </div>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CreateFornecedor from '../CreateFornecedor.vue'
import { useStepStore } from '@/stores/StepsForm'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useToast } from '@/composables/Toast'
import { getAllFornecedor } from '@/api/actions/Fornecedor'
import type { IError, step4 } from '@/model/Index'
import { useCreateProd } from '@/composables/UseCreateProd'
import ButtonToolTip from '@/components/one-print/ButtonToolTip.vue'
import CreateDeposito from '@/components/form/CreateDeposito.vue'
import { getAllDeposito } from '@/api/actions/Deposito'
import type { EditorLoadEvent } from 'primevue/editor'

const { notifyToast } = useToast()
const { nextStep, goPrevious } = useStepStore()
const {
  currentStep,
  etapaInputsRefs,
  numberOfSteps,
  allForneComput,
  prod,
  allFornecedor,
  allDeposito
} = storeToRefs(useStepStore())
const { stepProd4, updateContent } = useCreateProd()

const fornecedores = ref<[]>()

const qntyLock = ref<number>(0)
const stepProd = ref<step4>(stepProd4.value)
stepProd.value.pro_fornecedor_id = -1
stepProd.value.pro_deposito = -1

//const test = computed(() => allForneComput)
const prodC = computed(() => prod.value)

const step = () => {
  nextStep(stepProd.value, 'step4')
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const etapa = (el: HTMLElement | any) => {
  if (el && !etapaInputsRefs.value.includes(el)) {
    etapaInputsRefs.value.push(el)
  }
}

const openModalFornecedor = () => {
  document.querySelector('#modalCadastrarFornecedor')?.classList.toggle('active')
}

const openModalDeposito = () => {
  document.querySelector('#modalCadastrarDeposito')?.classList.toggle('active')
}

const onLoad = ({ instance }: EditorLoadEvent) => {
  instance.setContents(
    instance.clipboard.convert({
      html: stepProd.value.pro_observacao
    })
  )
}

onMounted(async () => {
  try {
    const { data } = await getAllFornecedor()
    const { data: deposito } = await getAllDeposito()
    fornecedores.value = data
    allFornecedor.value = data
    allDeposito.value = deposito
  } catch (er: unknown) {
    const error = er as IError

    if (error.response === undefined) {
      notifyToast({ msg: 'Erro interno na tentativa do login', typeToast: 'error' })
      return
    } else {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      return
    }
  }
})

watch(prod.value, () => {
  if (
    prodC.value.step1?.stock?.length > 0 &&
    (prodC.value.step1?.pro_categoria_item === 4 || prodC.value.step1?.pro_categoria_item === 9)
  ) {
    stepProd.value.pro_quantidade = 0

    const total: number | any = Array.from(prod.value.step1?.stock).reduce(
      (acc: any = '', item: any) => {
        return acc + item.value
      },
      0
    )

    stepProd.value.pro_quantidade = total
    qntyLock.value = total
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

<style scoped>
.gap-1 {
  gap: 8px;
}
</style>
