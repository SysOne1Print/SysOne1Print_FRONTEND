<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="mdk-drawer-layout__content page-content"
    style="transform: translate3d(0px, 0px, 0px)"
  >
    <header-layout></header-layout>

    <div class="pt-32pt">
      <div
        class="container-xxl container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left"
      >
        <SubTitlePage
          :title-icon="['Dashboard', 'CONTABILIDADE']"
          :title-page="'Quadro Administrativo do Financeiro'"
        >
        </SubTitlePage>

        <div class="row" role="tablist">
          <div class="col-auto">
            <a class="btn btn-outline-secondary">Contabilidade</a>
          </div>
        </div>
      </div>
    </div>

    <div class="container-xxl container page__container fixW100">
      <div class="page-section">
        <div class="row mb-lg-8pt">
          <div class="col-lg-12">
            <Separator :icon-text="'fas fa-tasks'" :text="'Contas a pagar'" />

            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="table-responsive-sm table-responsive-md table-responsive">
                    <TableHeaderProducts
                      :item-select-action="selectAccount?.selectItem"
                      :descri="'Quadro Administrativo do Financeiro'"
                      @new-create="openModalFinanceiro"
                      @delete-item="deleteAccountingFn(1)"
                      :modal-type="1"
                      @search-status="searchStatus"
                      :orcamento-status="[]"
                      :type-header="false"
                    >
                    </TableHeaderProducts>

                    <TableFinanceAccount
                      :model_type="1"
                      ref="selectAccount"
                      :forneList="listFinanceFornecedorCompt"
                    ></TableFinanceAccount>

                    <div class="card-footer p-8pt">
                      <Pagination
                        v-if="listFinanceFornecedorCompt.length > 0"
                        :offset="offset"
                        :total="totalLength"
                        :limit="limit"
                        @change-page="''"
                      ></Pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ModalContent>
          <CreateFinanceiroFornecedor
            :text_title="textTitle"
            :modal-type-ref="modalTypeRef"
            :fornecedor-list="allFornecedor"
            @addToListFinance="updateListFinanceType"
            @close-modal="closeModal"
          >
          </CreateFinanceiroFornecedor>
        </ModalContent>

        <div class="row mb-lg-8pt">
          <div class="col-lg-12">
            <Separator :icon-text="'fas fa-check-double'" :text="'CONTAS A RECEBER'" />

            <div class="row">
              <div class="col-12">
                <div class="card">
                  <TableHeaderProducts
                    :descri="''"
                    @delete-item="deleteAccountingFn(2)"
                    :item-select-action="selectAccount2?.selectItem"
                    @new-create="openModalFinanceiro"
                    :modal-type="2"
                    @search-status="searchStatus"
                    :orcamento-status="[]"
                    :type-header="false"
                  >
                  </TableHeaderProducts>

                  <TableFinanceAccount
                    ref="selectAccount2"
                    :model_type="2"
                    :forneList="listFinanceRecbFornecedorCompt"
                  ></TableFinanceAccount>

                  <div class="card-footer p-8pt">
                    <Pagination
                      v-if="listFinanceRecbFornecedorCompt.length > 0"
                      :offset="offset"
                      :total="totalLength"
                      :limit="limit"
                      @change-page="''"
                    ></Pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
import TableFinanceAccount from '@/components/finance/Table-finance-account.vue'
import TableHeaderProducts from '@/components/products/Inventory-Product/Table-header-products.vue'
import ModalContent from '@/components/modal-content/Modal-content.vue'
import CreateFinanceiroFornecedor from '@/components/form/CreateFinanceiroFornecedor.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import { useSidebar } from '@/composables/Sidebar'
import { useDomStore } from '@/stores/DomStore'
import { storeToRefs } from 'pinia'
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue'
import { useLoginStore } from '@/stores/LoginStore'
import { useToast } from '@/composables/Toast'
import { useRouter } from 'vue-router'
import type { IError } from '@/model/Index'
import Separator from '@/components/one-print/Separator.vue'
import { getClientInOrder } from '@/api/actions/AccountFinanceiro'
import { getAllFornecedor } from '@/api/actions/Fornecedor'
import { useSelectItem } from '@/composables/UseSelectItemTable'

const router = useRouter()

const { notifyToast } = useToast()
const { userData } = useLoginStore()
const { sidebarDom } = storeToRefs(useDomStore())
const { removeActiveInOtherPage } = useSidebar()
const {
  selectAccount,
  selectAccount2,
  deleteAccountingFn,
  listFinanceFornecedor,
  listFinanceRecbFornecedor,
  listFinanceFornecedorCompt,
  listFinanceRecbFornecedorCompt
} = useSelectItem()

//limit
const limit = ref<number>(10)
const offset = ref<number>(0)
const textTitle = ref<string>()

const totalLength = ref<number>(0)
const allFornecedor = ref<Array<{ id: number; pro_for_nome: string }>>([])
const modalTypeRef = ref<number>()

const openModalFinanceiro = (modalType: number) => {
  window.scrollTo(0, 0)
  document.querySelector('body')?.setAttribute('style', 'overflow: hidden; height: auto')
  document.querySelector('#mdContent')?.classList.add('active')
  modalTypeRef.value = modalType
  textTitle.value = modalType === 1 ? 'CONTAS A PAGAR' : 'CONTAS A RECEBER'
}

const closeModal = (evt: Event | null): void => {
  if (evt && evt.target instanceof HTMLElement) {
    const firstParent = evt.target.offsetParent as HTMLElement | null
    const secondParent = firstParent?.offsetParent as HTMLElement | null

    if (secondParent?.classList.contains('active')) {
      secondParent.classList.remove('active')
    } else {
      const thirdParent = secondParent?.offsetParent as HTMLElement | null
      thirdParent?.classList.remove('active')
    }
  }

  document.querySelector('body')?.removeAttribute('style')
}

const updateListFinanceType = async () => {
  const {
    data: { total, pay, receive }
  } = await getClientInOrder(limit.value, offset.value, 0, '')
  listFinanceFornecedor.value = pay
  listFinanceRecbFornecedor.value = receive
  totalLength.value = total
}

const searchStatus = async (
  typeProd: number | string,
  searchItem: string,
  offsetValue: number,
  modalType: number
) => {
  try {
    const { data } = await getClientInOrder(limit.value, offset.value, modalType, searchItem)
    if (modalType === 1) {
      listFinanceFornecedor.value = data.pay
    }

    if (modalType === 2) listFinanceRecbFornecedor.value = data.receive
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      if (error.response.status === 404) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
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
    listFinanceFornecedor.value = []
    listFinanceRecbFornecedor.value = []

    totalLength.value = 0
  }
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data]: any = await Promise.allSettled([getAllFornecedor(), updateListFinanceType()])
    allFornecedor.value = data['value']?.data
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      if (error.response.status === 404) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }
    }

    if (error.response.status === 409) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
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
@media (min-width: 1919.19px) {
  .container-xxl {
    max-width: 1360px;
  }
}

.active {
  display: flex;
}
</style>
