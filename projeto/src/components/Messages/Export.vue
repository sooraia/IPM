<template>
    <div id="screen" @click="close">
        <div id="export-overlay" @click.stop>
            <div id="title">
                <img src="@/assets/export-blue.png" alt="Export" id="export-icon"/>
                <h3>Export Chart</h3>
            </div>
                <p id = "format-choice-subtitle">Choose your format:</p>
            <div id="button-group">
                <label class="radio-label">
                    <input type="radio" v-model="selectedFormat" value="png"/>
                    <div class="export-format">
                        <h4>PNG</h4>
                        <p class = "export-description">Download Image for quick sharing</p>
                    </div>
                    </label>
                <label class="radio-label">
                    <input type="radio" v-model="selectedFormat" value="pdf" >
                    <div class="export-format">
                        <h4>PDF</h4>
                        <p class = "export-description">Save as document</p>
                    </div>
                </label>
            </div>
            <div class="button-group">
                <Button :buttonLabel="'Download'" @click="downloadChart"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from '@/components/Button.vue';

const emit = defineEmits(['close', 'download']);
const selectedFormat = ref('png');

const close = () => {
    emit('close');
};

const downloadChart = () => {
    console.log('Downloading chart as', selectedFormat.value);
    emit('download', selectedFormat.value);
    emit('close');
};
</script>

<style scoped>
.button-group{
    justify-content: center;
    gap: 12px;
    display: flex;
    justify-content: center;
}

Button {
    margin-top: 20px;
    background-color:rgba(100, 179, 210, 1);
    color: var(--white);
    font-weight: bold;
    box-shadow: var(--shadow) 0px 2px 4px -1px;
    width: 60%;
}

Button:hover {
    background-color: rgb(86, 166, 198);
}

#title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

#export-icon {
    width: 40px;
    height: 40px;
}

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
    z-index: 9999;
}

#export-overlay {
    background-color: rgba(225, 232, 234, 1);
    border-radius: 10px;
    padding: 30px;
    min-width: 350px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 3px solid rgba(100, 179, 210, 1);
}

h3 {
    margin: 0;
    font-size: 25px;
    font-weight: bold;
    color: var(--accent);
}

#format-choice-subtitle {
    margin: 0 0 20px 0;
    color: rgba(85, 85, 85, 1);
    font-size: 20px;
    font-weight: bold;
}

.radio-label {
    display: flex;
    gap: 10px;
    cursor: pointer;
    padding: 12px;
    border-radius: 10px;
}

.radio-label:hover {
    background-color: rgba(107, 155, 209, 0.1);
}

.radio-label input[type="radio"] {
    cursor: pointer;
    width: 20px;
    height: 20px;
    accent-color: var(--accent);
}

#confirm-button:hover {
    background-color: #5a88bf;
}

.export-description {
    margin: 4px 0 0 0;
    color: var(--accent);
    font-size: 16px;
}

h4{
    margin: 0;
    font-size: 19px;
    font-weight: 600;
    color: var(--accent);
}
</style>