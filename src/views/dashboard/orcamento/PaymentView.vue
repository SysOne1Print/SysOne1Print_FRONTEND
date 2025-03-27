<template>
  <div
    class="mdk-drawer-layout__content page-content"
    style="transform: translate3d(0px, 0px, 0px)"
  >
    <header-layout></header-layout>

    <div class="pt-32pt">
      <div
        class="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left"
      >
        <div class="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
          <div class="mb-24pt mb-sm-0 mr-sm-24pt">
            <h2 class="mb-0">Orçamento 3/3</h2>

            <ol class="breadcrumb p-0 m-0">
              <li class="breadcrumb-item"><a href="defCliente.html">Vender</a></li>
              <li class="breadcrumb-item"><a href="defCliente.html">Definir Cliente</a></li>
              <li class="breadcrumb-item"><a href="orcamento.html">Orçamento</a></li>
              <li class="breadcrumb-item active">Orçamento Aprovado</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="container page__container">
      <div class="page-section">
        <div class="row card-group-row mb-lg-8pt">
          <CardPedido
            :save-change-prop="receiveForChange.saveChange"
            @set-for-events="receive"
            :parcial="parcial"
            :user-data="user"
            :client="getCli"
            :orcamento="orcComp"
            :orcamento_itens="orca_itens"
            :orcamento_status="orcamentoStatus01"
            :forma-pagamento="receiveForChange.formaPagamento"
            :forma_pagamentoFull="formaPagamento"
            @open-modal="fnSelectItem"
            @debit-cart="debitCart"
          >
            ></CardPedido
          >
          <cardPedidoStatus
            @set-for-events="receive"
            @parcial="parcialPedido"
            :force-save-change="receiveForChange"
            @change-for-payment="formPayment"
            :orcamento="orcComp"
            :orcamento_itens="orca_itens"
            :orcamento_status="orcamentoStatus01"
            :client="getCli"
            :forma_pagamento="pagam"
            :pagamento_pix="pagamentoPix"
          >
          </cardPedidoStatus>
        </div>
      </div>
    </div>

    <ModalContent>
      <CreateCarteiraOne
        @update:valueCart="updateClient"
        @closeModal="closeModal"
        :cliente="clientEdit"
      ></CreateCarteiraOne>
    </ModalContent>

    <footer-layout></footer-layout>
  </div>
</template>

<script setup lang="ts">
import CardPedido from '@/components/Card-Pedido.vue'
import cardPedidoStatus from '@/components/Card-Pedido-Status.vue'
import headerLayout from '@/layout/header/Header-layout.vue'
import footerLayout from '@/layout/Footer-layout.vue'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from '@/composables/Toast'
import { getPedidoOrc } from '@/api/actions/Orcamento'
import CreateCarteiraOne from '@/components/form/CreateCarteiraOne.vue'
import ModalContent from '@/components/modal-content/Modal-content.vue'
import type {
  IClient,
  IError,
  IOrcamento,
  IOrcamentoItens,
  orClient,
  orcamentoStatus,
  saveChange
} from '@/model/Index'
import { useLoginStore } from '@/stores/LoginStore'
//import { useClientStore } from '@/stores/clientStore';
import { storeToRefs } from 'pinia'
import { useDomStore } from '@/stores/DomStore'
import { useSidebar } from '@/composables/Sidebar'
//router hooks
const route = useRoute()
const { sidebarDom } = storeToRefs(useDomStore())
const { removeActiveInOtherPage } = useSidebar()
//store
const { user } = storeToRefs(useLoginStore())

//composables
const { notifyToast } = useToast()

//variable
const buttonCheck = ref<boolean>(false)
const clientEdit = ref<IClient>()

const orcamentoStatus01 = ref<orcamentoStatus>({
  ost_id: 0,
  ost_descricao: ''
})
const receiveForChange = ref<saveChange>({
  observacao: '',
  exibirRecibo: false,
  saveChange: false,
  orc_check_parcial: false,
  orc_value_parcial: 0
})
const orcamento = ref<IOrcamento>({
  orc_value_parcial: 0,
  orc_indicator_id: 0,
  orc_data_pagamento: '',
  orc_id: 0,
  orc_data_validade: '',
  orc_data_aprovacao: '',
  orc_data_entrega: '',
  orc_valor_frete: '',
  orc_observacao: '',
  orc_nome_arquivo: '',
  user_dtcadastro: '',
  user_dtultalteracao: '',
  orc_emissao: '',
  user_usucadastro: 0,
  user_usuultalteracao: 0,
  cli_id: 0,
  fpg_id: 0,
  ost_id: 0,
  orc_recibo: false,
  orc_valor_total: '',
  arquivos: []
})
const orca_itens = ref<IOrcamentoItens[]>([])

const formaPagamento = ref<{ fpg_descricao: string; fpg_id: number; fpg_status: number }>({
  fpg_descricao: '',
  fpg_id: 0,
  fpg_status: 0
})

const pagamentoPix = ref<{
  data_pix: Date | string
  pg_status: string
}>()

const numberPayment = ref<number>(formaPagamento.value.fpg_id)
//const numberPaymentComputed = computed(() => numberPayment.value)
const orcComp = computed(() => orcamento.value)
const client = ref<orClient>({
  cli_id: 0,
  cli_nome: '',
  cli_nome_fantasia: '',
  carteira_one1_cliente: {
    cart_create_at: '',
    cart_status: false,
    cart_update_at: '',
    cart_valor: 0,
    id_cart: 0,
    user_id_cadastro: 0,
    user_id_change: 0
  },
  cli_cpf: '',
  cli_endereco: '',
  cli_cnpj_and_cpf: '',
  nivel_desconto: []
})
const parcial = ref<{ orc_check_parcial: boolean; orc_value_parcial: number }>({
  orc_check_parcial: false,
  orc_value_parcial: 0
})

//function
const formPayment = ({
  formaPagamento
}: {
  formaPagamento: { fpg_id: number; fpg_descricao: string }
}) => {
  numberPayment.value = formaPagamento.fpg_id
  receiveForChange.value.formaPagamento = formaPagamento
}

const fnSelectItem = (value: IClient) => {
  window.scrollTo(0, 0)
  document.querySelector('body')?.setAttribute('style', 'overflow: hidden; height: auto')
  document.querySelector('#mdContent')?.classList.add('active')
  buttonCheck.value = true
  clientEdit.value = value
}

const closeModal = (evt: Event) => {
  if (evt !== undefined && evt.target instanceof HTMLElement) {
    const parent = evt.target.offsetParent as HTMLElement | null
    if (parent && parent.offsetParent) {
      parent.offsetParent.classList.remove('activeModal')
    }
  }
  document.querySelector('body')?.removeAttribute('style')
  clientEdit.value = {} as IClient
}

const updateClient = (event: orClient) => {
  if (client.value)
    client.value.carteira_one1_cliente.cart_valor = event.carteira_one1_cliente.cart_valor
}

const debitCart = (value: number) => {
  //debito de valor da carteira
  if (client.value)
    client.value.carteira_one1_cliente.cart_valor =
      client.value.carteira_one1_cliente.cart_valor - value
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const receive = (value: any) => {
  if (value.observacao !== undefined) {
    receiveForChange.value.observacao = value.observacao
    receiveForChange.value.saveChange = false
  }

  if (numberPayment.value !== undefined && numberPayment.value > 0) {
    //receiveForChange.value.numberPayment = numberPayment.value
    //REFAZER AGORA
    if (receiveForChange.value.formaPagamento !== undefined) {
      receiveForChange.value.formaPagamento.fpg_id = numberPayment.value
    }

    receiveForChange.value.saveChange = false
  }

  if (value.orc_check_parcial !== undefined) {
    //Adicionar Variavel Parcial para mudanças
    receiveForChange.value.orc_check_parcial = value.orc_check_parcial as boolean
    parcial.value.orc_check_parcial = value.orc_check_parcial as boolean
  }

  if (value.orc_value_parcial !== undefined) {
    receiveForChange.value.orc_value_parcial = value.orc_value_parcial as number
    receiveForChange.value.saveChange = false
    parcial.value.orc_value_parcial =
      value.orc_value_parcial === undefined ? 0 : (value.orc_value_parcial as number)
  }

  if (value.exibirRecibo !== undefined) {
    receiveForChange.value.exibirRecibo = value.exibirRecibo
    receiveForChange.value.saveChange = false
  }

  if (value.saveChange) {
    receiveForChange.value.saveChange = value.saveChange
  }
}

const parcialPedido = (event: { orc_check_parcial: boolean; orc_value_parcial: number }) => {
  parcial.value.orc_check_parcial = event.orc_check_parcial
  parcial.value.orc_value_parcial = event.orc_value_parcial as number
}

//computed
const getOrcId = computed(() => Number(route.params.id))
const getCli = computed(() => client.value as orClient)

const pagam = computed(() => formaPagamento.value)

onMounted(async () => {
  try {
    const { data } = await getPedidoOrc(getOrcId.value)
    const {
      forma_pagamento,
      orcamento_status,
      orca: { cliente, orcamento_itens, pagamento_pix, ...orcRest }
    } = data
    orcamentoStatus01.value = orcamento_status
    orca_itens.value = orcamento_itens
    client.value = cliente
    orcamento.value = orcRest
    formaPagamento.value = forma_pagamento
    numberPayment.value = formaPagamento.value.fpg_id

    pagamentoPix.value = Array.from(pagamento_pix).length > 0 ? pagamento_pix[0] : []
  } catch (er: unknown) {
    const error = er as IError
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro interno', typeToast: 'error' })
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

  removeActiveInOtherPage(sidebarDom.value)
})

onBeforeMount(() => {
  removeActiveInOtherPage(sidebarDom.value)
  if (window.history.state.replaced) {
    useDomStore().$reset()
    useDomStore().$hydrate()
    let dom2 = []
    sidebarDom.value.forEach((el) => {
      if (el != undefined) {
        dom2.push(el)
      }
      dom2.push(el)
    })
    //sidebarDom.value = dom
  }
})
</script>

<style scoped>
.active {
  display: flex;
}
</style>
