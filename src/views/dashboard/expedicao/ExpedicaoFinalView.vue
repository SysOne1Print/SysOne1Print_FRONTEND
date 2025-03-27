<template>
  <div
    class="mdk-drawer-layout__content page-content"
    style="transform: translate3d(0px, 0px, 0px)"
  >
    <header-layout></header-layout>
    <div class="pt-32pt">
      <div
        class="container-xl container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left"
      >
        <SubTitlePage
          :title-icon="['Dashboard', 'Quadro Administrativo da produção']"
          :title-page="'Expedição'"
        >
        </SubTitlePage>
      </div>
    </div>

    <div class="container-xl container-fluid page__container">
      <div class="page-section">
        <!--Tabela-->
        <div class="col-12 pl-0 pr-0 mt-3">
          <div class="flex" style="max-width: 100%">
            <div class="card m-0">
              <div class="table-responsive-sm table-responsive-md table-responsive">
                <TableHeaderProducts
                  :typeHeader="true"
                  :descri="'Ordernar por TIPO de Trabalho'"
                  :orcamentoStatus="newCategoria"
                ></TableHeaderProducts>

                <Alert></Alert>

                <TableListExpedition
                  @open-modal="openModal"
                  :orcamento="newOrc"
                  @expedition-back="backBudgetById"
                  @open-modal-next-sector="openModalNextSectorAndClose"
                ></TableListExpedition>

                <ModalFinance
                  :description-production="production_stage"
                  :productionStage="selectItemOrc"
                  @fnClose="close"
                ></ModalFinance>

                <ModalFinishedNextSector
                  @save-logistica="saveLogistica"
                  @close-modal="closeModal"
                  :orcamento="expeditionOrcamento"
                  @recharge-orcamento="newSector"
                ></ModalFinishedNextSector>
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
import HeaderLayout from '@/layout/header/Header-layout.vue'
import FooterLayout from '@/layout/Footer-layout.vue'
import Alert from '@/components/AlertNoty.vue'
import { useToast } from '@/composables/Toast'
import { useProduction } from '@/composables/UseProduction'
import TableListExpedition from '@/components/production-component/TableListExpedition.vue'
import SubTitlePage from '@/layout/Sub-title-page.vue'
import TableHeaderProducts from '@/components/products/Inventory-Product/Table-header-products.vue'
import ModalFinishedNextSector from '@/components/modal-content/Modal-finished-next-sector.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { regLogistica } from '@/api/actions/Logistica'
import ModalFinance from '@/components/modal-content/Modal-finance.vue'
import { production_stage } from '@/util/TableInfo'
import { useSidebar } from '@/composables/Sidebar'
import { storeToRefs } from 'pinia'
import { useProductionStageStore } from '@/stores/ProductionStageStore'
import type {
  ICategoria,
  IError,
  IOrcamentoItensTablePedidoStatus,
  IOrcamentoVariedStage2,
  IStageProduction
} from '@/model/Index'
import { getOrcamentoItensStatusStageProduction } from '@/api/actions/Production'
import { getAllCategoria } from '@/api/actions/Categoria'

useSidebar() // instancia a composables para o mounted nela fazer efeito

const { newCategoria, newOrc, openModal, backBudgetById, nextSector, selectItemOrc, categoria } =
  useProduction()

const { orcamento, orcamentoModoVariado } = storeToRefs(useProductionStageStore())

const { notifyToast } = useToast()

const limit = ref<number>(10)
const offset = ref<number>(0)
const total = ref<number>(0)

const logisticAll = ref<{ id_logis: number; name_logis: string }[]>([])
const expeditionOrcamento = ref<IOrcamentoItensTablePedidoStatus>()

const closeModal = (event: Event | null): void => {
  const modalContent = document.querySelector('#mdContent') as HTMLElement | null

  if (event && event.target instanceof HTMLElement) {
    const parent = event.target.offsetParent as HTMLElement | null

    if (parent && parent.offsetParent instanceof HTMLElement) {
      const grandparent = parent.offsetParent

      if (grandparent.classList.contains('active')) {
        grandparent.classList.remove('active')
      } else {
        grandparent.classList.remove('activeModal')
      }
    }
  } else {
    modalContent?.classList.remove('activeModal')
  }

  document.querySelector('body')?.removeAttribute('style')
}

const saveLogistica = async (evt: number, orc_id: number) => {
  try {
    const { data } = await regLogistica({ id_logis: evt, id_orc: orc_id })
    notifyToast({ msg: data.msg, typeToast: 'success' })
    updateListOrcamento()
  } catch (er: unknown) {
    const error = er as IError
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro interno na tentativa de cadastro da logistica', typeToast: 'error' })
      return
    }
    if (error.response.status === 400) {
      notifyToast({ msg: error.response.data.msg, typeToast: 'error' })

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
}
const newSector = (value: IStageProduction) => {
  // const actual = value.sectorActual
  // nextSector(value, actual, 8)
}

const openModalNextSectorAndClose = (value: IStageProduction) => {
  const exp = orcamento.value.find((val) => val.orc_id === value.orc_id)
  expeditionOrcamento.value = exp
  document.querySelector('#mdContent')?.classList.toggle('active')
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

const updateListOrcamento = () => {
  //getOrcamentoStatusStage(7)
}

onUnmounted(() => {
  orcamento.value = []
})

onMounted(async () => {
  orcamento.value = []
  try {
    const [stage, allCategoria] = (await Promise.allSettled([
      getOrcamentoItensStatusStageProduction({
        limit: limit.value,
        skip: offset.value,
        type: 7,
        type_orc: 3
      }),
      getAllCategoria() // categoria foi modificado, precisa chamar outro endpoint
    ])) as [
      PromiseSettledResult<{
        data: {
          comum: IOrcamentoItensTablePedidoStatus[]
          modoVariado: IOrcamentoVariedStage2[]
          total: number
        }
      }>,
      PromiseSettledResult<{ data: ICategoria[] }>
    ]

    if (
      stage.status === 'fulfilled' &&
      stage.value.data?.comum !== undefined &&
      stage.value.data?.modoVariado !== undefined
    ) {
      orcamento.value = stage.value.data.comum as IOrcamentoItensTablePedidoStatus[]
      orcamentoModoVariado.value = stage.value.data.modoVariado as IOrcamentoVariedStage2[]
      total.value = stage.value.data.total
    }

    if (allCategoria.status === 'fulfilled' && allCategoria.value.data !== undefined) {
      const cat = Array.from(allCategoria.value.data).filter((v) => {
        return v.prod_tipo_descricao.toLowerCase().includes('impressão'.toLowerCase())
      }) as ICategoria[]

      categoria.value = cat
    }
  } catch (er: unknown) {
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
</script>

<style scoped>
@media (min-width: 1919.19px) {
  .container-xxl {
    max-width: 1360px;
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
