<template>
    <button class="custom-button">
        <img v-if="icon" :src="icon" class="btn-icon "/>
        <span>{{ buttonLabel }}</span>
    </button>
</template>

<script setup>
defineProps({
    buttonLabel: { type: String, required: true },
    icon: { type: String, required: false }
})
</script>

<style scoped>
.custom-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 15px 30px;
    height: 48px;
    flex-shrink: 0;
    border: 0;
    border-radius: 25px;
    font-size: large;
    cursor: pointer;
}

.btn-icon {
    object-fit: contain;
}

</style>