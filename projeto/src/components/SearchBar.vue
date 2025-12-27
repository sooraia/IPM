<template>
  <div class="search-container">
    <form action="/action_page.php">
      <SearchInput :placeholderText="'Search City or Country..'" />
      <img id="glass" type="submit" src="../assets/glass.png" />
    </form>
  </div>
</template>

<script>
  import SearchInput from './SearchInput.vue';
  export default { components: { SearchInput } };
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
  height: 90%;
}

#glass {
  height: 120%;
  margin: 10px;
  object-fit: contain;
  cursor: pointer;
}

</style>