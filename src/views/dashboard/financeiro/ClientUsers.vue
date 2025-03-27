<template>
  <div
    class="mdk-drawer-layout__content page-content"
    style="transform: translate3d(0px, 0px, 0px)"
  >
    <header-layout></header-layout>

    <div class="pt-32pt">
      <div
        class="container abertura page__container fixW100 d-flex flex-column flex-md-row align-items-center text-center text-sm-left"
      >
        <SubTitlePage :title-icon="['Dashboard']" :title-page="'Clientes'"> </SubTitlePage>

        <div class="row" role="tablist">
          <div class="col-auto">
            <a class="btn btn-outline-secondary">Edição de Clientes</a>
          </div>
        </div>
      </div>
    </div>

    <div class="container abertura page__container fixW100 mb-2">
      <div class="page-section">
        <div class="row clientes">
          <div class="col-12 pl-0 pr-0 mt-3">
            <div class="flex" style="max-width: 100%">
              <div class="card m-0 mb-4">
                <div class="table-responsive">
                  <ModalContent :id="'specificPrice'">
                    <CreateSpecificPrice
                      v-if="specificPriceCheck"
                      @close-modal="closeModalSpecific"
                      :productSelectPrice="productStore.productState"
                      :cliente="clientEdit"
                      class="modal-content"
                    ></CreateSpecificPrice>
                  </ModalContent>

                  <TableHeaderProducts
                    :itemSelectAction="[]"
                    :descri="'Quadro Administrativo do Financeiro'"
                    :typeHeader="false"
                    :modalType="0"
                    @search-status="''"
                    :product-category="[]"
                  >
                  </TableHeaderProducts>

                  <TableComponent :client-state="clientState" @open="fnSelectItem"></TableComponent>

                  <div class="card-footer p-8pt">
                    <Pagination
                      :offset="offset"
                      :total="total"
                      :limit="limit"
                      @change-page="changePage"
                    ></Pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CreateClient
            :descricaoRoute="'Alterar Cliente'"
            :clienteEdit="clientEdit"
            @open-specific-price="fnModalSpecific"
            v-if="buttonCheck"
            @close-modal-client="close_modal_client"
          >
          </CreateClient>

          <ModalContent>
            <CreateCarteiraOne @closeModal="closeModal" :cliente="clientEdit"></CreateCarteiraOne>
          </ModalContent>
        </div>
      </div>
    </div>

    <footer-layout></footer-layout>
  </div>
</template>

<script setup lang="ts">
import headerLayout from '@/layout/header/Header-layout.vue'
import footerLayout from '@/layout/Footer-layout.vue'
import SubTitlePage from '@/layout/Sub-title-page.vue'
import TableComponent from '@/components/table/Table-component.vue'
import ModalContent from '@/components/modal-content/Modal-content.vue'
import CreateCarteiraOne from '@/components/form/CreateCarteiraOne.vue'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useToast } from '@/composables/Toast'
import { useClientStore } from '@/stores/ClientStore'
import { storeToRefs } from 'pinia'
import { useDomStore } from '@/stores/DomStore'
import { useSidebar } from '@/composables/Sidebar'
import TableHeaderProducts from '@/components/products/Inventory-Product/Table-header-products.vue'
import CreateClient from '@/components/form/CreateClient.vue'
import type { IClient, IError } from '@/model/Index'
import { useProductStore } from '@/stores/ProductStore'
import Pagination from '@/components/pagination/Pagination.vue'
import CreateSpecificPrice from '@/components/modal-content/ModalCreateSpecificPrice.vue'

//hooks
const { notifyToast } = useToast()
//const { sidebar } = useSidebar()
const { sidebarDom } = storeToRefs(useDomStore())
const { removeActiveInOtherPage } = useSidebar()

const { total, clientState } = storeToRefs(useClientStore())
const { getAllClientLimit } = useClientStore()
const productStore = useProductStore()
//variable comum
const limit = ref(10)
const buttonCheck = ref<boolean>(false)
const specificPriceCheck = ref<boolean>(false)
const clientEdit = ref<IClient>()
const offset = ref(0)

const closeModal = (evt: Event | null): void => {
  if (evt && evt.target instanceof HTMLElement) {
    const parent = evt.target.offsetParent as HTMLElement | null
    if (parent && parent.offsetParent instanceof HTMLElement) {
      parent.offsetParent.classList.remove('active')
    }
  }

  document.querySelector('body')?.removeAttribute('style')

  // Presumindo que clientEdit é uma ref ou reactive do Vue
  clientEdit.value = {} as IClient
}

const changePage = async (value: number) => {
  offset.value = value
  await onSearch('', '', offset.value)
}

const fnModalSpecific = (evt: boolean) => {
  specificPriceCheck.value = evt
}

const closeModalSpecific = () => {
  document.querySelector('#specificPrice')?.classList.toggle('active')
  document.querySelector('body')?.removeAttribute('style')
  specificPriceCheck.value = false
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const onSearch = async (typeProd: number | string = 1, searchItem: string, offsetValue: number) => {
  try {
    await getAllClientLimit(limit.value, offset.value)
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      if (error.response.status === 404) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'info' })
        return
      }

      if (error.response.status === 400) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
        return
      }
      if (error.response.status === 409) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
        return
      }
    } else {
      notifyToast({ msg: 'Erro ao buscar orçamentos', typeToast: 'error' })
      return
    }
  }
}

const close_modal_client = () => {
  clientEdit.value = {} as IClient
  buttonCheck.value = false
  window.scrollTo(0, 0)
}

const fnSelectItem = (value: IClient, str: string) => {
  if (clientEdit.value?.cli_id === undefined) {
    clientEdit.value = value

    if (str === 'add') {
      window.scrollTo(0, 0)
      document.querySelector('body')?.setAttribute('style', 'overflow: hidden; height: auto')
      document.querySelector('#mdContent')?.classList.add('active')
      //return
    } else {
      buttonCheck.value = true
    }

    return
  }

  if (clientEdit.value?.cli_id === value.cli_id) {
    clientEdit.value = {} as IClient
    if (str === 'add') {
      window.scrollTo(0, 0)
      document.querySelector('body')?.setAttribute('style', 'overflow: hidden; height: auto')
      document.querySelector('#mdContent')?.classList.add('active')
    } else {
      buttonCheck.value = false
    }

    return
  }
}

onMounted(async () => {
  try {
    await getAllClientLimit(limit.value, 0)
    await productStore.getAllProductStore(100)
  } catch (er: unknown) {
    const error = er as IError
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro interno na tentativa do login', typeToast: 'error' })
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

@media (min-width: 1366px) {
  .modal-content {
    width: 50%;
  }
}
</style>
