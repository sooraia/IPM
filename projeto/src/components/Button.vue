<template>
    <button type = submit>
        {{ buttonLabel }}
      </button> 
</template>

<script setup>
defineProps({
    buttonLabel: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
    button {
        padding: 15px 30px;
        height: 48px;
        flex-shrink: 0;
        margin: 1.5rem;
        border: 0;
        border-radius: 25px;
        font-size: large;
    }

</style>