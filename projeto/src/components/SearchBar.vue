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
  filter: drop-shadow(4px 4px 4px var(--shadow));
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
  background-color: var(--bg);
  padding: 6px 12px;
  font-size: 15px;
  color: var(--gray-color)
}

.search-container input:focus {
  outline: 2px solid var(--accent2);
}
</style>