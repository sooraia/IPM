<template>
    <div 
      class="stars" 
      @mouseleave="resetHover"
    >
        <svg
            v-for="star in 5"
            :key="star"
            class="star-icon"
            :class="{ 'active': star <= (hoverValue || modelValue) }"
            @mouseenter="hoverValue = star"
            @click="setRating(star)"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor" 
            stroke-width="2"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: { type: Number },
});

const emit = defineEmits(['update:modelValue']);
const hoverValue = ref(0);

function setRating(value) {
  if (props.modelValue === value) {
    emit('update:modelValue', 0);
  } else {
    emit('update:modelValue', value);
  }
}

function resetHover() {
  hoverValue.value = 0;
}
</script>

<style scoped>
.stars {
  display: flex;
  align-items: center;
  padding-left: 8px;
}

.star-icon {
  width: 30px;
  height: 30px;
  color: var(--accent2-opacity5);
  fill: var(--accent2-opacity5);
  cursor: pointer;
}

.star-icon.active {
  fill: var(--accent2);
}
</style>