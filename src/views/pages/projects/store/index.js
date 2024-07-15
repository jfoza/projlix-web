/* eslint-disable no-shadow */
import { getAllProjects, showProjectId } from '@/views/pages/projects/api'

const state = {
  showModalFormInsert: false,
  showModalFormUpdate: false,

  mode: '',

  loading: false,
  loadingUpdate: false,

  projects: [],

  formData: {
    id: '',
    name: '',
    uniqueName: '',
    description: '',
    icon: { id: '', name: '' },
    members: [],
    tags: [],
  },

  chooseProjectInNavbar: {
    id: '',
    name: '',
    uniqueName: '',
    description: '',
    icon: { id: '', name: '' },
    members: [],
    tags: [],
  },
}

const mutations = {
  setChooseProjectInNavbar(state, project) {
    const {
      id,
      name,
      unique_name,
      description,
      icon,
      members,
      tags,
    } = project

    state.chooseProjectInNavbar = {
      id,
      name,
      uniqueName: unique_name,
      description,
      icon,
      members,
      tags,
    }
  },

  setFormData(state, project) {
    const {
      id,
      name,
      unique_name,
      description,
      icon,
      members,
      tags,
    } = project

    state.formData = {
      id,
      name,
      uniqueName: unique_name,
      description,
      icon,
      members,
      tags,
    }
  },

  setShowModalFormInsert(state, showModalForm) {
    state.showModalFormInsert = showModalForm
  },

  setShowModalFormUpdate(state, showModalForm) {
    state.showModalFormUpdate = showModalForm
  },

  setLoading(state, loading) {
    state.loading = loading
  },

  setLoadingUpdate(state, loading) {
    state.loadingUpdate = loading
  },

  setProjects(state, projects) {
    state.projects = projects
  },

  setProjectIcon(state, icon) {
    state.formData.icon = icon
  },

  clearProjectInNavbar(state) {
    state.formData = {
      id: '',
      name: '',
      uniqueName: '',
      description: '',
      icon: { id: '', name: '' },
      members: [],
      tags: [],
    }
  },

  clearFormData(state) {
    state.formData = {
      id: '',
      name: '',
      uniqueName: '',
      description: '',
      icon: { id: '', name: '' },
      members: [],
      tags: [],
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
    commit('setLoadingUpdate', true)

    await showProjectId(id)
      .then(response => {
        commit('setFormData', response.data)
      })

    commit('setLoadingUpdate', false)
  },
}

const getters = {
  getProjects: state => state.projects,
  getChooseProjectInNavbar: state => state.chooseProjectInNavbar,
  getFormData: state => state.formData,
  getProjectName: state => state.formData.name,
  getLoading: state => state.loading,
  getLoadingUpdate: state => state.loadingUpdate,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
