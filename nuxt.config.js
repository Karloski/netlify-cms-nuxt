import fs from 'fs'
import path from 'path'

const projects = fs.readdirSync(path.join(__dirname, '/assets/content/pages/projects'))

let proxy = {}

if ('NETLIFY_DEV' in process.env) {
  proxy = {
    '/api/': { target: 'http://localhost:8888', pathRewrite: { '^/api/(.*)': '/.netlify/functions/$1' } }
  }
}

if ('NODE_ENV' in process.env && process.env.NODE_ENV === 'development') {
  proxy = {
    '/.netlify/functions': { target: 'http://localhost:8888', pathRewrite: { '^/.netlify/functions': '/' } },
    '/api/': { target: 'http://localhost:8888', pathRewrite: { '^/api/(.*)': '/.netlify/functions/$1' } }
  }
}

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
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
    '@/plugins/carousel',
    '@/plugins/singulariseFilter',
    '@/plugins/tooltip'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    // '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    // '@nuxtjs/dotenv',
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
    proxy: true
  },
  proxy,
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
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
