import axios from 'axios'

export const axiosApiInstance = axios.create()

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.access_token
    config.headers = { Authorization: `Bearer ${token}` }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)
