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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      // {
      //   src: `https://polyfill.io/v3/polyfill.min.js?features=${[
      //     'IntersectionObserver',
      //     'Map',
      //     'Set'
      //   ].join('%2C')}`,
      //   type: 'text/javascript'
      // }
    ]
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
   ** modules
   */
  modules: [],

  build: {
    extend(config) {
      if (config.module) {
        config.module.rules.unshift({
          test: /ky.*?\.js$/i, // transpile for ky
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        node: 'current',
                        edge: 17
                      }
                    }
                  ]
                ]
              }
            }
          ]
        })
      }
    }
  }
}

export default config
