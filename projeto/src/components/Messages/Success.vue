<template>
    <div id="screen" @click="close">
        <div id="success-overlay" @click.stop>
            <img src="../../assets/tick.png" alt="Success"/>
            <div id="message" >{{ successMessage }}</div>
            <router-link v-if="goTo && dest" :to="dest">
                <button id="continue-button">{{ goTo }} &#10140</button>
            </router-link>
        </div>
    </div>
</template>

<script setup>

defineProps({
    successMessage: {
        type: String,
        required: true
    },
    goTo: {
        type: String,
        default: ''
    },
    dest: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['close']);

function close() { 
    emit('close'); 
    emit('goTo');
}
</script>

<style scoped>

#screen {
    position: fixed;
    top:0%;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
}

#success-overlay {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;

    width: 650px;
    height: 500px;
    border-radius: 30px;
    border: 2px solid rgba(184, 207, 211);
    background: rgba(0, 40, 55, 0.71);

    background-image:linear-gradient(rgba(45, 66, 71, 0.8), rgba(45, 66, 71, 0.8)), url('../../assets/background.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
}

#success-overlay img {
    width: 200px;
}

#message {
    color: var(--bg);
    font-size: 30px;
    margin-top: 20px;
    max-width: 400px;
    text-align: center;
}

#continue-button {
    padding: 10px 20px;
    background-color: var(--bg);
    border: none;
    border-radius: 15px;
    color:  var(--accent);
    font-size: 20px;
    cursor: pointer;
    font-weight: 600;
}

#continue-button:hover {
    background-color:rgba(184, 207, 211);
}



</style>