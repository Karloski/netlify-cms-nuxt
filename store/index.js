import Vue from 'vue'
import { getContent } from '../common/util'

// Initial State
export const appState = {
  projects: []
}

export const mutations = {
  SET_PROJECTS: (state, payload) => {
    Vue.set(state, 'projects', payload)
  }
}

export const actions = {
  async GET_PROJECTS ({ commit }) {
    const context = await require.context('@/assets/content/pages/projects/', false, /\.json$/)
    const posts = await getContent({ context, path: 'assets/content/pages/projects' })
    commit('SET_PROJECTS', posts)
  },

  async nuxtServerInit ({ dispatch }) {
    await Promise.all([dispatch('GET_PROJECTS')])
  }
}

export const state = () => ({
  ...appState
})

export const strict = false
