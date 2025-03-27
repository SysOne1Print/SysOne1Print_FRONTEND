<template>
  <div class="mdk-drawer-layout__content page-content">
    <header-layout></header-layout>

    <div class="pt-32pt">
      <div
        class="container page__container fixW100 d-flex flex-column flex-md-row align-items-center text-center text-sm-left"
      >
        <SubTitlePage :title-icon="getSubRoute" :title-page="routerName"> </SubTitlePage>

        <div class="row" role="tablist">
          <div class="col-auto">
            <a class="btn btn-outline-secondary">Contabilidade</a>
          </div>
        </div>
      </div>
    </div>

    <div class="container page__container fixW100">
      <div class="page-section">
        <div class="row mb-32pt">
          <div class="col-lg-12 d-flex align-items-center">
            <div class="flex" style="max-width: 100%">
              <div class="card m-0">
                <div class="table-responsive" data-toggle="lists">
                  <TableHeaderProducts
                    @search-status="searchStatus"
                    :descri="getSubRoute[1]"
                    :orcamento-status="status"
                    :type-header="true"
                  >
                  </TableHeaderProducts>

                  <TableFinanceWallet
                    @selectCartOne="selectCartOne"
                    :wallet="cWallet"
                  ></TableFinanceWallet>
                </div>

                <ModalContent>
                  <ModalDetailsCartOne
                    :detailsCartOne="cartOne"
                    :type-modal="typeModalCard"
                    @close-modal="closeModal"
                    :title="'Estoque de produtos'"
                    :allPaymentType="allPaymentType"
                    @validateUpdateCarteiraOne="updateCarteiraOne"
                  >
                  </ModalDetailsCartOne>
                </ModalContent>

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
      </div>
    </div>

    <footer-layout></footer-layout>
  </div>
</template>

<script setup lang="ts">
import headerLayout from '@/layout/header/Header-layout.vue'
import footerLayout from '@/layout/Footer-layout.vue'
import SubTitlePage from '@/layout/Sub-title-page.vue'
import TableHeaderProducts from '@/components/products/Inventory-Product/Table-header-products.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import { useSidebar } from '@/composables/Sidebar'
import { useDomStore } from '@/stores/DomStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '@/composables/Toast'
import { useLoginStore } from '@/stores/LoginStore'
import { useCarteiraOne } from '@/composables/UseCarteiraOne'
import TableFinanceWallet from '@/components/finance/Table-finance-wallet.vue'
import ModalContent from '@/components/modal-content/Modal-content.vue'
import ModalDetailsCartOne from '@/components/modal-content/Modal-details-cartOne.vue'
import type { IError, IWalletOne } from '@/model/Index'

//hooks
const router = useRouter()
const route = useRoute()
const loginStore = useLoginStore()
const { notifyToast } = useToast()
const { userData } = useLoginStore()
const { sidebarDom } = storeToRefs(useDomStore())
const { removeActiveInOtherPage } = useSidebar()
const {
  limit,
  offset,
  total,
  getWallet,
  cWallet,
  validateUpdateCarteiraOne,
  wallet,
  searchNome,
  walletStatus,
  getPaymentType,
  allPaymentType
} = useCarteiraOne()

//variabel
const status = ref<{ id: number; description: string }[]>([
  { id: 1, description: 'Saldo disponível' },
  { id: 2, description: 'Saldo pendente' },
  { id: 3, description: 'Saldo validado' },
  { id: 4, description: 'Saldo em débito' },
  { id: 4, description: 'Saldo estornado' }
])
const routerName = ref<string>('')
const cartOne = ref<IWalletOne>()
const typeModalCard = ref<string>()

const changePage = async (value: number) => {
  offset.value = value
  searchNome.value = ''

  await getWallet()
}

const searchStatus = async (searchItem: string, walletS: number) => {
  try {
    searchNome.value = searchItem
    walletStatus.value = walletS
    await getWallet()
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
    wallet.value = []

    total.value = 0
  }
}

const getSubRoute = computed(() => {
  return route.matched.map((v) => {
    return v.path === '/finance' ? 'Financeiro' : v.name
  }) as string[]
})

const updateCarteiraOne = async (updateCartOne: {
  id_cartOne: number | undefined
  user_id: number
  fpg_id: number
}) => {
  const validate = await validateUpdateCarteiraOne(updateCartOne)

  if (validate && validate.status === 200) {
    setTimeout(() => {
      document.querySelector('body')?.removeAttribute('style')
      document.querySelector('#mdContent')?.classList.toggle('active')
      typeModalCard.value = 'details'
    }, 900)
  }
}

const selectCartOne = (value: IWalletOne, modal: string) => {
  document.querySelector('body')?.setAttribute('style', 'overflow: hidden; height: auto')
  document.querySelector('#mdContent')?.classList.add('active')
  cartOne.value = value
  if (modal !== '') {
    typeModalCard.value = modal
  }
}

const closeModal = (evt: Event) => {
  if (evt !== undefined && evt.target instanceof HTMLElement) {
    const parent = evt.target.offsetParent as HTMLElement | null
    if (parent && parent.offsetParent) {
      parent.offsetParent.classList.remove('active')
    }
  }

  typeModalCard.value = 'details'
  document.querySelector('body')?.removeAttribute('style')
}

onMounted(async () => {
  removeActiveInOtherPage(sidebarDom.value)

  if (userData.user_id <= 0) {
    loginStore.$reset()
    loginStore.loginReset()
    notifyToast({ msg: 'Logue no painel novamente', typeToast: 'info' })
    setTimeout(() => {
      router.push({ name: 'home' })
    }, 800)
    return
  }

  routerName.value = String(router.currentRoute.value.name)
  await Promise.allSettled([getWallet(), getPaymentType()])
})
</script>

<style scoped lang="scss">
.container-xl {
  width: 90%;
  max-width: 100%;
}
</style>
