import Vue from 'vue'
import api from '@/libs/api'
import {
  getToken,
  redirectToNotAuthorized,
  startCount,
  logoutUserRedirectToLogin,
  isUserLoggedIn,
} from '@/auth/utils'

const axiosIns = api

axiosIns.interceptors.request.use(config => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => Promise.reject(error))

axiosIns.interceptors.response.use(response => {
  startCount()

  return response
}, error => {
  const { status } = error.response

  if (status === 401 && isUserLoggedIn()) {
    logoutUserRedirectToLogin()
  }

  if (status === 403) {
    if (error.response.data.error.inactiveUser) {
      logoutUserRedirectToLogin()
    } else {
      redirectToNotAuthorized()
    }
  }

  return Promise.reject(error)
})

Vue.prototype.$http = axiosIns

export default axiosIns
