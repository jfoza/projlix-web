import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getTeamUsers = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.teamUsers, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getTeamUserId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.teamUserId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createTeamUser = form => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.teamUsers, form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateTeamUser = (id, form) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.teamUserId(id), form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
