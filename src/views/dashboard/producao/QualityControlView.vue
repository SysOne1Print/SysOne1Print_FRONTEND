<template>
  <div
    class="mdk-drawer-layout__content page-content"
    style="transform: translate3d(0px, 0px, 0px)"
  >
    <header-layout></header-layout>
    <div class="pt-32pt">
      <div
        class="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left"
      >
        <div class="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
          <div class="mb-24pt mb-sm-0 mr-sm-24pt">
            <h2 class="mb-0">Controle de Qualidade</h2>

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
        <ProduceHeader></ProduceHeader>

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

                <TableListFinalArt
                  :orcamento="newOrc"
                  @open-modal="openModal"
                  @back-budget-byId="backBudgetById"
                  @next-sector-budget="newSector"
                >
                </TableListFinalArt>

                <ModelQualityProducer
                  :description-production="production_stage"
                  :productionStage="selectItemOrc"
                  @fnClose="closeModal"
                ></ModelQualityProducer>

                <ModelContentReplacement>
                  <div class="modal-content">
                    <div class="modal-top">
                      <span class="modal-close" rule="button" @click.prevent="closeModal">×</span>
                    </div>
                    <div class="w-100 d-flex flex-column border-bottom">
                      <h4 class="mb-0">Reposições</h4>
                      <p>
                        Ordem de Serviço Nº
                        <span class="font-weight-bold">#{{ selectItemOrc?.orc_id }}</span>
                      </p>
                    </div>

                    <ModelContentBody
                      :orcamento="selectItemOrc"
                      @fnActionCall="getRenewelOrc"
                      @back-sectors="backToSectors"
                      @closeModal="closeModal"
                    >
                    </ModelContentBody>

                    <div class="d-flex flex-column mt-4" v-if="production_stage !== undefined">
                      <div class="border-bottom">
                        <h4 class="mb-1">Histórico de reposição:</h4>
                      </div>

                      <HistoricalItem
                        v-if="
                          selectItemOrc?.replacement_layout &&
                          selectItemOrc?.replacement_layout.length > 0
                        "
                        :headers="headerReplacement"
                        :orcamento-historical="[]"
                        :replace_layout="selectItemOrc?.replacement_layout"
                      >
                      </HistoricalItem>

                      <div class="d-flex">
                        <p class="fs-6 font-weight-bold">Sem reposição</p>
                      </div>
                    </div>
                  </div>
                  <!---dados para a tela de acesso a reposição-->
                </ModelContentReplacement>
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
import ProduceHeader from '@/components/production-component/Produce-Header.vue'
import Alert from '@/components/AlertNoty.vue'
import TableHeaderProducts from '@/components/products/Inventory-Product/Table-header-products.vue'
import ModelContentReplacement from '@/components/modal-content/Modal-content.vue'
import TableListFinalArt from '@/components/production-component/TableListFinalArt.vue'
import { useProduction } from '@/composables/UseProduction'
import type {
  ICategoria,
  IError,
  IOrcamentoItensTablePedidoStatus,
  IOrcamentoVariedStage2,
  IStageProduction
} from '@/model/Index'
import ModelQualityProducer from '@/components/modal-content/Modal-finance.vue'
import { production_stage } from '@/util/TableInfo'
import ModelContentBody from '@/components/modal-content/Modal-content-body.vue'
import { useSidebar } from '@/composables/Sidebar'
import { storeToRefs } from 'pinia'
import { useProductionStageStore } from '@/stores/ProductionStageStore'
import HistoricalItem from '@/components/one-print/HistoricalItem.vue'
import { headerReplacement } from '@/util/TableHeaderPrime'
import { useToast } from '@/composables/Toast'
import { onMounted, onUnmounted, ref } from 'vue'
import { getOrcamentoItensStatusStageProduction } from '@/api/actions/Production'
import { useLoginStore } from '@/stores/LoginStore'
import { getAllCategoria } from '@/api/actions/Categoria'

//store
const {
  newCategoria,
  newOrc,
  openModal,
  backBudgetById,
  nextSector,
  typeSector,
  selectItemOrc,
  getOrcamentoStatusStage,
  categoria
} = useProduction()
typeSector.value = 6 // proximo estagio da produção

useSidebar() // instancia a composables para o mounted nela fazer efeito

const { notifyToast } = useToast()
const { userData } = storeToRefs(useLoginStore())

//active class steps
const { orcamento, orcamentoModoVariado } = storeToRefs(useProductionStageStore())

const limit = ref<number>(10)
const offset = ref<number>(0)
const total = ref<number>(0)
const nextSectorProduction = ref({
  sectorActualProduction: 6,
  sectorNextProduction: 7,
  sectorOrcamento: 3
})

const newSector = async (value: IStageProduction) => {
  await nextSector(
    {
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

const closeModal = (event: Event | null) => {
  const modalContent = document.querySelector('#mdContent')

  if (event && event.target instanceof HTMLElement) {
    // Verifica se o target tem offsetParent e remove a classe se for o caso
    const targetParent = event.target.offsetParent as HTMLElement | null
    if (targetParent && targetParent.offsetParent) {
      targetParent.offsetParent.classList.remove('activeModal')
    }
  } else {
    // Remove a classe diretamente do modalContent caso o evento seja null
    modalContent?.classList.remove('activeModal')
  }

  // Remove o estilo 'style' do body
  document.querySelector('body')?.removeAttribute('style')
}

const getRenewelOrc = () => {
  //getOrcamentoStatusStage()
}

const backToSectors = (value: IStageProduction) => {
  closeModal(null)
  backBudgetById(value, 5, typeSector.value)
}

onMounted(async () => {
  try {
    const [stage, allCategoria] = (await Promise.allSettled([
      getOrcamentoItensStatusStageProduction({
        limit: limit.value,
        skip: offset.value,
        type: 6,
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

onUnmounted(() => {
  orcamento.value = []
})
</script>

<style scoped>
.fs-6 {
  font-size: 1.25rem;
}

.activeModal {
  display: flex;
}

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
</style>
