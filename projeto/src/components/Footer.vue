<template>
  <footer id="footer">
    <div id="top">
        <a href="/support" class="support-link">Support</a>
        <a href="/terms" class="terms-link">Terms and Conditions</a>
        <a href="/faq" class="faq-link">FAQ</a>
    </div>
    <div id="bottom">
        <img alt="Vue logo"  src="../assets/uminho.jpg">
        <p> Data: InsideAirbnb | Developed by Juliana Silva, Soraia Pereira and Sofia Couto | University of Minho – IPM 25/26 © 2025 AirBnbStats</p>
        <img alt="Vue logo" src="../assets/logo.png">
    </div>
 </footer>
</template>

<style scoped>

#footer {
    display: flex;
    flex-direction: column;
    background-color: #002837;
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

#top a{
  color: #ffffff;
  font-size: 25px;
}

#bottom {
    border-top: #ffffff 1px solid;
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
    color:#ffffff;
    font-size: 12px;
}
</style>
