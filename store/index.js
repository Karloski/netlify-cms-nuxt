
import Vue from 'vue'
import { getContent } from '../common/util'

// Initial State
export const appState = {
  projects: [],
  structure: [],
  skills: {},
  social: []
}

export const getters = {
  GET_SKILL: state => (skill) => {
    return state.skills.find(s => s.name === skill)
  },
  GET_SKILLS: (state) => {
    return state.skills
  },
  GET_SOCIAL: (state) => {
    return state.social
  }
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
  },
  SET_SKILLS: (state, payload) => {
    Vue.set(state, 'skills', payload)
  },
  SET_SOCIAL: (state, payload) => {
    Vue.set(state, 'social', payload)
  }
}

export const actions = {
  async LOAD_PROJECTS ({ commit }) {
    const context = await require.context('@/assets/content/pages/projects/', false, /\.json$/)
    const posts = await getContent({ context, path: 'assets/content/pages/projects' })
    commit('SET_PROJECTS', posts)
  },
  async LOAD_SKILLS ({ commit }) {
    const context = await require('@/assets/content/pages/about/skills.json')
    commit('SET_SKILLS', context.skills)
  },
  async LOAD_SOCIAL ({ commit }) {
    const context = await require('@/assets/content/settings/social.json')
    commit('SET_SOCIAL', context.icons)
  },
  LOAD_STRUCTURE ({ commit }) {
    commit('SET_STRUCTURE', {
      projects: {},
      about: {
        profile: {},
        skills: {},
        contact: {}
      }
    })
  },
  async nuxtServerInit ({ dispatch }) {
    await Promise.all([
      dispatch('LOAD_PROJECTS'), 
      dispatch('LOAD_SKILLS'), 
      dispatch('LOAD_STRUCTURE'),
      dispatch('LOAD_SOCIAL')
    ])
  }
}

export const state = () => ({
  ...appState
})

export const strict = false
