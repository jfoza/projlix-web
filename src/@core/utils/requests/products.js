import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllProducts = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.products, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const showProductId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(`${apiRoutes.products}/id/${id}`)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createProduct = formData => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.products, formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateProduct = (id, formData) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.productId(id), formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeProduct = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.productId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const saveProductImage = formData => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.productImage, formData, {
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
