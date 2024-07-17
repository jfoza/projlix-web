import provider from '@/store'
import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

const baseURL = process.env.VUE_APP_APP_URL

const login = `${baseURL}/login`
const notAuthorized = `${baseURL}/nao-autorizado`

export const clearStore = () => {
  provider.dispatch('sessions/logout').then()
}

export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole) {
    return '/'
  }

  clearStore()
  return { name: 'auth-login' }
}

export const isUserLoggedIn = () => provider.getters['sessions/isLoggedIn']

export const getToken = () => provider.state.sessions.token

export const getUserData = () => provider.state.sessions.userData

export const startCount = () => {
  provider.dispatch('sessions/startCount').then()
}

export const redirectToNotAuthorized = () => {
  location.href = notAuthorized
}

export const logoutUser = () => new Promise((resolve, reject) => {
  axiosIns.get(apiRoutes.logout)
    .then(response => {
      clearStore()
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const logoutUserRedirectToLogin = () => {
  clearStore()
  location.href = login
}

export const setLoggedUserData = () => {

}
