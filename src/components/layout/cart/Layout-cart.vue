<template>
  <div class="col-lg-4">
    <div class="card card-group-row__card">
      <div class="card-body">
        <h6>MEU CARRINHO</h6>
        <div class="d-flex align-items-center">
          <div class="mr-12pt">
            <div class="avatar avatar-xl avatar-4by3">
              <img :src="getClient?.cli_imagem || '../../../assets/img/guy-1.jpg'" alt="Qualquer Imagem"
                class="avatar-img rounded" />
            </div>
          </div>
          <div class="flex">
            <a href="" class="card-title">{{ getClient?.cli_nome }}</a>
            <small class="text-50">{{ getClient?.cli_nome_fantasia }}</small>
            <hr class="mt-0 mb-0" />
            <!-- Saldo negativo: .text-accent // psotivo: .text-positive -->
            <p class="text-80 mb-0 text-positive">
              <span style="font-size: 12px" v-if="(getClient?.carteira_one1_cliente?.cart_valor as number) > 0">
                {{ real.format(getClient?.carteira_one1_cliente?.cart_valor as number) }}</span>
              <span v-else-if="(getClient?.carteira_one1_cliente?.cart_valor as number) < 0" style="color: red">{{
                fnMinusSignValue(real.formatToParts(getClient?.carteira_one1_cliente?.cart_valor))
              }}</span>
              <span v-else style="color: grey">{{
                parseFloat(getClient?.carteira_one1_cliente?.cart_valor.toString() as string) === 0
                  ? 'Sem Saldo'
                  : fnMinusSignValue(
                    real.formatToParts(getClient?.carteira_one1_cliente?.cart_valor)
                  )
              }}</span>
              <span class="text-50"> na Carteira <b style="font-size: 13.5px">ONE1</b> </span>
            </p>
          </div>
        </div>
      </div>
      <div class="card-body maxHMenu oneScroll overflow-scroll-cart" v-if="productCart.length > 0">
        <div class="d-flex align-items-center mb-8pt" v-for="(value, index) in cartProduct" :key="index">
          <div class="mr-8pt">
            <div class="carrinhoPreviewIMG">
              <img :src="value.produto_galeria?.pro_galeria_path" alt="Avatar" class="avatar-img rounded" />
            </div>
          </div>
          <PrecoCart :get-client="getClient" :value="value"></PrecoCart>

          <div class="mr-8pt">
            <button type="button" class="btn btn-sm btn-light modal-toggle" @click.prevent="alterProduct(value)">
              <i class="material-icons">settings</i>
            </button>
            <button @click.prevent="
              removeProductById(
                value,
                route.name?.toString() === 'orçamento cliente etapa 2' ? '' : 'alterProd'
              )
              " type="button" class="btn btn-sm btn-accent">
              <i class="material-icons">remove_shopping_cart</i>
            </button>
          </div>
        </div>
      </div>
      <div class="card-body" v-else>
        <span class="d-flex justify-content-center">Sem produtos no carrinho</span>
      </div>

      <div class="card-body">
        <div class="d-flex align-items-center justify-content-end">
          <span class="subTotal">Desconto:
            {{
              discount_type === 2
                ? Number(discountComputed.split('R$')[1].toString().replace(',', '.')) + '%'
                : discountComputed
            }}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between">
          <div>{{ getTotalItemsCart }} Item</div>
          <div class="subTotal">Subtotal: {{ totalCart }}</div>
        </div>
        <div class="d-flex align-items-center justify-content-end">
          <div class="total">Total: {{ totalCart }}</div>
        </div>
        <hr />
        <div class="d-flex align-items-center justify-content-center gap-10">
          <button @click.prevent="removeItens" type="button" class="btn btn- btn-light">
            <i class="material-icons">delete</i>
          </button>
          <button type="button" class="btn btn- btn-light ml-2 modal-toggle" :disabled="parseFloat(prodWithDiscount?.replace(/\./g, '').replace(',', '.') as any) > 0
            ? true
            : false
            " @click.prevent="$emit('open-modal-discount')">
            desconto
          </button>
          <button v-if="route.name !== 'Alterar Orçamento'" @click="confirCreateOrcamento"
            :class="{ 'is-loading is-loading-sm is-loading-md': check }" type="submit"
            class="btn btn- btn-primary ml-2">
            conferir pedido
          </button>

          <button v-else @click="confirAlterOrcamento(Number(route.params.id_orc))"
            :class="{ 'is-loading is-loading-sm is-loading-md': check }" type="submit"
            class="btn btn- btn-primary ml-2">
            Alterar pedido
          </button>
        </div>

        <slot name="desconto"></slot>
        <!--O slot e para chamar as modal aqui dentro desse arquivo layout-->
        <slot name="pedidos"></slot>
        <!--O slot e para chamar as modal aqui dentro desse arquivo layout-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/ProductStore'
import { computed, ref, toRefs } from 'vue'
import { useLoginStore } from '@/stores/LoginStore'
import { createOrcamento } from '@/api/actions/Orcamento'
import { useToast } from '@/composables/Toast'
import type { cartItem, IError } from '@/model/Index'
import { sendAllProductFile } from '@/api/actions/Produtos'
import { storeToRefs } from 'pinia'
import { uploadImagem } from '@/composables/Upload-base64'
import { useBudget } from '@/composables/UseBudget'
import PrecoCart from '../Preco/PrecoCart.vue'
import { fnMinusSignValue } from '@/util/Util'

const prop = defineProps({
  discount_type: {
    type: Number,
    required: true,
    default: 0
  }
})

const { discount_type } = toRefs(prop)

//emit
const emit = defineEmits(['modal', 'alter-product', 'open-modal-discount', 'discount-type'])

//useComposables

const { confirAlterOrcamento, getClient, route, pedidoOrcamento, totalCart, prod } = useBudget(emit)
const { notifyToast } = useToast()
//store
const { userData } = useLoginStore()
const { removeAllProductCart, removeProductById } = useProductStore()
const { alterProductSelectState, cartProduct, productCart, discountComputed } =
  storeToRefs(useProductStore())

//composables
const { resetItem } = uploadImagem()

//computed
const getTotalItemsCart = computed(() =>
  cartProduct.value?.length ? cartProduct.value?.length : 0
)

//variable
let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

const prodWithDiscount = computed(() => {
  return (
    prod.value.find((v) => parseFloat(v.pro_desconto.replace(/\./g, '').replace(',', '.')))
      ?.pro_desconto ?? prod.value.find((v) => v.pro_discount_type)?.pro_id.toString()
  )
})

const check = ref<boolean>(false)

const confirCreateOrcamento = async () => {
  check.value = true
  const form = new FormData()
  try {
    pedidoOrcamento.value.valorTotal = totalCart.value
    pedidoOrcamento.value.orc_valor_discount =
      discountComputed.value === 'R$ 0,00' ? '0.0' : discountComputed.value
    pedidoOrcamento.value.orc_type_discount = discount_type.value
    const orcamento = prod.value.map((v) => {
      return {
        ...v,
        produto_preco_unidade: { pro_venda: Number(v.produto_preco_unidade.pro_venda) }
      }
    })
    pedidoOrcamento.value.produto_orcamento = orcamento
    //save orçamento.
    if (userData.user_id <= 0) {
      notifyToast({ msg: 'Logue no Painel novamente para executar essa função', typeToast: 'info' })
      setTimeout(() => {
        check.value = false
      }, 500)

      return
    }

    if (pedidoOrcamento.value.produto_orcamento.length > 0) {
      createOnlyProductWithOutFile()
        .then((result) => {
          const { pedido } = result

          //let dataProductFile = null
          productCart.value.forEach((v) => {
            let noti = 0
            if (v.pro_categoria_item === 4) {
              return
            }
            if (noti === 0 && v.pro_categoria_item !== 4)
              notifyToast({
                msg: 'Fazendo upload dos arquivos, e criando o Id do pedido',
                typeToast: 'info'
              })

            v.dropzoneFile?.forEach((value) => {
              form.append('item', value)
              if (v.type !== 0 && v.type > 0) {
                const qualidade: string = v.one1_produto_estoque.find(
                  (c) => c.one1_outros.id === v.type
                )?.one1_outros?.one1_nome as string
                form.append('qualidade[]', qualidade)
                form.append('pro_categ_tipo[]', v.type.toString())
                form.append('pro_id[]', v.pro_id.toString())
              }
            })
            form.append('service_type', (1).toString())
            noti++
          })
          form.append('nome_client', getClient.value?.cli_nome as string)
          form.append('nome_empresa', getClient.value?.cli_nome_fantasia as string)
          form.append('client_id', route.params.id.toString())
          form.append('orc_id', pedido)
          //form.append('oit_id', pedido)
          form.append('service_nome', '')

          if (form.get('qualidade[]') !== null) {
            //remover comentario da linha abaixo.
            sendAllProductFile(form, false)
              .then((result) => result)
              .catch((err) => err)
          }
        })
        .catch((err) => {
          throw err
        })
    } else {
      notifyToast({ msg: 'Adicione um item ao carrinho para prosseguir', typeToast: 'info' })
      setTimeout(() => {
        check.value = false
      }, 500)
    }
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
    } else {
      notifyToast({ msg: 'Error', typeToast: 'error' })
    }
    setTimeout(() => {
      check.value = false
    }, 500)
  }
}

const createOnlyProductWithOutFile = async () => {
  // pedidoOrcamento.value.urlForItems = []
  try {
    const { data, status } = await createOrcamento(pedidoOrcamento.value)
    if (status === 201) {
      // status de criação e o 201 e nao 200
      setTimeout(() => {
        notifyToast({ msg: data.msg, typeToast: 'success' })
        emit('modal', { check: true, pedido: data.pedido })
        check.value = false
      }, 1000)
    }
    return data
  } catch (er: unknown) {
    console.log(er)
    const error = er as IError
    notifyToast({
      msg: error.response.data.msg || 'Erro no banco de dados, impossivel criar orçamento',
      typeToast: 'error'
    })
    check.value = false
  }
}

const removeItens = () => {
  removeAllProductCart('')
  resetItem()
  emit('discount-type')
}

const alterProduct = (product: cartItem): void => {
  alterProductSelectState.value = product
  const indexItem = productCart.value.findIndex((v) => v === product)
  emit('alter-product', indexItem)
}
</script>

<style scoped lang="scss">
.overflow-scroll-cart {
  overflow: overlay;
  max-height: 225px;
}

.flex {
  display: block !important;
}
</style>
