<template>
  <div id="modalDetalhes1" class="modal">
    <div class="w-75 modal-content oneScroll">
      <div class="modal-top" @click.prevent="$emit('fnClose', $event)">
        <span class="modal-close">×</span>
      </div>
      <div class="modal-container">
        <div class="w-100 d-flex flex-column border-bottom">
          <h4 class="mb-0">Detalhes do Pedido</h4>
          <div class="w-100 d-flex flex-row justify-content-between align-items-center pr-20 pb-2">
            <span>
              Ordem de Serviço Nº
              <span class="font-weight-bold">#{{ financeOrc?.orc_id || productionStage?.orc_id }}</span>
            </span>

            <!-- botão de ações extras -->
            <div class="button-list">
              <div class="btn-group">
                <button type="button" class="btnDetalhes-sm-Entrega btn btn-sm btn-primary dropdown-toggle"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-sliders-h"></i>
                </button>
                <div class="dropDetalhes-EntregaFinal d-none dropdown-menu">
                  <a class="dropdown-item" href="#">
                    <div class="w-100 d-flex flex-row justify-content-between">
                      <i class="mt-1 fas fa-file-pdf"></i>
                      <span class="ml-2">Gerar PDF</span>
                    </div>
                  </a>
                  <a class="dropdown-item" href="#">
                    <div class="w-100 d-flex flex-row justify-content-between">
                      <i class="mt-1 fas fa-print"></i>
                      <span class="ml-2">Imprimir</span>
                    </div>
                  </a>
                  <a class="dropdown-item" href="#">
                    <div class="w-100 d-flex flex-row justify-content-between">
                      <i class="mt-1 fas fa-arrow-left"></i>
                      <span class="ml-2">Recusar pedido</span>
                    </div>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item text-positive" href="#">
                    <div class="w-100 d-flex flex-row justify-content-between">
                      <i class="mt-1 fas fa-barcode"></i>
                      <span class="ml-2">Gerar boleto</span>
                    </div>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item text-accent" href="#">
                    <div class="w-100 d-flex flex-row justify-content-between">
                      <i class="mt-1 fas fa-power-off"></i>
                      <span class="ml-2">Cancelar Pedido</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex gap-1">
          <div class="left w-60">
            <DivComponent class="w-100 d-flex flex-row justify-content-between mt-3 pb-3 border-bottom"
              :classList="value.variable === 'ost_descricao' ? 'text-accent' : ''" :span="value.nome"
              v-for="(value, index) in modal" :key="index"
              :span-value="typeModal !== null ? typeModal[value.variable] : ''" :header-array="value.variable"
              :balanceCartColor="value.variable === 'cart_valor_banknotes'
                ? typeModal['cart_valor'] < 0
                  ? 'text-danger'
                  : ''
                : ''
                ">
            </DivComponent>

            <DivComponent :class="'w-100 d-flex flex-row justify-content-between mt-3 pb-3 border-bottom'"
              :span="'Vendedor'" :span-value="typeModal !== null ? typeModal['users'] : ''">
            </DivComponent>

            <div class="w-100 d-flex flex-row justify-content-between align-items-center mt-3 pb-3 border-bottom">
              <span>Processos:</span>
              <div class="w-100 d-flex flex-row justify-content-end mb-0">
                <StepDefault :type-modal="typeModal !== null ? typeModal : {}" v-if="route.path.includes('/finance')">
                </StepDefault>
                <StageStepExpedition :type-modal="typeModal !== null ? typeModal : {}" v-else></StageStepExpedition>
              </div>
            </div>

            <IMGAnexo v-if="typeModal?.arquivos?.length > 0" @click-img="pdfView" :financeOrc="typeModal"></IMGAnexo>

            <div class="w-100 d-flex flex-column my-3 border-bottom" v-if="route.path.includes('/finance')">
              <p class="font-weight-bold">Status do orçamento - (situação):</p>
              <HistoricalItem :headers="[]" :widthTable="'min-width: 45rem'"
                :orcamento-historical="finance?.orcamento_historico_status"
                v-if="finance?.orcamento_historico_status && finance?.orcamento_historico_status?.length > 0">
              </HistoricalItem>

              <p v-else class="text-center ">Não existe atividade nesse orçamento</p>
            </div>


            <div class="d-flex flex-column mt-4" v-if="production !== undefined">
              <p class="font-weight-bold">Status do orçamento - (situação):</p>
              <HistoricalItem :new-orcamento-historical="production?.union_status" :headers="[]"
                v-if="production?.union_status && production?.union_status?.length > 0">
              </HistoricalItem>

              <p v-else class="text-center ">Não existe atividade nesse orçamento</p>

            </div>

            <div class="w-100 d-flex flex-column my-3 border-bottom"
              v-if="route.name?.toString().toLowerCase() !== 'Pedidos Aprovados'.toLocaleLowerCase()">
              <p class="font-weight-bold">Logs de todo o orçamento</p>
              <HistoricalItem :widthTable="'min-width: 40rem'" :headers="headerReplacementLog"
                :orcamento-historical="[]" :orcamento-log="financeOrc?.orcamento_log"
                v-if="finance?.orcamento_log && finance?.orcamento_log?.length > 0">
              </HistoricalItem>

              <p v-else class="text-center ">Não existe atividade nesse orçamento</p>
            </div>
          </div>

          <PrevisualizeImg :url-img="imgSelection?.url" :orc="{
            orc_id: imgSelection?.orc_id as number,
            nome_prod: imgSelection?.orc_itens?.produto?.pro_nome as string,
            responsavel: typeModal?.users as string,
            tipo: imgSelection?.orc_itens?.produto.produto_categoria_item
              .prod_tipo_descricao as string,
            data_prod:
              typeModal?.orc_data_entrega && typeModal?.orc_data_entrega !== ''
                ? typeModal?.orc_data_entrega
                : ('' as string) //Adicionar a data correta futuramente
          }"></PrevisualizeImg>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import type { IArquivos, IError, IOrcamentoPedidoStatus, IOrcamentoItensPedidoStatus, IOrcamentoStatus } from '@/model/Index'
import { computed, ref, toRefs, type PropType } from 'vue'
import DivComponent from '@/components/one-print/DivComponent.vue'
import { modal_finance } from '@/util/TableInfo'
import { DateAndHour, DatePtBR } from '@/util/Data'
import IMGAnexo from '../one-print/IMGAnexo.vue'
import { pdfAxios } from '@/api/actions/Pdf'
import { useToast } from '@/composables/Toast'
import StepDefault from '@/components/stage-step/Step-default.vue'
import StageStepExpedition from '@/components/stage-step/Stage-step-expedition.vue'
import { useRoute } from 'vue-router'
import PrevisualizeImg from '@/components/one-print/PrevisualizeImg.vue'
import HistoricalItem from '../one-print/HistoricalItem.vue'
import { headerReplacementLog } from '@/util/TableHeaderPrime'
const prop = defineProps({
  financeOrc: {
    type: Object as PropType<IOrcamentoPedidoStatus | undefined | null>
  },
  productionStage: { type: Object as PropType<IOrcamentoItensPedidoStatus | undefined>, default: () => { } },
  descriptionProduction: {
    type: Object as PropType<{ nome: string; variable: string }[]>,
    required: false
  }
})
defineEmits(['addModalFinance', 'fnClose'])

const route = useRoute()
const { financeOrc, productionStage, descriptionProduction } = toRefs(prop)
const { notifyToast } = useToast()

//imgSelection
const imgSelection = ref<IArquivos>()

let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

const checkFile = ref(false)
const finance = computed(() =>
  financeOrc?.value !== undefined
    ? {
      orcamento_log: financeOrc?.value?.orcamento_log,
      orcamento_historico_status: financeOrc?.value?.orcamento_historico_status,
      orc_id: financeOrc?.value?.orc_id,
      files: financeOrc?.value?.files,
      arquivos: financeOrc?.value?.arquivos,
      account_payment: financeOrc?.value?.account_payment?.nome_banco_pagamento,
      cliente: financeOrc?.value?.cliente?.cli_nome,
      orc_data_aprovacao:
        financeOrc?.value?.orc_data_aprovacao === null
          ? ''
          : DateAndHour(new Date(financeOrc?.value?.orc_data_aprovacao as string)),
      orcamento_status: financeOrc?.value?.orcamento_status?.ost_descricao,
      forma_pagamento: financeOrc?.value?.forma_pagamento?.fpg_descricao,
      pagamento_status: financeOrc?.value?.pagamento_status,
      orc_parcial: calcValueEntrada(),
      orc_valor_total: calcValue(),
      orcamento_itens: financeOrc?.value?.orcamento_itens
        ?.map((v) => v.produto.pro_nome)
        ?.reduce((acc = '', pro_nome) => {
          return acc + ', ' + pro_nome
        }),
      logi: 'Entrega própria',
      orc_data_aprovacao1:
        financeOrc?.value?.orc_data_aprovacao === null
          ? ''
          : DateAndHour(new Date(financeOrc?.value?.orc_data_aprovacao as string)),
      orc_data_entrega: financeOrc?.value?.orc_data_entrega
        ? DateAndHour(new Date(financeOrc?.value?.orc_data_entrega as string))
        : ' ',
      users: financeOrc?.value?.users?.user_nome,
      cart_valor_banknotes: financeOrc?.value?.cliente?.carteira_one1_cliente
        ? real.format(
          Number(financeOrc?.value?.cliente.carteira_one1_cliente.cart_valor as string)
        )
        : 0,
      cart_valor: Number(financeOrc?.value?.cliente.carteira_one1_cliente.cart_valor),
      orc_data_pagamento:
        financeOrc.value?.orc_data_pagamento === null
          ? ''
          : DateAndHour(new Date(financeOrc?.value?.orc_data_pagamento as string)),
      orc_check_parcial:
        financeOrc?.value?.orc_check_parcial === false ? 'Pagamento Total' : 'Pagamento Parcial',
      orcamento_step: financeOrc?.value?.orcamento_status
    }
    : {}
)

const production = computed(() =>
  productionStage?.value !== undefined
    ? {
      cliente: productionStage?.value?.cliente?.cli_nome,
      orcamento_historico_status: productionStage?.value?.orcamento_historico_status,
      description: productionStage?.value?.description,
      logistica: productionStage?.value?.logistica.name_logis,
      orc_data_aprovacao: productionStage?.value?.orc_data_aprovacao,
      orcamento_itens_historical: productionStage?.value?.orcamento_itens_historical,
      prod_expected_time:
        productionStage?.value?.producao_expedicao === undefined ||
          productionStage?.value?.producao_expedicao?.length === 0
          ? ' - '
          : productionStage.value?.producao_expedicao[0]?.time_expected === null
            ? ' -  '
            : DatePtBR(new Date(productionStage.value?.producao_expedicao[0].time_expected)),
      prod_final_delivery:
        productionStage?.value?.producao_expedicao === undefined ||
          productionStage?.value?.producao_expedicao?.length === 0
          ? ' - '
          : productionStage.value?.producao_expedicao[0].final_delivery === null
            ? ' - '
            : DatePtBR(new Date(productionStage?.value?.producao_expedicao[0].final_delivery)),
      ost_descricao: productionStage?.value?.status,
      users: productionStage?.value?.users.user_nome,
      orcamento_itens_status: productionStage?.value?.orcamento_itens_status,
      union_status: union_status()
    }
    : null
)

const union_status = () => {
  let orcamento_status: IOrcamentoStatus[] = []
  let orcStatus: Array<{ id: number, descricao: string, users_data: string, users_dtalteracao: string, users: { user_nome: string } }> = []
  let orcStatusItens: Array<{ id: number, descricao: string, users_data: string, users_dtalteracao: string, users: { user_nome: string } }> = []
  if (!Array.isArray(productionStage?.value?.orcamento_status)) {
    orcamento_status = [productionStage?.value?.orcamento_status] as any

    orcStatus = orcamento_status.map((val, i) => ({
      id: i += 1,
      descricao: val.ost_descricao,
      users_data: val.user_dtcadastro,
      users_dtalteracao: val.user_dtultalteracao,
      users: val.users
    }))
  }

  if (!Array.isArray(productionStage?.value?.orcamento_itens_status)) {
    const orcamento_itens_status = [productionStage?.value?.orcamento_itens_status];

    orcStatusItens = orcamento_itens_status.map((val, i) => ({
      id: i += 1,
      descricao: val?.oit_descricao as string,
      users_data: val?.user_dtcadastro as string,
      users_dtalteracao: val?.user_dtultalteracao as string,
      users: val?.users as { user_nome: string }
    }))
  }

  return [...orcStatus, ...orcStatusItens]
}

// const orcItensStatus = (productionStage: IOrcamentoStatus) => {
//   if (productionStage === undefined) return


//   if (productionStage.ost_status > 2) {
//     return
//   } else {
//     return productionStage.ost_descricao
//   }
// }
const calcValue = () => {
  const orc_valor_frete = financeOrc?.value && (financeOrc?.value?.orc_valor_frete !== null || parseFloat(financeOrc?.value?.orc_valor_frete) > 0) ? parseFloat(financeOrc.value.orc_valor_frete as string) : 0

  return financeOrc?.value?.orc_valor_total ? real.format(parseFloat(financeOrc?.value?.orc_valor_total.toString()) + orc_valor_frete) : parseFloat(financeOrc?.value?.orc_valor_total.toString() as string);
}

const calcValueEntrada = () => {
  return financeOrc?.value?.orc_value_parcial === null ? '' : real.format(parseFloat(financeOrc?.value?.orc_value_parcial.toString() as string));
}

const modal = computed(() => {
  let typeList = null

  if (
    finance.value !== null &&
    financeOrc?.value !== undefined &&
    Object.keys(financeOrc?.value as IOrcamentoPedidoStatus).length > 0
  ) {
    typeList = modal_finance
  } else if (production.value !== null && productionStage?.value !== undefined) {
    typeList = descriptionProduction?.value
  }

  return typeList
})

const typeModal = computed(() => {
  let typeList = null

  if (
    financeOrc?.value !== undefined &&
    Object.keys(financeOrc?.value as IOrcamentoPedidoStatus).length > 0
  ) {
    typeList = finance.value as any
  } else if (production.value !== null) {
    typeList = production?.value
  }
  return typeList
})

const pdfView = async (value: IArquivos) => {
  try {
    if (value.type_file !== 'img') {
      const path = value.url.split('public')[1]

      const { data } = await pdfAxios({ path1: `upload${path}`, nome: value.nome_arq })
      var URL = window.URL || window.webkitURL
      const b = new Blob([data], { type: 'application/pdf' })
      var downloadUrl = URL.createObjectURL(b)
      window.open(downloadUrl, '_blank')
      imgSelection.value = undefined
      return
    }
    if (
      finance.value !== null &&
      financeOrc?.value !== undefined &&
      Object.keys(financeOrc?.value as IOrcamentoPedidoStatus).length > 0
    ) {
      checkFile.value = false
      const prod = financeOrc.value?.orcamento_itens.find(
        (v) => v.produto.pro_id === value.pro_id
      )?.produto
      imgSelection.value = {
        ...value,
        orc_itens: {
          produto: {
            pro_categoria_item: prod?.pro_categoria_item as number,
            pro_nome: prod?.pro_nome as string,
            produto_categoria_item: {
              id: prod?.produto_categoria_item.id as number,
              prod_tipo_descricao: prod?.produto_categoria_item.prod_tipo_descricao as string
            }
          }
        }
      }
    } else {
      checkFile.value = false
      /**
       * @Produção
       * Testar na tela de produção esse bloco
       */
      // const prod = productionStage?.value?.orcamento_itens.find(
      //   (v) => v.produto.pro_id === value.pro_id
      // )?.produto

      imgSelection.value = {
        ...value
        // orc_itens: {
        //   produto: {
        //     pro_categoria_item: prod?.pro_categoria_item as number,
        //     pro_nome: prod?.pro_nome as string,
        //     pro_tipo: prod?.produto_tipo_servico.id as number
        //   }
        // }
      }
    }
  } catch (er: unknown) {
    console.log(er)
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
</script>

<style scoped>
.gap-1 {
  gap: 8px;
}

.w-60 {
  width: 60%;
}
</style>
