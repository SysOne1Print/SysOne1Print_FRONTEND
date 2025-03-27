<template>
  <div id="modalEditar3" class="modal">
    <div class="modal-content oneScroll">
      <div class="modal-top" @click.prevent="eventClose($event)">
        <span class="modal-close">×</span>
      </div>
      <div class="modal-container">
        <div class="w-100 d-flex flex-column align-items-start border-bottom">
          <h4 class="mb-0">Editar Pedido</h4>
          <div class="w-100 d-flex flex-row justify-content-between align-items-center pr-20">
            <span>
              Ordem de Serviço Nº
              <span class="font-weight-bold">#{{ financeOrc.orc_id }}</span>
            </span>
          </div>
        </div>
        <form action="">
          <div class="form-group">
            <label class="form-label mb-1 mt-3" for="edtClienteNome">Nome Cliente/Fornecedor:</label>
            <input v-model="editFinance.cliente" type="email" class="form-control" id="edtClienteNome" readonly />
          </div>

          <div class="form-group">
            <label class="form-label mb-1" for="edtDataAprovacao">Data de aprovação:</label>
            <input type="email" class="form-control" id="edtDataAprovacao" v-model="editFinance.orc_data_aprovacao"
              readonly />
          </div>

          <div class="form-group">
            <label class="form-label mb-1" for="edtStatus">Status:</label>
            <select id="edtStatus" v-model="editFinance.pagamento_status" data-toggle="select" class="form-control">
              <option value="0" selected>Escolha um status</option>
              <option :value="value.id_pg_status" v-for="(value, index) in payStatusList" :key="index">
                {{ value.status }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label mb-1" for="edtTipoPagamento">Tipo de pagamento:</label>
            <select id="edtTipoPagamento" v-model="editFinance.forma_pagamento_id" data-toggle="select"
              class="form-control">
              <option value="0" selected>Escolha o tipo de pagamento</option>
              <option :value="value.fpg_id" v-for="(value, index) in paymentList" :key="index">
                {{ value.fpg_descricao }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="edtValorRecebido" class="form-label mb-1">Valor Total do Pedido</label>
            <div class="input-group input-group-merge">
              <input id="edtValorRecebido" type="text" :disabled="true" class="form-control fixFocus"
                v-model="editFinance.orc_valor_total" data-mask="#.##0,00" data-mask-reverse="true" />
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <span>R$</span>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="edtValorRecebido" class="form-label mb-1">Valor de Entrada
              <span style="color: grey; font-size: 12px">
                / valor restante ({{
                  real.format(parseFloat(editFinance.orc_valor_total) - editFinance.orc_parcial)
                }})</span>
            </label>
            <div class="input-group input-group-merge">
              <input id="edtValorRecebido" type="text" class="form-control fixFocus" @change.prevent="cartMaxValue"
                v-model="editFinance.orc_parcial" data-mask="#.##0,00" data-mask-reverse="true" />
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <span>R$</span>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label mb-1" for="edtContaBancaria">Conta bancária:</label>
            <select v-model="editFinance.account_payment_id" id="edtContaBancaria" data-toggle="select"
              class="form-control">
              <option value="0" selected>Escolha uma conhta bancaria</option>
              <option :value="value.id" v-for="(value, index) in bankList" :key="index">
                {{ value.nome_banco_pagamento }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label mb-1" for="edtRefsPagamento">Referências de pagamento:</label>
            <select v-model="editFinance.ref_pay_value_total" id="edtRefsPagamento" data-toggle="select"
              class="form-control">
              <option :value="0" selected>Escolha um item</option>
              <option :value="value.id" v-for="(value, index) in refPayment" :key="index">
                {{ value.nome }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label mb-1" for="ONEedtLogistica">Logística:</label>
            <select disabled id="ONEedtLogistica" data-toggle="select" class="form-control">
              <option selected>Entrega própria</option>
              <option>--</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label mb-1" for="edtDataHoraAprovacao">Data e Hora de Aprovação:</label>
            <input type="email" class="form-control" id="edtDataHoraAprovacao" v-model="editFinance.orc_data_aprovacao"
              readonly />
          </div>

          <div class="form-group">
            <label class="form-label mb-1" for="edtTempoPercorrido">Tempo trabalhado:</label>
            <input type="email" class="form-control" id="edtTempoPercorrido" v-model="editFinance.tempo" readonly />
            <small class="text-50">(Formato: Horas,Minutos e Segundos)</small>
          </div>

          <div class="form-group">
            <label class="form-label mb-1" for="edtEntregaFinal">Data de entrega final:</label>
            <input type="email" class="form-control" id="edtEntregaFinal" v-model="editFinance.orc_data_entrega"
              readonly />
          </div>

          <div class="form-group d-flex flex-row justify-content-between align-items-center">
            <button class="btn btn-primary" @click.prevent="dissolveChanges">
              Desfazer alterações
            </button>
            <button class="btn btn-success flex-grow ml-2" @click.prevent="updateSaveChanges" :disabled="check">
              Salvar altrações
            </button>
          </div>

          <IMGAnexo @click-img="pdfView" :finance-orc="financeOrc"></IMGAnexo>

          <DivComponent :class="'w-100 d-flex flex-row justify-content-between mt-3 pb-3 border-bottom'"
            :span="'Vendedor'" :span-value="finance['users']">
          </DivComponent>

          <div class="w-100 d-flex flex-row justify-content-between align-items-center mt-3 mb-4">
            <span>Processos:</span>
            <div class="w-100 d-flex flex-row justify-content-end mb-0">
              <ul class="processosMinimizados d-flex flex-row mb-0">
                <li class="processoEtapa" style="cursor: pointer" :class="{
                  full:
                    financeOrc.orcamento_status?.ost_descricao.toLowerCase() === 'orçamento' ||
                    financeOrc.orcamento_status?.ost_id >= 1
                }" v-tooltip.bottom="{
                  value: 'Orçamento.',
                  pt: {
                    arrow: { style: { borderBottomColor: '#fff' } },
                    text: 'bg-white text-100 fw-700 '
                  }
                }">
                  <i class="fas fa-lg fa-list"></i>
                </li>
                <li :class="{ full: financeOrc.orcamento_status?.ost_id >= 4 }" class="processoEtapa" v-tooltip.bottom="{
                  value: 'Pagamento.',
                  pt: {
                    arrow: { style: { borderBottomColor: '#fff' } },
                    text: 'bg-white text-100 fw-700 '
                  }
                }">
                  <i class="fas fa-lg fa-cash-register"></i>
                </li>
                <li :class="{
                  full:
                    financeOrc.orcamento_status?.ost_descricao.toLowerCase() ===
                    'Em Produção'.toLowerCase() || financeOrc.orcamento_status?.ost_id >= 4
                }" class="processoEtapa" v-tooltip.bottom="{
                  value: 'Produção.',
                  pt: {
                    arrow: { style: { borderBottomColor: '#fff' } },
                    text: 'bg-white text-100 fw-700 '
                  }
                }">
                  <i class="fas fa-lg fa-print"></i>
                </li>
                <li :class="{
                  full:
                    financeOrc.orcamento_status?.ost_descricao.toLowerCase() ===
                    'Expedição'.toLowerCase() || financeOrc.orcamento_status?.ost_id >= 7
                }" class="processoEtapa" v-tooltip.bottom="{
                  value: 'Expedição.',
                  pt: {
                    arrow: { style: { borderBottomColor: '#fff' } },
                    text: 'bg-white text-100 fw-700 '
                  }
                }">
                  <i class="fas fa-lg fa-box"></i>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IArquivos, IError, IOrcamentoPedidoStatus, IOrcamentoStatus } from '@/model/Index'
import { DateAndHour, DateModel, DatePtBR } from '@/util/Data'
import { computed, onMounted, ref, toRefs, watchEffect, type PropType } from 'vue'
import DivComponent from '@/components/one-print/DivComponent.vue'
import IMGAnexo from '../one-print/IMGAnexo.vue'
import { useToast } from '@/composables/Toast'
import { updateOrcamentoFinanceiro } from '@/api/actions/Orcamento'
import { useLoginStore } from '@/stores/LoginStore'
import { storeToRefs } from 'pinia'
import { pdfAxios } from '@/api/actions/Pdf'
import { useFinance } from '@/composables/UseFinance'
import { useSwal } from '@/composables/Swal'
import { cartMaxValueUtil } from '@/util/Util'
const prop = defineProps({
  financeOrc: { type: Object as PropType<IOrcamentoPedidoStatus>, required: true },
  bankList: {
    type: Object as PropType<{ id: number; nome_banco_pagamento: string }[]>,
    required: true
  },
  paymentList: {
    type: Array as PropType<{ fpg_descricao: string; fpg_id: number }[]>,
    required: true
  },
  orcamentoStatus: { type: Object as PropType<IOrcamentoStatus[]>, required: true },
  payStatusList: {
    type: Array as PropType<{ id_pg_status: number; status: string; styled_css: string }[]>,
    required: true
  }
})

const emit = defineEmits(['fnClose', 'recharge-table', 'list-orc'])

const { userData } = storeToRefs(useLoginStore())
const { financeOrc, bankList } = toRefs(prop)
const { budgetStatusApprove, listOrc } = useFinance()
const { swalConfirmed } = useSwal()

const { notifyToast } = useToast()

let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

const refPayment = ref([
  {
    id: 1,
    nome: 'Pagamento no valor total'
  },
  {
    id: -1,
    nome: 'Pagamento parcial'
  }
])

const finance = computed(() => ({
  account_payment: financeOrc.value.account_payment?.nome_banco_pagamento,
  account_payment_id: financeOrc.value.account_payment?.id,
  cliente: financeOrc.value.cliente?.cli_nome,
  orc_data_aprovacao:
    financeOrc.value.orc_data_aprovacao === null
      ? null
      : DatePtBR(new Date(financeOrc.value.orc_data_aprovacao)),
  orcamento_status: financeOrc.value.orcamento_status?.ost_descricao,
  orcamento_status_id: financeOrc.value.orcamento_status?.ost_id,
  forma_pagamento: financeOrc.value.forma_pagamento?.fpg_descricao,
  orc_valor_total: financeOrc.value.orc_valor_total.toString().replace('.', ','),
  orc_parcial: financeOrc.value.orc_check_parcial === true ? financeOrc.value.orc_value_parcial : 0,
  orcamento_itens:
    financeOrc.value.orcamento_itens.length > 0 && financeOrc.value.orcamento_itens !== undefined
      ? financeOrc.value.orcamento_itens
        ?.map((v) => v.produto.pro_nome)
        ?.reduce((acc = '', pro_nome) => {
          return acc + ', ' + pro_nome
        })
      : [],
  forma_pagamento_id: financeOrc.value.forma_pagamento.fpg_id,
  tempo: '',
  logi: 'Entrega própria',
  orc_data_aprovacao1:
    financeOrc.value.orc_data_aprovacao === null
      ? null
      : DateAndHour(new Date(financeOrc.value.orc_data_aprovacao)),
  orc_data_entrega:
    financeOrc.value.orc_data_aprovacao === null
      ? null
      : DateAndHour(new Date(financeOrc.value.orc_data_entrega)),
  users: financeOrc.value.users?.user_nome,
  pagamento_status: financeOrc.value.pagamento_status.id_pg_status,
  ref_pay_value_total:
    financeOrc.value.orc_check_parcial === false && financeOrc.value.ref_pay_value_total === 1
      ? 1
      : -1,
  data_payment:
    financeOrc.value.orc_data_pagamento === null
      ? null
      : DateModel(new Date(financeOrc.value.orc_data_pagamento))
}))

const editFinance = ref(finance.value)
const selectInit = ref()
const check = ref<boolean>(false)
const calculoCart = ref<{ diferenca: number; cart_valor: number }>({
  diferenca: 0,
  cart_valor: 0
})

const cartMaxValue = () => {
  const { diferenca, cart_valor } = cartMaxValueUtil(
    {
      cliente: financeOrc.value.cliente,
      orc_value_parcial: financeOrc.value.orc_value_parcial,
      formaPagamento: financeOrc.value.forma_pagamento.fpg_id,
      orc_valor: financeOrc.value.orc_valor_total as number
    },
    {
      orc_parcial: editFinance.value.orc_parcial,
      orc_check_parcial: financeOrc.value.orc_check_parcial
    }
  )

  calculoCart.value.diferenca = diferenca
  calculoCart.value.cart_valor = cart_valor
}
const eventClose = (event: unknown) => {
  selectInit.value = {}
  emit('fnClose', event)
}
const dissolveChanges = () => {
  editFinance.value = selectInit.value
  notifyToast({ msg: 'Mudanças desfeita com sucesso!', typeToast: 'info' })
}

const updateSaveChanges = async () => {
  check.value = true
  try {
    const result = await swalConfirmed({
      title: 'Atualizar orçamento!',
      icon: 'info',
      text: `Você deseja realmente atualizar o orçamento?`
    })
    if (result.isConfirmed) {
      const { data, status } = await updateOrcamentoFinanceiro({
        orc_id: financeOrc.value.orc_id,
        orc_final: {
          data_payment: new Date(),
          orcamento_status_id: editFinance.value.orcamento_status_id,
          forma_pagamento_id: editFinance.value.forma_pagamento_id,
          orc_valor_total: editFinance.value.orc_valor_total,
          account_payment_id: editFinance.value.account_payment_id,
          ref_pay_value_total: editFinance.value.ref_pay_value_total as number,
          orc_check_parcial: editFinance.value.ref_pay_value_total === 1 ? false : true,
          orc_value_parcial: parseFloat(editFinance.value.orc_parcial.toString()),
          user_id: userData.value.user_id,
          pagamento_status: editFinance.value.pagamento_status
        }
      })

      if (status === 200) {
        setTimeout(async () => {
          if ([11, 10, 9, 8, 6, 5].includes(editFinance.value.forma_pagamento_id)) {
            await budgetStatusApprove({
              cart_value_parcial: calculoCart.value,
              orc_id: financeOrc.value.orc_id,
              ost_id: financeOrc.value.ost_id,
              user_usucadastro: userData.value.user_id,
              forma_pagamento: {
                ...financeOrc.value.forma_pagamento,
                fpg_id: editFinance.value.forma_pagamento_id
              },
              cliente: financeOrc.value.cliente,
              orc_valor_total: financeOrc.value.orc_valor_total
            })
            // await rechargeOrcamento()
            emit('list-orc', listOrc.value)
            emit('fnClose')
          } else {
            notifyToast({ msg: 'Forma de pagamento invalida!', typeToast: 'warning' })
          }

          notifyToast({ msg: data.msg, typeToast: 'success' })
          check.value = false
        }, 500)
      }
    }
  } catch (er: unknown) {
    const error = er as IError
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro interno na tentativa do login', typeToast: 'error' })
      check.value = false

      return
    }

    if (error.response.status === 404) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      check.value = false
      return
    } else {
      notifyToast({ msg: 'Erro interno ', typeToast: 'error' })
      check.value = false

      return
    }
  } finally {
    check.value = false
  }
}

const pdfView = async (value: IArquivos) => {
  try {
    if (value.type_file !== 'img') {
      const path = value.url.split('public')[1]

      const { data } = await pdfAxios({ path1: `upload${path}`, nome: value.nome_arq })
      var URL = window.URL || window.webkitURL
      const b = new Blob([data], { type: 'application/pdf' })
      var downloadUrl = URL.createObjectURL(b)
      window.open(downloadUrl, '_blank')
      URL.revokeObjectURL(downloadUrl)
      return
    }

    window.open(value.url, '_blank')
  } catch (er: unknown) {
    const error = er as IError
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

    if (error.response.status === 400) {
      notifyToast({ msg: 'Erro ao buscar pdf', typeToast: 'error' })
      return
    }
  }
}

watchEffect(() => {
  editFinance.value.account_payment_id = finance.value.account_payment_id
  //editFinance.value.ref_pay_value_total = finance.value.ref_pay_value_total

  if (editFinance.value.data_payment === '') {
    editFinance.value.data_payment = DateModel(new Date(financeOrc.value.orc_data_pagamento))
  }

  editFinance.value = finance.value
})

// watch(finance.value, () => {})

onMounted(() => {
  selectInit.value = JSON.parse(JSON.stringify(editFinance.value))
})
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  text-align: start;
  width: 100%;
}
</style>
