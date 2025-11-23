<template>
  <div class="card">
    <div class = "main-container">
      <h1>SELECT CITY</h1>
      <SearchBar></SearchBar>
      <h2>OR</h2>
      <Button buttonLabel="Compare 2 Cities" id="button"/>
    </div>
  </div>
</template>
<script setup>
</script>


<script setup>
import { useRouter } from 'vue-router';
import SearchBar from '@/components/SearchBar.vue';
import Button from '@/components/Button.vue';
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
  background: rgba(242, 144, 47, 0.87);
  font-weight: bold;
  color: white;
}

.main-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
