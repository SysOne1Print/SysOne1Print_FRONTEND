<template>
  <div class="col-lg-7">
    <div class="card card-group-row__card">
      <div class="card-body">
        <h3 class="text-40 mb-0 d-flex justify-content-between">
          CÓDIGO DO PEDIDO
          <span class="text-100 text-monospace">#{{ Number(route.params.id) }}</span>
        </h3>
        <div>
          <p class="text-70 text-monospace h6 mb-0">Cliente:</p>
          <p class="text-100 text-monospace h5 mb-0">{{ clientUpdate?.cli_nome }}</p>
        </div>
        <div>
          <p class="text-70 text-monospace h6 mb-0">Empresa:</p>
          <p class="text-100 text-monospace h5 mb-0">{{ clientUpdate?.cli_nome_fantasia }}</p>
        </div>
        <div>
          <p class="text-70 text-monospace h6 mb-0">Saldo na Carteira ONE1:</p>
          <p
            :class="{
              'text-red': clientUpdate && clientUpdate?.carteira_one1_cliente?.cart_valor <= 0
            }"
            class="text-positive d-flex flex-row justify-content-between text-monospace h5 mb-0"
          >
            {{
              clientUpdate && clientUpdate?.carteira_one1_cliente === null
                ? 'R$ 0,00'
                : real.format(clientUpdate?.carteira_one1_cliente?.cart_valor as number)
            }}

            <button
              type="button"
              class="externalAddSaldo w-25"
              @click="$emit('open-modal', clientUpdate)"
            >
              ADD SALDO
            </button>
          </p>
        </div>
        <hr class="m-1" />
        <div>
          <p class="text-70 text-monospace h6 mb-0">Vendedor:</p>
          <p class="text-100 text-monospace h5 mb-0">{{ userData?.user_nome }}</p>
        </div>
        <div>
          <p class="text-70 text-monospace h6 mb-0">Data da emissão do pedido:</p>
          <p class="text-100 text-monospace h5 mb-0">
            {{ DatePtBR(new Date(orcamentoCom.orc_emissao)) }}
          </p>
        </div>
      </div>
    </div>

    <div class="card card-group-row__card">
      <div class="card-body">
        <h5 class="mb-2">OBSERVAÇÃO</h5>

        <Editor
          @load="onLoad"
          v-model="orcamentoFinal.observacao"
          @text-change="updateContent"
          placeholder="Escreva aqui uma observação referente ao serviço."
          editorStyle="height: 180px"
        />

        <div class="form-group mb-0">
          <div class="custom-control custom-checkbox">
            <input
              v-model="orcamentoFinal.exibirRecibo"
              @change.prevent="$emit('setForEvents', { exibirRecibo: orcamentoFinal.exibirRecibo })"
              class="custom-control-input"
              type="checkbox"
              value=""
              id="exibirNoRecibo"
              required
              checked
            />
            <label class="custom-control-label" for="exibirNoRecibo"> Exibir no recibo? </label>
          </div>
        </div>
      </div>
    </div>

    <div class="card card-group-row__card">
      <div class="card-header d-flex flex-column">
        <h5 class="mb-0 pb-0">Arquivos anexados</h5>
        <small
          id="currentItemCarrinhowSelected"
          class="w-70 text-primary"
          style="display: none"
        ></small>
      </div>
      <div class="card-body">
        <DropDownPrime
          name="prime"
          @change="''"
          :span-disabled="true"
          v-model:model-value="selectItemOrc"
          :maxSelectedLabels="1"
          :selectionLimit="1"
          filter
          :span-class="''"
          :optionSelect="orcItensComp"
          :label="'Selecione um item especifico para anexar um novo arquivo.'"
        >
        </DropDownPrime>
      </div>
      <div class="card-footer">
        <div
          class="d-flex flex-column align-items-center"
          style="max-width: 100%"
          v-if="orcItensComp.find((v) => v.id === selectItemOrc)?.pro_categoria_item !== 4"
        >
          <DropzoneItem
            v-if="Number(selectItemOrc) > 0"
            :accept-file="'image/*,.pdf'"
            :multiple-file="true"
            class="dropzone-multiple w-100 mb-0"
            @change="selectedFile"
            :active-drop="active"
            @dragenter="toggleActive"
            @dragleave="toggleActive"
            @drop.prevent="drop"
          ></DropzoneItem>

          <ul
            class="dz-preview dz-preview-multiple list-group list-group-flush mt-16pt w-100"
            v-if="arquivosCom !== undefined && arquivosCom.length > 0"
          >
            <li
              class="d-flex flex-column list-group-item"
              v-for="(value, index) in arquivosCom"
              :key="index"
            >
              <div class="d-flex flex-row align-items-center justify-content-between">
                <a @click.prevent="pdfView(value)" style="cursor: pointer">
                  <div class="form-row align-items-center mb-0">
                    <!-- <a :href="value.url" target="_blank"> -->

                    <div class="col-auto">
                      <div class="avatar">
                        <img
                          v-if="value.type_file !== 'img'"
                          :src="
                            value.type_file === 'pdf'
                              ? pdf
                              : value.type_file === 'cdr'
                                ? cdr
                                : value.url
                          "
                          class="avatar-img rounded"
                          :alt="value.type_file"
                        />
                        <img
                          v-else
                          :src="value.url"
                          class="avatar-img rounded"
                          :alt="value.nome_arq"
                        />
                      </div>
                    </div>
                    <!-- </a> -->
                    <div class="col">
                      <div class="font-weight-bold">
                        {{ value.nome_arq }}
                      </div>
                    </div>
                  </div>
                </a>
                <!--excluir-->
                <div class="col-auto">
                  <div class="font-weight-bold">
                    <a
                      href="#"
                      @click.prevent="removeUpload(value)"
                      class="text-muted-light"
                      data-dz-remove
                    >
                      <i class="material-icons">close</i>
                    </a>
                  </div>
                </div>
              </div>

              <div class="progressUploading mt-2" v-if="value.uploadProgress >= 0">
                <div
                  id="progressUpload"
                  class="progress-bar progress-bar-primary progress-bar-striped active"
                  role="progressbar"
                  :style="`width: ${value.uploadProgress}%`"
                >
                  <span id="current-progress-upload">{{ value.uploadProgress.toFixed(2) }}%</span>
                </div>
              </div>
            </li>
          </ul>
          <span class="" v-else>Sem arquivos nesse orçamento</span>
        </div>
      </div>
    </div>

    <button
      v-if="orcamentoComputedChange && saveChangeCheck === false"
      type="button"
      @click.prevent="saveChange"
      class="btn btn-secondary w-100"
    >
      Salvar alterações
    </button>

    <button
      v-if="saveChangeCheck"
      :disabled="disabledChangeCheck"
      type="button"
      @click.prevent="toRoute"
      class="btn btn-success w-100"
    >
      Concluir
    </button>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable vue/require-valid-default-prop -->
<script setup lang="ts">
import {
  computed,
  onUnmounted,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect,
  type PropType
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type {
  IArquivos,
  IError,
  IOrcamento,
  IOrcamentoItens,
  UserData,
  orClient,
  orcamentoStatus
} from '@/model/Index'
import type { orcamentoTypeFinal } from '@/model/Index'
import { useToast } from '@/composables/Toast'
import pdf from '@/assets/img/pdf.png'
import cdr from '@/assets/img/cdr.png'
import { DatePtBR, DatePtBRInner } from '@/util/Data'
import { removeFileDisk, updateOrcamentoFinalStep } from '@/api/actions/Orcamento'
import { pdfAxios } from '@/api/actions/Pdf'
import { useSwal } from '@/composables/Swal'
import { useCarteiraOne } from '@/composables/UseCarteiraOne'
import DropDownPrime from './DropDownPrime.vue'
import DropzoneItem from '@/components/one-print/DropzoneItem.vue'
import { uploadImagem } from '@/composables/Upload-base64'
import { sendAllProductFile } from '@/api/actions/Produtos'
import type { EditorLoadEvent } from 'primevue/editor'
import { cartMaxValueUtil } from '@/util/Util'

const props = defineProps({
  userData: { type: Object as PropType<UserData>, required: true },
  client: { type: Object as PropType<orClient>, required: true },
  orcamento: { type: Object as PropType<IOrcamento>, required: true, default: () => {} },
  orcamento_itens: {
    type: Object as PropType<IOrcamentoItens[]>,
    required: true,
    default: Array
  },
  parcial: {
    type: Object as PropType<{ orc_value_parcial: number; orc_check_parcial: boolean }>,
    required: true
  },
  orcamento_status: { type: Object as PropType<orcamentoStatus>, required: true },
  forma_pagamentoFull: {
    type: Object as PropType<{ fpg_descricao: string; fpg_id: number; fpg_status: number }>,
    required: true,
    default: Object
  },
  formaPagamento: {
    type: Object as PropType<{ fpg_id: number; fpg_descricao: string }>,
    required: true,
    default: {}
  }
})
//router
const route = useRoute()
const router = useRouter()

const emit = defineEmits(['setForEvents', 'open-modal', 'debit-cart'])

//composables
const { notifyToast } = useToast()
const { paymentCarteiraOne } = useCarteiraOne(emit)
const { swalConfirmed } = useSwal()
const { fileImgBase64, objectImg, objectFile } = uploadImagem()

const {
  client,
  userData,
  formaPagamento,
  orcamento,
  parcial,
  orcamento_itens,
  forma_pagamentoFull
} = toRefs(props)

let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

const saveChangeCheck = ref(false)
const disabledChangeCheck = ref(true)
const active = ref<boolean>(false)

const selectItemOrc = ref<number>(0)
const clientUpdate = computed(() => client.value)
const orcamentoComputedChange = computed(
  () =>
    orcamentoFinal.value.formaPagamento > 0 ||
    orcamentoFinal.value.exibirRecibo ||
    orcamentoFinal.value.observacao !== '' ||
    orcamentoFinal.value.orc_check_parcial === true ||
    (orcamentoFinal.value.orc_value_parcial !== '' &&
      orcamentoFinal.value.orc_value_parcial !== undefined &&
      Number(orcamentoFinal.value.orc_value_parcial) > 0)
)
const orcamentoCom = computed(() => orcamento?.value as IOrcamento)
const arquivosCom = computed(() =>
  orcamento?.value?.arquivos.filter((v) =>
    selectItemOrc.value === 0 || selectItemOrc.value === -1
      ? v
      : v.prod_type === selectItemOrc.value
  )
)
const compItensArray = computed(() => {
  return orcamento_itens.value.find((v) =>
    v.produto.pro_categoria_item !== 4
      ? v.oit_id === orcamentoItens.value.find((x) => x.id === selectItemOrc.value)?.oit_id
      : v.oit_id === Number(selectItemOrc.value)
  )
})
const orcItensComp = computed(() => orcamentoItens.value)
const orcamentoItens = ref<
  { id: number; nome: string; oit_id: number; pro_categoria_item: number }[]
>([{ id: -1, nome: 'Todos anexos do pedido', oit_id: -1, pro_categoria_item: 0 }])
// eslint-disable-next-line no-undef
const timeOunt = ref<NodeJS.Timeout>()
// eslint-disable-next-line no-undef
const timeout2 = ref<NodeJS.Timeout>()
//variable
const orcamentoFinal = ref<orcamentoTypeFinal>({
  observacao: '',
  exibirRecibo: false,
  formaPagamento: 0,
  client_name: '',
  user_usuultalteracao: 0,
  orc_check_parcial: false,
  orc_value_parcial: ''
})

const generateName = (type: number, prod: number, format_nome: string) => {
  const imagemType = ['png', 'jpeg', 'jpg', 'webp', 'pdf']

  const item = orcamento_itens.value.find((v) => {
    return v.one1_outros.id === type && v.pro_id === prod
  })
  const format = imagemType.find((v) => format_nome.includes(v))

  const length = Number(orcamento?.value?.arquivos.length) + 1
  return `${DatePtBRInner(new Date()) + '-ONEPRINT-' + item?.orc_id + '-' + item?.one1_outros.one1_nome + '-' + length}.${format}`
}

const onLoad = ({ instance }: EditorLoadEvent) => {
  instance.setContents(
    instance.clipboard.convert({
      html: orcamentoFinal.value.observacao
    })
  )
}

//Verifica se existe imagens já repetidas.
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
const selectedFile = () => {
  const dropzone: HTMLInputElement = document.querySelector('.dropzoneFile') as HTMLInputElement

  fileImgBase64(dropzone.files as FileList)
  // produtoType.value.dropzoneFile = objectFile.value

  let item = compItensArray.value

  if (
    selectItemOrc.value === item?.one1_outros.id &&
    orcamento?.value !== undefined &&
    item.produto.pro_categoria_item !== 4
  ) {
    objectImg.value.forEach((val, index) => {
      const nomeArqFicticio = `${val.name}_${index}`
      const form = new FormData()

      const id_client = client.value ? client.value?.cli_id.toString() : ''

      form.append('nome_client', client.value?.cli_nome as string)
      form.append('nome_empresa', client.value?.cli_nome_fantasia as string)
      form.append('client_id', id_client)
      form.append('orc_id', orcamento?.value?.orc_id.toString() as string)

      if (!orcamento.value?.arquivos.some((arq) => arq.nome_arq_ficticio === nomeArqFicticio)) {
        const nome = generateName(item?.one1_outros.id, item.pro_id, val.name)

        const progressInfo = reactive({
          id: 0,
          nome_arq: nome,
          nome_arq_ficticio: nomeArqFicticio,
          type_file: val.type.split('/')[1], // Defina o tipo de arquivo, ex: 'pdf', 'jpg'
          uploadProgress: 0, // Inicia a barra de progresso com 0%
          url: '', // Defina o URL do arquivo quando o upload estiver completo
          diretorio: '', // Defina conforme necessário
          pro_id: item.pro_id, // Defina conforme necessário
          prod_type: item?.one1_outros.id, // Defina conforme necessário
          orc_id: item.orc_id
        })

        orcamento.value?.arquivos.push(progressInfo as any)

        const qualidade = orcamento_itens.value.find(
          (c) => c.one1_outros.id === selectItemOrc.value
        ) as IOrcamentoItens
        form.append('service_nome', nome)
        form.append('qualidade[]', qualidade.one1_outros.one1_nome)
        form.append('pro_categ_tipo[]', qualidade.one1_outros.id.toString())
        form.append('pro_id[]', qualidade.pro_id.toString())
        form.append('service_type', (1).toString())

        form.append('item', objectFile.value[index])
        const onUpload = {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onUploadProgress: (progressEvent: { loaded: any; total: any }) => {
            progressInfo.uploadProgress = (progressEvent.loaded / progressEvent.total) * 100
          }
        }

        if (form.get('item') !== null && form.get('service_nome')) {
          //remover comentario da linha abaixo.
          //ProgressBar para pegar a porcentagem

          sendAllProductFile(form, true, onUpload)
            .then((result) => {
              const { files } = result.data
              //uploadProgress
              progressInfo.uploadProgress = 100
              progressInfo.url = files.url // Defina o URL do arquivo quando o upload estiver completo
              progressInfo.diretorio = files.diretorio
              progressInfo.id = files.id
            })
            .catch((err) => err)
        }
      }
    })
  }

  // dropzone =
}

const removeUpload = async (value: IArquivos) => {
  try {
    const { data, status } = await removeFileDisk(value.id as number)
    if (status === 200) {
      notifyToast({ msg: data.msg, typeToast: 'success' })

      const index: number | undefined = orcamento?.value?.arquivos.findIndex(
        (v) => v.id === value.id
      )
      if (index !== -1 && index !== undefined) {
        orcamento?.value?.arquivos.splice(index, 1)
      }
    }
  } catch (er: unknown) {
    const error = er as IError
    console.log(error)
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro interno', typeToast: 'error' })
      return
    }
    if (error.response.status === 500) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      return
    }
    if (error.response.status === 404) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      return
    }
  }
}
const pdfView = async (value: IArquivos) => {
  try {
    const path = value.url.split('public')[1]

    const { data } = await pdfAxios({ path1: `upload${path}`, nome: value.nome_arq })
    var URL = window.URL || window.webkitURL
    const b = new Blob([data], { type: 'application/pdf' })
    var downloadUrl = URL.createObjectURL(b)
    window.open(downloadUrl, '_blank')
    URL.revokeObjectURL(downloadUrl)
  } catch (er: unknown) {
    const error = er as IError
    console.log(error)
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro interno', typeToast: 'error' })
      return
    }
    if (error.response.status === 500) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      return
    }
    if (error.response.status === 404) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      return
    }
  }
}

const updateContent = (html: any) => {
  if (html === undefined || html.textValue === '') return
  orcamentoFinal.value.observacao = html.textValue
  emit('setForEvents', { observacao: orcamentoFinal.value.observacao })
}

const saveChange = async () => {
  //const form = new FormData()
  let timeout: any = 0
  try {
    const client_nome = client.value ? client.value?.cli_nome : ''

    orcamentoFinal.value.client_name = client_nome
    orcamentoFinal.value.user_usuultalteracao = userData.value.user_id
    orcamentoFinal.value.formaPagamento = formaPagamento?.value?.fpg_id as number

    if (
      (orcamentoFinal.value.formaPagamento === undefined ||
        orcamentoFinal.value.formaPagamento === 0) &&
      ((forma_pagamentoFull?.value && forma_pagamentoFull?.value?.fpg_id > 0) ||
        forma_pagamentoFull?.value?.fpg_id === 11)
    ) {
      notifyToast({ msg: 'Atenção escolha a forma de pagamento!', typeToast: 'warning' })
      return
    }
    if (
      parcial?.value &&
      orcamentoFinal.value.orc_check_parcial &&
      parcial.value.orc_value_parcial <= 0
    ) {
      notifyToast({ msg: 'Adicione o valor de entrada!', typeToast: 'warning' })
      return
    }

    orcamentoFinal.value.orc_value_parcial = parseFloat(
      parcial?.value?.orc_value_parcial.toString().replace(',', '.') as string
    )
    orcamentoFinal.value.orc_check_parcial = parcial?.value?.orc_check_parcial as boolean
    //adicionar aqui o pagamento parcial

    const { data, status } = await updateOrcamentoFinalStep({
      formaPagamento: orcamentoFinal.value.formaPagamento,
      orc_id: Number(route.params.id),
      client_name: orcamentoFinal.value.client_name,
      exibirRecibo: orcamentoFinal.value.exibirRecibo,
      observacao: orcamentoFinal.value.observacao,
      user_usuultalteracao: orcamentoFinal.value.user_usuultalteracao,
      orc_check_parcial: orcamentoFinal.value.orc_check_parcial,
      orc_value_parcial: parseFloat(orcamentoFinal.value.orc_value_parcial.toString()),
      id_pg_status: orcamentoFinal.value.orc_check_parcial ? 5 : 1
    })

    const valorParcial =
      orcamento.value.orc_value_parcial === null ? 0 : orcamento.value.orc_value_parcial

    const cartMax = cartMaxValueUtil(
      {
        cliente: client.value,
        orc_value_parcial: valorParcial,
        formaPagamento: orcamentoFinal.value.formaPagamento,
        orc_valor: orcamentoCom.value.orc_valor_total as number
      },
      {
        orc_parcial: orcamentoFinal.value.orc_value_parcial,
        orc_check_parcial: orcamentoFinal.value.orc_check_parcial
      }
    )

    if (status === 200) {
      emit('setForEvents', { saveChange: true })
      notifyToast({ msg: data.msg, typeToast: 'success' })
      if (orcamentoFinal.value.formaPagamento === 10) {
        console.log('1testestsetsetes')
        timeout = setTimeout(async () => {
          const result = await swalConfirmed({
            title: 'Atenção, Efetuar Pagamento',
            icon: 'info',
            text: 'Você deseja realmente pagar esse orçamento com dinheiro da carteira?'
          })

          if (result.isConfirmed) {
            await paymentCarteiraOne({
              cart_value_parcial: cartMax,
              cliente: {
                cli_id: client.value?.cli_id as number,
                cli_nome: client.value?.cli_nome as string,
                carteira_one1_cliente: client.value?.carteira_one1_cliente as any
              },
              forma_pagamento: forma_pagamentoFull?.value as {
                fpg_descricao: string
                fpg_id: number
                fpg_status: number
              },
              orc_id: Number(route.params.id),
              orc_valor_total: parseFloat(orcamento?.value?.orc_valor_total.toString() as string),
              // ost_id: orcamento_status.value.ost_id,
              user_usucadastro: userData.value.user_id
            })

            clearTimeout(timeout)

            timeout2.value = setTimeout(() => {
              disabledChangeCheck.value = false
            }, 800)
          }
        }, 1000)
      } else {
        timeout2.value = setTimeout(() => {
          disabledChangeCheck.value = false
        }, 1000)
      }
    }
  } catch (error: any) {
    emit('setForEvents', { saveChange: false })
    clearTimeout(timeout)

    if (error.response === undefined) {
      notifyToast({ msg: 'Erro interno', typeToast: 'error' })
    }
    if (
      error.response.status === 404 ||
      error.response.status === 400 ||
      error.response.status === 409
    ) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
    } else {
      notifyToast({ msg: 'Erro interno ', typeToast: 'error' })
    }
  } finally {
    if (
      orcamentoFinal.value.formaPagamento !== undefined ||
      orcamentoFinal.value.formaPagamento > 0
    ) {
      saveChangeCheck.value = true
    }

    timeOunt.value = setTimeout(() => {
      emit('setForEvents', { saveChange: false })
    }, 500)
  }
}

const toRoute = () => {
  router.push({
    name: 'financeview'
  })
  notifyToast({ msg: 'Redirecionado com sucesso!', typeToast: 'success' })
}

watchEffect(() => {
  orcamentoFinal.value.observacao = orcamento.value.orc_observacao
})

watch(
  formaPagamento,
  () => {
    orcamentoFinal.value.formaPagamento = formaPagamento?.value?.fpg_id as number
  },
  { deep: true }
)

watch(
  parcial,
  () => {
    if (!parcial.value.orc_check_parcial) {
      parcial.value.orc_value_parcial = 0
    }
    orcamentoFinal.value.orc_check_parcial = parcial.value.orc_check_parcial
    orcamentoFinal.value.orc_value_parcial = parcial.value.orc_value_parcial
  },
  { deep: true }
)

watch(
  orcamento_itens,
  () => {
    orcamento_itens.value.forEach((v) => {
      orcamentoItens.value.push({
        id: v.oit_itens_type_material || v.oit_id,
        nome: `${v.oit_id} - ${v.produto.pro_nome}`,
        oit_id: v.oit_id,
        pro_categoria_item: v.produto.pro_categoria_item
      })
    })

    // if (orcamento?.value?.orc_observacao !== '' && orcamento?.value?.orc_observacao !== null) {
    //   editor.value?.setText(orcamento?.value?.orc_observacao)
    // }
    if (orcamento?.value?.orc_recibo) {
      orcamentoFinal.value.exibirRecibo = orcamento?.value?.orc_recibo as boolean
    }
  },
  { deep: true }
)

onUnmounted(() => {
  clearTimeout(timeout2.value)
})
</script>

<style scoped></style>
