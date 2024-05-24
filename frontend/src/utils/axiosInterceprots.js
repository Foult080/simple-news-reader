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

/**
 * По не понятной причине прошлый интерсептор накидывает тип application json.
 * В результате файлы не передаются. Пока оставлю костыль. Позже сделаю лучше
 */
export const axiosApiInstanceFiles = axios.create()
axiosApiInstanceFiles.interceptors.request.use(
  async (config) => {
    const token = localStorage.access_token
    config.headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)
