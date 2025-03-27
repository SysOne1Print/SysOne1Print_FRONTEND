<template>
  <div class="modal-content oneScroll" v-bind="$attrs">
    <div class="modal-top">
      <span class="modal-close" @click.prevent="$emit('close-modal', $event)">×</span>
    </div>

    <div class="modal-container">
      <div class="w-100 d-flex flex-column border-bottom">
        <h4 class="mb-0">{{ cliente.cli_nome }}</h4>
        <div class="w-100 d-flex flex-row justify-content-between align-items-center pr-20 pb-2">
          <span> Modo de edição do cliente. </span>
        </div>
      </div>

      <div class="cenario_formularios_geralEitemdesconto d-flex flex-column" style="">
        <div id="formEdtCliente_itemsDesconto" style="display: block">
          <!-- Inicio do conteúdo real da modal DESCONTO SOBRE PRODUTO -->
          <div class="h5 d-flex justify-content-between mt-0 mb-0 p-0 border-bottom">
            <span class="text-50 mb-0">
              <span class="material-icons text-50 mb-1">keyboard</span>
            </span>
            <span class="h5 text-right mb-0">(id) #{{ cliente.cli_id }}</span>
          </div>
          <div class="d-flex justify-content-between">
            <div class="col-lg-6 mt-3">
              <div class="d-flex flex-column">
                <div class="form-group flex-grow-1">
                  <label class="form-label py-1 mb-0" for="itemPrecoVenda"
                    ><b style="color: red; font-size: 1rem">*</b>Produtos</label
                  >
                  <Dropdown
                    :span-disabled="true"
                    v-model:model-value="produto.prod_id"
                    :maxSelectedLabels="1"
                    :selectionLimit="1"
                    @change="selectProduto"
                    filter
                    :optionSelect="produtoPrice"
                    :label="''"
                  >
                  </Dropdown>
                </div>

                <div
                  class="form-group flex-grow-1"
                  v-if="
                    [1, 2, 3, 5, 6, 7, 8, 10].some(
                      (v) => v === produtoSelectItem?.pro_categoria_item
                    )
                  "
                >
                  <label class="form-label py-1 mb-0" for="itemPrecoVenda"
                    ><b style="color: red; font-size: 1rem">*</b>Tipo de Produto</label
                  >
                  <Dropdown
                    :span-disabled="true"
                    v-model:model-value="produto.prod_type"
                    :maxSelectedLabels="1"
                    :selectionLimit="1"
                    filter
                    :optionSelect="produto_tipo"
                    :label="''"
                    @change="existDiscount"
                  >
                  </Dropdown>
                </div>
                <div class="form-group flex-grow-1">
                  <label class="form-label py-1 mb-0" for="itemPrecoVenda"
                    ><b style="color: red; font-size: 1rem">*</b>Preço de venda</label
                  >

                  <InputNumber
                    :class="'w-100'"
                    v-model:model-value="produto.specificPrice"
                    :placeholder="'R$ 0,00'"
                    inputId="currency-usd"
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR"
                    fluid
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-5 mt-3">
              <label class="form-label py-1 mb-0" for="itemPrecoVenda"
                ><b style="color: red; font-size: 1rem"></b>Preview do Produto</label
              >
              <CardSpecificPrice
                :produtoSelectItem="produtoSelectItem"
                :product_type_dtf="
                  [1, 2, 3, 5, 6, 7, 8, 10].some(
                    (v) => v === produtoSelectItem?.pro_categoria_item
                  ) && produto.prod_type > 0
                    ? true
                    : produtoSelectItem?.pro_categoria_item === 4
                      ? true
                      : false
                "
                :prod_type="produto.prod_type"
                :newPrice="produto.specificPrice"
                v-if="produto.prod_id > 0"
              ></CardSpecificPrice>
              <SkeletonCard v-else></SkeletonCard>
            </div>
          </div>
          <!-- Final do conteúdo real da modal DESCONTO SOBRE PRODUTO-->

          <!-- Lista de produtos já inseridos -->
          <hr />

          <div class="form-group">
            <label for="listaProdutosJaRegistradosCliente" class="form-label"
              >Produtos já vinculados ao desconto para esse cliente</label
            >
            <ListNivelDiscountProduct
              :produto="nivelDescontoProduto"
              @delete-nivel-discount="deleteNivelDiscount"
              @alter-nivel-discount="alterNivelDiscount"
              v-if="nivelDescontoProduto.length > 0"
            ></ListNivelDiscountProduct>
            <ul v-else class="listagemProdutosInseridos">
              <li class="itemProdutoInserido">Sem Desconto</li>
            </ul>
          </div>

          <hr />

          <div class="form-group d-flex justify-content-between mb-0">
            <button
              :disabled="discount_item === true"
              @click.prevent="createNivelDiscountSpecificProduct"
              type="submit"
              class="btn btn-primary"
            >
              <i class="fas fa-save mr-2"></i>
              Aplicar alterações referentes a desconto
            </button>
          </div>
        </div>
      </div>
      <!-- Fim do conteúdo Detalhes -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRefs, type PropType } from 'vue'
import Dropdown from '@/components/DropDownPrime.vue'
import CardSpecificPrice from '@/components/one-print/CardSpecificPrice.vue'
import SkeletonCard from '../one-print/SkeletonCard.vue'
import type {
  IAlterDiscount,
  IClient,
  IError,
  INivelDescontProduto,
  IOne1_produto_estoque,
  IProduct
} from '@/model/Index'
import { useToast } from '@/composables/Toast'
import {
  deleteSpecificProduct,
  getSpecificProduct,
  specificProduct,
  specificProductPut
} from '@/api/actions/Produtos'
import { storeToRefs } from 'pinia'
import { useLoginStore } from '@/stores/LoginStore'
import ListNivelDiscountProduct from './content/ListNivelDiscountProduct.vue'
import { useDiscountProduct } from '@/composables/UseDiscountProduct'
const prop = defineProps({
  productSelectPrice: { type: Object as PropType<IProduct[]>, required: false, default: Array },
  cliente: { type: Object as PropType<IClient>, required: true, default: Object }
})

const { notifyToast } = useToast()
const { checkIfExistDiscount } = useDiscountProduct()
const { userData } = storeToRefs(useLoginStore())
const { productSelectPrice, cliente } = toRefs(prop)

const produto_tipo_extra = ref<IOne1_produto_estoque[]>([])
const discount_item = ref<boolean>(false)
const produto = ref<{
  nsd_id?: number
  specificPrice: number | null
  prod_id: number
  prod_type: number
}>({
  nsd_id: 0,
  specificPrice: null,
  prod_id: 0,
  prod_type: 0
})
const nivelDescontoProduto = ref<Array<INivelDescontProduto>>([])

const produtoPrice = computed(() => {
  return productSelectPrice.value.map((v) => ({ id: v.pro_id, nome: v.pro_nome }))
})

const produto_tipo = computed(() => {
  let lista: Array<{ id: number; nome: string }> = []
  if ([1, 2, 3, 5, 10].some((v) => v === produtoSelectItem.value?.pro_categoria_item)) {
    lista = produto_tipo_extra.value.map((v) => ({
      id: v.one1_outros?.id,
      nome: v.one1_outros?.one1_nome
    }))
  }
  if ([6, 7, 8].some((v) => v === produtoSelectItem.value?.pro_categoria_item)) {
    lista = produto_tipo_extra.value.map((v) => ({
      id: v.one1_cor === null ? v.one1_modelo_tintas?.modelo_id : v.one1_cor.id,
      nome:
        v.one1_cor === null
          ? v.one1_modelo_tintas?.modelo_nome
          : `${v.one1_modelo_tintas.modelo_nome} - ${v.one1_cor.one1_cor_nome}`
    }))
  }
  return lista
})

const produtoSelectItem = computed(() =>
  productSelectPrice.value.find((v) => v.pro_id === produto.value.prod_id)
)

const existDiscount = () => {
  const discount = checkIfExistDiscount(
    produto.value.prod_type,
    produto.value.prod_id,
    nivelDescontoProduto.value
  ) as INivelDescontProduto

  console.log('asdasda: ', produto.value)
  console.log('discount', discount)

  //Modificar para testar caso clique em um produto com desconto antes, e depois tento editar
  const checkBoolean =
    discount?.produto.pro_id === produto.value.prod_id &&
    (discount.nds_prod_type === produto.value.prod_type ||
      discount.nds_prod_cor === produto.value.prod_type)
      ? true
      : false

  if (checkBoolean) {
    notifyToast({ msg: 'Esse produto já está com desconto', typeToast: 'warning' })
    resetItem()

    discount_item.value = true
    return
  }

  discount_item.value = false
  return
}

const selectProduto = () => {
  const item: IOne1_produto_estoque[] = productSelectPrice.value.find(
    (v) => v.pro_id === produto.value.prod_id
  )?.one1_produto_estoque as unknown as IOne1_produto_estoque[]

  produto_tipo_extra.value = item
  produto.value.specificPrice =
    produto.value.specificPrice !== null ? null : produto.value.specificPrice
  produto.value.prod_type = produto.value.prod_type > 0 ? 0 : produto.value.prod_type

  const categ = productSelectPrice.value.find((v) => v.pro_id === produto.value.prod_id)
  if (categ && categ?.pro_categoria_item === 4) {
    existDiscount()
  }
}

const createNivelDiscountSpecificProduct = async () => {
  try {
    const cat = [1, 2, 3, 4, 5, 10].some((v) => v === produtoSelectItem.value?.pro_categoria_item)
      ? produto.value.prod_type
      : null

    const cat2 = [6, 7, 8].some((v) => v === produtoSelectItem.value?.pro_categoria_item)
      ? produto.value.prod_type
      : null

    const produtoNew = {
      ...produto.value,
      prod_type: cat,
      nds_prod_cor: cat2,
      cli_id: cliente?.value?.cli_id,
      user_usucadastro: userData.value.user_id,
      specificPrice: Number(produto.value.specificPrice)
    }
    if (produto.value.nsd_id !== 0) {
      const { status } = await specificProductPut(produto.value.nsd_id as number, produtoNew)
      if (status === 200) {
        notifyToast({ msg: 'Desconto atualizado com sucesso!', typeToast: 'success' })

        const { data: GetData } = await getSpecificProduct(cliente?.value?.cli_id as number)
        nivelDescontoProduto.value = GetData
        resetItem()
      }

      return
    }

    const { data, status } = await specificProduct(produtoNew)
    if (status === 201) {
      notifyToast({ msg: data.msg, typeToast: 'success' })

      const { data: GetData } = await getSpecificProduct(cliente?.value?.cli_id as number)
      nivelDescontoProduto.value = GetData
      resetItem()
    }
    return
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      if (error.response.status === 404)
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })

      if (error.response.status === 409) {
        notifyToast({
          msg: 'Erro ao cadastrar nivel de desconto',
          typeToast: 'error'
        })
      }
    } else {
      notifyToast({ msg: 'Erro ao cadastrar nivel de desconto', typeToast: 'error' })
    }
  }
}

const alterNivelDiscount = (evt: IAlterDiscount) => {
  const cat = [1, 2, 3, 5, 10].some((v) => v === evt.produto.pro_categoria_item)
    ? evt.nds_prod_type
    : evt.nds_prod_cor

  // const cat2 = [6, 7, 8].some((v) => v === produtoSelectItem.value?.pro_categoria_item)
  //   ? produto.value.prod_type
  //   : null
  //produtoSelectItem.value = {...evt.produto }
  produto.value.prod_id = evt.nds_prod_id
  selectProduto()

  produto.value.nsd_id = evt.nds_id
  produto.value.prod_type = cat
  produto.value.specificPrice = Number(evt.nds_valor)

  //existDiscount()
}

const deleteNivelDiscount = async (id: number) => {
  try {
    const { data } = await deleteSpecificProduct(id)
    notifyToast({ msg: data.msg, typeToast: 'success' })

    const index = nivelDescontoProduto.value.findIndex((v) => v.nds_id === id)
    if (index !== -1) {
      nivelDescontoProduto.value.splice(index, 1)
    }
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      if (error.response.status === 500) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }
      return
    }

    notifyToast({
      msg: 'Erro ao deletar nivel de desconto',
      typeToast: 'error'
    })

    return
  }
}

const resetItem = () => {
  produto.value = {
    nsd_id: 0,
    specificPrice: null,
    prod_id: 0,
    prod_type: 0
  }
}

onMounted(async () => {
  try {
    const { data } = await getSpecificProduct(cliente?.value?.cli_id as number)
    nivelDescontoProduto.value = data
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      if (error.response.status === 500) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }
      return
    }

    notifyToast({
      msg: 'Erro ao buscar nivel de desconto',
      typeToast: 'error'
    })

    return
  }
})
</script>

<style scoped></style>
