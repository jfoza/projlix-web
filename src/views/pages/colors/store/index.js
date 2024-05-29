/* eslint-disable no-shadow */

import { getAllColors } from '@/views/pages/colors/api'

const state = {
  colors: [],

  loading: true,

  selectedColor: { id: '' },
}

const mutations = {
  setColors(state, colors) {
    state.colors = colors
  },

  setSelectedColor(state, selectedColor) {
    state.selectedColor = selectedColor
  },

  setLoading(state, loading) {
    state.loading = loading
  },

  clearSelectedColor(state) {
    state.selectedColor = { id: '' }
  },
}

const actions = {
  async findAll({ commit }) {
    commit('setLoading', true)

    await getAllColors()
      .then(response => {
        commit('setColors', response.data)
      })

    commit('setLoading', false)
  },
}

const getters = {
  getColors: state => state.colors,
  getLoading: state => state.loading,
  getSelectedColor: state => state.selectedColor,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
