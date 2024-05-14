import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getCustomers = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.customers, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getCustomerId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.customerId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createCustomer = form => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.customers, form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateCustomer = (id, form) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.customerId(id), form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const generateNewPassForCustomerUser = id => new Promise((resolve, reject) => {
  axiosIns
    .patch(apiRoutes.generateNewPassCustomerUserId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
