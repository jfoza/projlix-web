/* eslint-disable no-shadow */
const state = {
  chooseTeamUser: { id: '' },

  formData: {
    id: '',
    name: '',
    email: '',
    profile: null,
    projects: [],
  },
}

const mutations = {
  setChooseTeamUser(state, chooseTeamUser) {
    state.chooseTeamUser = chooseTeamUser
  },

  setFormData(state, formData) {
    const {
      id,
      name,
      email,
      profile,
      projects,
    } = formData

    state.formData = {
      id,
      name,
      email,
      profile,
      projects,
    }
  },

  clearChooseTeamUser(state) {
    state.chooseTeamUser = { id: '' }
  },

  clearFormData(state) {
    state.formData = {
      id: '',
      name: '',
      email: '',
      profile: null,
      projects: [],
    }
  },
}

const getters = {
  getChooseTeamUser: state => state.chooseTeamUser,
  getFormData: state => state.formData,
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
}
