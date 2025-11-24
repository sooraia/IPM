<template>
  <div class="main-container">
    <h1> COMPARE CITIES </h1>
    <div class="compare-cards">
        <CompareCitiesCard :CityNumber="1"/>
        <h2>AND</h2>
        <CompareCitiesCard :CityNumber="2"/>
    </div>
    <Button buttonLabel="Compare" id="button"/>
  </div>
</template>

<script setup>
</script>         

<script setup>
import { useRouter } from 'vue-router';
import SearchBar from '@/components/SearchBar.vue';
import Button from '@/components/Button.vue';
import CompareCitiesCard from '@/components/Cards/CompareCard.vue';
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

#button{
  background: var(--accent);
  font-weight: bold;
  color: white;
  padding: 10px 40px;
  cursor: pointer;
}
</style>
