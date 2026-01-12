<template>
  <div class="body">
    <SearchBar @search="handleSearch"/>
    <h1>OR</h1>
    <div id="continent-selection">
      <h2>SELECT CONTINENT</h2>
      <div id="continent-grid">
        <div class="continent-card">
          <img src="../assets/africa.png" />
          <router-link to="/explore/continent/Africa" class="button">Africa</router-link>
        </div>

        <div class="continent-card">
          <img src="../assets/america.png" />
          <router-link to="/explore/continent/America" class="button">America</router-link>
        </div>

        <div class="continent-card">
          <img src="../assets/asiapacific.png" />
          <router-link to="/explore/continent/Asia-Pacific" class="button">Asia-Pacific</router-link>
        </div>

        <div class="continent-card">
          <img src="../assets/europe.png" />
          <router-link to="/explore/continent/Europe" class="button">Europe</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchBar from '@/components/SearchBar.vue';
import { useRouter } from 'vue-router';
import { useCityStore } from '@/stores/city';

const router = useRouter();
const cityStore = useCityStore();

function onMounted() {
  cityStore.setCity(null);
}

function handleSearch(cityName) {
  cityStore.setCity(cityName);
  router.push({ name: 'alojamentos', params: { city: cityName } });
};
</script>

<style scoped>
.body {
  height: calc(100vh - 190px);
  width: 100%;
  padding: 20px 0 20px 0;
  display: flex;
  align-items: center;
  gap: 20px;
  box-sizing: border-box;
  flex-direction: column;
}

#continent-selection {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  font-size: 160%;
  background-color: var(--bg-secondary);
  padding: 40px 0 40px 0;
  border-top: 4px solid var(--accent);
  border-bottom: 4px solid var(--accent);
}

#continent-grid {
  display: flex;
  gap: 5px;
  padding: 0 30px 0 30px;
}

.continent-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.continent-card img {
  width: 95%;
  filter: drop-shadow(4px 4px 4px var(--shadow));
}

.continent-card .button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 270px;
  /* largura fixa */
  height: 40px;
  /* altura fixa para consistência */
  background-color: var(--accent);
  padding: 5px;
  border-radius: 25px;
  color: var(--bg);
  font-size: 25px;
  cursor: pointer;
}

.continent-card .button:hover {
  background-color: var(--accent-hover);
}

main h1 {
  color: var(--gray-color);
  font-size: 130%;
}
</style>
