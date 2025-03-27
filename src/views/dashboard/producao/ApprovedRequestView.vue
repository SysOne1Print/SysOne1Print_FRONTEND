<template>
  <div class="mdk-drawer-layout__content page-content" style="transform: translate3d(0px, 0px, 0px)">
    <header-layout></header-layout>
    <div class="pt-32pt">
      <div
        class="container-xxl container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
        <div class="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
          <div class="mb-24pt mb-sm-0 mr-sm-24pt">
            <h2 class="mb-0">Pedidos Aprovados</h2>

            <ol class="breadcrumb p-0 m-0">
              <li class="breadcrumb-item">Dashboard</li>
              <li class="breadcrumb-item active">Quadro Administrativo da Produção</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="container-xxl container page__container fixW100">
      <div class="page-section">
        <div class="row mb-32pt">
          <ProduceHeader></ProduceHeader>
          <!--Tabela-->
          <div class="col-12 pl-0 pr-0 mt-3">
            <div class="flex" style="max-width: 100%">
              <div class="card m-0">
                <div class="table-responsive-sm table-responsive-md table-responsive">
                  <TableHeaderProducts :typeHeader="true" :descri="'Ordernar por TIPO de Trabalho'"
                    :orcamentoStatus="newCategoria"></TableHeaderProducts>

                  <Alert></Alert>

                  <TableList ref="tableList" :orcamento="orcamento" @open-modal="openModal"></TableList>

                  <ModalFinance :description-production="production_stage" :productionStage="selectItemOrc"
                    @fnClose="close">
                  </ModalFinance>
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

<script setup lang="ts">
import headerLayout from '@/layout/header/Header-layout.vue'
import footerLayout from '@/layout/Footer-layout.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getOrcamentoItensStatusStageProduction } from '@/api/actions/Production'
import ProduceHeader from '@/components/production-component/Produce-Header.vue'
import { useProductionStageStore } from '@/stores/ProductionStageStore'
import { storeToRefs } from 'pinia'
import type {
  IError,
  IOptionHeader,
  IOrcamentoItensPedidoStatus,
  IOrcamentoItensTablePedidoStatus
} from '@/model/Index'
import TableList from '@/components/production-component/TableListApproved.vue'
import Alert from '@/components/AlertNoty.vue'
import TableHeaderProducts from '@/components/products/Inventory-Product/Table-header-products.vue'
import type { ICategoria } from '../../../model/ICategoria'
import ModalFinance from '@/components/modal-content/Modal-finance.vue'
import { useToast } from '@/composables/Toast'
import { production_stage } from '@/util/TableInfo'
import { useSidebar } from '@/composables/Sidebar'
import Pagination from '@/components/pagination/Pagination.vue'
import { getAllCategoria } from '@/api/actions/Categoria'

const { orcamento, stageType } = storeToRefs(useProductionStageStore())
stageType.value = 0
//hooks
const { notifyToast } = useToast()
const tableList = ref<{ selectItem: Array<number> }>()

useSidebar() // instancia a composables para o mounted nela fazer efeito
const categoria = ref<ICategoria[]>([])
const selectItemOrc = ref<IOrcamentoItensPedidoStatus>()

const limit = ref<number>(10)
const offset = ref<number>(0)
const total = ref<number>(0)

const newCategoria = computed<IOptionHeader[]>(() =>
  categoria.value.map((v) => ({
    id: v.id,
    description: v.prod_tipo_descricao
  }))
)

const openModal = (value: IOrcamentoItensPedidoStatus) => {
  selectItemOrc.value = value
  window.scrollTo(0, 0)
  document.querySelector('body')?.setAttribute('style', 'overflow: hidden; height: auto')
  document.querySelector('#modalDetalhes1')?.classList.add('activeModal')
}

const close = (evt: Event | null): void => {
  if (evt && evt.target instanceof HTMLElement) {
    const parent = evt.target.offsetParent as HTMLElement | null

    if (parent && parent.offsetParent instanceof HTMLElement) {
      parent.offsetParent.classList.remove('activeModal')
    }
  }

  document.querySelector('body')?.removeAttribute('style')
}

const changePage = async (value: number) => {
  offset.value = value
  const { data } = await getOrcamentoItensStatusStageProduction({
    limit: limit.value,
    skip: offset.value,
    type: 1,
    type_orc: 3
  })
  orcamento.value = data.comum as IOrcamentoItensTablePedidoStatus[]
}

onMounted(async () => {
  try {
    const [stage, allCategoria] = (await Promise.allSettled([
      getOrcamentoItensStatusStageProduction({
        limit: limit.value,
        skip: offset.value,
        type: 1,
        type_orc: 3
      }),
      getAllCategoria() // categoria foi modificado, precisa chamar outro endpoint
    ])) as [
        PromiseSettledResult<{ data: { comum: IOrcamentoItensTablePedidoStatus[]; total: number } }>,
        PromiseSettledResult<{ data: ICategoria[] }>
      ]

    if (stage.status === 'fulfilled' && stage.value.data?.comum !== undefined) {
      orcamento.value = stage.value.data.comum as IOrcamentoItensTablePedidoStatus[]

      total.value = stage.value.data.total
    }

    if (allCategoria.status === 'fulfilled' && allCategoria.value.data !== undefined) {
      const cat = Array.from(allCategoria.value.data).filter((v) => {
        return v.prod_tipo_descricao.toLowerCase().includes('impressão'.toLowerCase())
      }) as ICategoria[]

      categoria.value = cat
    }
  } catch (er: unknown) {
    console.log('er: ', er)
    const error = er as IError
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro interno na tentativa de busca', typeToast: 'error' })
      return
    }
    if (error.response.status === 404) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })

      return
    } else {
      notifyToast({ msg: 'Erro interno ', typeToast: 'error' })
      return
    }
  }
})

onUnmounted(() => {
  orcamento.value = []
})
</script>

<style scoped>
@import url('primeflex/primeflex.css');
@import url('primeicons/primeicons.css');

@media (min-width: 1919.19px) {
  .container-xxl {
    max-width: 1360px;
  }
}

.activeModal {
  display: flex;
}
</style>
