<template>
  <div class="row justify-content-betwee card-group-row mb-lg-8pt">
    <div class="col-md-12 col-lg-8 col-xl-8">
      <div class="row card-group-row mb-lg-8pt">
        <div class="col-sm-12 col-md-4 col-xl-3 card-group-row__col" v-for="(value, index) in productStore.productState"
          :key="index">
          <div
            class="card card-sm card--elevated p-relative o-hidden overlay overlay--primary-dodger-blue js-overlay card-group-row__card"
            data-modal="modalTwo" data-trigger="hover">
            <a @click.prevent="defineItem(value, index)" class="card-img-top js-image" data-position="center"
              data-height="140">
              <img loading="lazy" :src="value.produto_galeria.pro_galeria_path" alt="course" />
              <span class="overlay__content">
                <span class="overlay__action d-flex flex-column text-center">
                  <i class="material-icons icon-32pt">edit</i>
                  <span class="card-title text-white">Defina seu pedido</span>
                </span>
              </span>
            </a>

            <span
              class="corner-ribbon corner-ribbon--default-right-top corner-ribbon--shadow bg-accent text-white">NOVO</span>

            <div class="card-body flex">
              <div class="d-flex">
                <div class="flex">
                  <a class="card-title" href="#">
                    <CardsTitle :product-select-state="value"></CardsTitle>
                  </a>
                </div>
                <a class="ml-4pt material-icons text-20 card-course__icon-favorite">favorite_border</a>
              </div>
            </div>
            <div class="card-footer">
              <button @click.prevent="defineItem(value, index)" type="button" class="btn btn-primary"
                style="width: 100%">
                DEFINIR
              </button>
            </div>
          </div>
          <!--            :alter-product="productStore.alterProductSelectState"-->

          <modalCardsProducts :alter-prod-index="alterProdIndex" @fn-close="fnClose(index)" @empty-change="alterEmpty"
            @change-action="(ev: string) => (check = ev)" :action-modal="check" :key="index"
            :product-select-state="productStore.productSelectState">
          </modalCardsProducts>
        </div>
      </div>
    </div>

    <cartProducts @alter-product="alterProduct"></cartProducts>
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { onUpdated, ref } from 'vue'
import cartProducts from '@/components/products/CartProducts.vue'
import { useProductStore } from '@/stores/ProductStore'
//import modalCardsProducts from '@/components/products/ModalCardsProducts.vue'
import ModalCardsProducts from './ModalCardsProducts.vue'
import type { IProduct, cartItem } from '@/model/Index'
import CardsTitle from '../one-print/modal/CardsTitle.vue'

const alterProd = ref<cartItem>()
const modal = ref<Array<any>>([])
const check = ref<string>('save')
const productStore = useProductStore()
const alterProdIndex = ref<number>()

const alterProduct = (index: number) => {
  check.value = 'change'
  window.scrollTo(0, 0)
  document.querySelector('body')?.setAttribute('style', 'overflow: hidden; height: auto')
  modal.value[index]?.classList.add('activeModal')
  alterProdIndex.value = index
}

// const fnDom = (el: any) => {
//   if (modal.value.length <= 20) {
//     modal.value.push(el)
//   }
// }

const fnClose = (i: number) => {
  modal.value[i]?.classList.remove('activeModal')
  document.querySelector('body')?.removeAttribute('style')
  productStore.removeProductId()
  check.value = 'save'
}
const alterEmpty = () => {
  alterProd.value = {
    pro_visible: '',
    unidade_medida: {
      umd_descricao: '',
      umd_id: 0,
      umd_sigla: ''
    },
    cor: 0,
    value_discount_type: 0,
    dropzoneFile: [],
    pro_id: 0,
    pro_nome: '',
    pro_categoria_item: 0,
    pro_venda: 0,
    produto_galeria: {
      pro_galeria_path: '',
      pro_galeria_all: []
    },
    one1_produto_estoque: [
      {
        one1_modelo_tintas: {
          modelo_id: 0,
          modelo_nome: ''
        },
        pro_est_id_tamanho: 0,
        pro_estoque: 0,
        pro_id: 0,
        one1_tamanho: {
          id: 0,
          one1_tamanho_nome: ''
        },
        one1_outros: {
          id: 0,
          one1_nome: ''
        },
        one1_cor: {
          id: 0,
          one1_cor_id_categ: 0,
          one1_cor_id_subcateg: 0,
          one1_cor_nome: ''
        },
        produto_preco_unidade: [
          {
            id: 0,
            id_prod: 0,
            one1_pro_estId: 0,
            ppu_preco_venda: ''
          }
        ],
        one1_insumos_tamanho: {
          id: 0,
          nome: '',
          one1_outro_id: 0
        },
        one1_metros_sublimatico: {
          id_metro: 0,
          metro: ''
        },
        pro_est_cor: 0,
        one1_produto_peso: {
          id: 0,
          peso: ''
        }
      }
    ],
    produto_tipo_servico: {
      id: 0,
      descricao: ''
    },
    qnty: 0,
    type: 0,
    content: '',
    tamanho: 0,
    pro_quantidade: 0,
    value_discount: 0
  }

  productStore.removeProductId()
}

const defineItem = (value: IProduct, i: number) => {
  //subtrai 1 para o index da ultima posição nao ultrapassar o array
  const i2 = modal.value.length > i ? i : i - 1
  productStore.getProductId(value)
  window.scrollTo(0, 0)
  document.querySelector('body')?.setAttribute('style', 'overflow: hidden; height: auto')
  modal.value[i2]?.classList.add('activeModal')
  check.value = 'save'
}

onUpdated(() => {
  //btns()
  const mouseenter = document.querySelectorAll('[data-trigger="hover"]')

  mouseenter.forEach((e) => {
    e.addEventListener('mouseenter', () => {
      e.classList.add('overlay--show')
    })
  })

  const mouseleave = document.querySelectorAll('[data-trigger="hover"]')
  mouseleave.forEach((e) => {
    e.addEventListener('mouseleave', () => {
      e.classList.remove('overlay--show')
    })
  })

  modal.value = Array.from(document.querySelectorAll('.cardsProducts'))
  document.querySelectorAll('.js-image').forEach((e) => {
    const img = e.querySelector('img')
    img?.setAttribute('style', 'visibility: hidden;')

    e.setAttribute(
      'style',
      `
            display: block;
            position: relative;
            overflow: hidden;
            background-image: url('${img?.getAttribute('src')}');
            background-size: cover;
            background-position: center center;
            height: 140px;
        `
    )
  })
})
</script>

<style scoped lang="scss"></style>
