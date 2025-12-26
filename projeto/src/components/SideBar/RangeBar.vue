<template>
  <div class="container">
    <span>{{ modelValue[0] }}{{ currency ? '€' : '' }}</span>
    <div style="width: 100%; position: relative;">
        <div class="barra" :style="{ background: trackBackground }"/> 

        <input 
            type="range" 
            :min="min" 
            :max="max" 
            :value="modelValue[0]" 
            id="slider-1"
            @input="slideMin"
        >

        <input 
            type="range" 
            :min="min" 
            :max="max" 
            :value="modelValue[1]" 
            id="slider-2"
            @input="slideMax"
        >
    </div>
    <span>{{ modelValue[1] }}{{ currency ? '€' : '' }}</span>

  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  min: { type: Number },
  max: { type: Number },
  gap: { type: Number },
  modelValue: { type: Array, required: true },
  currency: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue']);

// Lógica de deslizar o Mínimo
function slideMin(e) {
  const newVal = parseInt(e.target.value);
  const maxVal = props.modelValue[1];

  if (newVal > maxVal - props.gap) {
    e.target.value = maxVal - props.gap;
    emit('update:modelValue', [maxVal - props.gap, maxVal]);
  } else {
    emit('update:modelValue', [newVal, maxVal]);
  }
}

// Lógica de deslizar o Máximo
function slideMax(e) {
  const newVal = parseInt(e.target.value);
  const minVal = props.modelValue[0];

  if (newVal < minVal + props.gap) {
    e.target.value = minVal + props.gap;
    emit('update:modelValue', [minVal, minVal + props.gap]);
  } else {
    emit('update:modelValue', [minVal, newVal]);
  }
}

// Lógica Visual: Calcula o gradiente para pintar a barra só no meio
const trackBackground = computed(() => {
  const percent1 = ((props.modelValue[0] - props.min) / (props.max - props.min)) * 100;
  const percent2 = ((props.modelValue[1] - props.min) / (props.max - props.min)) * 100;
  
  return `linear-gradient(
            to right, 
            var(--accent2-opacity5) ${percent1}%, 
            var(--accent2) ${percent1}%, 
            var(--accent2) ${percent2}%, 
            var(--accent2-opacity5) ${percent2}%)`;
});
</script>

<style scoped>
.container {
  display: flex; 
  flex-direction: row; 
  align-items: center; 
  gap: 10px; 
  padding-left: 8px;
  margin-top: 8px;
}

.barra {
  height: 5px;
}

input {
  width: 100%;
  position: absolute;
  top: -130%;
  background: none;
  pointer-events: none;
}

/* Webkit (Chrome, Edge, Safari) e Firefox - VER MELHOR ISTO */
input::-webkit-slider-thumb, ::-moz-range-thumb {
  -webkit-appearance: none;
  pointer-events: auto;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: var(--accent2);
  cursor: pointer;
  border: none;
}
</style>