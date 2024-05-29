/* eslint-disable no-shadow */

import { getAllIcons } from '@/views/pages/icons/api'

const state = {
  icons: [],

  loading: true,

  selectedIcon: { id: '' },
}

const mutations = {
  setIcons(state, icons) {
    state.icons = icons
  },

  setSelectedIcon(state, selectedIcon) {
    state.selectedIcon = selectedIcon
  },

  setLoading(state, loading) {
    state.loading = loading
  },

  clearSelectedIcon(state) {
    state.selectedIcon = { id: '' }
  },
}

const actions = {
  async findAll({ commit }) {
    commit('setLoading', true)

    await getAllIcons()
      .then(response => {
        commit('setIcons', response.data)
      })

    commit('setLoading', false)
  },
}

const getters = {
  getIcons: state => state.icons,
  getLoading: state => state.loading,
  getSelectedIcon: state => state.selectedIcon,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
