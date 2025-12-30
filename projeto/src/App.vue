<template>
  <div id="app">
    <Navbar />

    <main class = "main-content">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<style>
.app-container {
    display: flex;
    flex-direction: column;
    width: 100vw;
}

.main-content {
    flex: 1;
}
</style>