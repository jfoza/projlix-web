/* eslint-disable no-shadow */
const state = {
  chooseTag: { id: '' },

  formData: {
    id: '',
    name: '',
  },
}

const mutations = {
  setChooseTag(state, chooseTag) {
    state.chooseTag = chooseTag
  },

  setFormData(state, formData) {
    const {
      id,
      name,
    } = formData

    state.formData = {
      id,
      name,
    }
  },

  clearChooseTag(state) {
    state.chooseTag = { id: '' }
  },

  clearFormData(state) {
    state.formData = {
      id: '',
      name: '',
    }
  },
}

const getters = {
  getChooseTag: state => state.chooseTag,
  getFormData: state => state.formData,
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
}
