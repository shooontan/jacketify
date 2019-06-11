import Vue from 'vue'
import VueRouter from 'vue-router'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

declare module '*.vue' {
  const _default: Vue
  export default _default
}

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
    $axios: NuxtAxiosInstance
  }
}
