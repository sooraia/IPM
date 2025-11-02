<template>
  <footer id="footer">
    <div id="top">
        <a href="/support" class="support-link">Support</a>
        <a href="/terms" class="terms-link">Terms and Conditions</a>
        <a href="/faq" class="faq-link">FAQ</a>
    </div>
    <div id="bottom">
        <img alt="Vue logo"  src="../assets/uminho.jpg">
        <p> Data: InsideAirbnb | Developed by Juliana SIlva, Soraia Pereira and Sofia Couto | University of Minho – IPM 25/26 © 2025 AirBnbStats</p>
        <img alt="Vue logo" src="../assets/logo.png">
    </div>
 </footer>
</template>

<style>

#footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #002837;
    width: auto;
    height: 90px;
}

#top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  padding: 10px 700px 0 700px;
}

#top a{
  color: #ffffff;
  text-decoration: none;
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
