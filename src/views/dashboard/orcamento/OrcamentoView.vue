<template>
  <div
    class="mdk-drawer-layout__content page-content"
    style="transform: translate3d(0px, 0px, 0px)"
  >
    <header-layout />

    <div class="pt-32pt">
      <div
        class="container container-xl page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left"
      >
        <div class="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
          <div class="mb-24pt mb-sm-0 mr-sm-24pt">
            <h2 class="mb-0">Orçamento 1/3</h2>

            <ol class="breadcrumb p-0 m-0">
              <li class="breadcrumb-item"><a href="#">Vender</a></li>

              <li class="breadcrumb-item active">Definir Cliente</li>
            </ol>
          </div>
        </div>

        <div class="row" role="tablist">
          <div class="col-auto">
            <button type="button" class="btn btn-primary">
              <i class="material-icons sidebar-menu-icon sidebar-menu-icon--left">search</i>
              CONSULTAR VALORES PRÉVIOS
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container container-xl page__container">
      <div class="page-section">
        <!-- DEFINIR CLIENTE-->
        <div class="card">
          <div class="card-body">
            <p style="font-size: 11pt; color: grey">
              Defina um cliente ou cadastre um novo cliente.
            </p>

            <div class="table-responsive" data-toggle="lists">
              <Search-Client></Search-Client>

              <table
                class="table mb-0 thead-border-top-0 table-nowrap"
                v-if="clientStore.allClientComputed?.length > 0"
              >
                <thead>
                  <tr>
                    <th style="width: 80px">ID</th>

                    <th style="width: 125px">CLIENTE</th>

                    <th style="width: 150px">WHATSAPP</th>

                    <th style="width: 100px">SALDO</th>

                    <th style="width: 100px">AÇÃO</th>
                  </tr>
                </thead>
                <tbody class="list" id="search">
                  <tr v-for="(value, index) in clientStore.allClientComputed" :key="index">
                    <td>
                      <p>#{{ value.cli_id }}</p>
                    </td>

                    <td>
                      <div class="d-flex flex-column">
                        <p class="mb-0">
                          <strong class="js-lists-values-employee-name">{{
                            value.cli_nome
                          }}</strong>
                        </p>
                        <small class="js-lists-values-employee-email text-50">{{
                          value.cli_nome_fantasia
                        }}</small>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex align-items-center">
                        <p>{{ value.cli_whatsapp }}</p>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex flex-column align-items-center">
                        <p class="mb-0 text-70">
                          <span
                            :style="
                              value.carteira_one1_cliente?.cart_valor === undefined ||
                              value.carteira_one1_cliente?.cart_valor < 0
                                ? 'color:red;'
                                : 'color:#538628;'
                            "
                          >
                            {{
                              value.carteira_one1_cliente?.cart_valor !== undefined
                                ? value.carteira_one1_cliente?.cart_valor < 0
                                  ? fnMinusSignValue(
                                      real.formatToParts(value.carteira_one1_cliente?.cart_valor)
                                    )
                                  : real.format(value.carteira_one1_cliente?.cart_valor)
                                : ' - '
                            }}
                          </span>
                        </p>
                        <ButtonToolTip
                          @click.prevent="openCreateBalance(value)"
                          :content="'Add. Saldo'"
                          type="submit"
                          :class="'btn-primary btn-sm'"
                          :button-options="{
                            tooltip: 'Adicionar saldo na carteiro one',
                            icon: 'fas fa-qrcode'
                          }"
                        ></ButtonToolTip>
                      </div>
                    </td>

                    <td>
                      <button
                        type="button"
                        class="btn btn-success"
                        @click="
                          router.push({
                            name: 'orçamento cliente etapa 2',
                            params: { id: value.cli_id }
                          })
                        "
                      >
                        Selecionar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <span
                v-else
                class="d-flex justify-content-center"
                style="font-size: 18px; margin: 0.5rem; font-weight: 400"
                >Não há clientes cadastrados
              </span>
            </div>

            <hr />

            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="buttonCheck = !buttonCheck"
            >
              <i class="material-icons icon--left">person_add</i>
              Cadastrar Novo Cliente
            </button>
          </div>
        </div>

        <Create-Client v-if="buttonCheck"></Create-Client>

        <ModalContent>
          <CreateCarteiraOne
            :key="component"
            @closeModal="closeModal"
            :cliente="clientEdit"
          ></CreateCarteiraOne>
        </ModalContent>
      </div>
    </div>

    <footer-layout></footer-layout>
  </div>
</template>

<script setup lang="ts">
import headerLayout from '@/layout/header/Header-layout.vue'
import footerLayout from '@/layout/Footer-layout.vue'
import CreateClient from '@/components/form/CreateClient.vue'
import SearchClient from '@/components/client/SearchClient.vue'
import ModalContent from '@/components/modal-content/Modal-content.vue'
import CreateCarteiraOne from '@/components/form/CreateCarteiraOne.vue'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useToast } from '@/composables/Toast'
import { useClientStore } from '@/stores/ClientStore'
import { useRouter } from 'vue-router'
import { useSidebar } from '@/composables/Sidebar'
import { useDomStore } from '@/stores/DomStore'
import { storeToRefs } from 'pinia'
import ButtonToolTip from '@/components/one-print/ButtonToolTip.vue'
import type { IClient, IClientAll, IError } from '@/model/Index'
import { fnMinusSignValue } from '@/util/Util'

//hooks
const { notifyToast } = useToast()
//const { sidebar } = useSidebar()
const router = useRouter()
const { sidebarDom } = storeToRefs(useDomStore())
const { removeActiveInOtherPage } = useSidebar()

const clientStore = useClientStore()

//variable comum
const limit = ref(10)
const component = ref(0)
const clientEdit = ref<IClient>()
const buttonCheck = ref<boolean>(false)

let real = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

const closeModal = (evt: Event) => {
  if (evt !== undefined && evt.target instanceof HTMLElement) {
    const parent = evt.target.offsetParent as HTMLElement | null
    if (parent && parent.offsetParent) {
      parent.offsetParent.classList.remove('active')
    }
  }
  document.querySelector('body')?.removeAttribute('style')
  clientEdit.value = {} as IClient

  component.value += 1
}

const openCreateBalance = (value: IClientAll) => {
  window.scrollTo(0, 0)
  document.querySelector('#mdContent')?.classList.add('active')
  document.querySelector('body')?.setAttribute('style', 'overflow: hidden; height: auto')
  clientEdit.value = value
}

onMounted(async () => {
  try {
    await clientStore.getAllClientLimit(limit.value, 0)
  } catch (er: unknown) {
    const error = er as IError
    if (error.response === undefined) {
      notifyToast({ msg: 'Erro interno na tentativa do login', typeToast: 'error' })
      return
    }
  }

  removeActiveInOtherPage(sidebarDom.value)
})

onBeforeMount(() => {
  removeActiveInOtherPage(sidebarDom.value)
  if (window.history.state.replaced) {
    useDomStore().$reset()
    useDomStore().$hydrate()
    let dom2 = []
    sidebarDom.value.forEach((el: unknown) => {
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
.container-xl {
  max-width: 1280px;
}
</style>
