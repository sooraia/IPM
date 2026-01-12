<template>
    <div class="card">
        <span style="font-weight: 700;">{{ nomeAlojamento }}</span>
        <span>{{ avaliacaoAlojamento }}</span>
    </div>
</template>

<script setup>

const props = defineProps({
    nomeAlojamento: {
        type: String,
        required: true
    },
    avaliacaoAlojamento: {
        type: Number,
        required: true
    }
});
</script>

<style scoped>
.card {
    background-color: var(--label-text-blue);
    min-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin: 5px;
    border-radius: 5px;
}
</style>