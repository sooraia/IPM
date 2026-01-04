import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCityStore = defineStore('city', () => {
    
    // Ao iniciar, tentamos logo ler do localStorage. Se existir, a variável começa com esse valor. Senão, começa a null.
    const storedCity = localStorage.getItem('city_name');
    const currentCity = ref(storedCity || null);

    // const storedContinent = localStorage.getItem('continent_name');
    // const currentContinent = ref(storedContinent || null);

    function setCity(city: any) {
        currentCity.value = city;
        
        if (city) localStorage.setItem('city_name', city);
        else localStorage.removeItem('city_name');
    }

    // function setContinent(continent: any) {
    //     currentContinent.value = continent;
    //     if (continent) localStorage.setItem('continent_name', continent);
    //     else localStorage.removeItem('continent_name');
    // }
    
    return { currentCity, setCity };
});