<template>
  <Navbar/>
  <Footer/>
</template>

<script>
import './assets/main.css'
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}

* {
  margin: 0;
}

#app {
  font-family: "Josefin Sans";
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>
