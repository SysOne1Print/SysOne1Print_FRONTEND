//import 'primeflex/primeflex.css'
import 'primevue/resources/themes/aura-light-green/theme.css'


import './assets/css/app.css'
import './assets/css/all.min.css'
import './assets/js/preloader.js'
import './assets/css/main.scss'
import 'vue3-toastify/dist/index.css'
import './assets/css/modal.scss'
import './assets/css/global-ONE.scss'
import './assets/css/financeiro.scss'
import './assets/css/material-icons.css'
import './assets/css/global-ONE_gr.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify'
import resetStore from '@/plugins/Reset-store'
import { createHead } from '@unhead/vue'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import InputNumber from 'primevue/inputnumber'
import money from 'v-money3'
import App from './App.vue'
import router from './router/Index'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Card from 'primevue/card'
import Skeleton from 'primevue/skeleton'
import Editor from 'primevue/editor'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon'
import IconField from 'primevue/iconfield'
import FloatLabel from 'primevue/floatlabel'
import Calendar from 'primevue/calendar'
import Toolbar from 'primevue/toolbar'


const pinia = createPinia()
pinia.use(resetStore)
pinia.use(piniaPluginPersistedstate)
const head = createHead()

createApp(App)
  .use(head)
  .use(money)
  .use(pinia)
  .use(router)
  .use(PrimeVue)
  .component('Calendar', Calendar)
  .component('DataTable', DataTable)
  .component('Column', Column)
  .component('InputNumber', InputNumber)
  .component('Card', Card)
  .component('Skeleton', Skeleton)
  .component('Editor', Editor)
  .component('InputText', InputText)
  .component('InputIcon', InputIcon)
  .component('IconField', IconField)
  .component('ButtonPrime', Button)
  .component('FloatLabel', FloatLabel)
  .component('Toolbar', Toolbar)

  .use(Vue3Toasity, {
    autoClose: 1000
  } as ToastContainerOptions)
  .directive('tooltip', Tooltip)
  .mount('#app')
