/* eslint-disable no-shadow */
import { getAllProjects, showProjectId } from '@/views/pages/projects/api'

const state = {
  showModalForm: false,

  mode: '',

  loading: false,

  projects: [],

  formData: {
    id: '',
    name: '',
    description: '',
  },

  chooseProjectInNavbar: {
    id: '',
    name: '',
    uniqueName: '',
    description: '',
  },
}

const mutations = {
  setChooseProjectInNavbar(state, project) {
    const {
      id,
      name,
      uniqueName,
      description,
    } = project

    state.chooseProjectInNavbar = {
      id,
      name,
      uniqueName,
      description,
    }
  },

  setFormData(state, project) {
    const { id, name, description } = project

    state.formData = {
      id,
      name,
      description,
    }
  },

  setShowModalForm(state, showModalForm) {
    state.showModalForm = showModalForm
  },

  setLoading(state, loading) {
    state.loading = loading
  },

  setMode(state, mode) {
    state.mode = mode
  },

  setProjects(state, projects) {
    state.projects = projects
  },

  clear(state) {
    state.showModalForm = false

    state.formData = {
      id: '',
      name: '',
      description: '',
    }
  },
}

const actions = {
  async findAll({ commit }, params) {
    commit('setLoading', true)

    await getAllProjects(params)
      .then(response => {
        commit('setProjects', response.data)
      })

    commit('setLoading', false)
  },

  async findOne({ commit }, id) {
    commit('setLoading', true)

    await showProjectId(id)
      .then(response => {
        commit('setFormData', response.data)
      })

    commit('setLoading', false)
  },
}

const getters = {
  getProjects: state => state.projects,
  getChooseProjectInNavbar: state => state.chooseProjectInNavbar,
  getFormData: state => state.formData,
  getLoading: state => state.loading,
  getMode: state => state.mode,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
