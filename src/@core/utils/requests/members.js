import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllMembers = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.members, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getMemberUserId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.memberUserId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createUserMember = form => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.members, form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateStatusUserMember = id => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.memberUpdateStatus(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateGeneralData = (id, form) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.memberUpdateGeneralData(id), form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateAddressData = (id, form) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.memberUpdateAddressData(id), form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateChurchData = (id, form) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.memberUpdateChurchData(id), form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateModulesData = (id, form) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.memberUpdateModulesData(id), form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateProfileData = (id, form) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.memberUpdateProfileData(id), form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updatePasswordData = (id, form) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.memberUpdatePasswordData(id), form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
