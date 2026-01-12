<template>
    <LabelMenu title='Analysis Category' id="labelMenu"/>
    <div class="category-container">  
        <p class="subtitle">Show Proportions by:</p>
        <CategoryMetrics 
            v-model:metricSelected="metricSelectedComputed" 
            :metrics = "metricsList" 
        />
    </div>
            
    <LabelMenu title="Advanced Filters" id="labelMenu"/>
    <div class="category-container">  
        <p class="subtitle">Show Results for:</p>
        <SizeResults v-model:sizeRes="sizeResComputed" :suggestionsList="props.neighborhoodsList" @neighbourhoodSelected="handleSearchNeighbourhood"/>
    </div>

    <div class="category-container">  
        <p class="subtitle">Price (per night):</p>
        <RangeBar v-model="priceRangeComputed" 
                        :min="0" 
                        :max="props.maxLimit"
                        :gap="props.maxLimit / 100"
                        :currencySymbol="props.currencySymbol"/>
    </div>

    <Button buttonLabel="Reset Filters" @click="resetFilters" class="button"/>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import RangeBar from '../SideBar/RangeBar.vue';
import CategoryMetrics from '@/components/SideBar/CategoryMetrics.vue'
import LabelMenu from '@/components/SideBar/LabelMenu.vue'
import SizeResults from '../SideBar/SizeResults.vue';
import Button from '../Button.vue';

    const props = defineProps({ 
        metricsValue: { type: String, default: 'Property Type' },
        sizeRes: { type: String, default: 'Entire City'},
        priceRange: { type: Array, default: [0, 1500]},
        maxLimit: { type: Number, default: 1500},
        neighborhoodsList: { type: Array, default: () => []},
        currencySymbol: { type: String, default: ''}
    })

    const emit = defineEmits([
        'update:metricsValue', 
        'update:sizeRes',
        'update:priceRange',
        'neighbourhoodSelected'
    ])

    const metricsList = ["Property Type", "Reviews", "Host Type", "License Status"]

    const metricSelectedComputed = computed({
        get: () => props.metricsValue,
        set: (val) => emit('update:metricsValue', val)
    })

    const sizeResComputed = computed({
        get: () => props.sizeRes,
        set: (val) => emit('update:sizeRes', val)
    })

    const priceRangeComputed = computed({
        get: () => props.priceRange,
        set: (val) => emit('update:priceRange', val)
    })

    function resetFilters(){
        metricSelectedComputed.value = 'Property Type'
        sizeResComputed.value = 'Entire City'
        priceRangeComputed.value = [0, props.maxLimit]
    }

    function handleSearchNeighbourhood(neighbourhood) {
        emit('neighbourhoodSelected', neighbourhood);
    }
</script>

<style scoped>

    .select-metric{
        accent-color: var(--accent);
        margin-top: 5px;
        margin-left: 18px;
    }

    .category-container{
        margin-top: 10px;
        color: rgba(118, 118, 118, 1);
        margin-bottom: 10px;
        width: 90%;
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

    #labelMenu{
        font-size: 18px;
        width: 90%;
        margin-top: 10px;
    }

    .button{
        background-color: var(--bg);
        color: var(--accent);
        border: 3px solid var(--accent);
        cursor: pointer;
        font-size: 15px;
        height: 30px;
    }
</style>
