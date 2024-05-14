import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getCitiesByUf = uf => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.citiesByUf(uf))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getCitiesById = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.citiesById(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getCitiesInPersons = () => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.citiesInPersons)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
