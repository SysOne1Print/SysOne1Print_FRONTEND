<template>
  <div class="col-lg-5">
    <div class="card card-group-row__card">
      <div class="card-header d-flex justify-content-between">
        <p class="text-50 text-monospace h5 mb-0">STATUS</p>
        <StatusPayment :orcamento-status-prop="orcamento_status"></StatusPayment>
      </div>
      <div class="card-body mb0">
        <div class="d-flex align-items-center justify-content-between border-bottom">
          <div>ITENS NO CARRINHO</div>
          <div class="subTotal">{{ orcamento_itens?.length }}</div>
        </div>
        <div class="d-flex align-items-center justify-content-between"
          style="border-bottom: 1px dashed rgba(0, 0, 0, 0.05)" v-for="(value, index) in orcamento_itens" :key="index">
          <div class="text-50 text-monospace">
            {{ value.produto?.pro_nome }} - x{{ value.oit_qtde }}
            {{
              value.produto !== undefined && value.produto.produto_tipo_servico.id === 1
                ? '(Metro)'
                : ''
            }}
          </div>

          <!--Não sei que porra e essa aqui '-', e agora ????????????????-->
          <!--Provalmente produto sem desconto -->
          <div class="subTotal" v-if="
            getNivelDiscountByProduct(value)?.nds_prod_id !== value.pro_id ||
            getClient.nivel_desconto === null ||
            Number(value.oit_valor_unitario) === 0
          ">
            {{ real.format(Number(value.oit_valor_unitario) - Number(value.oit_valor_desconto)) }}
          </div>

          <!--Nivel de desconto para todos os produtos-->
          <div class="subTotal" v-if="
            getClient.nivel_desconto.length > 0 &&
            getNivelDiscountByProduct(value)?.nds_prod_id === value.pro_id
          ">
            {{ real.format(parseFloat(getNivelDiscountByProduct(value)?.nds_valor as string)) }}
          </div>
        </div>
        <div class="d-flex flex-column align-items-end justify-content-end mb0">
          <div class="entregaDisplay">
            <span>
              <i class="fas fa-motorcycle"></i>
              CUSTO DE ENTREGA
            </span>
            <span class="dstq" v-if="orcamentoBack !== 0 && orcamentoBack !== null && orcamentoBack !== undefined">{{
              real.format(orcamentoBack === 0 ? 0 : parseFloat(orcamentoBack?.toString()))
            }}</span>

            <span class="dstq" v-else>
              {{
                real.format(
                  orcamentoCom.orc_valor_frete === '' ? 0 : parseFloat(orcamentoCom.orc_valor_frete)
                )
              }}
            </span>
          </div>
          <div class="total">Total: {{ real.format(parseFloat(reCalcValueTotalCart())) }}</div>
        </div>
      </div>

      <div class="form-group mb0 p-3" style="border-top: 1px solid #dfe2e6; border-bottom: 1px solid #dfe2e6">
        <div class="custom-control custom-checkbox mt-1">
          <input :id="'LOGISTICA'" :value="true" v-model="check_shipping_value" name="LOGISTICA" type="checkbox"
            class="custom-control-input" />

          <label for="LOGISTICA" class="custom-control-label h5 fxLabelCheck">
            <i class="fas fa-motorcycle ml-1 mr-1 text-50"> </i>
            <span>Entrega</span>
          </label>
        </div>

        <PartShippingValue @change="reCalcValueTotalCart" v-if="check_shipping_value" v-model:shipping="orcamentoBack">
        </PartShippingValue>
      </div>

      <div class="form-group mb-0 p-3" style="border-bottom: 1px solid rgb(223, 226, 230)">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" @change="emitValueCheck" v-model="parcial.orc_check_parcial"
            class="custom-control-input" id="parcial" />
          <label class="custom-control-label h5" for="parcial"><span>Pagamento Parcial</span></label>
        </div>

        <div class="form-group mb-0 mt-3" v-if="parcial.orc_check_parcial">
          <label class="form-label mb-0" for="PagamentoParcial">Valor de Entrada:</label>
          <InputNumber :inputClass="'w-100'" @change="calcParcialValue" v-model="parcial.orc_value_parcial"
            :placeholder="'R$ 0,00'" inputId="currency-usd" mode="currency" currency="BRL" locale="pt-BR" fluid />
        </div>
      </div>

      <br />
      <div class="card-body pt-0 mb0">
        <div class="form-group mb0">
          <div class="custom-controls-stacked">
            <div class="custom-control custom-radio mt-1" v-for="(value, index) in typePayment.presencial" :key="index">
              <input :id="value.fpg_descricao" v-model="payment.formaPagamento" @change.prevent="typePaymentFn(value)"
                name="radio-stacked" type="radio" :value="value.fpg_id" class="custom-control-input" />

              <label :for="value.fpg_descricao" class="custom-control-label h5 fxLabelCheck">
                <i class="material-icons">
                  {{ generateDiffIcons({ descricao: value.fpg_descricao }) }}
                </i>
                <span>{{ value.fpg_descricao }}</span>
              </label>
            </div>
            <div class="custom-control custom-radio mt-1" v-for="(value, index) in typePayment.retirar" :key="index">
              <input :id="value.fpg_descricao" :value="value.fpg_id" v-model="payment.formaPagamento"
                @change.prevent="typePaymentFn(value)" name="radio-stacked" type="radio" class="custom-control-input" />

              <label :for="value.fpg_descricao" class="custom-control-label h5 fxLabelCheck">
                <i class="material-icons">
                  {{
                    generateDiffIcons({
                      descricao: value.fpg_descricao
                    })
                  }}
                </i>
                <span>{{ value.fpg_descricao }}</span></label>
            </div>
            <hr />
            <div class="custom-control custom-radio mt-1" v-for="(value, index) in typePayment.bank" :key="index">
              <input :disabled="value.fpg_id === 11 ? checkValueCartOne1 : false" :id="value.fpg_descricao"
                :value="value.fpg_id" v-model="payment.formaPagamento" @change.prevent="typePaymentFn(value)"
                name="radio-stacked" type="radio" class="custom-control-input" />

              <label :for="value.fpg_descricao" class="custom-control-label h5 fxLabelCheck">
                <i class="material-icons">
                  {{
                    generateDiffIcons({
                      descricao: value.fpg_descricao
                    })
                  }}
                </i>
                <span>{{ value.fpg_descricao }}</span></label>
            </div>

            <hr />
            <div class="custom-control custom-checkbox">
              <input type="checkbox" v-model="indicators" class="custom-control-input" id="indicação" />
              <label class="custom-control-label h5" for="indicação"><span> <i class="fas fa-user-friends text-50"></i>
                  Houve indicação?</span></label>
            </div>

            <Indicators v-if="indicators" :indicators_id="orcamento.orc_indicator_id" :orc_id="orcamento.orc_id">
            </Indicators>
          </div>
        </div>
      </div>

      <div class="card-body" v-if="payment.formaPagamento === 8 || payment.formaPagamento === 9">
        <p class="text-50 h6 text-monospace mb0">Tarifas nas formas de pagamento via cartão:</p>
        <p class="text-primary text-monospace h6 mb0">
          Cartão <u>1x a 6x</u> :
          <span class="text-black">{{ real.format(calculateFixoJuresSimples.month6) }}</span> (<span
            class="text-black">+6%</span>)
        </p>
        <p class="text-primary h6 text-monospace mb0">
          Cartão <u>7x a 12x</u>:
          <span class="text-black">{{ real.format(calculateFixoJuresSimples.month12) }}</span>
          (<span class="text-black">+12%</span>)
        </p>
      </div>

      <div class="card-body" v-if="
        typePaymentCom !== undefined &&
        typePaymentCom.fpg_id === payment.formaPagamento &&
        typePaymentCom.fpg_id === 5
      ">
        <div class="form-group">
          <label class="form-label" for="pixValue">VALOR DO PIX</label>
          <div class="input-group input-group-merge">
            <input id="pixValue" type="text" class="form-control" :disabled="true" placeholder=""
              v-model="finishedPedido.valueTotal" />
            <div class="input-group-prepend">
              <div class="input-group-text">
                <span>R$</span>
              </div>
            </div>
          </div>
        </div>
        <button v-if="statusPix['pg_status'] === 'pendente'" @click.prevent="createQRCode" type="button"
          :disabled="true" class="btn btn-primary w-100" :class="{ 'is-loading is-loading-sm is-loading-md': check }">
          {{ timer.days + ' d' }} {{ timer.hours + ' h' }} {{ timer.minutes + ' m' }}
          {{ timer.seconds + ' s' }}
        </button>
        <button v-else @click.prevent="createQRCode" type="button" :disabled="check" class="btn btn-primary w-100"
          :class="{ 'is-loading is-loading-sm is-loading-md': check }">
          <i class="material-icons icon--left">thumb_up</i> Gerar QrCode
        </button>
      </div>

      <div class="card-body" v-if="qrcodeCheck">
        <div class="d-flex flex-column align-items-center gap-1">
          <img v-if="statusPix.id_pg_status === 2" src="@/assets/teste.svg" alt="pix concluido" />
          <vue-qrious v-else width="180" height="auto" :value="qrcodeBase64" />
          <div class="input-group mb-3" v-if="statusPix.id_pg_status !== 2">
            <input ref="copy" type="text" class="form-control" v-model="qrInput" placeholder="Pix"
              aria-describedby="button-addon2" />
            <div class="input-group-append">
              <button @click.prevent="copyAndColor" class="btn btn-outline-secondary" type="button" id="button-addon2">
                Copiar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="card-body" v-if="parcial.orc_check_parcial || payment.formaPagamento === 7">
        <!-- Se check == Dineheiro, Crédito, Débito -->
        <label class="form-label" for="anexoComprovante">ANEXAR O COMPROVANTE</label>

        <FileUploadItem :multiple="true" :label="imgComprovante !== undefined && imgComprovante.length > 0
          ? objectImg.map((v) => v.name).reduce((acc: any = '', name) => acc + ', ' + name)
          : 'Anexar comprovante'
          " @files-added="comprovante"></FileUploadItem>

        <button type="button" @click.prevent="sendingComprovante(userData.user_id, orcamentoCom)"
          :disabled="imgComprovante !== undefined && imgComprovante.length > 0 ? false : true"
          class="btn btn-primary w-100 mt-3">
          salvar comprovante
        </button>

        <div class="view_img" v-if="imgComprovante !== undefined && imgComprovante.length > 0">
          <span class="text-uppercase">Preview Comprovante</span>
          <hr />
          <div class="img_resize">
            <img loading="lazy" :src="value.img" alt="img comprovante" v-for="(value, index) in objectImg"
              :key="index" />
          </div>
        </div>

        <div class="view_img" v-if="receipts.length > 0">
          <span class="text-uppercase">Comprovantes já enviados</span>
          <hr />
          <div class="img_resize">
            <a :href="value.odo_arquivo" target="_blank" rel="noopener noreferrer" v-for="(value, index) in receipts"
              :key="index">
              <img loading="lazy" :src="value.odo_arquivo" alt="img comprovante" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { getAllPaymentType, pixGenerate } from '@/api/actions/Payment'
import type {
  IError,
  IGeneratePix,
  IOrcamento,
  IOrcamentoItens,
  IPayment,
  orClient,
  orcamentoStatus,
  orcamentoUpdate,
  saveChange
} from '@/model/Index'
import {
  computed,
  onBeforeMount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  ref,
  toRefs,
  watch,
  type PropType
} from 'vue'
import { useToast } from '@/composables/Toast'
import VueQrious from 'vue-qrious'
import { useRoute } from 'vue-router'
import { useLoginStore } from '@/stores/LoginStore'
import FileUploadItem from '@/components/one-print/FileUploadItem.vue'
import InputNumber from 'primevue/inputnumber'
import { getAlreadyReceipts } from '@/api/actions/Orcamento'
import { usePaymentOrc } from '@/composables/PaymentOrc'
import PartShippingValue from '@/components/modal-content/PartShippingValue.vue'
import { useStatusPix } from '@/composables/UseStatusPix'
import Indicators from './modal-content/Indicators.vue'
import StatusPayment from './StatusPayment.vue'
import { discountProductType, modeloFilmeDtfUtil, modeloTintaPolitilenoUtil } from '@/util/Util'

const prop = defineProps({
  orcamento_status: { type: Object as PropType<orcamentoStatus>, required: true },
  orcamento: { type: Object as PropType<IOrcamento>, required: true },
  orcamento_itens: {
    type: Object as PropType<IOrcamentoItens[] | null>,
    required: true,
    default: Array
  },
  pagamento_pix: {
    type: Object as PropType<{ data_pix: Date | string; pg_status: string }>,
    required: false,
    default: Object
  },
  forma_pagamento: {
    type: Object as PropType<{ fpg_descricao: string; fpg_id: number }>,
    required: true
  },
  forceSaveChange: { type: Object as PropType<saveChange>, required: true },
  client: { type: Object as PropType<orClient>, required: true, default: () => { } }
})

//emit
const emit = defineEmits(['parcial', 'change-for-payment', 'setForEvents'])

const { orcamento_itens, orcamento_status, orcamento, forceSaveChange, client, pagamento_pix } =
  toRefs(prop)

//useRouter
const route = useRoute()

//userData
const { userData } = useLoginStore()

//notify
const { notifyToast } = useToast()
const { statusPixFn, statusPix, updateCountdown, intervalPagamento, timer } = useStatusPix()

//Composables Pagamento e comprovante
const {
  comprovante,
  objectImg,
  sendingComprovante,
  receipts,
  imgComprovante,
  resetImgComprovante
} = usePaymentOrc()

const typePayment = ref<IPayment>({
  bank: [],
  presencial: [],
  retirar: []
})

// eslint-disable-next-line no-undef
const interval = ref<NodeJS.Timeout>()

const parcial = ref<{ orc_check_parcial: boolean; orc_value_parcial?: number }>({
  orc_check_parcial: false
})

const orcamentoBack = ref<number | null>()

const qrcodeCheck = ref<boolean>(false)
const qrcodeBase64 = ref<string>('')
const qrInput = ref<string>('')
const check = ref<boolean>(false)

let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

//computed
const typePaymentCom = computed(() => {
  return typePayment.value.bank.find((v) => v.fpg_id === payment.value.formaPagamento)
})

const getClient = computed(() => client.value)

const checkValueCartOne1 = computed(() => {
  return client.value.carteira_one1_cliente !== undefined &&
    Number(client.value.carteira_one1_cliente?.cart_valor) >=
    Number(orcamento.value.orc_valor_total)
    ? false
    : true
})

const getNivelDiscountByProduct = (valueProp: IOrcamentoItens) => {
  const categoryFilme = modeloFilmeDtfUtil({
    pro_categoria_item: valueProp.produto.pro_categoria_item,
    one1_produto_estoque: valueProp.produto.one1_produto_estoque,
    type: valueProp.oit_itens_type_material
  })

  const tintaPolitileno = modeloTintaPolitilenoUtil({
    pro_categoria_item: valueProp.produto.pro_categoria_item,
    one1_produto_estoque: valueProp.produto.one1_produto_estoque,
    type: valueProp.oit_itens_type_material,
    oit_cor: valueProp.oit_cor
  })

  const prop = {
    pro_id: valueProp.pro_id,
    cor: tintaPolitileno || null,
    corDtf: tintaPolitileno || null, //valueProp.corDtf === undefined ? 0 : valueProp.corDtf,
    type: categoryFilme
  }
  return getClient?.value?.nivel_desconto.find((v) => discountProductType(v, prop))
}

const calculateFixoJuresSimples = computed(() => {
  return {
    month6:
      parseFloat(orcamentoCom.value.orc_valor_total?.toString()) * (6 / 100) +
      parseFloat(orcamentoCom.value.orc_valor_total?.toString()),
    month12:
      parseFloat(orcamentoCom.value.orc_valor_total?.toString()) * (12 / 100) +
      parseFloat(orcamentoCom.value.orc_valor_total?.toString())
  }
})

const fpId = computed(() => prop.forma_pagamento.fpg_id)
const orcamentoComputedChange = computed(
  () =>
    typePayment.value.bank
      .find((v) => v.fpg_id === payment.value.formaPagamento)
      ?.fpg_descricao.toLocaleLowerCase() === 'pix' ||
    forceSaveChange.value.exibirRecibo ||
    forceSaveChange.value.observacao !== ''
)
const orcamentoCom = computed(() => {
  return orcamento?.value as IOrcamento
})

const payment = ref<orcamentoUpdate>({
  formaPagamento: fpId.value
})

const check_shipping_value = ref(false)

const copy = ref()
const finishedPedido = ref({ valueParcial: 0, valueTotal: 0 })
const indicators = ref(false)

const calcParcialValue = () => {
  console.log('testestetsetsetsetsetse')
  if (parseFloat(parcial.value.orc_value_parcial?.toString() as string) > 0) {
    finishedPedido.value.valueTotal = parseFloat(
      parcial.value.orc_value_parcial?.toString() as string
    )
      .toFixed(2)
      .replace('.', ',') as unknown as number
  }
  finishedPedido.value.valueParcial = parcial.value.orc_value_parcial as number

  emit('parcial', parcial.value)
}

const generateDiffIcons = (value: { descricao: string }) => {
  if (value.descricao === 'DINHEIRO') return 'attach_money'
  if (value.descricao === 'CARTÃO DE DEBITO') return 'credit_card'
  if (value.descricao === 'CARTÃO DE CRÉDITO') return 'credit_card'
  if (value.descricao === 'PIX') return 'local_atm'
  if (value.descricao === 'CARTEIRA ONE1') return 'account_balance_wallet'
  if (value.descricao === 'LINK PAGAMENTO') return 'exit_to_app'
}

const reCalcValueTotalCart = () => {
  const orc_back = orcamentoBack.value ? orcamentoBack.value.toString() : 0
  return (
    parseFloat(orcamento.value.orc_valor_total.toString()) +
    parseFloat(orc_back.toString()) +
    parseFloat(orcamento.value.orc_valor_frete.toString())
  ).toString()
}

const createQRCode = async () => {
  check.value = true
  let qrcode: IGeneratePix = {
    valor: finishedPedido.value.valueParcial,
    valorTotal: parcial.value.orc_check_parcial
      ? parseFloat(reCalcValueTotalCart())
      : parseFloat(finishedPedido.value.valueTotal.toString()),
    nome: client.value.cli_nome,
    id_orc: Number(route.params.id),
    id_usuario: userData.user_id,
    id_client: client.value.cli_id
  }
  try {
    const cnpjAndCpfWithPoints = client.value.cli_cnpj_and_cpf.replace(/[^\d]/g, '')
    if (orcamentoComputedChange.value && !forceSaveChange.value.saveChange) {
      notifyToast({ msg: 'Salve os dados antes de gerar o QRCODE', typeToast: 'warning' })
      return
    }

    if (cnpjAndCpfWithPoints.length === 14) {
      qrcode.nome = client.value.cli_nome_fantasia
      qrcode.cnpj = client.value.cli_cnpj_and_cpf
    }
    if (cnpjAndCpfWithPoints.length === 11) {
      qrcode.nome = client.value.cli_nome
      qrcode.cpf = client.value.cli_cnpj_and_cpf
    }

    const { data, status } = await pixGenerate({ ...qrcode })
    if (status === 200) {
      qrcodeCheck.value = true
      const pix = data.pix
      qrcodeBase64.value = pix.brcode
      qrInput.value = pix.brcode
      notifyToast({ msg: data.msg, typeToast: 'success' })
      statusPix.value.id_pg_status = 0
      statusPix.value.txid_sicoob = ''
    }

    await statusPixFn(orcamento.value.orc_id)
    //status do pix
    let numberInter = 10000
    interval.value = setInterval(async () => {
      await statusPixFn(orcamento.value.orc_id)
      numberInter = numberInter + 10000
      if (statusPix.value.id_pg_status === 2) {
        clearInterval(interval.value)
      }
    }, numberInter)
  } catch (er: unknown) {
    const error = er as IError
    check.value = false
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro interno na tentativa de criação do QRCODE', typeToast: 'error' })
      return
    }
    if (error.response.status === 404) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })

      return
    } else {
      notifyToast({ msg: 'Erro interno ', typeToast: 'error' })
      return
    }
  } finally {
    check.value = false
  }
}

const copyAndColor = () => {
  copy.value?.select()
  document.execCommand('copy')
  notifyToast({ msg: 'Pix copiado com sucesso', typeToast: 'success' }, 400)
}

const typePaymentFn = (value: { fpg_id: number; fpg_descricao: string }) => {
  let pagamento = value
  emit('change-for-payment', { formaPagamento: pagamento })
}

const emitValueCheck = () => {
  if (!parcial.value.orc_check_parcial) {
    parcial.value.orc_value_parcial = 0
  }
  emit('setForEvents', {
    orc_check_parcial: parcial.value.orc_check_parcial,
    orc_value_parcial: parcial.value.orc_value_parcial
  })
}
onMounted(async () => {
  try {
    //
    const { data } = await getAllPaymentType()
    const { data: payment } = await getAlreadyReceipts(Number(route.params.id))
    typePayment.value = data
    receipts.value = payment

    if (pagamento_pix?.value !== undefined || pagamento_pix?.value !== null) {
      statusPix.value = pagamento_pix?.value as never
      intervalPagamento.value = setInterval(updateCountdown, 1000)
    }
    if (
      (orcamento.value.orc_indicator_id !== undefined ||
        orcamento.value.orc_indicator_id !== null) &&
      orcamento.value.orc_indicator_id > 0
    ) {
      indicators.value = true
    }
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
})

onBeforeMount(() => {
  payment.value.formaPagamento = fpId.value
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate')

  if (payment.value.formaPagamento === 0) payment.value.formaPagamento = fpId.value

  if (parcial.value.orc_check_parcial) {
    calcParcialValue()
  } else {
    if (orcamentoCom.value.orc_valor_frete !== '') {
      const orc_valor_frete = orcamentoBack.value ? orcamentoBack.value : 0

      const frete =
        parseFloat(orcamentoCom.value.orc_valor_frete) > 0
          ? parseFloat(orcamentoCom.value.orc_valor_frete) + orc_valor_frete
          : orc_valor_frete

      console.log(frete)
      finishedPedido.value.valueTotal = (
        parseFloat(orcamentoCom.value.orc_valor_total.toString()) + frete
      )
        .toFixed(2)
        .toString()
        .replace('.', ',') as unknown as number
    } else {
      finishedPedido.value.valueTotal = parseFloat(
        orcamentoCom.value.orc_valor_total.toString() as string
      ).toFixed(2) as unknown as number
    }
  }
})

watch(
  orcamentoBack,
  () => {
    finishedPedido.value.valueTotal = reCalcValueTotalCart()
      .toString()
      .replace('.', ',') as unknown as number
  },
  { deep: true, flush: 'sync' }
)

onUnmounted(() => {

  clearInterval(interval.value)
  clearInterval(intervalPagamento.value)
  resetImgComprovante()
})
</script>

<style scoped lang="scss">
.gap-1 {
  gap: 1rem;
}

.view_img {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 1rem 0;
  gap: 0.5rem;

  span {
    color: #303840;
    text-transform: uppercase;
    font-size: 0.8125rem;
    font-family:
      Exo\2,
      Helvetica Neue,
      Arial,
      sans-serif;
    font-weight: 600;
    letter-spacing: 2px;
  }

  .img_resize {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;

    img {
      flex-grow: 1;
      width: 100px;
      height: auto;
      object-fit: cover;
      background-size: cover;
    }
  }

  // a>img:target {
  //     position: fixed;
  //     width: 50%;
  //     top: 0;
  //     left: 25%;
  //     padding: 5px;
  //     box-shadow: 0 0 25px 10px #000;
  //     background: #fff;
  //     border: 1px solid red;
  //     z-index: 99999;
  // }

  hr {
    border-top: 1px solid #dfe2e6;
    margin: 0;
    width: 100%;
  }
}
</style>
