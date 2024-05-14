import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllMeetings = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.meetings, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const showMeetId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.meetId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createMeet = formData => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.meetings, formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateMeet = (id, formData) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.meetId(id), formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeMeet = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.meetId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
