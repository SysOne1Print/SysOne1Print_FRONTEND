<template>
  <div :ref="etapa" style="padding: 1rem 1rem 0.25rem"
    class="etapa etapa3 d-none card-body card-minimoH bg-white rounded oneScroll">
    <!-- STEP 3 - Imagens -->
    <div class="w-100 d-flex justify-content-end">
      <small class="o-size text-right text-50 mb-0 mt-0">AO CONFIRMAR O CADASTRO, O ITEM OCUPARÁ ESSE CÓDIGO DE
        PRODUTO</small>
    </div>
    <div class="h5 d-flex justify-content-between mt-0 mb-0 p-0 border-bottom">
      <span class="text-50 mb-0">
        <span class="material-icons text-50 mb-1">attach_file</span>
      </span>
      <span class="h5 text-right mb-0"></span>
    </div>
    <div class="col-lg-12 mt-3 mb-4">
      <span style="font-weight: 600"><b style="color: red">*</b> Obrigatório</span>
      <div class="row justify-content-between">
        <DropzoneItem id="galeria" ref="fileInput" name="galeria" :accept-file="'image/*'" :multiple-file="true"
          class="dropzone-multiple w-100 mb-24pt" :active-drop="active" @change="selectedFile" @dragenter="toggleActive"
          @dragleave="toggleActive" @drop.prevent="drop" />

        <ul class="dz-preview dz-preview-multiple list-group list-group-flush mt-16pt w-100">
          <li class="list-group-item" v-for="(value, index) in objectImg" :key="index">
            <div class="form-row align-items-center mb-2">
              <div class="col-auto">
                <div class="avatar">
                  <img :src="value.img" class="avatar-img rounded" :alt="value.nameImg" />
                </div>
              </div>
              <div class="col">
                <div class="font-weight-bold">
                  {{ value.nameImg }}
                </div>
                <p class="small text-muted mb-0">tamanho: {{ sizeCalculate(value.size) }}</p>
              </div>
              <div class="col-auto">
                <a role="button" @click.prevent="removeItem(value)" class="text-muted-light">
                  <i class="material-icons">close</i>
                </a>
              </div>
            </div>
          </li>
        </ul>
        <hr class="w-100 m-0" />
        <ul class="list-group list-group-flush mt-16pt w-100">
          <li class="list-group-item" v-for="(value, index) in imgAlready" :key="index">
            <div class="form-row align-items-center mb-2">
              <div class="col-auto">
                <div class="avatar">
                  <img :src="value.url.toString()" class="avatar-img rounded"
                    :alt="value.url.split('/image/')[value.url.split('/image/').length - 1]" />
                </div>
              </div>
              <div class="col">
                <div class="font-weight-bold">
                  {{ value.url.split('/image/')[value.url.split('/image/').length - 1] }}
                </div>
              </div>
              <div class="col-auto">
                <a role="button" @click.prevent="removeItemExist(value)" class="text-muted-light">
                  <i class="material-icons">close</i>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="card-footer d-flex flex-row justify-content-between">
      <button @click.prevent="goPrevious" class="btn btn-secondary" :class="{ disabled: currentStep === 1 }"
        :disabled="currentStep === 1 ? true : false">
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
import { useStepStore } from '@/stores/StepsForm'
import DropzoneItem from '@/components/one-print/DropzoneItem.vue'
import { uploadImagem } from '@/composables/Upload-base64'
import { storeToRefs } from 'pinia'
import { computed, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import { sizeCalculate } from '@/util/SizeFile'
import type { IUploadImagem } from '@/model/Index'
import { useCreateProd } from '@/composables/UseCreateProd'

const { fileImgBase64, objectImg, removeItemUpload, objectFile, handlePaste, fileInput } = uploadImagem()
const { stepProd3 } = useCreateProd()
const { nextStep, goPrevious } = useStepStore()
const { currentStep, numberOfSteps, etapaInputsRefs } = storeToRefs(useStepStore())

const stepProd = ref<{
  galeria: Array<unknown> | string
  alreadyExistImg: Array<{ id: number; url: string; url_deleted: boolean }>
}>(stepProd3.value)
const active = ref<boolean>(false)

const step = () => {
  nextStep(stepProd.value, 'step3')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const etapa = (el: HTMLElement | any) => {
  if (el && !etapaInputsRefs.value.includes(el)) {
    etapaInputsRefs.value.push(el)
  }
}

const imgAlready = computed(() => stepProd.value?.alreadyExistImg?.filter((v) => !v.url_deleted))

const selectedFile = () => {
  const dropzone: HTMLInputElement = document.querySelector('.dropzoneFile') as HTMLInputElement
  fileImgBase64(dropzone.files as FileList)
  stepProd.value.galeria = [...objectFile.value]
}

const drop = (el: DragEvent) => {
  el.preventDefault()
  active.value = false

  // Verifica se há arquivos e os captura
  const files = el.dataTransfer?.files
  if (files) {
    fileImgBase64(files)
    stepProd.value.galeria = [...objectFile.value]
  }
}

const toggleActive = () => {
  active.value = true
}

const removeItem = (value: IUploadImagem) => {
  removeItemUpload(value)
  stepProd.value.galeria = objectFile.value
}

const removeItemExist = (value: unknown) => {
  const item = stepProd.value.alreadyExistImg.find((n) => n === value)
  if (item) {
    item.url_deleted = true
    // Atualização controlada do estado para evitar loops
    stepProd.value = { ...stepProd.value }
  }
}

const handlerCopyFile = (event: any) => {
  handlePaste(event)
  stepProd.value.galeria = objectFile.value
}

onUnmounted(() => {
  if (useStepStore().etapaInputsRefs.length > 0) {
    useStepStore().removeAllDom()
  }
  useStepStore().$reset()
})

onMounted(() => {
  document.addEventListener("paste", handlerCopyFile);

});

onBeforeUnmount(() => {
  document.removeEventListener("paste", handlerCopyFile);
});
</script>

<style scoped></style>
