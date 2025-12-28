<template>
    <LabelMenu title='Analysis Category' id="labelMenu"/>
    <div class="category-container">  
        <p class="subtitle">Show Proportions by:</p>
        <CategoryMetrics 
            v-model:metricSelected="metricSelected" 
            :metrics = "metricsList" 
        />
    </div>
            
    <LabelMenu title="Advanced Filters" id="labelMenu"/>
    <div class="category-container">  
        <p class="subtitle">Show Results for:</p>
        <SizeResults v-model:sizeRes="sizeResSelected"/>
    </div>

    <div class="category-container">  
        <p class="subtitle">Price (per night):</p>
        <RangeBar v-model="priceRange" 
                        :min="0" 
                        :max="1500"
                        :gap="100"
                        :currency="true"/>
    </div>

    <div class="category-container">
        <DateRange />
    </div>

    <ResetButton @click="resetFilters" />
</template>

<script setup>
import { computed, ref } from 'vue';
import DateRange from '../SideBar/DateRange.vue';
import RangeBar from '../SideBar/RangeBar.vue';
import CategoryMetrics from '@/components/SideBar/CategoryMetrics.vue'
import LabelMenu from '@/components/SideBar/LabelMenu.vue'
import SizeResults from '../SideBar/SizeResults.vue';
import ResetButton from '../SideBar/ResetButton.vue';

    const priceRange = ref([0, 1500]);

    //forma como um componente pai envia dados para um componente filho
    const props = defineProps({ 
        metricsValue: { type: String, default: 'Property Type' },
        sizeRes: { type: String, default: 'Entire City'},
    })

    //forma do filho responder ao pai ou pedir que ele mude alguma coisa
    const emit = defineEmits([
        'update:metricsValue', 
        'update:sizeRes'
    ])

    const metricsList = ["Property Type", "Reviews", "Host Type", "License Status"]
    const metricSelected = computed({
        get: () => props.metricsValue,
        set: (val) => emit('update:metricsValue', val)
    })

    const sizeResSelected = computed({
        get: () => props.sizeRes,
        set: (val) => emit('update:sizeRes', val)
    })

    function resetFilters(){
        metricSelected.value = 'Property Type'
        sizeResSelected.value = 'Entire City'
        priceRange.value = [0, 1500]
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
</style>
