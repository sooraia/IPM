<template>
    <div>
        <div class="pointer"></div>
        <div class="container-tooltip">
            <h1 id="title">{{ title }}</h1>
            <p id="description">{{ description }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    description: String
});
</script>

<style scoped>

.container-tooltip {
    background-color: var(--accent);
    border-radius: 5px;
    border: 2px solid #F2902F;
    background: #002837;
    max-width: 300px;
    padding: 35px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#title {
    color: var(--bg);
    font-size: 20px;
    font-weight: 700;
    padding-bottom: 10px;
}

#description {
    padding-top: 10px;
    color: var(--bg);
    font-size: 16px;
    border-top: 2px solid var(--light-accent2);
}

.pointer {
    width: 20px;
    height: 20px;
    background-color: var(--accent);
    border-left: 2px solid var(--light-accent2);
    border-bottom: 2px solid var(--light-accent2);
    transform: rotate(135deg);
    position: absolute;
    top: -10px; 
    left: 155px;
}
</style>