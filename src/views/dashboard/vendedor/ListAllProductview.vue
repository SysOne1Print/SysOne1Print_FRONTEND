<template>
  <div
    class="mdk-drawer-layout__content page-content"
    style="transform: translate3d(0px, 0px, 0px)"
  >
    <header-layout></header-layout>

    <div class="pt-32pt">
      <div
        class="container-xl page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left"
      >
        <div class="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
          <div class="mb-24pt mb-sm-0 mr-sm-24pt">
            <h2 class="mb-0">{{ route.name }}</h2>

            <ol class="breadcrumb p-0 m-0">
              <!--<li class="breadcrumb-item"><a href="defCliente.html">Pedidos</a></li>-->
              <li class="breadcrumb-item active">Inventario</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="container-xl page__container">
      <div class="page-section">
        <div class="row mb-32pt">
          <div class="col-lg-12 d-flex align-items-center">
            <div class="flex" style="max-width: 100%">
              <div class="card m-0">
                <div class="table-responsive" data-toggle="lists">
                  <TableHeaderProducts
                    :item-select-action="selectProd?.selectItem"
                    :descri="'Lista de produtos'"
                    @delete-item="deleteProduto"
                    :type-header="false"
                    @search-status="searchStatus"
                  >
                    <!--:product-category="allCategory"-->
                  </TableHeaderProducts>
                  <TableListProducts
                    ref="selectProd"
                    @open-modal="openModal"
                    :product-list="listProducts"
                  >
                  </TableListProducts>
                </div>

                <div class="card-footer p-8pt">
                  <Pagination
                    v-if="listProducts.length > 0"
                    :offset="offset"
                    :total="totalProducts"
                    :limit="limit"
                    @change-page="changePage"
                  ></Pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalContent>
      <ModalListStock
        :list-product-stock="selectItem"
        @close-modal="closeModal"
        :title="'Lista de produtos'"
      >
      </ModalListStock>
    </ModalContent>

    <footer-layout></footer-layout>
  </div>
</template>

<script setup lang="ts">
import headerLayout from '@/layout/header/Header-layout.vue'
import footerLayout from '@/layout/Footer-layout.vue'
import TableHeaderProducts from '@/components/products/Inventory-Product/Table-header-products.vue'
import TableListProducts from '@/components/products/Inventory-Product/Table-list-products.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import ModalListStock from '@/components/modal-content/Modal-list-stock.vue'
import ModalContent from '@/components/modal-content/Modal-content.vue'
import { getAllCategoria } from '@/api/actions/Categoria'
import { deleteProductUpdateVisible, getListProductsTable } from '@/api/actions/Produtos'
import { useSidebar } from '@/composables/Sidebar'
import { useToast } from '@/composables/Toast'
import type { ICategoria, IError, IProducTable, IRelistProduct } from '@/model/Index'
import { useDomStore } from '@/stores/DomStore'
import { useLoginStore } from '@/stores/LoginStore'
import { storeToRefs } from 'pinia'
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSwal } from '@/composables/Swal'

const route = useRoute()
const router = useRouter()

const { notifyToast } = useToast()
const { sidebarDom } = storeToRefs(useDomStore())
const { removeActiveInOtherPage } = useSidebar()
const { userData } = useLoginStore()
const { swalConfirmed } = useSwal()

const limit = ref<number>(10)
//const typeCategory = ref<number>(0)
const offset = ref<number>(0)
const listProducts = ref<IProducTable[]>([])
const allCategory = ref<ICategoria[]>([])
const totalProducts = ref<number>(0)
const selectProd = ref<{ selectItem: Array<number> }>()
const selectItem = ref<IRelistProduct>()

const openModal = (value: IRelistProduct) => {
  selectItem.value = value
  window.scrollTo(0, 0)
  document.querySelector('body')?.setAttribute('style', 'overflow: hidden; height: auto')
  document.querySelector('#mdContent')?.classList.add('activeModal')
}

const searchStatus = async (typeProd: number | string, searchItem: string, offsetValue: number) => {
  try {
    const {
      data: { produto, total }
    } = await getListProductsTable(limit.value, offsetValue, typeProd, searchItem)
    listProducts.value = produto
    totalProducts.value = total
  } catch (er: unknown) {
    const error = er as IError

    if (error.response !== undefined) {
      if (error.response.status === 404) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
        listProducts.value = []
        totalProducts.value = 0
      }

      if (error.response.status === 400) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
        listProducts.value = []
        totalProducts.value = 0
      }
      if (error.response.status === 409) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
        listProducts.value = []
        totalProducts.value = 0
      }
    } else {
      notifyToast({ msg: 'Erro ao buscar orçamentos', typeToast: 'error' })
      listProducts.value = []
      totalProducts.value = 0
    }
  }
}

const closeModal = (evt: Event) => {
  if (evt !== undefined && evt.target instanceof HTMLElement) {
    const parent = evt.target.offsetParent as HTMLElement | null
    if (parent && parent.offsetParent) {
      parent.offsetParent.classList.remove('activeModal')
    }
  }
  document.querySelector('body')?.removeAttribute('style')
}

const deleteProduto = async () => {
  try {
    if (userData.user_id <= 0) {
      notifyToast({ msg: 'Logue no painel novamente', typeToast: 'info' })
      setTimeout(() => {
        router.push({ name: 'home' })
      }, 800)
      return
    }

    if (selectProd.value === undefined) {
      notifyToast({ msg: 'Não foi selecionado o produto para desativar', typeToast: 'error' })
      return
    }
    const conf = await swalConfirmed({
      title: 'Atenção',
      icon: 'info',
      text: 'Voce deseja realmente desativar esse produto?'
    })
    if (conf.isConfirmed) {
      const prod: number[] = selectProd.value?.selectItem
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let dt: Array<any> = []

      for (const v of prod) {
        try {
          const response = deleteProductUpdateVisible(v)
          dt.push(response) // Adiciona o resultado resolvido ao array
        } catch (er) {
          const error = er as IError
          console.error(`Erro ao desativar produto ${v}:`, error)

          if (error.response !== undefined) {
            if (error.response.status === 404) {
              notifyToast({ msg: error.response.data.msg, typeToast: 'warning' })
            }
            if (error.response.status === 400) {
              notifyToast({ msg: error.response.data.msg, typeToast: 'warning' })
            }

            if (error.response.status === 409) {
              notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
            }
          } else {
            notifyToast({ msg: 'Erro ao desativar produto', typeToast: 'error' })
          }
        }
      }

      let notiCountingSuccess = 0
      let notiCountingError = 0
      dt.forEach((val) => {
        val
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
          .then((result: { meta: { code: number } }) => {
            notiCountingSuccess += 1

            if (dt.length === notiCountingSuccess) {
              notifyToast({
                msg: 'Todos os produtos foram desativados com sucesso',
                typeToast: 'success'
              })
              if (selectProd.value !== undefined) selectProd.value.selectItem = []

              getAllProdutoList()
            }

            if (notiCountingError > 0 && dt.length > notiCountingSuccess) {
              notifyToast(
                {
                  msg: 'Alguns produtos não foram desativar, pois está associado a um orçamento',
                  typeToast: 'success'
                },
                3000
              )

              getAllProdutoList()
            }
          })
          .catch((er: unknown) => {
            const error = er as IError

            notiCountingError += 1
            if (
              error.response.status === 400 &&
              error.response.data.meta?.modelName === 'produto'
            ) {
              notifyToast({ msg: error.response.data.msg, typeToast: 'warning' })
            } else if (error.response.status === 404) {
              notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
            } else {
              notifyToast({ msg: error.response.data.msg, typeToast: 'info' })
            }
          })
      })
    }
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      if (error.response.status === 404) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }
      if (error.response.status === 400) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }

      if (error.response.status === 409) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }
    } else {
      notifyToast({ msg: 'Erro ao desativar produto', typeToast: 'error' })
    }
  }
}

const getAllProdutoList = async () => {
  const {
    data: { produto, total }
  } = await getListProductsTable(limit.value, offset.value, '', '')
  const { data: category } = await getAllCategoria()
  listProducts.value = produto
  allCategory.value = category
  totalProducts.value = total
}
const changePage = async (value: number) => {
  offset.value = value
  await searchStatus('', '', offset.value)
}

onMounted(async () => {
  removeActiveInOtherPage(sidebarDom.value)
  try {
    if (userData.user_id <= 0) {
      notifyToast({ msg: 'Logue no painel novamente', typeToast: 'info' })
      setTimeout(() => {
        router.push({ name: 'home' })
      }, 800)
      return
    }
    //search, limit, typeCategory, disponivel, 0
    const {
      data: { produto, total }
    } = await getListProductsTable(limit.value, offset.value, '', '')
    const { data: category } = await getAllCategoria()
    listProducts.value = produto
    allCategory.value = category
    totalProducts.value = total
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      if (error.response.status === 404) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }

      if (error.response.status === 409) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }
    } else {
      notifyToast({ msg: 'Erro ao buscar orçamentos', typeToast: 'error' })
    }
  }
})

onUpdated(() => {
  removeActiveInOtherPage(sidebarDom.value)
})

onBeforeMount(() => {
  removeActiveInOtherPage(sidebarDom.value)
  if (window.history.state.replaced) {
    useDomStore().$reset()
    useDomStore().$hydrate()
    let dom2 = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sidebarDom.value.forEach((el: any) => {
      if (el != undefined) {
        dom2.push(el)
      }
      dom2.push(el)
    })
    //sidebarDom.value = dom
  }
})
</script>

<style scoped lang="scss">
.container-xl {
  max-width: 1320px;
}

.activeModal {
  display: flex;
}
</style>
