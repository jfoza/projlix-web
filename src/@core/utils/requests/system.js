import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const showSystemData = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.system, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateSystemData = (id, formData) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.systemId(id), formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
