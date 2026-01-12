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
            <SearchInput v-if="suggestionsList.length > 0"
                :placeholderText="'Search Neighbourhood'" 
                :disabled="sizeResSelected !== 'Neighbourhood'"
                :style="{
                    '--bg': 'rgba(217, 217, 217, 1)',
                    'margin-top': '10px',
                    'align-self': 'center',
                    'border': '2px solid gray',
                    'border-radius': '15px'
                    }"
                :isValueCity="false"
                :suggestionsList="suggestionsList"
                @keydown.enter="handleSearchNeighbourhood"
            />
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import SearchInput from '../SearchInput.vue';
onMounted(() => {
    if(props.suggestionsList.length > 0){
        console.log('Suggestions List:', props.suggestionsList);
    }
    else {
        console.log('No suggestions provided.');
    }
});

const props = defineProps({
        sizeRes: { type: String, default: 'Entire City'},
        suggestionsList: { type: Array, required: false, default: () => []}
    })
    
const emit = defineEmits([
        'update:sizeRes',
        'neighbourhoodSelected'
    ])

const sizeResSelected = computed({
        get: () => props.sizeRes,
        set: (val) => emit('update:sizeRes', val)
    })

const selectNeighbourhood = () => {
    sizeResSelected.value = 'Neighbourhood'
}


function handleSearchNeighbourhood(event) {
    const neighbourhood = event.target.value;
    console.log('Selected Neighbourhood:', neighbourhood);
    emit('neighbourhoodSelected', neighbourhood);
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

.select-metric{
    accent-color: var(--accent);
    margin-top: 5px;
    margin-left: 18px;
}
</style>