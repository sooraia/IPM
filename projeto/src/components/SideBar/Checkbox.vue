<template>
  <label class="container">
    
    <input 
      type="checkbox" 
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />

    <div class="custom-box" :class="{ 'checked': modelValue }">
      <svg 
        viewBox="0 0 24 24" 
        class="check-icon"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>

    <span class="texto">{{ texto }}</span>

  </label>
</template>

<script setup>
defineProps({
  texto: { type: String, default: '' },
  modelValue: { type: Boolean, default: false }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  padding: 4px 8px;
}

input {
  display: none;
}

.custom-box {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background-color: var(--accent2-opacity2);
}

.check-icon {
  width: 16px;
  height: 16px;
  fill: none;
  padding: 2px 0 0 2px;
  stroke: var(--accent2);
  stroke-width: 3;
  opacity: 0;
}

.custom-box.checked .check-icon {
  opacity: 1;
}

.texto {
  font-size: 16px;
  color: var(--gray-color);
}
</style>