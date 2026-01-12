<template>
    <div id="screen" @click="close">
        <div id="input-overlay" @click.stop>
            <h3>{{ title }}</h3>
            <input 
                v-model="inputValue" 
                :type="text"
                :placeholder="placeholder"
                @keyup.enter="confirm"
            />
            <div id="button-group">
                <button id="confirm-button" @click="confirm">Save</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')

const props = defineProps({
    title: { type: String, default: 'Enter value' },
    placeholder: {type: String, default: 'Type here...' },
})

const emit = defineEmits(['confirm', 'close']);

const confirm = () => {
    if (inputValue.value.trim()) {
        emit('confirm', inputValue.value);
        inputValue.value = '';
    }
}

const close = () => {
    emit('close');
    inputValue.value = '';
}
</script>

<style scoped>
#screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
}

#input-overlay {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: rgba(225, 232, 234, 1);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    min-width: 350px;
}

h3 {
    margin: 0;
    color: #333;
    font-size: 20px;
}

input {
    padding: 8px;
    border: 1px solid var(--accent);
    border-radius: 10px;
    font-size: 14px;
    background-color: rgba(217, 217, 217, 1);
}

input:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 5px var(--accent2);
}

#button-group {
    display: flex;
    align-self: center;
}

button {
    padding: 8px 16px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 17px;
    font-weight: 500;
}

#confirm-button {
    background-color: var(--accent);
    color: white;
}

#confirm-button:hover {
    opacity: 0.9;
}

</style>
