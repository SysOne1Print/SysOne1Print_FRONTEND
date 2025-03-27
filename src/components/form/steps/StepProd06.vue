<template>
  <div
    :ref="etapa"
    style="padding: 1rem 1rem 0.25rem"
    class="etapa etapa6 d-none card-body bg-white rounded oneScroll"
  >
    <div class="h5 d-flex justify-content-between mt-0 mb-0 p-0 border-bottom">
      <span class="text-50 mb-0">
        <span class="material-icons text-50 mb-1">visibility</span>
      </span>
      <!-- <span class="h5 text-right mb-0">#0A-35C3PO</span> -->
    </div>
    <div class="col-lg-12 pl-0 pr-0 mt-3 mb-4">
      <div class="alert alert-soft-primary alert-dismissible fade show" role="alert">
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
          style="margin-top: 3px"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="d-flex flex-wrap align-items-start">
          <div class="mr-8pt">
            <i class="material-icons">access_time</i>
          </div>
          <div class="flex" style="min-width: 180px">
            <small class="text-black-100 h-100" style="line-height: 23px">
              <strong>INFO - </strong> Confira os dados que compõem o corpo desse novo item.
            </small>
          </div>
        </div>
      </div>
      <div class="row justify-content-start pl-3 pr-3">
        <h5 class="text-70">Defina a disponibilidade do item</h5>
      </div>

      <div class="row justify-content-start pl-3 pr-3 border-bottom">
        <div class="form-group justify-content-start mt-1">
          <div class="text-70">
            <h6 class="mb-0">O item deve estar disponível?</h6>
          </div>
          <div class="custom-control custom-checkbox-toggle custom-control-inline mr-1">
            <input
              v-model.number="stepProd06.disponivel"
              type="checkbox"
              id="disponibilidadeItem"
              checked
              class="custom-control-input"
            />
            <label class="custom-control-label" for="disponibilidadeItem">SIM</label>
          </div>
          <label class="form-label text-right border-bottom" for="disponibilidadeItem">SIM</label>
        </div>
      </div>
      <div class="row justify-content-center border-bottom pl-3 pr-3 mb-3 mt-3">
        <h4 class="text-uppercase text-70">Dados básicos</h4>
      </div>
      <div class="d-flex flex-column justify-content-between pl-3 pr-3 pb-3 border-bottom">
        <div class="form-group flex-grow-1 mb-0">
          <label
            for="itemNomeInventario"
            class="form-label font-weight-light text-50 mb-0"
            style="font-size: 12px"
            >Nome do Item no inventário:</label
          >
          <p id="itemNomeInventario" class="h5 text-uppercase text-truncate mb-0">
            {{ prodC.step1.pro_nome }}
          </p>
        </div>
        <div class="oneSpace mb-1 mt-1"></div>
        <div
          class="form-group flex-grow-1 mb-0"
          v-if="prodC.step1?.pro_categoria_item === 4 || prodC.step1?.pro_categoria_item === 9"
        >
          <label
            for="itemUniade"
            class="form-label font-weight-light text-50 mb-0"
            style="font-size: 12px"
            >Unidade:</label
          >
          <p id="itemUniade" class="h5 text-uppercase text-truncate mb-0">
            {{ prodC.step1.pro_unidade }}
          </p>
        </div>
        <div
          class="form-group mb-0"
          v-if="prodC.step1?.pro_categoria_item === 4 || prodC.step1?.pro_categoria_item === 9"
        >
          <label
            for="itemPrecoVenda"
            class="form-label font-weight-light text-50 mb-0"
            style="font-size: 12px"
            >Preço de venda:</label
          >
          <p id="itemPrecoVenda" class="h5 text-uppercase text-truncate mb-0">
            {{ prodC.step1?.pro_venda ? real.format(prodC.step1?.pro_venda) : 0 }}
          </p>
        </div>

        <PreviewDTF
          v-if="[1, 2, 3, 5, 6, 7, 8].some((v) => v === prodC.step1?.pro_categoria_item)"
        ></PreviewDTF>

        <div class="oneSpace mb-1 mt-1"></div>
        <div class="form-group flex-grow-1 mb-0">
          <label
            for="itemUniade"
            class="form-label font-weight-light text-50 mb-0"
            style="font-size: 12px"
            >Tipo:</label
          >
          <p id="itemUniade" class="h5 text-uppercase text-truncate mb-0">
            {{ detailsProd?.tipo?.descricao }}
          </p>
        </div>
        <div class="oneSpace mb-1 mt-1"></div>
        <div class="form-group flex-grow-1 mb-0">
          <label
            for="itemUniade"
            class="form-label font-weight-light text-50 mb-0"
            style="font-size: 12px"
            >Categoria:</label
          >
          <p
            id="itemUniade"
            class="h5 text-uppercase text-truncate mb-0"
            v-if="
              (detailsProd?.categoria && prodC.step1?.pro_categoria_item === 4) ||
              prodC.step1?.pro_categoria_item === 9
            "
          >
            {{ detailsProd?.categoria?.prod_tipo_descricao }} [
            <span class="alert alert-soft-secondary border-0" style="font-size: 0.9rem">
              Cor: {{ detailsProd?.cor?.one1_cor_nome }}, Tamanho:
              {{ detailsProd?.tamanho?.one1_tamanho_nome || detailsProd?.tamanho?.nome }}
              <span class="text-lowercase">e</span> Tecido:
              {{ detailsProd?.tecido?.one1_tecido_nome }}
            </span>
            ]
          </p>
          <p id="itemUniade" class="h5 text-uppercase text-truncate mb-0" v-else>
            {{ detailsProd.categoria?.prod_tipo_descricao }}
          </p>
        </div>
      </div>
      <div class="row justify-content-center border-bottom pl-3 pr-3 mb-3 mt-3">
        <h5 class="text-uppercase text-70">Características</h5>
      </div>
      <div class="row justify-content-between border-bottom pl-3 pr-3 pb-3">
        <div class="form-group flex-grow-1 mb-0">
          <label
            for="itemFreteGts"
            class="form-label font-weight-light text-50 mb-0"
            style="font-size: 12px"
            >Frete grátis:</label
          >
          <p id="itemFreteGts" class="h5 text-uppercase text-truncate mb-0">
            {{ prodC.step2.pro_frete ? 'Sim' : 'Não' }}
          </p>
        </div>
      </div>
      <div class="row justify-content-center border-bottom pl-3 pr-3 mb-3 mt-3">
        <h5 class="text-uppercase text-70">Imagens</h5>
      </div>
      <div class="row justify-content-between pl-3 pr-3">
        <div class="form-group flex-grow-1 mb-0">
          <label
            for="itemImgPrincipal"
            class="form-label font-weight-light text-50 mb-0"
            style="font-size: 12px"
            >Imagem principal:</label
          >
          <p id="itemImgPrincipal" class="h5 text-uppercase text-truncate mb-0">
            {{ objectImg[0]?.nameImg }}
          </p>
        </div>
        <img
          class="ImagemRefItem"
          :src="objectImg[0]?.img"
          alt="Imagem 01 da lista de imagens do item."
          v-if="objectImg.length > 0"
        />
      </div>
      <div class="oneSpace mb-1 mt-1"></div>
      <!-- Se não constar imagens-->
      <span class="text-70">//Outras imagens carregadas:</span>
      <!-- Se não constar imagens, esse span troca para:
                        "Não foram inseridas imagens nesse item, volte para a Etapa 3."

                        Atente-se em adicionar a classe ".naoTemImg" na row.
                      -->
      <div class="oneSpace mb-1 mt-1"></div>
      <div
        class="row justify-content-around p-3 ml-0 mr-0 border bg-light"
        :class="{ naoTemImg: objectImg.length < 1 && prodC.alreadyExistImg?.length > 0 }"
      >
        <span v-if="objectImg.length < 1 && prodC.alreadyExistImg?.length > 0">
          Não foram inseridas imagens nesse item, volte para a Etapa 3.
        </span>
        <img
          class="selectImagemRefItem"
          :src="value.img"
          v-for="(value, index) in imgComputed"
          :key="index"
          alt="OneprintImg"
        />

        <div v-if="prodC.step3.alreadyExistImg?.length > 0">
          <img
            class="selectImagemRefItem ImagemRefItem"
            :src="value.url"
            v-for="(value, index) in alreadyImg"
            :key="index"
            alt="OneprintImg"
          />
        </div>
      </div>
      <div class="oneSpace mb-1 mt-1"></div>
      <div class="row justify-content-center border-bottom pl-3 pr-3 mb-3 mt-3">
        <h5 class="text-uppercase text-70">Fornecedor</h5>
      </div>
      <div class="row justify-content-between pl-3 pr-3">
        <div class="form-group flex-grow-1 mb-0">
          <label
            for="itemNomeFornecedor"
            class="form-label font-weight-light text-50 mb-0"
            style="font-size: 12px"
            >Nome do fornecedor:</label
          >
          <p id="itemNomeFornecedor" class="h5 text-uppercase text-truncate mb-0">
            {{ forne?.pro_for_nome }}
          </p>
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
      <button
        @click.prevent="$emit('alterProduto', stepProd06, $event)"
        type="submit"
        class="btn btn-success"
        v-if="currentStep === numberOfSteps && route.name === 'Alterar Produtos'"
      >
        Alterar Produto
      </button>
      <button
        @click.prevent="$emit('createProduto', stepProd06, $event)"
        type="submit"
        class="btn btn-success"
        v-if="currentStep === numberOfSteps && route.name != 'Alterar Produtos'"
      >
        CADASTRAR
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStepStore } from '@/stores/StepsForm'
import { storeToRefs } from 'pinia'
import { computed, onUnmounted, ref, watch, type PropType } from 'vue'
import { uploadImagem } from '@/composables/Upload-base64'
import type { details, IUploadImagem } from '@/model/Index'
import { useCreateProd } from '@/composables/UseCreateProd'
import { useRoute } from 'vue-router'
import PreviewDTF from './impressao/PreviewDTF.vue'
defineProps({
  detailsProd: { type: Object as PropType<details>, required: true }
})
const route = useRoute()
const { goPrevious } = useStepStore()
const { currentStep, numberOfSteps, prod, allForneComput, etapaInputsRefs } =
  storeToRefs(useStepStore())
const { create, objectImg } = uploadImagem()
const { stepProd6 } = useCreateProd()

let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})
const stepProd06 = ref(stepProd6.value)

const prodC = computed(() => prod.value)
const forne = computed(() =>
  allForneComput.value.find((v) => v.id === prodC.value.step4.pro_fornecedor_id)
)
const imgComputed = computed(() => {
  return objectImg.value?.filter((v: IUploadImagem, index: number) => {
    if (index !== 0) return v
  })
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const etapa = (el: HTMLElement | any) => {
  if (el && !etapaInputsRefs.value.includes(el)) {
    etapaInputsRefs.value.push(el)
  }
}

const alreadyImg = computed(() => {
  return Array.from(
    prodC.value.step3?.alreadyExistImg as Array<{ id: number; url: string; url_deleted: boolean }>
  ).filter((v) => v.url_deleted === false)
})

watch(prod.value, () => {
  if (prodC.value.step3.galeria?.length >= 0) {
    objectImg.value = []
    Array.from(prodC.value.step3?.galeria).forEach((v) => {
      create(v)
    })
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
.ImagemRefItem {
  position: relative;
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>
