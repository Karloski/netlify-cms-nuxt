import Vue from 'vue'
import { getContent } from '../common/util'

// Initial State
export const appState = {
  projects: [],
  posts: []
}

export const mutations = {
  SET_PROJECTS: (state, payload) => {
    Vue.set(state, 'projects', payload)
  },
  SET_POSTS: (state, payload) => {
    Vue.set(state, 'posts', payload)
  }
}

export const actions = {
  async GET_PROJECTS ({ commit }) {
    const context = await require.context('@/assets/content/pages/projects/', false, /\.json$/)
    const posts = await getContent({ context, path: 'assets/content/pages/projects' })
    commit('SET_PROJECTS', posts)
  },
  async GET_POSTS ({ commit }) {
    const context = await require.context('@/assets/content/blog/', false, /\.json$/)
    const posts = await getContent({ context, path: 'assets/content/blog' })
    commit('SET_POSTS', posts)
  },
  async nuxtServerInit ({ dispatch }) {
    await Promise.all([dispatch('GET_PROJECTS'), dispatch('GET_POSTS')])
  }
}

export const state = () => ({
  ...appState
})

export const strict = false
