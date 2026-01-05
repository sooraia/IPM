import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCityStore } from './city'

export const useCalendarStore = defineStore('calendar', () => {
  const calendarData = ref([])
  const loading = ref(false)
  const cityStore = useCityStore()

  async function fetchCalendar() {
    if (!cityStore.currentCity) return

    loading.value = true

    try {
      const cityName = cityStore.currentCity.trim().replace(/\s+/g, '')
      const resourceKey = `${cityName}.calendar`
      
      const response = await fetch(`http://localhost:3000/${resourceKey}`)
      
      if (!response.ok) {
        throw new Error(`Erro ao carregar calendário: ${response.statusText}`)
      }

      const data = await response.json()
      
      // Atribui os dados recebidos à variável reativa
      calendarData.value = data
      
    } catch (err) {
      console.error("Erro ao carregar o calendário:", err)
      calendarData.value = []
    } finally {
      loading.value = false
    }
  }

  return { calendarData, loading, fetchCalendar }
})