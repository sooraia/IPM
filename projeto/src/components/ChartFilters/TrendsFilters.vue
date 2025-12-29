<template>
    <LabelMenu title="Analysis Category" id="labelMenu"/>
    <div class="category-container">  
        <p class="subtitle">Show Metrics:</p>
        <CategoryMetrics 
            :metrics="metrics" 
            v-model:metricSelected="metricSelectedT"
        />
    </div>
    
    <LabelMenu title="Advanced Filters" id="labelMenu"/>
    <div class="category-container"> 
        <div class="subtitle">Aggregation:</div>
        <select v-model="aggregationType" class="selection">
            <option v-for="value in aggregation_types" :key="value" :value="value">{{ value }}</option>
        </select>
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
        <p class="subtitle">Show Results for:</p>
            <SizeResults v-model:sizeRes="sizeResSelected"/>
    </div>


    <div class="category-container">  
        <p class="subtitle">Property Type:</p>
        <select v-model="propertyTypeComputed" class="selection" >
            <option v-for="p in property_type" :key="p" :value="p">{{ p }}</option>
        </select>
    </div>

    <ResetButton @click="resetFilters" />
</template>

<script setup>
import { computed, ref } from 'vue'
import RangeBar from '../SideBar/RangeBar.vue'
import LabelMenu from '../SideBar/LabelMenu.vue'
import CategoryMetrics from '../SideBar/CategoryMetrics.vue'
import ResetButton from '../SideBar/ResetButton.vue'
import SizeResults from '../SideBar/SizeResults.vue'

const metrics = ["Average Price Per Night", "Number of Reservations", "Occupancy Rate", "Average Review Score"]
const aggregation_types = ["Weekly", "Monthly", "Quarterly"]
const property_type = ["Entire Home", "Private Room", "Shared Room", "Hotel Room"]

const props = defineProps({ 
    metricsValue: { type: String, default: 'Average Price Per Night' },
    sizeRes: { type: String, default: 'Entire City'},
    propertyTypeSelected: { type: String, default: 'Entire Home' }
})

const emit = defineEmits([
    'update:metricsValue', 
    'update:sizeRes',
    'update:propertyTypeSelected'
])

const metricSelectedT = computed({
    get: () => props.metricsValue,
    set: (val) => 
        emit('update:metricsValue', val)
    
})

const sizeResSelected = computed({
    get: () => props.sizeRes,
    set: (val) => emit('update:sizeRes', val)
})

const propertyTypeComputed = computed({
    get: () => props.propertyTypeSelected,
    set: (val) => emit('update:propertyTypeSelected', val)
})

const aggregationType = ref('Monthly');
const priceRange = ref([0, 1500]);

function resetFilters() {
    selectedMetricT.value = 'Average Price Per Night'
    sizeResSelected.value = 'Entire City'
    propertyTypeComputed.value = 'Entire Home'
    aggregationType.value = 'Monthly'
    priceRange.value = [0, 1500]
}
</script>

<style scoped>

    .selection{
        width: 85%;
        height: 25px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 8px;
        font-size: 16px;
        color: var(--metrics-text);
        background-color: rgba(198, 196, 196, 0.425);
        border: 1px solid rgba(118, 118, 118, 1);
        border-radius: 15px;
        padding-left: 10px;
    }

    .category-container{
        margin-top: 10px;
        margin-bottom: 10px;
        color: rgba(118, 118, 118, 1);
        width: 90%;
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
