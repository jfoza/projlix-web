/* eslint-disable no-shadow */
import { getAllProjects, showProjectId } from '@/views/pages/projects/api/projects'

const state = {
  showModalForm: false,

  mode: '',

  loading: false,

  projects: [],

  project: {
    id: '',
    name: '',
    description: '',
  },
}

const mutations = {
  setProject(state, project) {
    const { id, name, description } = project

    state.project = {
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

    state.project = {
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
        commit('setProject', response.data)
      })

    commit('setLoading', false)
  },
}

const getters = {
  getProjects: state => state.projects,
  getProject: state => state.project,
  getShowModalForm: state => state.showModalForm,
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
