<template>
  <input type="text" v-model="current" :placeholder="placeholderText" name="search" />
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    placeholderText: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: false,
        default: ''
    }
});

const current = ref(props.value);
</script>

<style scoped>
input {
  flex: 1 1 auto;
  height: 34px;
  width: 90%;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  background-color: var(--bg);
  padding: 6px 12px;
  font-size: 15px;
  color: var(--gray-color);
  outline: none;
}

input:focus {
  outline: 2px solid var(--accent2);
}
</style>