<template>
  <div id="app">
    <header>
      <Navbar />
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Josefin Sans";
}

main {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* ensure content starts at top, not centered */
}

</style>
