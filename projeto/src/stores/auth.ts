import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const chartConfig = ref(null)
  function setUser(user2: any) {
    user.value = user2
    if (user2) localStorage.setItem('auth_user', JSON.stringify(user2))
    else localStorage.removeItem('auth_user')
  }

  function setChartConfig(newConfig: any) {
    if(newConfig) chartConfig.value = newConfig
  }

  function clearChartConfig() {
    chartConfig.value = null
  }
  
  function logout() {
    setUser(null)
  }

  function restoreFromStorage() {
    try {
      const data = localStorage.getItem('auth_user')
      if (data) user.value = JSON.parse(data)
    } catch { /*..*/ }
  }

  return { user, setUser, logout, restoreFromStorage , chartConfig, setChartConfig, clearChartConfig }
})