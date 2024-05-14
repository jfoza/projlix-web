import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAddressByZipCode = zip => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.zipCode(zip))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
