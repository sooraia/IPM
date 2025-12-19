<template>
    <div class = "title-text">{{ texto }}</div>
</template>

<script setup>
    defineProps({
        texto: {
            type: String,
            default: 'Título'
        }
    });
</script>

<style scoped>
    .title-text {
        color: var(--white);
        background-color: var(--accent);
        text-align: center;
        padding: 7px;
        box-shadow: 0 2px 8px var(--shadow);
        border-radius: 25px;
    }
</style>