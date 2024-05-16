import axiosIns from '@/libs/axios'
import apiRoutes from '@/router/apiRoutes'

export const getAllNotes = params => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.notes, { params })
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const showNoteId = id => new Promise((resolve, reject) => {
  axiosIns
    .get(apiRoutes.noteId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const createNote = formData => new Promise((resolve, reject) => {
  axiosIns
    .post(apiRoutes.notes, formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const updateNote = (id, formData) => new Promise((resolve, reject) => {
  axiosIns
    .put(apiRoutes.noteId(id), formData)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})

export const removeNote = id => new Promise((resolve, reject) => {
  axiosIns
    .delete(apiRoutes.noteId(id))
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
})
