<template>
  <div class="search-container">
    <form action="/action_page.php">
      <input type="text" placeholder="Search City or Country.." name="search">
      <img id="glass" type="submit" src="../assets/glass.png" />
    </form>
  </div>
</template>

<script>
</script>

<style scoped>
.search-container {
  width: 800px;
  height: 50px;
  border-radius: 25px;
  background-color: #002837;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
}

.search-container form {
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  gap: 5px;
}

#glass {
  width: 55px;
  height: 55px;
  object-fit: contain;
}

#glass {
  width: 55px;
  height: 55px;
  object-fit: contain;
  cursor: pointer;
}


.search-container input {
  flex: 1 1 auto;
  height: 34px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  background-color: #D9D9D9;
  font-family: "Josefin Sans";
  padding: 6px 12px;
  font-size: 15px;
  color: #00000099
}

.search-container input:focus{
    outline: 2px solid #FF7628;
}

</style>