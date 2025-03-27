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
          :title-icon="['Dashboard', 'Quadro Administrativo da produção']"
          :title-page="'Expedição'"
        >
        </SubTitlePage>
      </div>
    </div>

    <div class="container-xxl container-fluid page__container">
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

                <TableListExpedition
                  @open-modal="openModal"
                  :orcamento="newOrc"
                  @expedition-back="backBudgetById"
                  @next-sector-budget="newSector"
                ></TableListExpedition>

                <ModelContentReplacement>
                  <div class="modal-content">
                    <div class="modal-top">
                      <span class="modal-close" rule="button" @click.prevent="closeModal">×</span>
                    </div>
                    <div class="w-100 d-flex flex-column border-bottom">
                      <h4 class="mb-0">Editar Logística</h4>
                      <p>
                        Ordem de Serviço Nº
                        <span class="font-weight-bold">#0A-35C3PO</span>
                      </p>
                    </div>

                    <ModalContentLogistic
                      @update-list-orc="updateListOrcamento"
                      :logisticAll="logisticAll"
                      :orcamento="selectItemOrc"
                    >
                    </ModalContentLogistic>
                  </div>
                </ModelContentReplacement>

                <ModalFinance
                  :description-production="production_stage"
                  :productionStage="selectItemOrc"
                  @fnClose="close"
                ></ModalFinance>
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
import { useToast } from '@/composables/Toast'
import { useProduction } from '@/composables/UseProduction'
import TableListExpedition from '@/components/production-component/TableListExpedition.vue'
import SubTitlePage from '@/layout/Sub-title-page.vue'
import TableHeaderProducts from '@/components/products/Inventory-Product/Table-header-products.vue'
import ModelContentReplacement from '@/components/modal-content/Modal-content.vue'
import ModalContentLogistic from '@/components/modal-content/Modal-content-logistic.vue'
import { onMounted, ref } from 'vue'
import { getLogistic } from '@/api/actions/Logistica'
import ModalFinance from '@/components/modal-content/Modal-finance.vue'
import { production_stage } from '@/util/TableInfo'
import { useSidebar } from '@/composables/Sidebar'
import { storeToRefs } from 'pinia'
import { useProductionStageStore } from '@/stores/ProductionStageStore'
import type { IError, IStageProduction } from '@/model/Index'

const {
  newCategoria,
  newOrc,
  openModal,
  backBudgetById,
  nextSector,
  typeSector,
  selectItemOrc,
  getOrcamentoStatusStage
} = useProduction()
//Para buscar os itens certos
typeSector.value = 7

const { notifyToast } = useToast()
useSidebar() // instancia a composables para o mounted nela fazer efeito

//active class steps
const { stageType } = storeToRefs(useProductionStageStore())
stageType.value = 5

const logisticAll = ref<{ id_logis: number; name_logis: string }[]>([])

const closeModal = (evt: Event | null): void => {
  // Seleciona o conteúdo do modal com a tipagem correta
  const modalContent: HTMLElement | null = document.querySelector('#mdContent')

  // Verifica se o evento é válido e se o target é um HTMLElement
  if (evt && evt.target instanceof HTMLElement) {
    // Define o parent com a tipagem correta de HTMLElement ou null
    const parent: HTMLElement | null = evt.target.offsetParent as HTMLElement | null

    // Se o parent e o offsetParent existirem, remove a classe 'activeModal'
    if (parent && parent.offsetParent instanceof HTMLElement) {
      parent.offsetParent.classList.remove('activeModal')
    }
  } else {
    // Se o evento for nulo, remove a classe do modal selecionado
    modalContent?.classList.remove('activeModal')
  }

  // Remove o estilo inline do body, caso exista
  const body: HTMLBodyElement | null = document.querySelector('body')
  body?.removeAttribute('style')
}

const newSector = (value: IStageProduction) => {
  const actual = value.sectorActual
  nextSector(value, actual, 5)
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
  getOrcamentoStatusStage(7)
}

onMounted(async () => {
  try {
    const { data } = await getLogistic()
    logisticAll.value = data
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

.activeModal {
  display: flex;
}
</style>
