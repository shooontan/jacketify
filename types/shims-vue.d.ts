declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue/types/vue' {
  import VueRouter from 'vue-router'

  interface Vue {
    $router: VueRouter
  }
}
