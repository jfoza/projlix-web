/* eslint-disable no-shadow */
const state = {
  chooseAdminUser: {
    id: '',
    name: '',
    active: '',
  },

  formData: {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    active: {
      boolValue: true,
      description: 'Ativo',
    },
  },
}

const mutations = {
  setChooseAdminUser(state, chooseAdminUser) {
    state.chooseAdminUser = chooseAdminUser
  },

  setFormData(state, formData) {
    const {
      id, name, email, password, passwordConfirmation, active,
    } = formData

    state.formData = {
      id,
      name,
      email,
      password,
      passwordConfirmation,
      active,
    }
  },

  clearChooseAdminUser(state) {
    state.chooseAdminUser = {
      id: '',
      name: '',
      active: '',
    }
  },

  clearFormData(state) {
    state.formData = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      active: {
        boolValue: true,
        description: 'Ativo',
      },
    }
  },
}

const getters = {
  getChooseAdminUser: state => state.chooseAdminUser,
  getFormData: state => state.formData,
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
}
