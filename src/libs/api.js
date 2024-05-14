import axios from 'axios'

const api = axios.create({
  headers: {
    Accept: 'application/json',
    Content: 'application/json',
  },
  baseURL: process.env.VUE_APP_API_URL,
})

export default api
