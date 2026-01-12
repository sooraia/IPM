<template>
    <div class ="mini-message-container">
        <h2>{{ message }}</h2>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    message: { type: String, required: true }
});
</script>

<style scoped>
.mini-message-container {
    background-color: rgba(145, 150, 152, 0.5);
    width: fit-content;
    padding: 15px;
    border-radius: 25px;
    text-align: center;
    color: var(--white);
    font-weight: lighter;
    font-size: 10px;
    z-index: 10001;
    position: fixed;
    top: 300px;
    right: 45%;
}
</style>