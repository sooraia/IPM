<template>
    <img 
        :src="MapaExemplo"
        class="MapImage"
        alt="Map Continent"
      />
</template>

<script setup>
    import MapaExemplo from '../assets/mapaExemplo.png';
</script>

<style scoped>
    .MapImage {
        height: 70vh;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
</style>