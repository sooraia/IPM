<template>
  <footer id="footer">
    <div id="top">
      <router-link to="/support">Support</router-link>
      <a href="/terms">Terms and Conditions</a>
      <router-link to="/faq">FAQ</router-link>
    </div>
    <div id="bottom">
      <img alt="Vue logo" src="../assets/uminho.jpg">
      <p> Data: InsideAirbnb | Developed by Juliana Silva, Soraia Pereira and Sofia Couto | University of Minho – IPM
        25/26 © 2025 AirBnbStats</p>
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
  </footer>
</template>

<style scoped>
#footer {
  display: flex;
  flex-direction: column;
  background-color: var(--accent);
  width: auto;
  min-height: 90px;
}

#top {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 150px;
  padding: 10px;
}

#top a {
  color: var(--white);
  font-size: 25px;
}

#bottom {
  border-top: var(--white) 1px solid;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

#bottom img {
  height: 20px;
}

#bottom p {
  color: var(--white);
  font-size: 12px;
}
</style>
