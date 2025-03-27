<template>
  <!-- MODAL CONFIRMAR PEDIDO -->
  <div id="modalConfirmarPedido" class="modal">
    <div class="modal-content w-100">
      <div class="modal-top">
        <span class="modal-close" @click.prevent="$emit('fnClose')">×</span>
      </div>
      <div class="modal-container">
        <h4 style="padding: 0; margin-bottom: 0">Pedido: #{{ pedidoId }}</h4>
        <small class="text-50 mt-100"
          >VALIDADE DA PROPOSTA:
          <span class="text-100 font-weight-bold">{{ dataPedido }}</span>
        </small>

        <hr />
        <div class="col-lg-12 d-flex flex-wrap justify-content-between">
          <CustomerSeller></CustomerSeller>
          <!-- Quadro PRODUTOS/SERVIÇOS no Carrinho-->
          <div class="col-lg-9 col-md-6">
            <!--  col-sm-12 col-md-12 card mp-2 mb0p12  -->
            <div
              class="card card-group-row__card oneScroll ctrMdConfirmarPedido"
              :class="{ ctrHeigh: productCart.length > 4 }"
            >
              <div class="card-header">
                <div class="d-flex align-items-center mb-16pt">
                  <div class="flex">
                    <strong class="card-title">Adicionados ao Carrinho</strong>
                    <span class="text-20"> ({{ productCart.length }}) </span>
                  </div>
                  <i class="material-icons text-50">more_horiz</i>
                </div>

                <div class="alert alert-soft-warning mb-0 p-8pt">
                  <div class="d-flex align-items-start">
                    <div class="mr-8pt">
                      <i class="material-icons">error_outline</i>
                    </div>
                    <div class="d-flex align-items-center justify-items-center">
                      <small class="text-10" style="line-height: 23px"
                        >Revise cada item com atenção.</small
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="card-body hgt-75 efeito-lista"
                v-for="(value, index) in cartProduct"
                :key="index"
              >
                <div class="d-flex align-items-center mb-8pt">
                  <div class="mr-8pt">
                    <div class="carrinhoPreviewIMG1">
                      <img
                        :src="value.produto_galeria?.pro_galeria_path"
                        alt="Avatar"
                        class="avatar-img rounded"
                      />
                    </div>
                  </div>
                  <div class="d-flex flex flex-column">
                    <a href="" class="card-title">{{ value.pro_nome }}</a>
                    <DescriptionCart :get-client="getClient" :value="value"></DescriptionCart>

                    <div class="d-flex justify-content-between w-75">
                      <small
                        class="text-50 valorAtual"
                        v-if="value.value_discount > 0 && value.value_discount_type === 1"
                      >
                        {{ real.format(value.pro_venda - value.value_discount) }}
                        <span class="valorAnterior">{{ real.format(value.pro_venda) }}</span>
                      </small>
                      <small
                        class="text-50 valorAtual"
                        v-else-if="value.value_discount > 0 && value.value_discount_type === 2"
                      >
                        {{ real.format(value.pro_venda - fnDiscountPercent(value)) }}
                        <span class="valorAnterior">{{ real.format(value.pro_venda) }}</span>
                      </small>

                      <small
                        class="text-50 valorAtual"
                        v-else-if="
                          getClient?.nivel_desconto !== undefined &&
                          getNivelDiscountByProduct(value)?.nds_prod_id === value.pro_id
                        "
                      >
                        {{ real.format(Number(getNivelDiscountByProduct(value)?.nds_valor)) }}
                        <span class="valorAnterior">{{ real.format(value.pro_venda) }}</span>
                      </small>

                      <small class="text-50 valorAtual" v-else>{{
                        real.format(value.pro_venda)
                      }}</small>

                      <!--Adicionar função para saber qual a porcentagem foi aplicado caso o valor do desconto for atual-->
                      <span
                        class="mr-2 valorItemCliente"
                        v-if="
                          getClient?.nivel_desconto !== undefined &&
                          getNivelDiscountByProduct(value)?.nds_prod_id === value.pro_id
                        "
                        >DESCONTO R$ {{ getNivelDiscountByProduct(value)?.nds_valor }}
                      </span>
                      <span
                        v-else-if="[1, 2].includes(value.value_discount_type)"
                        class="mr-2 valorItemCliente"
                        >DESCONTO {{ discountBasedAmount(value) }}%
                      </span>
                    </div>
                  </div>

                  <ButtonToolTip
                    class="mr-2 btn btn-sm btn-accent"
                    @click.prevent="''"
                    :content="''"
                    :button-options="{
                      tooltip: 'Deletar Item da lista',
                      icon: 'material-icons',
                      contentTag: 'remove_shopping_cart'
                    }"
                  ></ButtonToolTip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="col-lg-12 d-flex justify-content-between mp-0" style="margin-bottom: 0">
          <div class="col-lg-4 d-flex p-0">
            <button @click.prevent="copyDetailsOrc" type="button" class="btn btn-light">
              <i class="material-icons icon--left">content_copy</i>
              Copiar Orçamento
            </button>

            <!-- <button @click.prevent="updateOrc" type="button" class="btn btn-primary ml-2">
              <i class="material-icons icon--left">save</i>
              Salvar Pedido
            </button> -->
          </div>
          <div class="col-lg-8 d-flex justify-content-end p-0">
            <!--Adicionar função da rota de editar-->
            <button
              @click.prevent="
                router.push({
                  name: `Alterar Orçamento admin`,
                  params: {
                    id_orc: pedidoId,
                    id_cli: getClient?.cli_id
                  }
                })
              "
              type="button"
              id="orcamentoAprovado"
              class="btn btn-secondary ml-2"
            >
              <i class="material-icons icon--left">content_copy</i>
              Editar orçamento
            </button>

            <a
              @click.prevent="paymentGenerate"
              type="button"
              class="btn btn-success ml-2"
              v-if="checkPayment"
            >
              Ir para pagamento
            </a>

            <button
              type="button"
              id="orcamentoAprovado"
              class="btn btn-secondary ml-2"
              @click.prevent="checkPayment = !checkPayment"
            >
              <i class="material-icons icon--left">gavel</i>
              Confirmar pedido?
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/ProductStore'
import CustomerSeller from '@/components/client/seller/Customer-seller.vue'
import { computed, onMounted, ref, toRefs } from 'vue'
import { useToast } from '@/composables/Toast'
import { getAllPaymentType } from '@/api/actions/Payment'
import type { cartItem, IError, IPayment } from '@/model/Index'
import { useRoute, useRouter } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import ButtonToolTip from '@/components/one-print/ButtonToolTip.vue'
import DescriptionCart from '../layout/description/DescriptionCart.vue'
import { copyFile } from '@/util/Util'

const emit = defineEmits(['fnClose']) //emit fnClose
//router hooks
const router = useRouter()
const route = useRoute()

const props = defineProps({
  pedidoId: { type: Number, required: true }
})

const testes = toRefs(props) //modificar o nome no final
//hooks
const { getClientById } = useClientStore()
const { productCart, stateValue, calculateDiscountCartPercent, discountBasedAmount } =
  useProductStore()
const { notifyToast } = useToast()

let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})
const dataPedido = ref(new Date().toLocaleDateString('pt-br'))
const typePayment = ref<IPayment>({
  bank: [],
  presencial: [],
  retirar: []
})

const paramsRouter = ref(route.params.id || route.params.id_cli)

const getClient = computed(() => getClientById(Number(paramsRouter.value)))
const cartProduct = computed(() => productCart.filter((v) => v.prod_deleted === false))

//function
const getNivelDiscountByProduct = (prod: cartItem) => {
  return getClient.value?.nivel_desconto.find((v) => v.nds_prod_id === prod.pro_id)
}

const paymentGenerate = () => {
  if (testes.pedidoId.value <= 0) {
    notifyToast({ msg: 'Não e possivel te enviar para o pagamento', typeToast: 'warning' })
    return
  }
  //Zerar o carrinho
  //Chamar a função de reset de carrinho.
  emit('fnClose')
  setTimeout(() => {
    router.push({ name: 'Finalizar Orçamento', params: { id: testes.pedidoId.value } })
  }, 500)
}

const fnDiscountPercent = (value: cartItem) => {
  return calculateDiscountCartPercent(value)
}

const copyDetailsOrc = () => {
  //let desc: string = ''
  let desc: string = cartProduct.value.reduce((acc = '', curr) => {
    return [1, 2, 3].some((val) => val === curr.pro_categoria_item)
      ? (acc += `${curr.pro_nome}
      cliente: ${getClient.value?.cli_nome}
      metragem TOTAL:${curr.qnty} MT
      A vista (dinheiro ou PIX): R$ ${totalCart.value}
      STATUS: ORÇAMENTO AGUARDANDO APROVAÇÃO PAGAMENTO`)
      : (acc += `${curr.pro_nome}
      cliente: ${getClient.value?.cli_nome}
      A vista (dinheiro ou PIX): R$ ${totalCart.value}
      STATUS: ORÇAMENTO AGUARDANDO APROVAÇÃO PAGAMENTO`)
  }, '')

  copyFile(desc, notifyToast)
}

//ending function

//computed
const totalCart = computed(() => real.format(parseFloat(stateValue.totalValue.toString())))

const checkPayment = ref(false)

onMounted(async () => {
  try {
    //
    const { data } = await getAllPaymentType()
    typePayment.value = data
  } catch (er: unknown) {
    const error = er as IError
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro interno na tentativa do login', typeToast: 'error' })
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
</script>

<style scoped>
.carrinhoPreviewIMG1 {
  width: 80px;
  height: 50px;
}
</style>
