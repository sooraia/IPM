<template>
  <input type="text" :placeholder="placeholderText" name="search" :disabled="disabled"/>
</template>

<script setup>
const props = defineProps({
    placeholderText: {
        type: String,
        required: true
    },
    disabled: Boolean
});
</script>

<style scoped>
input {
  flex: 1 1 auto;
  height: 75%;
  width: 90%;
  box-sizing: border-box;
  border: 0;
  border-radius: 30px;
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