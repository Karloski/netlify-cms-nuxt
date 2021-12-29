import fs from 'fs'
import path from 'path'

const projects = fs.readdirSync(path.join(__dirname, '/assets/content/pages/projects'))
const settings = require(path.join(__dirname, '/assets/content/settings/general.json'))

export default {
  /*
  ** Headers of the page
  */
  target: 'static',
  head: {
    title: settings.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/jpg', href: settings.icon }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: settings.loadingColor },
  /*
  ** Global CSS
  */
  css: [
    'github-markdown-css',
    'animate.css',
    '@/assets/css/sass/app.scss'
  ],
  generate: {
    routes: [
      ...projects.reduce((p, c) => {
        p.push(`/projects/${/([\w-]+).json/.exec(c)[1]}`)

        return p
      }, [])
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/animateCss',
    { src: '@/plugins/carousel', mode: 'client' },
    '@/plugins/filters',
    '@/plugins/tooltip'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    injected: true
  },
  fontawesome: {
    icons: {
      solid: ['faChevronRight', 'faChevronLeft', 'faSpinner']
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    }
  },
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        path: '/about',
        redirect: '/about/profile'
      })
    }
  }
}
