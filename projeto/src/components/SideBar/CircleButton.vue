<template>
  <div class="checkbox" @click="toggleSelection">
    
    <div 
    class="circle" 
    :class="{ 'active': isSelected }"
    @click="isSelected = !isSelected"
  >
    </div>
    
    <span class="texto">{{ text }}</span>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
    const isSelected = ref(false);
    const props = defineProps({
      text: {
        type: String,
      }
    });
</script>

<style scoped>
.checkbox{
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
}

.circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--accent); 
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s;
}

.active {
  background-color: var(--accent);
}

.texto {
    color: var(--metrics-text);
    font-size: 17px;
}
</style>