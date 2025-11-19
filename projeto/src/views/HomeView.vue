<template>
  <main>
    <SearchBar />
    <h1>OR</h1>
    <div id="continent-selection">
      <h2>SELECT CONTINENT</h2>
      <div id="continent-grid">
        <div class="continent-card">
          <img src="../assets/africa.png"/>
          <a class="button">Africa</a>
        </div>
        <div class="continent-card">
          <img src="../assets/america.png"/>
          <a class="button">America</a>
        </div>
        <div class="continent-card">
          <img src="../assets/asiapacific.png"/>
          <a class="button">Asia-Pacific</a>
        </div>
        <div class="continent-card">
          <img src="../assets/europe.png"/>
          <a class="button">Europe</a>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Home',
  components: {
    SearchBar,
    Navbar,
    Footer
  }
}
</script>

<style>
main {
  background-color: #E1E8EA;
  width: 100%;
  padding: 20px 0 20px 0;
  display: flex;
  align-items: center;
  gap:20px;
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
  background-color: #0028371A;
  padding: 40px 0 40px 0;
  border-top: 4px solid #002837;
  border-bottom: 4px solid #002837;
}

#continent-grid {
  display: flex;
  gap: 10px;
}

.continent-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.continent-card img {
  width: 95%;
  filter: drop-shadow(4px 4px 4px rgba(90, 90, 90, 0.25));
}

.continent-card .button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 270px;           /* largura fixa */
  height: 40px;           /* altura fixa para consistência */
  background-color: #002837;
  padding: 5px;
  border-radius: 25px;
  color: #D9D9D9;
  font-family: "Josefin Sans";
  font-size: 25px;
  cursor: pointer;
}

.continent-card .button:hover {
  background-color: #295363;
}

main h1 {
  color: #53535399;
  font-size: 130%;
}
</style>
