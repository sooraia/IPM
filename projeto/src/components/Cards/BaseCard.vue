<template>
    <div class="base-card" :style="{
        backgroundColor: backgroundColor
    }">
        <div class="card-header">
            <h1>{{ title }}</h1>
            <p v-if="subtitle">{{ subtitle }}</p>
        </div>

        <div class="card-content">
            <slot name="content"></slot>
        </div>

        <div class="card-actions" v-if="$slots.actions">
            <slot name="actions"></slot>
        </div>

        <div class="card-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string
    subtitle?: string
    backgroundColor: string
}>()
</script>

<style scoped>
.base-card {
    width: 60%;
    height: auto;
    min-height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 40px;
    justify-content: space-between;
    border-radius: 30px;
    border: 6px solid var(--accent);
    text-align: center;
}

.card-header h1 {
    color: var(--white);
    font-size: 48px;
}

.card-header p {
    color: var(--accent2-t);
    font-size: 20px;
}

.card-content {
    width: 95%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
}

.card-actions {
    margin-top: 20px;
}

.card-footer {
    margin-top: 15px;
}
</style>