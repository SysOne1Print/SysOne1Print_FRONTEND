<template>
  <div
    :ref="etapa"
    style="padding: 1rem 1rem 0.25rem"
    class="etapa etapa5 d-none card-body card-minimoH bg-white rounded oneScroll"
  >
    <!-- STEP 5 - Tributação -->
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
          <label class="form-label mb-0" for="itemOrigem">Origem</label>
          <select
            v-model.number="stepProd.pro_origem"
            id="itemOrigem"
            data-toggle="select"
            class="form-control"
          >
            <option value="0" selected>
              0 - Nacional, exceto as indicadas nos códigos 3, 4, 5 e 8
            </option>
            <option value="1">1 - Estrangeira</option>
            <option value="2">2 - Estrangeira</option>
            <option value="3">3 - Nacional</option>
            <option value="4">4 - Nacional</option>
            <option value="5">5 - Nacional</option>
            <option value="6">6 - Estrangeira</option>
            <option value="7">7 - Nacional</option>
            <option value="8">8 - Estrangeira</option>
            <option value="9">9 - Estrangeira</option>
            <option value="10">10 - Nacional</option>
          </select>
        </div>
      </div>
      <div class="row justify-content-between">
        <div class="form-group flex-grow-1">
          <label class="form-label mb-0" for="itemNCM">NCM</label>
          <input
            v-model.number="stepProd.pro_fiscal_ncm"
            type="text"
            class="form-control"
            id="itemNCM"
            placeholder=".."
          />
        </div>
        <div class="form-group flex-grow-1 ml-2">
          <label class="form-label mb-0" for="itemCEST">CEST</label>
          <input
            v-model.number="stepProd.pro_fiscal_cest"
            type="text"
            class="form-control"
            id="itemCEST"
            placeholder=".."
          />
        </div>
      </div>
      <div class="row justify-content-between">
        <div class="form-group flex-grow-1">
          <label class="form-label mb-0" for="itemTipoItemTributacao"
            ><b style="color: red">*</b>Tipo do item</label
          >
          <select
            v-model.number="stepProd.pro_fiscal_tipo"
            id="itemTipoItemTributacao"
            data-toggle="select"
            class="form-control"
          >
            <option value="" disabled selected>Seleciona um tipo</option>
            <option :value="value.id" v-for="(value, index) in notafiscalTipo" :key="index">
              {{ value.nome }}
            </option>
          </select>
        </div>
        <div class="form-group flex-grow-1 ml-2">
          <label class="form-label mb-0" for="itemPercentTributo">% tributos</label>
          <input
            v-model.number="stepProd.pro_fiscal_tributo"
            type="text"
            class="form-control"
            id="itemPercentTributo"
            placeholder=".."
          />
        </div>
        <div class="form-group flex-grow-1 ml-2">
          <label class="form-label mb-0" for="itemGrupoProduto"
            ><b style="color: red">*</b>Grupo de Produtos</label
          >
          <select
            v-model.number="stepProd.pro_grupo_produto"
            id="itemGrupoProduto"
            data-toggle="select"
            class="form-control"
          >
            <option value="" disabled selected>Seleciona um grupo de produtos</option>
            <option :value="value.id" v-for="(value, index) in grupoComputed" :key="index">
              {{ value.nome_grupo }}
            </option>
          </select>

          <a style="cursor: pointer" @click="openModelGrupo" class="h6 text-primary modal-toggle"
            >Gerenciar grupo de produtos</a
          >
        </div>
        <ModalGerenciarProd
          :all-grupo="grupoComputed"
          :select_grupo="selectGrupo"
          @closeModal="openModelGrupo"
          @update-list-group="updateListGroup"
          @delete-group="deleteGroup"
          @get-group="getGrupo"
          @create-group="createGroup"
        ></ModalGerenciarProd>
      </div>
      <div class="page-separator">
        <div class="page-separator__text bg-white text-50 pr-0 pl-0">ICMS</div>
      </div>
      <div class="row justify-content-center">
        <div class="form-group flex-grow-1">
          <label class="form-label mb-0" for="valorBaseICMS-ST"
            >Valor base ICMS ST - retenção</label
          >
          <input
            v-model.number="stepProd.pro_fiscal_base_icms"
            type="text"
            class="form-control"
            id="valorBaseICMS-ST"
            placeholder=".."
          />
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="form-group flex-grow-1">
          <label class="form-label mb-0" for="valorBaseICMS-ST-pRetencao"
            >Valor base ICMS ST - para retenção</label
          >
          <input
            v-model.number="stepProd.pro_fiscal_base_icmsSt"
            type="text"
            class="form-control"
            id="valorBaseICMS-ST-pRetencao"
            placeholder=".."
          />
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="form-group flex-grow-1">
          <label class="form-label mb-0" for="valorICMSproprioSubstituto"
            >Valor ICMS próprio do substituto</label
          >
          <input
            v-model.number="stepProd.pro_fiscal_icms_substituto"
            type="text"
            class="form-control"
            id="valorICMSproprioSubstituto"
            placeholder=".."
          />
        </div>
      </div>
      <div class="page-separator">
        <div class="page-separator__text bg-white text-50 pr-0 pl-0">IPI</div>
      </div>
      <div class="row justify-content-center">
        <div class="form-group flex-grow-1">
          <label class="form-label mb-0" for="codigoExcecaoTipi">Código exceção da TIPI</label>
          <input
            v-model.number="stepProd.pro_fiscal_excecaoTipi"
            type="text"
            class="form-control"
            id="codigoExcecaoTipi"
            placeholder=".."
          />
        </div>
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
      <!-- <button type="submit" class="btn btn-success" v-if="currentStep === numberOfSteps">
                CADASTRAR
            </button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalGerenciarProd from '@/components/modal-content/Modal-gerenciar-prod.vue'
import { useCreateProd } from '@/composables/UseCreateProd'
import { useGrupoProduto } from '@/composables/UseGrupoProduto'
import type { IGrupo } from '@/model/Index'
import { useStepStore } from '@/stores/StepsForm'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref } from 'vue'

const { nextStep, goPrevious } = useStepStore()
const { currentStep, numberOfSteps, etapaInputsRefs } = storeToRefs(useStepStore())
const { stepProd5 } = useCreateProd()
const { getGrupo, grupoComputed, editarGrupo, grupo, createGrupo, deleteGrupoFn } =
  useGrupoProduto()

const notafiscalTipo = ref([
  {
    id: 1,
    nome: 'Mercadoria para Revenda'
  },
  {
    id: 2,
    nome: 'Matéria-Prima'
  },
  {
    id: 3,
    nome: 'Embalagem'
  },
  {
    id: 4,
    nome: 'Produto em Processo'
  },
  {
    id: 5,
    nome: 'Produto Acabado'
  },
  {
    id: 6,
    nome: 'Subproduto'
  },
  {
    id: 7,
    nome: 'Produto Intermediário'
  },
  {
    id: 8,
    nome: 'Material de Uso e Consumo'
  },
  {
    id: 9,
    nome: 'Ativo imobilizado'
  },
  {
    id: 10,
    nome: 'Serviços'
  },
  {
    id: 11,
    nome: 'Outros insumos'
  },
  {
    id: 12,
    nome: 'Outras'
  }
])

const stepProd = ref(stepProd5.value)
const selectGrupo = ref(0)

const step = () => {
  nextStep(stepProd.value, 'step5')
}

const updateListGroup = async (grupoEdit: IGrupo) => {
  grupo.value = grupoEdit
  await editarGrupo()
  //await getGrupo()
}

const deleteGroup = async (idx: number) => {
  const delGrupo = await deleteGrupoFn(idx)
  if (delGrupo && delGrupo.status === 200) {
    selectGrupo.value = 0
  }
}

const createGroup = async (grupoCreate: IGrupo) => {
  grupo.value = grupoCreate
  await createGrupo()
}

const openModelGrupo = () => {
  document.querySelector('#modalGerGrupoProdutos')?.classList.toggle('active')
  //allGrupo.value = event
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const etapa = (el: HTMLElement | any) => {
  if (el && !etapaInputsRefs.value.includes(el)) {
    etapaInputsRefs.value.push(el)
  }
}

onMounted(async () => {
  await getGrupo()
})

onUnmounted(() => {
  useStepStore().removeAllDom()
  useStepStore().$reset()
})

// onBeforeUpdate(() => {
//   etapaInputsRefs.value = []
// })
</script>

<style scoped></style>
