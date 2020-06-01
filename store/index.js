
import Vue from 'vue'
import { getContent } from '../common/util'

// Initial State
export const appState = {
  projects: [],
  posts: [],
  structure: []
}

export const mutations = {
  SET_PROJECTS: (state, payload) => {
    Vue.set(state, 'projects', payload)
  },
  SET_POSTS: (state, payload) => {
    Vue.set(state, 'posts', payload)
  },
  SET_STRUCTURE: (state, payload) => {
    Vue.set(state, 'structure', payload)
  }
}

export const actions = {
  async GET_PROJECTS ({ commit }) {
    const context = await require.context('@/assets/content/pages/projects/', false, /\.json$/)
    const posts = await getContent({ context, path: 'assets/content/pages/projects' })
    commit('SET_PROJECTS', posts)
  },
  async GET_POSTS ({ commit }) {
    // const context = await require.context('@/assets/content/blog/', false, /\.json$/)
    // const posts = await getContent({ context, path: 'assets/content/blog' })
    // commit('SET_POSTS', posts)
  },
  async GET_STRUCTURE ({ commit }) {
    const blog = await require('@/assets/content/settings/blog')

    commit('SET_STRUCTURE', {
      projects: {},
      about: {
        education: {},
        profile: {},
        skills: {}
      },
      blog: {
        latest: {},
        ...blog.categories.reduce((carry, current) => {
          carry[current.name] = {}

          return carry
        }, {})
      }
    })
  },
  async nuxtServerInit ({ dispatch }) {
    await Promise.all([dispatch('GET_PROJECTS'), dispatch('GET_POSTS'), dispatch('GET_STRUCTURE')])
  }
}

export const state = () => ({
  ...appState
})

export const strict = false
