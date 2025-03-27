<template>
  <div class="modal-content oneScroll">
    <div class="modal-top">
      <span class="modal-close" @click.prevent="$emit('closeModal', $event)">×</span>
    </div>
    <div class="modal-container">
      <div class="linhaDyID w-100 d-flex flex-column border-bottom">
        <h4 class="mb-0">{{ cliente?.cli_nome }}</h4>
        <p>
          Adicionar SALDO na carteira
          <span class="font-weight-bold">{{ cliente?.cli_id }}</span>
        </p>
      </div>
      <form @submit.prevent="createCartOne" @reset="reset" ref="resetForm">
        <div
          class="linhaDyID w-100 d-flex flex-row justify-content-between mt-3 pb-3 border-bottom"
        >
          <div class="form-group aSld">
            <input
              type="text"
              class="form-control addSaldoTxt"
              v-model="client.cli_saldo_carteira"
              @change="checkBalanceWithoutPix"
              placeholder="R$"
              oninvalid="setCustomValidity('Preencha o valor do saldo');"
              oninput="setCustomValidity('');"
              required
            />
            <ButtonToolTip
              :type="'submit'"
              :class="'btn-primary btn-md'"
              :button-options="{
                tooltip: 'Gerar QRCODE.',
                icon: 'fas fa-qrcode'
              }"
            >
            </ButtonToolTip>
          </div>
        </div>

        <div
          class="w-100 d-flex flex-column justify-content-center mt-3 pb-3 border-bottom"
          v-if="qrCode.check"
        >
          <div class="d-flex justify-content-between">
            <vue-qrious width="100" height="auto" :value="qrCode.base64" />

            <div class="d-flex flex-column align-self-center">
              <span class="qrCode">
                {{ real.format(parseFloat(replyValueCart.toString())) }}
                <i class="fas fa-qrcode"></i>
              </span>

              <span class="company">ONE1 PRINT LTDA</span>
            </div>
          </div>
        </div>

        <div v-if="qrCode.btnClick" class="d-flex justify-content-center mt-2">
          <span class="fs-1">Gerando QRCode...</span>
        </div>

        <div class="w-100 d-flex flex-row justify-content-between mt-3 pb-3 border-bottom">
          <span class="flex-grow">Última transação</span>
          <span>01/01/2024 10:36</span>
        </div>

        <div
          class="linhaDyID w-100 d-flex flex-column mt-3"
          v-if="qrCode.btnClick || qrCode.comprovante"
        >
          <DropzoneItem
            :active-drop="active"
            @dragenter="toggleActive"
            @dragleave="toggleActive"
            @drop.prevent="drop"
            :accept-file="'image/*'"
            :multiple-file="true"
            class="dropzone-multiple w-100 mb-24pt"
            @change="selectedFile"
          />

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
                  <p class="small text-muted mb-0">tamanho:</p>
                </div>
                <div class="col-auto">
                  <a role="button" @click="removeItemUpload(value)" class="text-muted-light">
                    <i class="material-icons">close</i>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="linhaDyID w-100 d-flex flex-column mt-3">
          <div class="form-group mb-0">
            <div class="w-100 d-flex flex-row justifycontent-between align-items-center">
              <button
                @click="sendingComprovante"
                type="button"
                class="btn btn-primary flex-grow mr-2"
              >
                <i class="fas fa-print mr-2"></i> <span>Anexar comprovante</span>
              </button>
              <button
                v-if="!checkBalance.check"
                @click.prevent="reset"
                class="btn btn-light flex-grow"
                :disabled="!qrCode.check"
                type="reset"
              >
                <i class="fas fa-check mr-2"></i> <span>Concluir</span>
              </button>

              <button
                type="button"
                @click.prevent="createBalanceWithoutPix"
                v-else
                class="btn btn-success flex-grow"
              >
                <i class="fas fa-check mr-2"></i> <span>Adicionar saldo</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/Toast'
import { useUpload } from '@/composables/Upload'
import type { IClient, IError } from '@/model/Index'
import { useLoginStore } from '@/stores/LoginStore'
import { ref, toRefs, type PropType } from 'vue'
import ButtonToolTip from '../one-print/ButtonToolTip.vue'
import { createQRCodeCart } from '@/api/actions/Payment'
import VueQrious from 'vue-qrious'
import { uploadImagem } from '@/composables/Upload-base64'
import DropzoneItem from '@/components/one-print/DropzoneItem.vue'
import { uploadPostComprovante } from '@/api/actions/Upload'

const prop = defineProps({
  cliente: { type: Object as PropType<IClient>, required: true, default: Object }
})

const { fileImgBase64, objectImg, removeItemUpload, objectFile, resetItem } = uploadImagem()
const { checkItem, empty, fileDirectory } = useUpload()
const { cliente } = toRefs(prop)
const { notifyToast } = useToast()
const { userData } = useLoginStore()
defineEmits(['update:valueCart', 'closeModal'])

const resetForm = ref()

const client = ref<{ cli_saldo_carteira: number | string }>({
  cli_saldo_carteira: ''
})

let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

const active = ref<boolean>(false)
const qrCode = ref<{
  comprovante: boolean
  check: boolean
  base64: string
  qrInput: string
  btnClick: boolean
}>({
  check: false,
  base64: '',
  qrInput: '',
  btnClick: false,
  comprovante: false
})

const checkBalance = ref<{ check: boolean; params: string }>({
  check: false,
  params: 'typeCartBalance'
})

const replyValueCart = ref<string | number>('')

const selectedFile = () => {
  const dropzone: HTMLInputElement = document.querySelector('.dropzoneFile') as HTMLInputElement
  fileImgBase64(dropzone.files as FileList)
}

const sendingComprovante = async () => {
  //upload de comprovante
  try {
    let comprovante_id = 0
    const formData = new FormData()

    if (objectImg.value.length > 0 && cliente?.value) {
      formData.append('nome', cliente.value.cli_nome)
      formData.append('user_id', userData.user_id.toString())
      formData.append('cli_id', Number(cliente.value.cli_id).toString())

      objectFile.value.forEach((item) => {
        formData.append('comprovante', item)
      })

      const { data, status } = await uploadPostComprovante(formData)
      fileDirectory.value.id_comprovante = data.comprovante
      comprovante_id = data.comprovante
      if (status === 200)
        notifyToast({ msg: 'Comprovante enviado com sucesso!', typeToast: 'success' })
      return comprovante_id
    } else {
      notifyToast({ msg: 'Não foi selecionado uma imagem', typeToast: 'error' })
      return comprovante_id
    }
  } catch (er: unknown) {
    const error = er as IError
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro ao enviar comprovante', typeToast: 'error' })
      return
    }
    notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
  }
}

const createBalanceWithoutPix = async () => {
  try {
    let nome: string = ''
    let cpf: string = ''
    let cnpj: string = ''
    if (cliente?.value?.cli_cnpj_and_cpf.length === 14) {
      nome = cliente.value.cli_nome_fantasia
      cnpj = cliente.value.cli_cnpj_and_cpf
    }
    if (cliente?.value?.cli_cnpj_and_cpf.length === 11) {
      nome = cliente.value.cli_nome
      cpf = cliente.value.cli_cnpj_and_cpf
    }

    //descomentar futuramente
    await sendingComprovante()

    const { data, status } = await createQRCodeCart(checkBalance.value.params, {
      valor: parseFloat(
        client.value.cli_saldo_carteira.toString().replace(/\./g, '').replace(',', '.')
      ),
      id_usuario: userData.user_id,
      id_client: Number(cliente?.value?.cli_id),
      cnpj: cnpj,
      cpf: cpf,
      nome: nome,
      comprovante: fileDirectory.value.id_comprovante
    })

    if (status === 200) {
      notifyToast({ msg: data.msg, typeToast: 'success' })
    }

    //reset()
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      if (error.response.status === 404) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }
      if (error.response.status === 409) {
        notifyToast({
          msg: 'Erro ao cadastrar cliente, pois o formulario nao foi preenchido corretamente',
          typeToast: 'error'
        })
      } else {
        notifyToast({ msg: 'Erro ao cadastrar saldo em espera', typeToast: 'error' })
      }
    }
  } finally {
    checkItem.value = false
    reset()
    //qrCode.value.btnClick = false
  }
}

const checkBalanceWithoutPix = () => {
  qrCode.value.comprovante = true
  checkBalance.value.check = true
  checkBalance.value.params = `typeCartBalance=dinheiro`
}

const createCartOne = async () => {
  qrCode.value.btnClick = true
  checkBalance.value.check = false

  try {
    let nome: string = ''
    let cpf: string = ''
    let cnpj: string = ''
    let removeCaractersCPFandCNPJ = cliente?.value?.cli_cnpj_and_cpf.replace(
      /[\s~`!@#$%^&*()_+\-={[}\]|\\:;"'<,>.?/]+/g,
      ''
    )
    if (removeCaractersCPFandCNPJ?.length === 14) {
      nome = cliente?.value?.cli_nome_fantasia as string
      cnpj = removeCaractersCPFandCNPJ
    }
    if (removeCaractersCPFandCNPJ?.length === 11) {
      nome = cliente?.value?.cli_nome as string
      cpf = removeCaractersCPFandCNPJ
    }

    if (!checkBalance.value.check && qrCode.value.btnClick) {
      checkBalance.value.params = `typeCartBalance=pix`
    }

    const { data, status } = await createQRCodeCart(checkBalance.value.params, {
      valor: parseFloat(
        client.value.cli_saldo_carteira.toString().replace(/\./g, '').replace(',', '.')
      ),
      id_usuario: userData.user_id,
      id_client: Number(cliente?.value?.cli_id),
      cnpj: cnpj,
      cpf: cpf,
      nome: nome
    })

    if (status === 200) {
      notifyToast({ msg: data.msg, typeToast: 'success' })
    }

    if (qrCode.value.btnClick) {
      qrCode.value.check = true
      replyValueCart.value = client.value.cli_saldo_carteira
        .toString()
        .replace(/\./g, '')
        .replace(',', '.')
      const pix = data.pix
      qrCode.value.base64 = pix.brcode
      qrCode.value.qrInput = pix.brcode
      qrCode.value.btnClick = false
    }
  } catch (er: unknown) {
    const error = er as IError
    console.log(error)
    if (error.response !== undefined) {
      if (error.response.status === 404) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }
      if (error.response.status === 409) {
        notifyToast({
          msg: 'Erro ao cadastrar cliente, pois o formulario nao foi preenchido corretamente',
          typeToast: 'error'
        })
      } else {
        notifyToast({ msg: 'Erro ao cadastrar cliente', typeToast: 'error' })
      }
    }
  } finally {
    checkItem.value = false
  }
}

const reset = () => {
  client.value.cli_saldo_carteira = ''
  qrCode.value.btnClick = false
  qrCode.value.comprovante = false
  qrCode.value.qrInput = ''
  qrCode.value.check = false
  qrCode.value.base64 = ''
  active.value = false
  replyValueCart.value = ''
  checkBalance.value.check = false
  resetItem()
  resetForm.value.reset()
  empty()
}

const toggleActive = () => {
  active.value = true
}

const drop = (el: DragEvent) => {
  el.preventDefault()
  active.value = false

  // Verifica se há arquivos e os captura
  const files = el.dataTransfer?.files
  if (files) {
    fileImgBase64(files)
  }
}
</script>

<style scoped>
.qrCode {
  position: relative;
  width: 100%;
  height: auto;
  color: rgba(0, 0, 0, 0.7);
  background-size: contain;
  background-repeat: no-repeat;
  font-size: 20pt;
  text-align: right;
}

.company {
  color: grey;
  font-size: 12pt;
  text-align: right;
  padding: 0;
}

.fs-1 {
  font-size: 1.25rem;
}
</style>
