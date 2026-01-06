<template>
    <label>{{ title }}</label>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
    label {
        background-color: var(--accent);
        width: 230px;
        height: 40px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--white);
        font-size: 24px;
        padding: 3px;
    }
</style>