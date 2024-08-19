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

export const showProjectUniqueName = uniqueName => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.projectUniqueName(uniqueName))
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

export const addProjectTag = formData => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.addProjectTag, formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const addProjectTeamUser = formData => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.addProjectTeamUser, formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateProjectInfo = (id, formData) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.projectInfo(id), formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateProjectIcon = (id, formData) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.projectIcon(id), formData)
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

export const removeProjectTag = (id, params) => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.projectTag(id), { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeProjectTeamUser = (id, params) => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.projectTeamUser(id), { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
