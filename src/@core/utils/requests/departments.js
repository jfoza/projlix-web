import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllDepartments = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.departments, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getDepartmentId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.departmentId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createDepartment = form => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.departments, form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateDepartment = (id, form) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.departmentId(id), form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateStatusDepartments = form => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.departmentsStatus, form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeDepartment = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.departmentId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
