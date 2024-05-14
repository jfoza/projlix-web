import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllEvents = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.events, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const showEventId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.eventId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createEvent = formData => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.events, formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateEvent = (id, formData) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.eventId(id), formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeEvent = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.eventId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
