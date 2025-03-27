<template>
  <div class="modal-container">
    <slot name="header"></slot>

    <form ref="reset" action="post" @submit.prevent="replaceLayout(false)" @reset="resetForm">
      <div class="flex flex-column" style="max-width: 100%">
        <DropzoneItem
          ref="fileInput"
          :active-drop="active"
          @dragenter="toggleActive"
          @dragleave="toggleActive"
          @drop.prevent="drop"
          :accept-file="'image/*,.pdf'"
          :multiple-file="true"
          class="dropzone-multiple w-100 mb-0"
          @change="selectedFile"
          required
        />

        <ListUploadItem :files-orc="objectImg" @remove-img="removeItemUpload"></ListUploadItem>
      </div>

      <div class="form-group">
        <label class="form-label" for="obsReposicao">Motivo da reposição:</label>
        <input
          required
          v-model="productExpedition.observReplacement"
          type="text"
          class="form-control"
          id="obsReposicao"
          placeholder="Observação curta .."
        />
      </div>

      <div class="form-group d-flex flex-row justify-content-between">
        <button
          type="submit"
          class="btn btn-accent"
          @click.prevent="
            backSectors({
              oit_id: orcamento?.oit_id as number,
              orc_id: orcamento?.orc_id as number,
              orcamento_status: {
                ost_id: orcamento?.orcamento_status.ost_id as number
              },
              user_usucadastro: userData.user_id
            })
          "
        >
          Salvar e devolver para a produção
        </button>
        <button type="submit" class="btn btn-primary">Salvar alteração</button>
      </div>
    </form>
    <!-- Fim do conteúdo Reposição -->
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import DropzoneItem from '@/components/one-print/DropzoneItem.vue'
import { uploadImagem } from '@/composables/Upload-base64'
import type { IError, IOrcamentoStage } from '@/model/Index'
import { onBeforeUnmount, onMounted, ref, toRefs, type PropType } from 'vue'
import ListUploadItem from '@/components/one-print/ListUploadItem.vue'
import { replacement_layout } from '@/api/actions/Production'
import { useLoginStore } from '@/stores/LoginStore'
import { useToast } from '@/composables/Toast'

const prop = defineProps({
  orcamento: { type: Object as PropType<IOrcamentoStage | undefined> }
})

const emit = defineEmits(['fnActionCall', 'closeModal', 'back-sectors'])

const { orcamento } = toRefs(prop)

const { notifyToast } = useToast()
const { userData } = useLoginStore()
const {
  fileImgBase64,
  objectImg,
  removeItemUpload,
  resetItem,
  objectFile,
  handlePaste,
  fileInput
} = uploadImagem()

const active = ref<boolean>(false)
const productExpedition = ref<{ arquivos: unknown; orc_id: number; observReplacement: string }>({
  arquivos: '',
  orc_id: 0,
  observReplacement: ''
})

const reset = ref<HTMLElement>()

const selectedFile = (evt: HTMLInputElement | any) => {
  let dropzone = evt.target.files.length > 0 ? evt.target.files : evt || evt.files

  fileImgBase64(dropzone as FileList)
  //const file: any = [...objectImg.value]
  productExpedition.value.arquivos = objectFile.value as unknown

  dropzone = null
}

const drop = (el: DragEvent) => {
  el.preventDefault()
  active.value = false

  // Verifica se há arquivos e os captura
  const files = el.dataTransfer?.files
  if (files) {
    fileImgBase64(files)
    productExpedition.value.arquivos = objectFile.value as unknown
  }
}

const toggleActive = () => {
  active.value = true
}

const replaceLayout = async (check: boolean = false) => {
  // eslint-disable-next-line no-undef
  let xcontado: NodeJS.Timeout
  const dados = new FormData()
  try {
    if (orcamento?.value) {
      dados.append('oit_id', orcamento.value.oit_id.toString())
      dados.append('orc_id', orcamento.value.orc_id.toString())
      dados.append('observacao', productExpedition.value.observReplacement)
      dados.append('user_id', userData.user_id.toString())

      objectFile.value.forEach((v) => {
        dados.append('item', v)
      })

      const { data, status } = await replacement_layout(dados)
      if (status === 200) {
        if (!check) {
          emit('fnActionCall')
        }

        emit('closeModal')
        xcontado = setTimeout(() => {
          notifyToast({ msg: data.msg, typeToast: 'success' })
          clearTimeout(xcontado)
        }, 350)
      }

      resetForm()
    }

    return
  } catch (er: unknown) {
    const error = er as IError
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro interno na tentativa de busca', typeToast: 'error' })
      return
    }
    if (error.response.status === 404) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })

      return
    } else {
      notifyToast({ msg: 'Erro interno ', typeToast: 'error' })
      return
    }
  }
}

const backSectors = async (replace: {
  oit_id: number
  orc_id: number
  orcamento_status: {
    ost_id: number
  }
  user_usucadastro: number
}) => {
  await replaceLayout(true)
  emit('back-sectors', {
    oit_id: replace?.oit_id,
    orc_id: replace?.orc_id,
    ost_id: replace?.orcamento_status.ost_id,
    user_usucadastro: userData.user_id
  })
}

const resetForm = () => {
  resetItem()
  productExpedition.value.observReplacement = ''
}

const handlerCopyFile = (event: any) => {
  handlePaste(event)
  productExpedition.value.arquivos = objectFile.value
}

onMounted(() => {
  document.addEventListener('paste', handlerCopyFile)
})

onBeforeUnmount(() => {
  document.removeEventListener('paste', handlerCopyFile)
})
</script>

<style scoped></style>
