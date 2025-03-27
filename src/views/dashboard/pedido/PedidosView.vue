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
            <h2 class="mb-0">Meus Pedidos</h2>

            <ol class="breadcrumb p-0 m-0">
              <!--<li class="breadcrumb-item"><a href="defCliente.html">Pedidos</a></li>-->
              <li class="breadcrumb-item active">Pedidos</li>
            </ol>
          </div>
        </div>

        <div class="row" role="tablist">
          <div class="col-auto">
            <button type="button" class="btn btn-primary" @click="''">
              <i class="material-icons sidebar-menu-icon sidebar-menu-icon--left">done</i>
              Listar apenas pedidos finalizados
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container-xl page__container">
      <div class="page-section">
        <PedidoTitle></PedidoTitle>

        <div class="row mb-32pt">
          <div class="col-lg-12 d-flex align-items-center">
            <div class="flex" style="max-width: 100%">
              <div class="card m-0">
                <div
                  class="table-responsive"
                  data-toggle="lists"
                  data-lists-sort-by="js-lists-values-employee-name"
                  data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
                >
                  <TableHeaderPedido
                    @search-status="searchStatus"
                    :orcamento-status="orcamentoStatus"
                  >
                  </TableHeaderPedido>
                  <PedidoTable :orcamento-pedido-status="orcamentoPedidoStatus"> </PedidoTable>
                </div>

                <div class="card-footer p-8pt">
                  <Pagination
                    v-if="orcamentoPedidoStatus.length > 0"
                    :offset="offset"
                    :total="totalPedidos"
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
import PedidoTitle from '@/components/pedido/header-pedido/Pedido-title.vue'
import TableHeaderPedido from '@/components/pedido/pedido-table/Table-header-pedido.vue'
import PedidoTable from '@/components/pedido/pedido-table/Pedido-table.vue'
import Pagination from '@/components/pagination/Pagination.vue'

import { onBeforeMount, onMounted, onUpdated, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDomStore } from '@/stores/DomStore'
import { useSidebar } from '@/composables/Sidebar'
import { useToast } from '@/composables/Toast'
import { getOrcamentoPedidoStatus, getOrcamentoStatus } from '@/api/actions/Orcamento'
import type { IError, IOrcamentoPedidoStatus, IOrcamentoStatus } from '@/model/Index'
import { useLoginStore } from '@/stores/LoginStore'
import { useRouter } from 'vue-router'

const { sidebarDom } = storeToRefs(useDomStore())
const { removeActiveInOtherPage } = useSidebar()
const { notifyToast } = useToast()
const { userData } = useLoginStore()
const router = useRouter()

//variable
const limit = ref(10)
const orcamentoPedidoStatus = ref<IOrcamentoPedidoStatus[]>([])
const orcamentoStatus = ref<IOrcamentoStatus[]>([])
const totalPedidos = ref<number>(0)
const offset = ref<number>(0)

const searchStatus = async (
  orcStatus: number | string,
  searchItem: string,
  offsetValue: number
) => {
  try {
    const { data } = await getOrcamentoPedidoStatus(
      limit.value,
      userData.user_id,
      offsetValue,
      orcStatus,
      searchItem
    )
    orcamentoPedidoStatus.value = data.orc
    totalPedidos.value = data.total
  } catch (er: unknown) {
    const error = er as IError
    if (error.response !== undefined) {
      if (error.response.status === 404) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
        orcamentoPedidoStatus.value = []
        totalPedidos.value = 0
      }

      if (error.response.status === 409) {
        notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
        orcamentoPedidoStatus.value = []
        totalPedidos.value = 0
      }
    } else {
      notifyToast({ msg: 'Erro ao buscar orçamentos', typeToast: 'error' })
      orcamentoPedidoStatus.value = []
      totalPedidos.value = 0
    }
  }
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
    const { data } = await getOrcamentoPedidoStatus(
      limit.value,
      userData.user_id,
      offset.value,
      '',
      ''
    )
    orcamentoPedidoStatus.value = data.orc
    totalPedidos.value = data.total
    const { data: orStatus } = await getOrcamentoStatus()
    orcamentoStatus.value = orStatus
  } catch (er: unknown) {
    const error = er as IError
    console.log(error)
    if (error.response !== undefined) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })
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

<style scoped lang="scss">
.container-xl {
  max-width: 1280px;
}
</style>
