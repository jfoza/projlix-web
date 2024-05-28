import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllIcons = () => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.icons)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
