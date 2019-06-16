declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue/types/vue' {
  import VueRouter from 'vue-router'
  import { NuxtAxiosInstance } from '@nuxtjs/axios'

  interface Vue {
    $router: VueRouter
    $axios: NuxtAxiosInstance
  }
}
