import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getModules = () => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.modulesList)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
