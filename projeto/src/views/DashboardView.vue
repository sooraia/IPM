<template>
  <div class="card">
    <div class = "main-container">
      <h1>SELECT CITY</h1>
      <SearchBar @search="handleSearch"/>
      <h2>OR</h2>
      <router-link to="/dashboard/compare">
        <Button buttonLabel="Compare 2 Cities" id="button"/>
      </router-link>
    </div>
  </div>
</template>
<script setup>
</script>


<script setup>
import { useRouter } from 'vue-router';
import SearchBar from '@/components/SearchBar.vue';
import Button from '@/components/Button.vue';
import { useCityStore } from '@/stores/city';
import { onMounted } from 'vue';
const cityStore = useCityStore();
onMounted(() => {
  cityStore.setCity(null);
});
const router = useRouter();

function handleSearch(cityName) {
  cityStore.setCity(cityName);
  router.push({ name: 'dashboardCity', params: { city: cityName } });
};
</script>



<style scoped>
.card {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(0deg, rgba(115, 161, 178, 0.521) 0%, rgba(115, 161, 178, 0.521) 100%), 
  url(@/assets/background.jpg) lightgray -0.234px -239px / 100.024% 142.064% no-repeat;   
}

h1{
  text-align: center;
  color: var(--text-secondary);
  font-size: 3rem;
  margin-bottom: 3rem;
}

h2{
  text-align: center;
  color: rgba(152, 171, 178, 1);
  font-size: 1rem;
  margin-top: 1.5rem;
}

#button{
  margin-top: 1.5rem;
  background: var( --light-accent2);
  font-weight: bold;
  color: white;
}

#button:hover{
  background: var(--accent);
  background: var(--accent2);
}

.main-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
