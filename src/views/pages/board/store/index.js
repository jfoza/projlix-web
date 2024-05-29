/* eslint-disable no-shadow */

import { getAllSectionsByProject, getSectionId } from '@/views/pages/sections/api'

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
    id: '',
  },
}

const mutations = {
  setSections(state, sections) {
    state.sections = sections
  },

  setFormMode(state, mode) {
    state.formMode = mode
  },

  setSectionFormData(state, sectionFormData) {
    const {
      id, name, icon, color, project,
    } = sectionFormData

    state.sectionFormData = {
      id, name, icon, color, project,
    }
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
      id: '',
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

  async findOne({ commit }, id) {
    commit('setLoadingBoardPage', true)

    await getSectionId(id)
      .then(response => {
        commit('setSectionFormData', response.data)
      })

    commit('setLoadingBoardPage', false)
  },

  async findAllSectionsAndClearForm({ commit, dispatch }, params) {
    commit('clear')
    commit('setShowSectionModalForm', false)

    await dispatch('findAll', params)
  },
}

const getters = {
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
