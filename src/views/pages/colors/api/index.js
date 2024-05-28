import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllColors = () => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.colors)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
