<template>
  <div class="mdk-drawer-layout__content page-content" style="transform: translate3d(0px, 0px, 0px)">
    <header-layout></header-layout>

    <div class="pt-32pt">
      <div class="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
        <SubTitlePage :title-icon="['Dashboard']" :title-page="'Quadro Administrativo do Financeiro'">
        </SubTitlePage>

        <div class="row" role="tablist">
          <div class="col-auto">
            <a class="btn btn-outline-secondary">Contabilidade</a>
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
                  <TableHeaderProducts @search-status="onSearch"
                    :descri="'Quadro Administrativo do Financeiro Clientes'" :orcamento-status="newArrOrcStatus"
                    :type-header="true">
                  </TableHeaderProducts>
                  <TableFinance @list-orc="updateListOrc" @next-status-budget="budgetStatusApprove"
                    @recharge-table="rechargeOrcamento" :orcamento-status="orcamentoStatus"
                    :finance-list="listOrcComputed" :bank-list="bankList" :payment-list="paymentList"
                    :pay-status-list="payStatusList">
                  </TableFinance>
                </div>

                <div class="card-footer p-8pt">
                  <Pagination :offset="offset" :total="total" :limit="limit" @change-page="changePage"></Pagination>
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

<script lang="ts" setup>
import headerLayout from '@/layout/header/Header-layout.vue'
import footerLayout from '@/layout/Footer-layout.vue'
import SubTitlePage from '@/layout/Sub-title-page.vue'
import TableFinance from '@/components/finance/Table-finance.vue'
import TableHeaderProducts from '@/components/products/Inventory-Product/Table-header-products.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import { useSidebar } from '@/composables/Sidebar'
import { useDomStore } from '@/stores/DomStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useLoginStore } from '@/stores/LoginStore'
import { useToast } from '@/composables/Toast'
import { useRouter } from 'vue-router'
import type { IError, IOptionHeader, IOrcamentoStatus } from '@/model/Index'
import {
  getAccountBank,
  getOrcamentoPedidoStatus,
  getOrcamentoStatus
} from '@/api/actions/Orcamento'
import { getAllPaymentType, statusPayment } from '@/api/actions/Payment'
import { useFinance } from '@/composables/UseFinance'

const router = useRouter()

const { notifyToast } = useToast()
const { userData } = useLoginStore()
const { sidebarDom, orcStatus } = storeToRefs(useDomStore())
const { removeActiveInOtherPage } = useSidebar()
const loginStore = useLoginStore()

//useFinance
const { budgetStatusApprove, rechargeOrcamento, limit, offset, total, listOrc } = useFinance()

//limit
const bankList = ref<{ id: number; nome_banco_pagamento: string }[]>([])
const paymentList = ref<Array<{ fpg_descricao: string; fpg_id: number }>>([])
const payStatusList = ref<Array<{ id_pg_status: number; status: string; styled_css: string }>>([])
const orcamentoStatus = ref<IOrcamentoStatus[]>([])

const newArrOrcStatus = computed<IOptionHeader[]>(
  () =>
    orcamentoStatus.value.map((v) => ({
      id: v.ost_id,
      description: v.ost_descricao
    })) as unknown as IOptionHeader[]
)

const listOrcComputed = computed(() => listOrc.value)

const onSearch = async (typeProd: number | string = 1, searchItem: string, offsetValue: number) => {
  try {
    typeProd = orcStatus.value
    const typeSearch = typeProd === '' ? -1 : typeProd
    const { data } = await getOrcamentoPedidoStatus(
      limit.value,
      '',
      offsetValue,
      typeSearch,
      searchItem
    )
    listOrc.value = data.orc
    total.value = limit.value > data.orc.length ? data.orc.length : data.total
  } catch (er: unknown) {
    const error = er as IError
    listOrc.value = []
    total.value = 0
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

const updateListOrc = (value: never[]) => {
  listOrc.value = value
}

const changePage = async (value: number) => {
  offset.value = value
  await onSearch('', '', offset.value)
}

onMounted(async () => {
  removeActiveInOtherPage(sidebarDom.value)
  try {
    if (userData.user_id <= 0) {
      notifyToast({ msg: 'Logue no painel novamente', typeToast: 'info' })
      loginStore.$reset()
      loginStore.loginReset()

      setTimeout(() => {
        router.push({ name: 'home' })
      }, 800)
      return
    }

    // //search, limit, typeCategory, disponivel, 0

    await rechargeOrcamento()

    const { data: orStatus } = await getOrcamentoStatus()

    orcamentoStatus.value = orStatus

    const { data: bank } = await getAccountBank()
    bankList.value = bank

    const { data: payment } = await getAllPaymentType()
    paymentList.value = [...payment.bank, ...payment.presencial]

    const { data: payStatus } = await statusPayment()
    payStatusList.value = payStatus
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      if (error.response.status === 404) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'info' })
      }
      if (error.response.status === 409) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
      }
    } else {
      notifyToast({ msg: 'Erro ao buscar orçamentos', typeToast: 'error' })
    }
  }
})
</script>

<style scoped lang="scss">
.container-xl {
  max-width: 1280px;
}
</style>
