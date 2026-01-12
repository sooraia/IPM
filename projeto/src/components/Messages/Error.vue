<template>
    <div id="screen" @click="close">
        <div id="error-overlay">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script setup>

defineProps({
    errorMessage: {
        type: String,
        required: true
    }
})
const emit = defineEmits(['close']);

function close() { 
    emit('close'); 
}
</script>

<style scoped>
#screen {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 3;
}

#error-overlay {
    position: fixed;
    left: 50%;
    top:10%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    background-image: linear-gradient(0deg, rgba(38, 55, 42, 0.7) 0%, rgba(40, 64, 92, 0.8) 100%),url('../../assets/background.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    width: 600px;
    height: 120px;
    color: var(--light-accent2);
    font-size: 26px;
    border-radius: 30px;
    border: 2px solid var(--light-accent2);
    filter: drop-shadow(10px 10px 10px var(--shadow));
}

</style>