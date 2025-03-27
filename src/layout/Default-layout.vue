<template>
  <router-view></router-view>
  <div
    class="mdk-drawer js-mdk-drawer layout-compact__drawer"
    id="default-drawer"
    data-align="start"
    data-position="left"
    data-domfactory-upgraded="mdk-drawer"
    data-persistent=""
    data-opened
  >
    <div class="mdk-drawer__scrim" style=""></div>
    <div
      class="mdk-drawer__content js-sidebar-mini"
      data-responsive-width="992px"
      data-layout="compact"
      style=""
      data-domfactory-upgraded="sidebar-mini"
      data-opened
    >
      <div
        class="sidebar sidebar-mini sidebar-dark-pickled-bluewood sidebar-left d-flex flex-column"
      >
        <!-- Brand -->
        <a href="/" class="sidebar-brand p-0 navbar-height d-flex justify-content-center">
          <span
            class="avatar avatar-sm"
            style="width: 80px; height: 60px; background-color: transparent"
          >
            <span class="avatar-title rounded" style="background-color: transparent !important">
              <img
                src="/public/img/one1print/logo_branca.svg"
                class="img-fluid testinho"
                alt="logo"
            /></span>
          </span>
        </a>

        <div class="flex d-flex flex-column justify-content-start ps" data-perfect-scrollbar="">
          <ul
            class="nav flex-shrink-0 flex-nowrap flex-column sidebar-menu mb-0 sm-item-bordered js-sidebar-mini-tabs"
            role="tablist"
          >
            <li
              ref="sidebarDom"
              class="sidebar-menu-item"
              v-for="(value, index) in sidebarComputed"
              :key="index"
              @click.prevent="secondSidebar(index, 0, value.route)"
            >
              <router-link
                class="sidebar-menu-button"
                :to="{ path: value.route }"
                v-if="
                  value.route === '/vendedor' ||
                  value.route === '/finance' ||
                  value.route === '/production' ||
                  value.route === '/admin' ||
                  value.route === '/operator'
                "
              >
                <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">{{
                  value.icon
                }}</i>
                <span class="sidebar-menu-text">{{ value.nome }}</span>
              </router-link>

              <a href="/" class="sidebar-menu-button" style="cursor: pointer" v-else>
                <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">{{
                  value.icon
                }}</i>
                <span class="sidebar-menu-text">{{ value.nome }}</span>
              </a>
            </li>
          </ul>
          <div class="ps__rail-x" style="left: 0px; bottom: 0px">
            <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px"></div>
          </div>
          <div class="ps__rail-y" style="top: 0px; right: 0px">
            <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px"></div>
          </div>
        </div>

        <ul
          class="nav flex-column sidebar-menu align-items-center mb-12pt js-sidebar-mini-tabs"
          role="tablist"
        >
          <li class="sidebar-account" style="width: 40px">
            <a
              href="#sm_account_1"
              class="p-4pt d-flex align-items-center justify-content-center"
              data-toggle="tab"
              role="tab"
              aria-controls="sm_account_1"
              aria-selected="true"
            >
              <img
                width="32"
                height="32"
                class="rounded-circle"
                src="/public/img/people/50/guy-3.jpg"
                alt="account"
              />
            </a>
          </li>
        </ul>
      </div>
      <div
        class="sidebar sidebar-light sidebar-left flex sidebar-secondary pt-16pt ps"
        data-perfect-scrollbar=""
      >
        <div class="tab-content">
          <!--:sidebar="sidebar"-->
          <SideBarTabSubmenu
            @change-sidebar="secondSidebar"
            :index="sidebarSelection?.index"
            :title="sidebarSelection?.titulo"
            :routes="sidebarSelection?.sub_route"
          >
          </SideBarTabSubmenu>
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
</template>

<script setup lang="ts">
import { onMounted, onUpdated } from 'vue'
//import producaoMenu from '@/layout/side-bar-menu/producao-menu.vue'
import SideBarTabSubmenu from './side-bar-menu/Side-bar-tab-submenu.vue'
import { useSidebar } from '@/composables/Sidebar'
import { useDomStore } from '@/stores/DomStore'
import { storeToRefs } from 'pinia'

const {
  activeSecondSidebar,
  sidebarComputed,
  sidebarSelection,
  sidebar,
  addClassElemenBeforeReload
} = useSidebar()
const { addSidebar } = useDomStore()
const { sidebarDom } = storeToRefs(useDomStore())
let bodyHasOpened = document.querySelector('body')

const secondSidebar = (index: number, i?: number, path?: string) => {
  // função que desativa a sidebar e adiciona e remove as classes
  if (
    path === '/vendedor' ||
    path === '/finance' ||
    path === '/production' ||
    path === '/admin' ||
    path === '/operator'
  ) {
    path = ''
  }
  sessionStorage.setItem('pathMenu', path !== undefined ? path : '')
  activeSecondSidebar(index, bodyHasOpened, path)
}

onMounted(() => {
  let bodyHasOpened = document.querySelector('body')
  bodyHasOpened?.classList.remove(...['login-form', 'text-center'])
  bodyHasOpened?.classList.add('has-drawer-opened')
  addSidebar(sidebarDom.value)
  sidebar.value = sidebarDom.value
})

onUpdated(() => {
  if (window.history.length >= 3 && window.history.state.replaced) {
    addSidebar(sidebarDom.value)
    addClassElemenBeforeReload()
  }
})
</script>

<style scoped lang="scss">
.js-sidebar-mini-tabs {
  > .sidebar-menu-item {
    > .active {
      color: white !important;

      > .sidebar-menu-icon {
        color: white !important;
      }
    }
  }
}
</style>
