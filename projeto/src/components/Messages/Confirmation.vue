<template>
    <div id="screen">
        <div id="msg-overlay">
            {{ message }}
            <div id="buttons">
                <button @click="$emit('confirm', true)">Yes</button>
                <button @click="$emit('confirm', false)">No</button>
            </div>
        </div>
    </div>
</template>

<script setup>

defineProps({
    message: {
        type: String,
        required: true
    }
})
const emit = defineEmits(['confirm']);
</script>

<style scoped>
#screen {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.6);
}

#msg-overlay {
    height: 150px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    background-image: linear-gradient(0deg, rgba(77, 102, 102, 0.7) 0%, rgba(40, 80, 92, 0.8) 100%),url('../../assets/background.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    width: 600px;
    color: var(--light-accent2);
    font-size: 26px;
    border-radius: 30px;
    border: 2px solid var(--light-accent2);
    filter: drop-shadow(10px 10px 10px var(--shadow));
}

#buttons {
    display: flex;
    gap: 20px;
}

#buttons button {
    width: 100px;
    height: 40px;
    border-radius: 20px;
    background-color: var(--accent);
    color: var(--light-accent2);
    font-size: 18px;
    border: none;
    cursor: pointer;
}

#buttons button:hover {
    background-color: var(--accent-hover);
}

</style>