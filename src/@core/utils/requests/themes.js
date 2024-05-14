import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllThemes = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.themes, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const showThemeId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.themeId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createTheme = formData => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.themes, formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateTheme = (id, formData) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.themeId(id), formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeTheme = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.themeId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
