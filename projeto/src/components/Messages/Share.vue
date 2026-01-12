<template>
    <div id="screen" @click="close">
        <div id="export-overlay" @click.stop>
            <h3>Share this Chart via:</h3>
            <div class = "socialMediaIcons">
                <img src="@/assets/linkedin-icon.png" class="social-icon"/>
                <img src="@/assets/facebook-icon.png" class="social-icon"/>
                <img src="@/assets/instagram-icon.png" class="social-icon"/>
                <img src="@/assets/x-icon.png" class="social-icon"/>
                <img src="@/assets/wpp-icon.png" class="social-icon"/>
                <img src="@/assets/reddit-icon.png" class="social-icon"/>
            </div>
            <h3>Or copy link</h3>
            <div class="copy-link-div">
                <input type="text" readonly value="https://airbnbstats.com/user/chart/12345" id="copy-link-input"/>
                <img src="@/assets/link-icon.png" class="link-icon" @click="copyToClipboard"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close', 'copyToClipboard']);

const close = () => {
    emit('close');
};

const copyToClipboard = () => {
    const linkInput = document.getElementById('copy-link-input');
    if (linkInput) {
        linkInput.select();
        navigator.clipboard.writeText(linkInput.value)
            .then(() => {
                emit('copyToClipboard');
            })
    }
};
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
    z-index: 10000;
}

#export-overlay {
    background-color: rgba(225, 232, 234, 1);
    border-radius: 10px;
    padding: 30px;
    min-width: 350px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 3px solid var(--accent2);
}

.socialMediaIcons {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-bottom: 20px;
    margin-top: 5px;
}

.social-icon {
    width: 50px;
    height: 50px;
    cursor: pointer;
}

h3 {
    color: rgba(85, 85, 85, 1);
}

.copy-link-div {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
}

.link-icon {
    width: 35px;
    height: 35px;
    cursor: pointer;
}

#copy-link-input {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--accent);
    border-radius: 10px;
    background-color: rgba(217, 217, 217, 1);
    font-size: 16px;
}
</style>