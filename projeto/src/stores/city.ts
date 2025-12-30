import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCityStore = defineStore('city', () => {
    
    // Ao iniciar, tentamos logo ler do localStorage. Se existir, a variável começa com esse valor. Senão, começa a null.
    const storedCity = localStorage.getItem('city_name');
    const currentCity = ref(storedCity || null);

    function setCity(city: any) {
        currentCity.value = city;
        
        if (city) localStorage.setItem('city_name', city);
        else localStorage.removeItem('city_name');
    }
    
    return { currentCity, setCity };
});