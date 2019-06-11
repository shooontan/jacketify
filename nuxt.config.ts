import NuxtConfiguration from '@nuxt/config'
// import pkg from './package'

const config: NuxtConfiguration = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    // title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      // { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios'],
  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: 'https://api.jacketify.mahoroi.com/v1/'
  }
}

export default config
