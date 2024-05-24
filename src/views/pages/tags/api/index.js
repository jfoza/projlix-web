import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllTags = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.tags, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const getTagId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.tagId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createTag = form => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.tags, form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateTag = (id, form) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.tagId(id), form)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateStatusTag = id => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.tagStatus(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeTag = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.tagId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
