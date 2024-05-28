import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllSectionsByProject = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.sections, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createSection = formData => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.sections, formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateSection = (id, formData) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.sectionId(id), formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const reorderSection = (id, formData) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.reorderSection(id), formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeSection = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.sectionId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
