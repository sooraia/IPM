<template>
  <div class="search-container">
    <form action="/action_page.php">
      <SearchInput :value="current" :placeholderText="'Search City or Country..'" />
      <img id="glass" type="submit" src="../assets/glass.png" />
    </form>
  </div>
</template>

<script setup>
  import SearchInput from './SearchInput.vue';
  import { ref } from 'vue';
  const props = defineProps({
    value: {
      type: String,
      required: false,
      default: ''
    }
  });

  const current = ref(props.value);
//const emit = defineEmits(['update:value', 'search'])

// // keep local value in sync with parent prop
// watch(() => props.value, v => current.value = v)
// // propagate changes to parent (v-model compatibility)
// watch(current, v => emit('update:value', v))

// function onSubmit() {
//   emit('search', current.value)
// }
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