<template>
    <div class="card">
        <div class = "main-container">
            <h2>City #{{ CityNumber }}</h2>
            <SearchInput :placeholderText="'Search City or Country..'" :value="value" @update:value="$emit('update:value', $event)"/>
        </div>
    </div>

</template>

<script setup>
import SearchInput from '@/components/SearchInput.vue';
const props = defineProps({
    CityNumber: {
        type: Number,
        required: true
    },
    value: {
        type: String,
        required: false,
        default: ''
    }
});

const emit = defineEmits(['update:value']);
</script>

<style scoped>
.card {
    width: 450px;
    height: 130px;
    border-radius: 25px;
    background-color: var(--accent);
    display: flex;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(4px 4px 4px var(--shadow));
    padding: 0;
}

.main-container {
    padding: 0 20px 0 20px;
    width: 100%;
    text-align: center;
    color: var(--light-blue);
}

h2 {
    margin-bottom: 4%;
}
</style>