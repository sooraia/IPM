<template>
  <div class="search-container">
    <form @submit.prevent="handleSubmit">
      <SearchInput 
        :value="current"
        :placeholderText="'Search City or Country..'" 
        @keydown.enter="handleSubmit"
        @update:value="current = $event"
        :suggestionsList="suggestionsList"
        :isValueCity="isValueCity"
      />
      <img 
        id="glass" 
        type="submit" 
        src="../assets/glass.png" 
        @click="handleSubmit"
        alt="Search"
      />
    </form>
  </div>
</template>

<script setup>
import SearchInput from './SearchInput.vue';
import { ref} from 'vue';
import { validateCity, cleanCityName } from '@/utils/cityData';

const props = defineProps({
  value: {
    type: String,
    required: false,
    default: ''
  },
  suggestionsList: {
    type: Array,
    required: false,
    default: () => []
  },
  isValueCity: {
    type: Boolean,
    required: false,
    default: true
  }
});

const emit = defineEmits(['search']);

const current = ref(props.value);

async function handleSubmit() {
  if (!props.isValueCity) {
    console.log('Searching for:', current.value);
    emit('search', current.value)
    return;
  }
  else {
  if (await validateCity(current.value)) {
    current.value = cleanCityName(current.value);
    console.log('Searching for:', current.value);
    emit('search', current.value)
  }
  }
}
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
  position: relative; 
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

#glass:hover {
  transform: scale(1.1);
  transition: transform 0.2s;
}
</style>