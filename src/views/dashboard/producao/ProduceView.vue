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
            <h2 class="mb-0">Produção</h2>

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
                  <TableHeaderProducts
                    :typeHeader="true"
                    :descri="'Ordernar por TIPO de Trabalho'"
                    :orcamentoStatus="newCategoria"
                  ></TableHeaderProducts>

                  <Alert></Alert>

                  <TableListProduce
                    :orcamento="computedArray"
                    :orcamento-variado="newOrcVariado"
                    @config-machine="openModalConfig"
                    @open-modal="openModal"
                    @back-budget-byId="backBudgetById"
                    @next-sector-budget="nextSectors"
                    @close-modal="closeModal"
                    @init-process="initProcessQueue"
                    @work-return-printer="printerReturnWork"
                    @open-modal-details="openModalDetails"
                  >
                  </TableListProduce>

                  <ModalOpenPrinter
                    v-if="checkPrime"
                    @stopped-order="stoppedEvent"
                    @budget-order="initProcessQueue"
                    :allCategoriaPrinter="allPrinter"
                    :orderId="orderIds"
                    :new-orc="orcJoint"
                    :array-modo-variado="newOrcVariado"
                    @close-modal="closeModal"
                  ></ModalOpenPrinter>

                  <ModelProducer
                    :description-production="production_stage_producation"
                    :productionStage="selectItemOrc"
                    @fnClose="closeModal"
                  ></ModelProducer>

                  <ModalConfigMachine
                    :total-mode-variado="newOrcVariado.length"
                    @close-modal="closeModal"
                    :allCategoriaPrinter="allPrinter"
                    :orderId="selectOrcamento"
                  >
                  </ModalConfigMachine>
                </div>

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
import ProduceHeader from '@/components/production-component/Produce-Header.vue'
import Alert from '@/components/AlertNoty.vue'
import TableHeaderProducts from '@/components/products/Inventory-Product/Table-header-products.vue'
import { useToast } from '@/composables/Toast'
import TableListProduce from '@/components/production-component/TableListProduce.vue'
import ModalOpenPrinter from '@/components/production-component/ModalOpenPrinter.vue'
import ModalConfigMachine from '@/components/production-component/ModalConfigMachine.vue'
import { getOrcamentoItensStatusStageProduction, getPrinter } from '@/api/actions/Production'
import { computed, onMounted, ref } from 'vue'
import { useProduction } from '@/composables/UseProduction'
import type {
  ICategoria,
  IError,
  IOrcamentoItensTablePedidoStatus,
  IOrcamentoProductionStage,
  IOrcamentoStage,
  IOrcamentoVariedStage2
} from '@/model/Index'
import { useLoginStore } from '@/stores/LoginStore'
import { useSwal } from '@/composables/Swal'
import ModelProducer from '@/components/modal-content/Modal-finance.vue'
import { production_stage_producation } from '@/util/TableInfo'
import { useSidebar } from '@/composables/Sidebar'
import { getAllCategoria } from '@/api/actions/Categoria'
import { storeToRefs } from 'pinia'
import { useProductionStageStore } from '@/stores/ProductionStageStore'
import Pagination from '@/components/pagination/Pagination.vue'

const { orcamento, computedArray, orcamentoModoVariado } = storeToRefs(useProductionStageStore())

//executando sem variavel pois o OnMOunted dentro tem um comportamente especifico
useSidebar() // instancia a composables para o mounted nela fazer efeito

const {
  newCategoria,
  newOrc,
  newOrcVariado,
  backBudgetById,
  nextSector,
  typeSector,
  categoria,
  updateStatusQueue,
  stoppedEventProduction,
  orderIds,
  initMQTT,
  allPrinter
} = useProduction()
typeSector.value = 5

const { notifyToast } = useToast()

//composables'
//store
const { userData } = useLoginStore()
const { swalConfirmed } = useSwal()

const selectOrcamento = ref<IOrcamentoItensTablePedidoStatus[]>([])
const checkPrime = ref(false)
const selectItemOrc = ref() //ref<IOrcamentoStage>
const limit = ref<number>(10)
const offset = ref<number>(0)
const total = ref<number>(0)
const nextSectorProduction = ref({
  sectorActualProduction: 3,
  sectorNextProduction: 6,
  sectorOrcamento: 3
})

const orcamentoVariadoComput = computed(() => {
  return newOrcVariado.value.flatMap((v) => v.orcamento)
})

const orcJoint = computed(() => {
  return [...computedArray.value, ...orcamentoVariadoComput.value]
}) as unknown as IOrcamentoProductionStage[] // -> remover o unknow pois está meio feio

const openModal = (orderId: number, index: number, oit_id: number, strDisabled: string) => {
  let orc = null
  orc = newOrc.value.find((v) => v.oit_id === oit_id)

  if (orc === undefined) {
    for (const element of newOrcVariado.value) {
      orc = element.orcamento.find((v) => v.oit_id === oit_id)
      console.log('openModal: ', orc)
    }
  }

  if (
    orc?.impressora_log &&
    orc?.impressora_log.length > 0 &&
    orc?.impressora_log[0].action_status === -1
  ) {
    document.querySelector(`#${strDisabled}`)?.setAttribute('disabled', 'disabled')
    alert(
      'Esse itens já está em processo de produção, para retornar a rodar e so clicar no botão de PLAY >>'
    )
    return
  }

  checkPrime.value = true
  orderIds.value.orcId = orderId
  orderIds.value.index = index
  orderIds.value.oit_id = oit_id

  window.scrollTo(0, 0)
  setTimeout(() => {
    document.querySelector('#mdContent')?.classList.add('activeModal')
  }, 100)
}

const changePage = async (value: number) => {
  offset.value = value
  const { data } = await getOrcamentoItensStatusStageProduction({
    limit: limit.value,
    skip: offset.value,
    type: 3,
    type_orc: 3
  })
  orcamento.value = data.comum as IOrcamentoItensTablePedidoStatus[]
}

const openModalDetails = (dado: { orc: IOrcamentoStage; modal: string }) => {
  selectItemOrc.value = dado.orc
  window.scrollTo(0, 0)
  document.querySelector('body')?.setAttribute('style', 'overflow: hidden; height: auto')
  document.querySelector(`#${dado.modal}`)?.classList.add('activeModal')
}

const openModalConfig = (selectItem: Array<number>) => {
  console.log('teste', selectItem)

  if (selectItem.length > 0) {
    for (const i of selectItem) {
      //verificando se os itens selecionados já está rodando no modo variado
      const orcVariado = newOrcVariado.value.find((v) =>
        v.orcamento.find((val) => val.oit_id === i)
      )
      if (orcVariado === undefined) {
        selectOrcamento.value.push(...newOrc.value.filter((val) => val.oit_id === i))
      } else {
        alert(
          'Um ou mais itens que voce selecionou está em modo variado já, desmarque ele para prosseguir!'
        )
        return
      }
    }
    document.querySelector('body')?.setAttribute('style', ' height: auto')
    document.querySelector(`#modalConfigurarMaquinaModoVariado`)?.classList.add('activeModal')
  }
}

const closeModal = (evt: Event, classActive: string = '') => {
  if (evt.target instanceof HTMLElement) {
    const parent = evt.target.offsetParent as HTMLElement | null
    if (parent && parent.offsetParent instanceof HTMLElement) {
      parent.offsetParent.classList.remove(classActive || 'activeModal')
    }
  }

  document.querySelector('body')?.removeAttribute('style')
  selectOrcamento.value = []
  checkPrime.value = false
}

const nextSectors = async (value: {
  orc_id: number
  ost_id: number
  oit_id: number
  user_usucadastro: number
  id_printer_log: number
  sectorActual: number
  stop_orc: boolean
}) => {
  //const nextStatus = 6
  const result = await swalConfirmed({
    title: 'Atenção ao pedido',
    icon: 'info',
    text: 'Você deseja realmente passar esse pedido para o proximo setor!'
  })

  if (result.isConfirmed) {
    //typeSector.value = 8
    await nextSector(
      {
        orc_id: value.orc_id,
        ost_id: value.ost_id,
        user_usucadastro: userData.user_id,
        nextSectorProduction: {
          sectorOrcamento: nextSectorProduction.value.sectorOrcamento,
          sectorProduction: nextSectorProduction.value.sectorActualProduction
        },
        impr_log_id: value.id_printer_log,
        oit_id: value.oit_id,
        stop_orc: true,
        action_status: 2
      },
      nextSectorProduction.value.sectorNextProduction
    )
  }
}

const stoppedEvent = async (dado: {
  printer: string
  printerId_oit_id: number
  printerStr: string
  impr_log_id: number
  action_status: number
}) => {
  await stoppedEventProduction(dado, 3, userData.user_id)

  document.querySelector('body')?.setAttribute('style', 'height: auto')
  document.querySelector('#mdContent')?.classList.toggle('activeModal')
}

const printerReturnWork = async (dado: { printerLogId: number; oit_id: number }) => {
  await updateStatusQueue(
    {
      action_status: 1,
      id_impress: dado.printerLogId,
      impr_status: 'Rodando',
      user_id_change: userData.user_id,
      oit_id: dado.oit_id
    },
    3
  )
}

const initProcessQueue = async (
  dado: { printer: string; printerId: number; id: number; oit_id: number; orc_id?: number },
  statusRetorno: number
) => {
  let dadoUpdate = dado
  console.log('dadoUpdate: ', dadoUpdate)
  await initMQTT(dadoUpdate, statusRetorno)

  await printerGet()
  dadoUpdate.id = 0
  dadoUpdate.orc_id = 0
  dadoUpdate.printer = ''
  dadoUpdate.printerId = 0
}

const printerGet = async () => {
  const { data } = await getPrinter()
  allPrinter.value = data
}

onMounted(async () => {
  try {
    const [stage, allCategoria] = (await Promise.allSettled([
      getOrcamentoItensStatusStageProduction({
        limit: limit.value,
        skip: offset.value,
        type: 3,
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

    await printerGet()
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
