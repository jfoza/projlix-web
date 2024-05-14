import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllPositions = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.positions, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const showPositionId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.positionId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createPosition = formData => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.positions, formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updatePosition = (id, formData) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.positionId(id), formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removePosition = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.positionId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
