<template>
  <div class="container">
    
    <span style="font-weight: 350;">{{ texto }}</span>

    <div class="buttons">
      <button 
        class="btn-circle" 
        @click="decrement" 
        :disabled="modelValue <= min"
      >
        −
      </button>

      <span class="value">{{ modelValue }}</span>

      <button 
        class="btn-circle" 
        @click="increment" 
        :disabled="modelValue >= max"
      >
        +
      </button>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
    texto: { type: String, default: '' },
    modelValue: { type: Number, required: true },
    min: { type: Number },
    max: { type: Number }
});

const emit = defineEmits(['update:modelValue']);

function increment() {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1);
  }
}

function decrement() {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1);
  }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    padding: 0 8px;
}

.buttons { 
  display: flex;
  align-items: center;
  gap: 8px;
}

.value {
  font-weight: bold;
  font-size: 16px;
  min-width: 20px;
  text-align: center;
  color: var(--gray-color);
}

.btn-circle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid var(--accent2);
  background-color: var(--accent2-opacity5);
  color: var(--accent2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 30px;
  padding: 0 0 3px 1px;
}

.btn-circle:hover:enabled {
  background-color: var(--accent2);
  color: var(--white);
}

.btn-circle:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: transparent;
}
</style>