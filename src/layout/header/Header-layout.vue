<template>
  <div
    class="navbar navbar-expand pr-0 navbar-light border-bottom-2"
    id="default-navbar"
    data-primary=""
  >
    <!-- Navbar Toggler -->

    <button
      class="navbar-toggler w-auto mr-16pt d-block d-lg-none rounded-0"
      type="button"
      data-toggle="sidebar"
    >
      <span class="material-icons">short_text</span>
    </button>

    <a href="index.html" class="navbar-brand mr-16pt d-lg-none">
      <span class="navbar-brand-icon mr-0 mr-lg-8pt">
        <span class="avatar-title rounded bg-primary">
          <img src="/public/img/one1print/logo_branca.svg" alt="logo" class="img-fluid"
        /></span>
      </span>

      <span class="d-none d-lg-block">ONE1PRINT</span>
    </a>

    <form class="search-form navbar-search d-none d-md-flex mr-16pt" action="index.html">
      <input type="text" class="form-control" placeholder="Buscar ..." />
      <button class="btn" type="submit">
        <i class="material-icons">search</i>
      </button>
    </form>

    <div class="flex"></div>

    <!-- Navbar Menu -->

    <div class="nav navbar-nav flex-nowrap d-flex mr-16pt">
      <!-- Notifications dropdown -->
      <div
        class="nav-item dropdown dropdown-notifications dropdown-xs-down-full"
        data-toggle="tooltip"
        data-title="Menssagens"
        data-placement="bottom"
        data-boundary="window"
        data-original-title=""
        title=""
      >
        <button
          class="nav-link btn-flush dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          data-caret="false"
        >
          <i class="material-icons icon-24pt">mail_outline</i>
        </button>
        <div class="dropdown-menu dropdown-menu-right">
          <div data-perfect-scrollbar="" class="position-relative ps">
            <div class="dropdown-header">
              <strong>Menssagens</strong>
            </div>
            <div class="list-group list-group-flush mb-0">
              <a href="javascript:void(0);" class="list-group-item list-group-item-action unread">
                <span class="d-flex align-items-center mb-1">
                  <small class="text-black-50">Há 5 minutos..</small>

                  <span class="ml-auto unread-indicator bg-accent"></span>
                </span>
                <span class="d-flex">
                  <span class="avatar avatar-xs mr-2">
                    <img
                      src="/public/img/people/110/woman-5.jpg"
                      alt="people"
                      class="avatar-img rounded-circle"
                    />
                  </span>
                  <span class="flex d-flex flex-column">
                    <strong class="text-black-100">Pregrino Jackson</strong>
                    <span class="text-black-70">Cara, cadê meu pau???</span>
                  </span>
                </span>
              </a>

              <a href="javascript:void(0);" class="list-group-item list-group-item-action">
                <span class="d-flex align-items-center mb-1">
                  <small class="text-black-50">Há 6 minutos..</small>
                </span>
                <span class="d-flex">
                  <span class="avatar avatar-xs mr-2">
                    <img
                      src="/public/img/people/110/woman-5.jpg"
                      alt="people"
                      class="avatar-img rounded-circle"
                    />
                  </span>
                  <span class="flex d-flex flex-column">
                    <strong class="text-black-100">Pregrino Jack</strong>
                    <span class="text-black-70 text-truncate" style="width: 40%"
                      >🔥 Vou olhar no outro perfil e te falo mais sobre nossa experiência louca e
                      maluca.</span
                    >
                  </span>
                </span>
              </a>
            </div>
            <div class="ps__rail-x" style="left: 0px; bottom: 0px">
              <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px"></div>
            </div>
            <div class="ps__rail-y" style="top: 0px; right: 0px">
              <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- // END Notifications dropdown -->

      <!-- Notifications dropdown -->
      <div
        class="nav-item ml-16pt dropdown dropdown-notifications dropdown-xs-down-full"
        data-toggle="tooltip"
        data-title="Notifications"
        data-placement="bottom"
        data-boundary="window"
        data-original-title=""
        title=""
      >
        <button
          class="nav-link btn-flush dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          data-caret="false"
        >
          <i class="material-icons">notifications_none</i>
          <span class="badge badge-notifications badge-accent">2</span>
        </button>
        <div class="dropdown-menu dropdown-menu-right">
          <div data-perfect-scrollbar="" class="position-relative ps">
            <div class="dropdown-header">
              <strong>System notifications</strong>
            </div>
            <div class="list-group list-group-flush mb-0">
              <a href="javascript:void(0);" class="list-group-item list-group-item-action unread">
                <span class="d-flex align-items-center mb-1">
                  <small class="text-black-50">3 minutes ago</small>

                  <span class="ml-auto unread-indicator bg-accent"></span>
                </span>
                <span class="d-flex">
                  <span class="avatar avatar-xs mr-2">
                    <span class="avatar-title rounded-circle bg-light">
                      <i class="material-icons font-size-16pt text-accent">account_circle</i>
                    </span>
                  </span>
                  <span class="flex d-flex flex-column">
                    <span class="text-black-70"
                      >Your profile information has not been synced correctly.</span
                    >
                  </span>
                </span>
              </a>

              <a href="javascript:void(0);" class="list-group-item list-group-item-action">
                <span class="d-flex align-items-center mb-1">
                  <small class="text-black-50">5 hours ago</small>
                </span>
                <span class="d-flex">
                  <span class="avatar avatar-xs mr-2">
                    <span class="avatar-title rounded-circle bg-light">
                      <i class="material-icons font-size-16pt text-primary">group_add</i>
                    </span>
                  </span>
                  <span class="flex d-flex flex-column">
                    <strong class="text-black-100">Adrian. D</strong>
                    <span class="text-black-70">Wants to join your private group.</span>
                  </span>
                </span>
              </a>

              <a href="javascript:void(0);" class="list-group-item list-group-item-action">
                <span class="d-flex align-items-center mb-1">
                  <small class="text-black-50">1 day ago</small>
                </span>
                <span class="d-flex">
                  <span class="avatar avatar-xs mr-2">
                    <span class="avatar-title rounded-circle bg-light">
                      <i class="material-icons font-size-16pt text-warning">storage</i>
                    </span>
                  </span>
                  <span class="flex d-flex flex-column">
                    <span class="text-black-70">Your deploy was successful.</span>
                  </span>
                </span>
              </a>
            </div>
            <div class="ps__rail-x" style="left: 0px; bottom: 0px">
              <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px"></div>
            </div>
            <div class="ps__rail-y" style="top: 0px; right: 0px">
              <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- // END Notifications dropdown -->

      <div class="nav-item dropdown">
        <a
          href="#"
          class="nav-link d-flex align-items-center dropdown-toggle"
          data-toggle="dropdown"
          data-caret="false"
        >
          <span class="avatar avatar-sm mr-8pt2">
            <span class="avatar-title rounded-circle bg-primary"
              ><i class="material-icons">account_box</i></span
            >
          </span>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <div class="dropdown-header"><strong>Account</strong></div>
          <a class="dropdown-item" href="">Edit Account</a>
          <!-- <a class="dropdown-item" href="billing.html">Billing</a>
                    <a class="dropdown-item" href="billing-history.html">Payments</a> -->
          <a class="dropdown-item" @click.prevent="fnLogout" href="">Logout</a>
        </div>
      </div>
    </div>

    <!-- // END Navbar Menu -->
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import { useLoginStore } from '@/stores/LoginStore'
import { useGlobalProduct } from '@/stores/GlobalProductStore'
import { useProductStore } from '@/stores/ProductStore'
import { useStepStore } from '@/stores/StepsForm'

const router = useRouter()
const clientStore = useClientStore()
const loginStore = useLoginStore()
const modeloStore = useGlobalProduct()
const productStore = useProductStore()
const stepStore = useStepStore()
const fnLogout = () => {
  loginStore.$reset()
  loginStore.loginReset()
  clientStore.$reset()
  clientStore.logoutClient()
  modeloStore.$reset()
  productStore.$reset()
  stepStore.$reset()
  setTimeout(() => {
    router.push({ name: 'home' })
  }, 300)
}
</script>

<style scoped></style>
