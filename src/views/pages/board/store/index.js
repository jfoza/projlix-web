/* eslint-disable no-shadow */

import { getAllSectionsByProject } from '@/views/pages/sections/api'

const state = {
  showSectionModalForm: false,

  loadingBoardPage: false,

  formMode: 'insert',

  sections: [],

  sectionFormData: {
    project: null,
    color: null,
    icon: null,
    name: '',
  },
}

const mutations = {
  setSections(state, sections) {
    state.sections = sections
  },

  setFormMode(state, mode) {
    state.formMode = mode
  },

  setLoadingBoardPage(state, loadingBoardPage) {
    state.loadingBoardPage = loadingBoardPage
  },

  setShowSectionModalForm(state, showSectionModalForm) {
    state.showSectionModalForm = showSectionModalForm
  },

  clear(state) {
    state.sectionFormData = {
      project: null,
      color: null,
      icon: null,
      name: '',
    }
  },
}

const actions = {
  async findAll({ commit }, params) {
    commit('setLoadingBoardPage', true)

    await getAllSectionsByProject(params)
      .then(response => {
        commit('setSections', response.data)
      })

    commit('setLoadingBoardPage', false)
  },
}

const getters = {
  getSections: state => state.sections,
  getFormMode: state => state.formMode,
  getLoadingBoardPage: state => state.loadingBoardPage,
  getSectionFormData: state => state.sectionFormData,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
