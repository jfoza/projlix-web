import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllPersons = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.persons, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const showPersonId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.personId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createPerson = formData => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.persons, formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updatePerson = (id, formData) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.personId(id), formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removePerson = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.personId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
