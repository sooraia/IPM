<template>
    <div class="metrics-container">
        <label>
            <input type="radio" name="sizeRes" class="select-metric" :value="'Entire City'" v-model="sizeResSelected" />
            Entire City
        </label>
        <label>
            <input type="radio" name="sizeRes" class="select-metric" :value="'Neighbourhood'" v-model="sizeResSelected" />
            Neighbourhood
        </label>
        <div @click="selectNeighbourhood" class="search-wrapper">
            <SearchInput 
                :placeholderText="'Search Neighbourhood'" 
                :disabled="sizeResSelected !== 'Neighbourhood'"
                class="input-neighbourhood"
            />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import SearchInput from '../SearchInput.vue';

const props = defineProps({
        sizeRes: { type: String, default: 'Entire City'}
    })
    
const emit = defineEmits([
        'update:sizeRes'
    ])

const sizeResSelected = computed({
        get: () => props.sizeRes,
        set: (val) => emit('update:sizeRes', val)
    })

const selectNeighbourhood = () => {
    sizeResSelected.value = 'Neighbourhood'
}
</script>

<style scoped>
.metrics-container{
    color: var(--metrics-text);
    display: flex;
    flex-direction: column;
}

.search-wrapper {
    width: 85%;
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin-left: 35px;
}

.input-neighbourhood:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
.input-neighbourhood{
    background-color: rgba(217, 217, 217, 1);
    margin-top: 10px;
    align-self: center;
}

.select-metric{
    accent-color: var(--accent);
    margin-top: 5px;
    margin-left: 18px;
}
</style>