<template>
  <div class="mdk-drawer-layout__content page-content" style="transform: translate3d(0px, 0px, 0px)">
    <header-layout></header-layout>
    <div class="pt-32pt">
      <div class="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
        <div class="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
          <div class="mb-24pt mb-sm-0 mr-sm-24pt">
            <h2 class="mb-0">Arte Final</h2>

            <ol class="breadcrumb p-0 m-0">
              <li class="breadcrumb-item">Dashboard</li>
              <li class="breadcrumb-item active">Quadro Administrativo da Produção</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="container-xl container-fluid page__container">
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

                  <TableListFinalArt :orcamento="newOrc" @open-modal="openModal" @back-budget-byId="backBudgetById"
                    @next-sector-budget="newSector">
                  </TableListFinalArt>

                  <ModalFinance :description-production="production_stage" :productionStage="selectItemOrc"
                    @fnClose="close"></ModalFinance>
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
import ProduceHeader from '@/components/production-component/Produce-Header.vue'
import Alert from '@/components/AlertNoty.vue'
import TableHeaderProducts from '@/components/products/Inventory-Product/Table-header-products.vue'
import TableListFinalArt from '@/components/production-component/TableListFinalArt.vue'
import { useProduction } from '@/composables/UseProduction'
import ModalFinance from '@/components/modal-content/Modal-finance.vue'
import type { ICategoria, IError, IOrcamentoItensTablePedidoStatus, IStageProduction } from '@/model/Index'
import { production_stage } from '@/util/TableInfo'
import { useSidebar } from '@/composables/Sidebar'
import { storeToRefs } from 'pinia'
import { useLoginStore } from '@/stores/LoginStore'
import { onMounted, onUnmounted, ref } from 'vue'
import { useProductionStageStore } from '@/stores/ProductionStageStore'
import Pagination from '@/components/pagination/Pagination.vue'
import { getOrcamentoItensStatusStageProduction } from '@/api/actions/Production'
import { getAllCategoria } from '@/api/actions/Categoria'
import { useToast } from '@/composables/Toast'

useSidebar() // instancia a composables para o mounted nela fazer efeito
const { userData } = storeToRefs(useLoginStore())

const { orcamento } = storeToRefs(useProductionStageStore())
const { newCategoria, newOrc, selectItemOrc, openModal, backBudgetById, nextSector } =
  useProduction()

const { notifyToast } = useToast()
const categoria = ref<ICategoria[]>([])
const limit = ref<number>(10)
const offset = ref<number>(0)
const total = ref<number>(0)

const nextSectorProduction = ref({
  sectorActualProduction: 2,
  sectorNextProduction: 3,
  sectorOrcamento: 3
})

const close = (evt: Event) => {
  if (evt.target instanceof HTMLElement) {
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
    type: 2,
    type_orc: 3
  })
  orcamento.value = data.comum as IOrcamentoItensTablePedidoStatus[]
}

const newSector = async (value: IStageProduction | Array<number>) => {
  if (Array.isArray(value)) {
    const newFilterArray = newOrc.value.filter((v, index) => v.orc_id === value[index])

    for (const element of newFilterArray) {
      await nextSector(
        {
          orc_id: element.orc_id,
          ost_id: element.orcamento.orcamento_status.ost_id,
          user_usucadastro: userData.value.user_id,
          nextSectorProduction: {
            sectorOrcamento: nextSectorProduction.value.sectorOrcamento,
            sectorProduction: nextSectorProduction.value.sectorActualProduction
          },
          oit_id: element.oit_id,
          stop_orc: false
        },
        nextSectorProduction.value.sectorNextProduction
      );
    }
    return
  }

  await nextSector({
    orc_id: value.orc_id,
    ost_id: value.ost_id,
    user_usucadastro: userData.value.user_id,
    nextSectorProduction: {
      sectorOrcamento: value.nextSectorProduction.sectorOrcamento,
      sectorProduction: value.nextSectorProduction.sectorProduction
    },
    oit_id: value.oit_id,
    stop_orc: false
  },
    nextSectorProduction.value.sectorNextProduction
  )

}

onMounted(async () => {
  try {
    const [stage, allCategoria] = (await Promise.allSettled([
      getOrcamentoItensStatusStageProduction({
        limit: limit.value,
        skip: offset.value,
        type: 2,
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
@media (min-width: 1919.19px) {
  .container-xxl {
    max-width: 1920px;
  }
}

@media (min-width: 1360px) {
  .container-xl {
    max-width: 1530px;
  }
}

.activeModal {
  display: flex;
}
</style>
