/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<unknown, unknown, unknown>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API: string
  readonly BASE_URL: string
  readonly VUE_APP_API_BASE: string
  // more env variables...
}
