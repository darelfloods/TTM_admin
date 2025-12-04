import axios from 'axios'
import ENV from '@/config/environment'

const axiosPlugin = {
  install(App) {
    let token = 'token'

    const axiosInstance = axios.create({
      // Configuration de la baseURL de l'admin
      // - par défaut : http://localhost:8000 (backend local)
      // - override possible via VITE_API_BASE_URL
      // - autres serveurs gardés comme fallback dans ENV.API_BASE_URLS
      baseURL: ENV.API_BASE_URL,
    })

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`

    App.config.globalProperties.$axios = axiosInstance
    App.config.globalProperties.$updateToken = (newToken) => {
      token = newToken
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    }
  },
}

export default axiosPlugin
