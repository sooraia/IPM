<template>
    <router-link id="card" to="dest">
        <div id="content">
            <slot>
                <!-- chart ou imagem do chart -->
            </slot>
        </div>
        <div id="info">
            <div>
                <h2>{{ title }}</h2>
                <button v-if="trashButton"></button>
            </div>
            <p v-if="description">{{ description }}</p>
        </div>
    </router-link>
</template>

<script setup>
    const props = defineProps({
        content: {
            type: Object,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        trashButton: {
            type: Boolean,
            required: false,
            default: false
        },
        dest: {
            type: String,
            required: false,
            default: '#'
        }
    });
</script>

<style scoped>
#card {
    background-color: var(--accent);
    border-radius: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    min-width: 500px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

#card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background-color: rgb(0, 48, 65);
    cursor: pointer;
}

#content {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    background-color: rgba(219, 243, 253, 1);
    border-radius : 20px;
}

#info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 15px 10px 15px;
}

#card h2 {
    font-size: 25px;
    color: var(--bg);
    font-weight: 400;
}
#card p {
    font-size: 20px;
    color: var(--light-blue2);
}
</style>