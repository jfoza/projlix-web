import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllCategories = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.categories, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const showCategoryId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.categoryId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createCategory = formData => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.categories, formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateCategory = (id, formData) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.categoryId(id), formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeCategory = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.categoryId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
