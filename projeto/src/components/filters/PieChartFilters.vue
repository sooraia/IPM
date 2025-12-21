<template>
    <TitleContainer id="titleContainer" texto="Analysis Category"/>
    <div class="category-container">  
        <p class="subtitle">Show Proportions by:</p>
        <div class="metrics-container">
            <label v-for="m in metrics" :key="m">
                <input type="radio" name="metric" class="select-metric" :value="m" v-model="metricSelected" />
                {{ m }}
            </label>
        </div>
    </div>
    
    <TitleContainer id="titleContainer" texto="Advanced Filters"/>
    <div class="category-container">  
        <p class="subtitle">Show Results for:</p>
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
    </div>
    <div class="category-container">
        <p class="subtitle">Price (per night):</p>
        <div class="price-slider-container">
        <span class="price-label">0€</span>
        
        <input 
            type="range" 
            min="0" 
            max="1500" 
            step="10" 
            v-model="maxPrice" 
            class="slider"
        />
        
        <span class="price-label">{{ maxPrice }}€</span>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import TitleContainer from '../TitleFilters.vue';
    import SearchInput from '../SearchInput.vue';

    //forma como um componente pai envia dados para um componente filho
    const props = defineProps({ 
        metricsValue: { type: String, default: 'Property Type' },
        sizeRes: { type: String, default: 'Entire City'}
    })

    //forma do filho responder ao pai ou pedir que ele mude alguma coisa
    const emit = defineEmits(['update:metricsValue', 'update:sizeRes'])

    const metrics = ["Property Type", "Reviews", "Host Type", "License Status"]
    const metricSelected = computed({
        get: () => props.metricsValue,
        set: (val) => emit('update:metricsValue', val)
    })

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
        display: flex;
        flex-direction: column;
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

    .category-container{
        margin-top: 15px;
        color: rgba(118, 118, 118, 1);
        margin-bottom: 20px;
    }

    #titleContainer{
        font-size: 20px;
    }

    .subtitle{
        font-size: 18px;
        color: var(--accent);
        margin-left: 10px;
        margin-bottom: 5px;
    }

    .search-wrapper {
        width: 85%;
        display: flex;
        justify-content: center;
        cursor: pointer;
        margin-left: 35px;
    }

    .input-neighbourhood:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    
</style>
