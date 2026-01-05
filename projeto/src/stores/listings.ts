import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCityStore } from './city'

export const useListingsStore = defineStore('listings', () => {
  const listings = ref([])
  const loading = ref(false)
  const cityStore = useCityStore()

  async function fetchListings() {
    console.log("Fetching listings for city:", cityStore.currentCity);
    if (!cityStore.currentCity) return

    loading.value = true

    try {
      const cityName = cityStore.currentCity.trim().replace(/\s+/g, '') // Remove espaços
      const resourceKey = `${cityName}.listings`
      
      const response = await fetch(`http://localhost:3000/${resourceKey}`)
      
      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`)
      }

      const data = await response.json()
      listings.value = data
    } catch (err) {
      console.error("Erro ao carregar:", err)
      listings.value = []
    } finally {
      loading.value = false
    }
  }

  return { listings, loading, fetchListings }
})