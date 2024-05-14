import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const generateUniqueCode = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.uniqueCodeGenerator, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getAllPrefixes = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.prefixes, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getPrefixId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.prefixId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createPrefix = form => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.prefixes, form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updatePrefix = (id, form) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.prefixId(id), form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removePrefix = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.prefixId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
