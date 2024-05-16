import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllProjects = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.projects, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const showProjectId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.projectId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createProject = formData => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.projects, formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateProject = (id, formData) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.projectId(id), formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeProject = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.projectId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
