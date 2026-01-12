<template>
  <div class="main-container">
    <router-link to='/dashboard' id="top" class="button"> &#8592 Back to Dashboard</router-link>
    <h1> COMPARE CITIES </h1>
    <div class="compare-cards">
        <CompareCitiesCard :CityNumber="1" :value="firstCity" @update:value="firstCity = $event" />
        <h2>AND</h2>
        <CompareCitiesCard :CityNumber="2" :value="secondCity" @update:value="secondCity = $event" />
    </div>
    <Button buttonLabel="Compare" class="button" @click="handleSearch"/>
  </div>
</template>

<script setup>
</script>         

<script setup>
import { useRouter } from 'vue-router';
import SearchBar from '@/components/SearchBar.vue';
import Button from '@/components/Button.vue';
import CompareCitiesCard from '@/components/Cards/CompareCard.vue';
import { ref } from 'vue';
import { useCityStore } from '@/stores/city';
import { cleanCityName } from '@/utils/cityData';

const cityStore = useCityStore();

const firstCity = ref(cityStore.currentCity || '');
const secondCity = ref('');
const router = useRouter();
function handleSearch() {
    if (firstCity.value && secondCity.value) {
        const cityClean = cleanCityName(firstCity.value)
        const city2Clean = cleanCityName(secondCity.value)
        router.push({ name: 'compareCitiesData', params: { cityA: cityClean, cityB: city2Clean } });
    } else {
      console.log('Please enter both cities to compare.');
    }
}

</script>


<style scoped>

.main-container {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center; 
  background: linear-gradient(0deg, rgba(115, 161, 178, 0.521) 0%, rgba(115, 161, 178, 0.521) 100%), 
  url(@/assets/background.jpg) lightgray -0.234px -239px / 100.024% 142.064% no-repeat;  
}


.compare-cards{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 3rem;
}


h1{
  text-align: center;
  color: var(--accent);
  font-size: 3rem;
  margin-bottom: 3rem;
}

h2{
  text-align: center;
  color: var(--accent);
  font-size: 1.2rem;
}

#top{
  align-self: flex-start;
  width: 200px;
  position: absolute;
  top: 120px;
  left: 30px;
  font-size: 17px;
  text-align: center;
}

.button{
  background: var(--accent);
  font-weight: bold;
  color: white;
  padding: 10px 40px;
  cursor: pointer;
  border-radius: 25px;
  font-size: 20px;
}
.button:hover{
  background: var(--accent-hover);
}
</style>
