/* eslint-disable no-shadow */
// eslint-disable-next-line import/no-cycle
import api from '@/libs/api'
import apiRoutes from '@/router/apiRoutes'

const defaultCount = parseInt(process.env.VUE_APP_SESSION_EXPIRED)

const state = {
  count: defaultCount,
  token: null,
  userData: null,
  refCount: null,
}

const mutations = {
  DEFINE_LOGGED_USER(state, { token, userData }) {
    state.userData = userData
    state.token = token
  },
  SET_USER_DATA(state, userData) {
    if (userData) {
      state.userData = userData
    }
  },
  // eslint-disable-next-line no-shadow
  LOGOUT_USER(state) {
    state.token = null
    state.userData = null
  },
  // eslint-disable-next-line no-shadow
  START_COUNT(state) {
    if (state.token && state.userData) {
      clearInterval(state.refCount)
      state.count = defaultCount
      state.refCount = null

      state.refCount = setInterval(() => {
        // eslint-disable-next-line no-plusplus
        state.count--
      }, 1000)
    }
  },
  STOP_COUNT(state) {
    clearInterval(state.refCount)
    state.count = defaultCount
    state.refCount = null
  },
  SET_COUNT(state, newCount) {
    state.count = newCount
  },
  SET_REF_COUNT(state, newRefCount) {
    state.refCount = newRefCount
  },
}

const actions = {
  login({ commit }, auth) {
    let route = apiRoutes.login

    // if (auth.googleAuthToken) {
    //   route = apiRoutes.googleLogin
    // }

    return new Promise((resolve, reject) => {
      api
        .post(route, auth)
        .then(response => {
          commit('DEFINE_LOGGED_USER', {
            token: response.data.token,
            userData: response.data.user,
          })

          commit('START_COUNT')
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  logout({ commit }) {
    commit('LOGOUT_USER')
    commit('STOP_COUNT')
  },

  startCount({ commit }) {
    commit('START_COUNT')
  },

  stopCount({ commit }) {
    commit('STOP_COUNT')
  },

  setCount({ commit }, newCount) {
    commit('SET_COUNT', newCount)
  },

  setRefCount({ commit }, newRefCount) {
    commit('SET_REF_COUNT', newRefCount)
  },
}

const getters = {
  getUserData: state => state.userData,
  isLoggedIn: state => Boolean(state.token && state.userData),
  getCount: state => () => state.count,
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
