import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllChurches = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.churches, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getChurchId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.churchId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getChurchUniqueName = uniqueName => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.churchUniqueName(uniqueName))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getChurchesUserLogged = () => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.churchesUserLogged)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createChurch = form => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.churches, form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateChurch = (id, form) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.churchId(id), form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeChurch = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.churchIdDelete(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const saveChurchImage = formData => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.churchImage, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
