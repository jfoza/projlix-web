/* eslint-disable no-shadow */
const state = {
  chooseProjectInNavbar: {
    id: '',
    name: '',
    uniqueName: '',
    description: '',
    icon: { id: '', name: '' },
    teamUsers: [],
    tags: [],
  },
}

const mutations = {
  setChooseProjectInNavbar(state, project) {
    const {
      id,
      name,
      uniqueName,
      description,
      icon,
      teamUsers,
      tags,
    } = project

    state.chooseProjectInNavbar = {
      id,
      name,
      uniqueName,
      description,
      icon,
      teamUsers,
      tags,
    }
  },

  clearProjectInNavbar(state) {
    state.chooseProjectInNavbar = {
      id: '',
      name: '',
      uniqueName: '',
      description: '',
      icon: { id: '', name: '' },
      teamUsers: [],
      tags: [],
    }
  },
}

const getters = {
  getChooseProjectInNavbar: state => state.chooseProjectInNavbar,
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
}
