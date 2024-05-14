import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getReportsMeetId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.reportsMeetId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const showReportId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.reportId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createReport = formData => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.reports, formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateReport = (id, formData) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.reportId(id), formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeReport = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.reportId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
