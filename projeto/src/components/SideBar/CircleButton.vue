<template>
  <div class="button" @click="toggleSelection">
    
    <div 
    class="circle" 
    :class="{ 'active': modelValue }"
  >
    </div>
    
    <span class="texto">{{ text }}</span>
    
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
  },
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

function toggleSelection() {
  emit('update:modelValue', !props.modelValue);
}
</script>

<style scoped>
.button{
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle::after {
  content: '';
  width: 12px;
  height: 12px;
  background-color: var(--accent);
  border-radius: 50%;
  transform: scale(0);
}

.circle.active::after {
  transform: scale(1);
}

.texto {
    color: var(--metrics-text);
    font-size: 17px;
}
</style>