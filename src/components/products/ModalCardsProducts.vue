<template>
  <div class="modal cardsProducts">
    <div class="modal-content oneScroll">
      <div class="modal-top">
        <span class="modal-close" @click="fnClose">&times;</span>
      </div>
      <div class="modal-container">
        <form ref="modalCards" class="form-group">
          <h3 class="modalTitle">
            <CardsTitle :alter-product-select-state="alterProductSelectState"
              :product-select-state="productSelectState"></CardsTitle>
          </h3>
          <p class="modalDescription">
            Defina as configurações do serviço para o seu pedido, abaixo:
          </p>

          <CardsProductsDtf @define-type-color="defineTypeColor" :product-select-state="productSelectState"
            :product-change-select="alterProductSelectState" v-if="
              [6, 7].some((v) => v === productSelectState.pro_categoria_item) ||
              [6, 7].some((v) => v === alterProductSelectState?.pro_categoria_item)
            "></CardsProductsDtf>
          <div class="form-group" v-if="
            [1, 2, 3, 10].some((v) => v === productSelectState.pro_categoria_item) ||
            [1, 2, 3, 10].some((v) => v === alterProductSelectState?.pro_categoria_item) ||
            productSelectState.produto_categoria_item?.prod_tipo_descricao
              .toLocaleLowerCase()
              .includes('Impressão DTF'.toLocaleLowerCase())
          ">
            <label class="form-label" for="select03">DEFINIR QUALIDADE</label>
            <select v-model="produtoType.type" id="select03" data-toggle="select" class="form-control"
              @change="blockIfExistDiscount">
              <option :value="0" :selected="true">Seleciona uma opção</option>
              <option :value="value.one1_outros?.id" v-for="(value, index) in selectItems" :key="index">
                {{ value.one1_outros?.one1_nome }}
              </option>
            </select>
          </div>

          <div class="form-group" v-if="
            productSelectState.pro_categoria_item === 5 &&
            productSelectState.one1_produto_estoque[0]?.one1_outros !== undefined &&
            productSelectState.one1_produto_estoque[0]?.one1_outros?.one1_nome
              .toLocaleLowerCase()
              .includes('Tinta Politileno'.toLocaleLowerCase())
          ">
            <label class="form-label text-uppercase" for="select03">definir tamanho</label>
            <select v-model="produtoType.tamanho" id="select03" data-toggle="select" class="form-control">
              <option :value="0" :selected="true">Seleciona uma opção</option>
              <option :value="value" v-for="(value, index) in productSelectState" :key="index">
                {{ value }}
              </option>
            </select>
          </div>

          <div class="form-group" v-if="
            productSelectState.pro_categoria_item === 5 &&
            productSelectState.one1_produto_estoque.some(
              (v) =>
                v.one1_outros?.one1_nome.toLocaleLowerCase() ===
                'Tinta DTF'.toLocaleLowerCase() ||
                v.one1_outros?.one1_nome.toLocaleLowerCase() ===
                'Tinta Sublimática'.toLocaleLowerCase()
            )
          ">
            <label class="form-label text-uppercase" for="select03">definir cor</label>
            <select v-model="produtoType.cor" id="select03" data-toggle="select" class="form-control">
              <option :value="0" :selected="true">Seleciona uma opção</option>
            </select>
          </div>

          <div class="form-group" v-if="
            [4, 9].some((v) => v === productSelectState.pro_categoria_item) ||
            [4, 9].some((v) => v === alterProductSelectState?.pro_categoria_item)
          ">
            <label class="form-label text-uppercase" for="medida">definir medida</label>
            <Dropdown name="tamanho" :span-disabled="false" v-model:model-value="produtoType.tamanho"
              :maxSelectedLabels="1" :selectionLimit="1" filter :optionSelect="selectItemsDropdown"
              :label="'definir medida'">
            </Dropdown>
          </div>

          <div v-if="
            [1, 2, 3, 10].some((v) => v === productSelectState.pro_categoria_item) ||
            [1, 2, 3, 10].some((v) => v === alterProductSelectState?.pro_categoria_item)
          " class="mb-4" :class="{
            'mb-3': productSelectState.pro_categoria_item === 5
          }">
            <label class="form-label text-uppercase" name="quantidade" for="quantidade">
              DEFINIR QUANTIDADE
            </label>
            <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected">
              <input :min="1" :minlength="1" :maxlength="actionModal !== 'change'
                ? productSelectState.pro_quantidade
                : alterProductSelectState?.pro_quantidade
                " v-bind:max="productSelectState.pro_quantidade" type="text" v-model="produtoType.qnty"
                name="quantidade" placeholder="Quantidade" class="form-control" />
            </div>
          </div>

          <div class="mb-4" v-if="
            [4, 5, 6, 7, 8, 9].some((v) => v === productSelectState.pro_categoria_item) ||
            [4, 5, 6, 7, 8, 9].some((v) => v === alterProductSelectState?.pro_categoria_item)
          ">
            <label class="form-label text-uppercase" name="quantidade" for="quantidade">DEFINIR QUANTIDADE</label>
            <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected">
              <span class="input-group-btn input-group-prepend">
                <button class="form-control bootstrap-touchspin-down" :disabled="Number(produtoType.qnty) <= 0 || produtoType.qnty === undefined ? true : false
                  " @click.prevent="produtoType.qnty = Number(produtoType.qnty) - 1" type="button">
                  -
                </button>
              </span>
              <input id="touch-spin-2" data-toggle="touch-spin" :min="1" :minlength="1" :maxlength="actionModal !== 'change'
                ? productSelectState.pro_quantidade
                : alterProductSelectState?.pro_quantidade
                " v-bind:max="productSelectState.pro_quantidade" type="text" v-model.number="produtoType.qnty"
                name="quantidade" class="form-control" />

              <span class="input-group-btn input-group-append">
                <button :disabled="(produtoType.qnty &&
                  Number(produtoType.qnty) <= productSelectState.pro_quantidade) ||
                  alterProductSelectState?.pro_quantidade
                  ? false
                  : true
                  " class="form-control bootstrap-touchspin-up"
                  @click.prevent="produtoType.qnty = Number(produtoType.qnty) + 1" :min="1" :minlength="1" :maxlength="productSelectState.pro_quantidade || alterProductSelectState?.pro_quantidade
                    " v-bind:max="actionModal !== 'change'
                      ? productSelectState.pro_quantidade
                      : alterProductSelectState?.pro_quantidade
                      " type="button">
                  +
                </button>
              </span>
            </div>
          </div>

          <div class="mb-0">
            <ContentDiscount :key="componentKey" :blockIfDiscount="blockIfDiscount" :model-value="generalDiscount"
              @update:modelValue="updateDiscount" :preco-unidade="productSelectState" :alter-value="{
                discRealNum:
                  alterProductSelectState?.value_discount_type === 1
                    ? alterProductSelectState?.value_discount.toString()
                    : '',
                discPercen:
                  alterProductSelectState?.value_discount_type === 2
                    ? alterProductSelectState?.value_discount.toString()
                    : ''
              }">
            </ContentDiscount>
          </div>
          <div class="form-group" v-if="
            [1, 2, 3, 9, 10].includes(productSelectState.pro_categoria_item) ||
            [1, 2, 3, 9, 10].includes(alterProductSelectState?.pro_categoria_item as number)
          ">
            <h5 class="mb-2">Anexar Arquivo de Impressão</h5>
            <div class="flex flex-column" style="max-width: 100%">
              <DropzoneItem ref="fileInput" :accept-file="'image/*,.pdf'" :multiple-file="true"
                class="dropzone-multiple w-100 mb-0" @change="selectedFile" @dragenter="toggleActive"
                @dragleave="toggleActive" @drop.prevent="drop" :active-drop="active" />
              <!-- <span class="file-info">File: {{ dropzoneFile.name }}</span> -->

              <ul class="dz-preview dz-preview-multiple list-group list-group-flush mt-16pt">
                <li class="list-group-item" v-for="(value, index) in objectImg" :key="index">
                  <div class="form-row align-items-center">
                    <div class="col-auto">

                      <div class="avatar">
                        <img v-if="value.type == 'image/jpeg'" :src="value.img" class="avatar-img rounded"
                          :alt="value.nameImg" data-dz-thumbnail />
                        <img v-else-if="value.type == 'application/pdf'" src="@/assets/img/pdf.png "
                          class="avatar-img rounded" :alt="value.nameImg" data-dz-thumbnail />
                        <img v-else src="@/assets/img/cdr.png" class="avatar-img rounded" :alt="value.nameImg" />
                      </div>
                    </div>
                    <div class="col">
                      <div class="font-weight-bold" data-dz-name>
                        {{ value.nameImg }}
                      </div>
                      <p class="small text-muted mb-0" data-dz-size>
                        {{ sizeCalculate(value.size) }}
                      </p>
                    </div>
                    <div class="col-auto">
                      <a href="#" @click.prevent="removeItemUpload(value)" class="text-muted-light" data-dz-remove>
                        <i class="material-icons">close</i>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <DeleteFileExistInBudget v-if="route.name === 'Alterar Orçamento'"
              :img-budget="alterProductSelectState?.fileExist"></DeleteFileExistInBudget>
          </div>

          <div class="form-group" v-if="
            [1, 2, 3, 4, 10].includes(productSelectState.pro_categoria_item) ||
            [1, 2, 3, 4, 10].includes(alterProductSelectState?.pro_categoria_item as number)
          ">
            <label class="form-label">OBSERVAÇÕES?</label>
            <Editor @load="onLoad" v-model="produtoType.content" @text-change="updateContent"
              placeholder="Escreva aqui uma observação referente ao serviço." editorStyle="height: 120px" />
          </div>

          <div class="form-group d-flex justify-content-between"
            :class="{ 'mt-1': productSelectState.pro_categoria_item === 5 }">
            <button @click.prevent="reset" type="button" class="btn btn-light">
              <i class="material-icons icon--left" style="font-size: 16px">clear</i> LIMPAR
            </button>

            <button v-if="actionModal === 'save'" @click.prevent="productCart(productSelectState)" type="button"
              class="btn btn-primary">
              <i class="material-icons icon--left" style="font-size: 16px">add_shopping_cart</i>
              ADICIONAR AO CARRINHO
            </button>

            <button v-else @click.prevent="alterProductCart(alterProductSelectState as cartItem)" type="button"
              class="btn btn-primary" style="text-transform: uppercase">
              <i class="material-icons icon--left" style="font-size: 16px">add_shopping_cart</i>
              Alterar produto do carrinho
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct, IProductPreco, IStoreProduct, cartItem } from '@/model/Index'
import { computed, onBeforeUnmount, onMounted, onUnmounted, ref, toRefs, watch, type PropType } from 'vue'
import DropzoneItem from '@/components/one-print/DropzoneItem.vue'
import { useProductStore } from '@/stores/ProductStore'
import { uploadImagem } from '@/composables/Upload-base64'
import { sizeCalculate } from '@/util/SizeFile'
import ContentDiscount from '@/components/products/ContentDiscount.vue'
import { useToast } from '@/composables/Toast'
import { useSwal } from '@/composables/Swal'
import { storeToRefs } from 'pinia'
import { useClientStore } from '@/stores/ClientStore'
import { useRoute } from 'vue-router'
import DeleteFileExistInBudget from '@/components/products/DeleteFileExistInBudget.vue'
import CardsProductsDtf from './CardsProductsDtf.vue'
import CardsTitle from '../one-print/modal/CardsTitle.vue'
import Dropdown from '@/components/DropDownPrime.vue'
import type { EditorLoadEvent } from 'primevue/editor'
import { discountProductType } from '@/util/Util'

const props = defineProps({
  productSelectState: { type: Object as PropType<IProduct>, required: true, default: null },
  // alterProduct: { type: Object as PropType<cartItem>, default: null },
  alterProdIndex: { type: Number, required: true, default: 0 },
  actionModal: { type: String, default: 'save' }
})

//router
const route = useRoute()

const emit = defineEmits(['change-action', 'empty-change', 'fnDom', 'fnClose'])

const { productSelectState, actionModal, alterProdIndex } = toRefs(props)
const { notifyToast } = useToast()
const { swalConfirmed, swal } = useSwal()
const { alterProductSelectState } = storeToRefs(useProductStore())
//composables
const { fileImgBase64, objectImg, removeItemUpload, resetItem, objectFile, create, handlePaste, fileInput } = uploadImagem()

//store
const productStore = useProductStore()
const { setClientById, getClientById } = useClientStore()

const editor = ref()
const modalCards = ref()

const notifyOnce = ref<number>(0)
const produtoType = ref<IStoreProduct>({
  type: 0,
  cor: 0,
  tamanho: 0,
  qnty: '',
  dropzoneFile: [],
  content: '',
  value_discount: 0,
  value_discount_type: 0,
  corDtf: 0
})
const generalDiscount = ref<{ discPercen: number | null; discRealNum: number | null }>({
  discPercen: null,
  discRealNum: null
})

const dtfVenda = ref<{
  id: number
  id_prod: number
  one1_pro_estId: number
  ppu_preco_venda: number | string
}>()

const active = ref<boolean>(false)
const blockIfDiscount = ref<boolean>(false)
const discount_nivel = ref<{
  nds_id: number
  nds_valor: string
  nds_status: number
  nds_prod_id: number
  nds_prod_type: number
}>()
const componentKey = ref(0)

const fnClose = () => {
  resetDiscount()
  reset()
  notifyOnce.value = 0
  emit('fnClose')
}

const blockIfExistDiscount = () => {
  const id_cli =
    route.name === 'Alterar Orçamento' ? Number(route.params.id_cli) : Number(route.params.id)

  const prod_id =
    productSelectState.value.pro_id > 0
      ? productSelectState.value.pro_id
      : alterProductSelectState.value?.pro_id

  /** Somente para categoria 8
   * Categoria 8 eu pego o tipo da tinta direto do array de one_produto
   */

  let categoria_tinta: number = 0

  //pega categoria typing
  const typingProduct =
    alterProductSelectState.value?.pro_categoria_item || productSelectState.value.pro_categoria_item

  //modelo de tintas
  const modelo_product =
    alterProductSelectState.value?.one1_produto_estoque[0]?.one1_modelo_tintas?.modelo_id ||
    productSelectState.value.one1_produto_estoque[0]?.one1_modelo_tintas?.modelo_id

  if (typingProduct === 8) {
    categoria_tinta = modelo_product
  } else if (typingProduct === 5) {
    produtoType.value.type = productSelectState.value.one1_produto_estoque[0].one1_outros.id
  } else {
    categoria_tinta = alterProductSelectState.value?.cor as number
  }
  //Ending

  const prop = {
    pro_id: productSelectState.value.pro_id || (alterProductSelectState.value?.pro_id as number),
    cor: produtoType.value.cor || categoria_tinta,
    corDtf: produtoType.value.corDtf || (alterProductSelectState.value?.corDtf as number),
    type: produtoType.value.type || (alterProductSelectState.value?.type as number)
  }

  const discount = getClientById(id_cli)?.nivel_desconto.find((v) => {
    const prop_discount = discountProductType(v, prop)
    return v.nds_prod_id === prod_id && v.nds_prod_type === prop_discount?.nds_prod_type
  })

  blockIfDiscount.value = discount && discount?.nds_id > 0 ? true : false
  discount_nivel.value = discount
}


const selectedFile = (evt: InputEvent) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let dropzone = evt.target as any
  fileImgBase64(dropzone?.files)
  //const file: any = [...objectImg.value]
  produtoType.value.dropzoneFile = objectFile.value
  dropzone = null

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

const defineTypeColor = (id: number) => {
  if (actionModal.value === 'change') {
    if (alterProductSelectState.value !== undefined) {
      const alter = alterProductSelectState.value.one1_produto_estoque.find(
        (val) => val.one1_cor.id === id
      )

      alterProductSelectState.value.pro_venda = alter?.produto_preco_unidade[0]
        .ppu_preco_venda as number

      alterProductSelectState.value.corDtf = id as number
    }
  }

  produtoType.value.corDtf = id

  blockIfExistDiscount()
}

const productCart = (productSelectState: IProduct) => {
  if (produtoType.value.qnty === '' && Number(produtoType.value.qnty) <= 0) {
    swal({
      title: 'Carrinho',
      text: 'Não e possivel adicionar o produto no carrinho se nao colocar a quantidade',
      icon: 'error'
    })
    return
  }

  swalConfirmed({
    title: 'Atenção',
    icon: 'info',
    text: 'Voce deseja adicionar esse item no carrinho ?'
  }).then((result) => {
    if (result.isConfirmed) {
      swal({
        title: 'Carrinho',
        text: 'Produto adiconado com sucesso no carrinho',
        icon: 'success'
      })

      const id_cli =
        route.name === 'Alterar Orçamento' ? Number(route.params.id_cli) : Number(route.params.id)

      //seta o usuario selecionado para verificar se ele tem desconto especifico
      setClientById(id_cli)

      const { one1_produto_estoque, ...product } = { ...productSelectState }

      let dtfPreco: IProductPreco | undefined

      switch (productSelectState.pro_categoria_item) {
        case 1:
        case 2:
        case 3:
        case 10:
          //produtoType.type
          dtfPreco = productSelectState.one1_produto_estoque.find(
            (v) => v.one1_outros.id === produtoType.value.type
          )

          break
        case 6:
        case 7:
          dtfPreco = productSelectState.one1_produto_estoque.find((v) => {
            if ([6, 7].some((v) => v === productSelectState.pro_categoria_item)) {
              return v.one1_cor.id === produtoType.value.corDtf
            }
          })
          break

        case 8:
          dtfPreco = productSelectState.one1_produto_estoque[0]
          break
        default:
          break
      }

      //desconto de nivel de cliente
      blockIfExistDiscount()
      if (
        discount_nivel.value &&
        (discount_nivel.value?.nds_prod_id === productSelectState.pro_id ||
          discount_nivel.value.nds_prod_type === produtoType.value.type)
      ) {
        produtoType.value.value_discount_type = 1
      }

      productStore.addProductCart({
        prod_deleted: false,
        dropzoneFile: produtoType.value.dropzoneFile,
        qnty: parseFloat(produtoType.value.qnty.toString().replace(',', '.')),
        cor: produtoType.value.cor,
        corDtf: [6, 7, 8].some((v) => v === productSelectState.pro_categoria_item)
          ? produtoType.value.corDtf || dtfPreco?.one1_modelo_tintas.modelo_id
          : 0,
        type: produtoType.value.type === null ? 0 : produtoType.value.type,
        tamanho: produtoType.value.tamanho,
        ...product,
        content: produtoType.value.content,
        value_discount:
          produtoType.value.value_discount === 0 ? 0 : produtoType.value.value_discount,
        value_discount_type:
          produtoType.value.value_discount_type ===
            0 /* || produtoType.value.value_discount === 0 */
            ? 0
            : produtoType.value.value_discount_type,
        one1_produto_estoque: one1_produto_estoque,
        ...([1, 2, 3, 6, 7, 8, 10].some((v) => v === productSelectState.pro_categoria_item)
          ? { pro_venda: dtfPreco?.produto_preco_unidade[0].ppu_preco_venda as number }
          : {})
      })

      reset()
      emit('fnClose')
    }
  })
}

const alterProductCart = (alterItem: cartItem) => {
  if (produtoType.value.qnty === '' && Number(produtoType.value.qnty) <= 0) {
    swal({
      title: 'Carrinho',
      text: 'Não e possivel adicionar o produto no carrinho se nao colocar a quantidade',
      icon: 'error'
    })
    return
  }

  swalConfirmed({
    title: 'Atenção',
    icon: 'info',
    text: 'Voce deseja alterar esse item do carrinho ?'
  }).then((result) => {
    if (result.isConfirmed) {
      swal({
        title: 'Carrinho',
        text: 'Produto alterado com sucesso',
        icon: 'success'
      })
      productStore.alterProductCart(
        {
          prod_deleted: false,
          ...alterItem,
          dropzoneFile: produtoType.value.dropzoneFile,
          qnty: Number(produtoType.value.qnty),
          type: produtoType.value.type,
          content: produtoType.value.content,
          tamanho: produtoType.value.tamanho,
          value_discount:
            produtoType.value.value_discount === 0 ? 0 : produtoType.value.value_discount,
          value_discount_type:
            produtoType.value.value_discount_type === 0 || produtoType.value.value_discount === 0
              ? 0
              : produtoType.value.value_discount_type,
          cor: produtoType.value.cor
        },
        alterProdIndex.value
      )
      reset()
      emit('change-action', 'save')
      emit('fnClose')
    }
  })
}

const updateContent = (html: { textValue: string }) => {
  if (html === undefined || html.textValue === '') return
  produtoType.value.content = html.textValue
}

const onLoad = ({ instance }: EditorLoadEvent) => {
  instance.setContents(
    instance.clipboard.convert({
      html: produtoType.value.content
    })
  )
}

const reset = () => {
  modalCards.value?.reset()
  produtoType.value.type = 0
  produtoType.value.qnty = 0
  produtoType.value.dropzoneFile = []
  produtoType.value.content = ''
  produtoType.value.cor = 0
  produtoType.value.tamanho = 0
  produtoType.value.value_discount = 0
  editor.value?.setText('')
  blockIfDiscount.value = false
  componentKey.value += 1
  resetDiscount()
  notifyOnce.value = 0
  resetItem()
}

const selectItems = computed(() => {
  return actionModal.value !== 'change'
    ? productSelectState.value.one1_produto_estoque
    : alterProductSelectState.value?.one1_produto_estoque
})

const selectItemsDropdown = computed(() => {
  return actionModal.value !== 'change'
    ? productSelectState.value?.one1_produto_estoque.map((v) => {
      return {
        id: v.one1_tamanho.id,
        nome: v.one1_tamanho.one1_tamanho_nome,
        stock: v.pro_estoque,
        disabled: v.pro_estoque > 0 ? false : true
      }
    })
    : alterProductSelectState.value?.one1_produto_estoque.map((v) => {
      return {
        id: v.one1_tamanho.id,
        nome: v.one1_tamanho.one1_tamanho_nome,
        stock: v.pro_estoque,
        disabled: v.pro_estoque > 0 ? false : true
      }
    })
})

const updateDiscount = (newDiscount: { discPercen: number | null; discRealNum: number | null }) => {
  generalDiscount.value = newDiscount // Atualiza o desconto com o valor do filho

  changeValueDiscount(generalDiscount.value)
}

// Função para lidar com mudanças de categoria
const handleCategoryChange = (newValue: IStoreProduct) => {
  const categoriaItem =
    alterProductSelectState.value?.pro_categoria_item || productSelectState.value.pro_categoria_item

  let produtoVenda = fallbackVendaValue() // Valor padrão caso não encontre o preço

  // Lógica para verificar onde está o preço do produto, baseada na categoria
  if (isCategoryIn([1, 2, 3], categoriaItem)) {
    produtoVenda = Number(getProdutoPrecoUnidadeByType()) || fallbackVendaValue()
  } else if (isCategoryIn([5], categoriaItem)) {
    produtoVenda = Number(getProdutoPrecoUnidadeFromFirstEstoque()) || fallbackVendaValue()
  } else if (isCategoryIn([6, 7, 8], categoriaItem)) {
    produtoVenda = Number(getProdutoPrecoUnidadeByCorDtf()) || fallbackVendaValue()
  }

  // Verifica se o desconto aplicado é maior que o preço de venda encontrado
  if (produtoType.value.value_discount > produtoVenda) {
    notifyOnce.value = 1 // Marca para notificação
    fnPreco(newValue) // Chama fnPreco para exibir a notificação
    return
  } else {
    notifyOnce.value = 0 // Reseta a notificação
  }

  notifyIfDiscountGreaterThanPrice(newValue)
}

// Função para lidar com desconto na categoria 6,7 e 8
const handleCategorySevenDiscount = (newValue: IStoreProduct, num: number) => {
  if (isCategoryIn([6, 7], productSelectState.value.pro_categoria_item)) {
    dtfVenda.value = productSelectState.value.one1_produto_estoque.find(
      (v) => v.one1_cor.id === produtoType.value.corDtf
    )?.produto_preco_unidade[0]
  } else {
    dtfVenda.value = productSelectState.value.one1_produto_estoque[0]?.produto_preco_unidade[0]
  }

  if (num > Number(dtfVenda.value?.ppu_preco_venda)) {
    fnPreco({ value_discount: num })
  }
}

// Função para verificar a quantidade de produtos
const checkProductQuantity = (): void => {
  if (
    produtoType.value.qnty === productSelectState.value.pro_quantidade &&
    productSelectState.value.pro_quantidade > 0
  ) {
    notifyQuantityWarning('Você selecionou toda a quantidade do produto para fazer o orçamento')
  } else if (
    produtoType.value.qnty !== '' &&
    Number(produtoType.value.qnty) > productSelectState.value.pro_quantidade &&
    productSelectState.value.pro_quantidade > 0
  ) {
    notifyQuantityWarning('Você ultrapassou a quantidade de produtos para fazer o orçamento')
    produtoType.value.qnty = 0
  }
}

// Função para notificar sobre quantidade de produtos
const notifyQuantityWarning = (message: string) => {
  swal({
    title: 'Atenção',
    text: message,
    icon: 'info'
  })
}

const checkCategoriItemDiscount = (): number => {
  const categoriaItem =
    productSelectState.value.pro_categoria_item || alterProductSelectState.value?.pro_categoria_item

  if (isCategoryIn([1, 2, 3], categoriaItem)) {
    return Number(getProdutoPrecoUnidadeByType()) || fallbackVendaValue()
  }

  if (isCategoryIn([5, 8], categoriaItem)) {
    return Number(getProdutoPrecoUnidadeFromFirstEstoque()) || fallbackVendaValue()
  }

  if (isCategoryIn([6, 7], categoriaItem)) {
    return Number(getProdutoPrecoUnidadeByCorDtf()) || fallbackVendaValue()
  }

  return fallbackVendaValue()
}

// Função para verificar se a categoria está em uma lista
const isCategoryIn = (categories: number[], categoriaItem: number | undefined): boolean => {
  return categories.includes(categoriaItem || 0)
}

// Função para obter o preço da unidade com base no tipo
const getProdutoPrecoUnidadeByType = (): number | string | undefined => {
  const estoque = productSelectState.value.one1_produto_estoque.find(
    (v) => v.one1_outros.id === produtoType.value.type
  )
  return estoque?.produto_preco_unidade[0]?.ppu_preco_venda
}

// Função para obter o preço da unidade do primeiro estoque
const getProdutoPrecoUnidadeFromFirstEstoque = (): number | string | undefined => {
  const primeiroEstoque = productSelectState.value.one1_produto_estoque[0]
  return primeiroEstoque?.produto_preco_unidade[0]?.ppu_preco_venda
}

// Função para obter o preço da unidade com base na cor DTF
const getProdutoPrecoUnidadeByCorDtf = (): number | string | undefined => {
  const estoque = productSelectState.value.one1_produto_estoque.find(
    (v) => v.one1_cor.id === produtoType.value.corDtf
  )

  return estoque?.produto_preco_unidade[0]?.ppu_preco_venda
}

// Função para obter o valor de venda padrão (fallback)
const fallbackVendaValue = (): number => {
  return Number(productSelectState.value.pro_venda || alterProductSelectState.value?.pro_venda)
}

// Função principal para alterar o desconto
const changeValueDiscount = (event: { discRealNum: number | null; discPercen: number | null }) => {
  const productVenda = checkCategoriItemDiscount()
  let discRealNum: number = 0
  let discPercen: number = 0

  if (event.discRealNum) {
    discRealNum = event.discRealNum
  }

  if (event.discPercen) {
    discPercen = parseDiscountValue(event.discPercen)
  }
  const realNum = parseDiscountValue(discRealNum)
  const percenNum = parseDiscountValue(discPercen)
  const proVenda = parseFloat(productVenda.toString())

  if (hasDiscount(realNum, percenNum)) {
    const isValidCategory = productVenda > 0 // Convertendo para booleano

    if (isValidCategory) {
      if (realNum > 0 && isDiscountGreaterThanSale(realNum, proVenda)) {
        notifyOnce.value = 1
      }

      applyDiscount(isValidCategory, realNum, percenNum)
    }
  } else {
    resetDiscount()
  }
}

// Nova função para aplicar a lógica de desconto
const applyDiscountLogicAfterChange = (num: string | number) => {
  const categoriaItem =
    alterProductSelectState.value?.pro_categoria_item || productSelectState.value.pro_categoria_item

  if (isCategoryIn([6, 7, 8], categoriaItem)) {
    handleCategorySevenDiscount(produtoType.value, Number(num))
  } else {
    handleGeneralDiscount(produtoType.value, Number(num))
  }
}

// Função para converter string de desconto para número
const parseDiscountValue = (value: number): number => parseFloat(value.toString())

// Função para verificar se há desconto
const hasDiscount = (realNum: number, percenNum: number): boolean => realNum > 0 || percenNum > 0

// Função para verificar se o desconto real é maior que o preço de venda
const isDiscountGreaterThanSale = (discount: number, salePrice: number): boolean =>
  discount > salePrice

// Função para aplicar desconto
const applyDiscount = (
  isValidCategory: boolean,
  realNum: number,
  percenNum: number
  // proVenda: number
) => {
  if (isValidCategory && realNum > 0) {
    setDiscount(1, realNum) // Desconto real
    applyDiscountLogicAfterChange(realNum)
  }

  if (isValidCategory && percenNum > 0) {
    setDiscount(2, percenNum) // Desconto percentual
    applyDiscountLogicAfterChange(percenNum)
  }
}

// Função para definir o desconto no produto
const setDiscount = (type: number, value: number) => {
  produtoType.value.value_discount_type = type
  produtoType.value.value_discount = parseFloat(value.toString())
  //notifyOnce.value = 0 // Resetar a notificação
}

// Função para resetar o desconto
const resetDiscount = () => {
  produtoType.value.value_discount_type = 0
  produtoType.value.value_discount = 0
  generalDiscount.value.discPercen = 0
  generalDiscount.value.discRealNum = 0
}

// Função que notifica sobre o desconto maior que o preço
const fnPreco = (newValue: { value_discount: number }) => {
  if (notifyOnce.value && notifyOnce.value === 1 && newValue.value_discount > 0) {
    notifyToast({
      msg: 'Desconto que você aplicou é maior que o preço de venda',
      typeToast: 'info'
    })
    return
  }
  notifyOnce.value = 0
}

const notifyIfDiscountGreaterThanPrice = (newValue: IStoreProduct) => {
  const produtoVenda = checkCategoriItemDiscount()

  if (produtoType.value.value_discount > produtoVenda) {
    fnPreco(newValue)
  }
}

// Função para lidar com desconto geral
const handleGeneralDiscount = (newValue: IStoreProduct, num: number) => {
  if (num > Number(productSelectState.value.pro_venda)) {
    fnPreco({ value_discount: num })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handlerCopyFile = (event: any) => {
  handlePaste(event)
  produtoType.value.dropzoneFile = objectFile.value
}

watch(
  productSelectState,
  () => {
    blockIfExistDiscount()
  },
  { deep: true, flush: 'sync' }
)

watch(
  produtoType.value,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (old: any, newValue: IStoreProduct) => {
    // Verifica a categoria e aplica a lógica de desconto
    if (actionModal.value === 'change') {
      handleCategoryChange(newValue)
      blockIfExistDiscount()
    }
    checkProductQuantity()
  },
  { deep: true, flush: 'sync' }
)

watch(actionModal, () => {
  if (actionModal.value === 'change') {
    reset()
    blockIfExistDiscount()
    produtoType.value.cor = alterProductSelectState.value?.cor as number
    produtoType.value.type = alterProductSelectState.value?.type as number
    produtoType.value.qnty = Number(alterProductSelectState.value?.qnty)
    produtoType.value.dropzoneFile = alterProductSelectState.value?.dropzoneFile as []
    produtoType.value.content = alterProductSelectState.value?.content as string

    produtoType.value.tamanho = alterProductSelectState.value?.tamanho as number

    produtoType.value.value_discount_type = alterProductSelectState.value
      ?.value_discount_type as number

    //produtoType.value = { ...alterProductSelectState.value } as any
    if (alterProductSelectState.value?.value_discount_type === 1) {
      generalDiscount.value.discRealNum = alterProductSelectState.value.value_discount

      changeValueDiscount({
        discRealNum: alterProductSelectState.value.value_discount,
        discPercen: 0
      })
    }

    if (alterProductSelectState.value?.value_discount_type === 2) {
      generalDiscount.value.discPercen = alterProductSelectState.value.value_discount
      changeValueDiscount({
        discRealNum: 0,
        discPercen: alterProductSelectState.value?.value_discount
      })
    }

    alterProductSelectState.value?.dropzoneFile?.forEach((v) => {
      create(v)
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    objectFile.value = alterProductSelectState.value?.dropzoneFile as any
  } else {
    if (alterProductSelectState.value !== undefined) {
      alterProductSelectState.value.value_discount_type = 0
    }

    blockIfExistDiscount()

    emit('empty-change')
    reset()
  }
})

onUnmounted(() => {
  resetDiscount()
  reset()
})

onMounted(() => {
  document.addEventListener("paste", handlerCopyFile);

});

onBeforeUnmount(() => {
  document.removeEventListener("paste", handlerCopyFile);
});
</script>

<style scoped></style>
