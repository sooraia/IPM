<template>
    <LabelMenu title="Analysis Category" id="labelMenu"/>
    <div class="category-container">  
        <p class="subtitle">Show Metrics:</p>
        <CategoryMetrics 
            :metrics="metrics" 
            v-model:metricSelected="metricSelectedComputed"
        />
    </div>
    
    <LabelMenu title="Advanced Filters" id="labelMenu"/>
    <div class="category-container"> 
        <div class="subtitle">Aggregation:</div>
        <select v-model="aggregationTypeComputed" class="selection">
            <option v-for="value in aggregation_types" :key="value" :value="value">{{ value }}</option>
        </select>
    </div>
    
    <div class="category-container"> 
        <p class="subtitle">Price (per night):</p>
        <RangeBar v-model="priceRangeComputed" 
                        :min="0" 
                        :max="props.maxLimit"
                        :gap="100"
                        :currency="true"/>
    </div>

    <div class="category-container">
        <p class="subtitle">Show Results for:</p>
            <SizeResults v-model:sizeRes="sizeResComputed"/>
    </div>


    <div class="category-container">  
        <p class="subtitle">Property Type:</p>
        <select v-model="propertyTypeComputed" class="selection" >
            <option v-for="p in property_type" :key="p" :value="p">{{ p }}</option>
        </select>
    </div>

    <Button buttonLabel="Reset Filters" @click="resetFilters" class="button"/>
</template>

<script setup>
import { computed } from 'vue'
import RangeBar from '../SideBar/RangeBar.vue'
import LabelMenu from '../SideBar/LabelMenu.vue'
import CategoryMetrics from '../SideBar/CategoryMetrics.vue'
import SizeResults from '../SideBar/SizeResults.vue'
import Button from '../Button.vue'

const metrics = ["Average Price Per Night", "Occupancy Rate"]
const aggregation_types = ["Weekly", "Monthly", "Quarterly"]
const property_type = ["All", "Entire Home", "Private Room", "Shared Room", "Hotel Room", "Other"]

const props = defineProps({ 
    metricsValue: { type: String, default: 'Average Price Per Night' },
    sizeRes: { type: String, default: 'Entire City'},
    propertyTypeSelected: { type: String, default: 'Entire Home' },
    priceValue: { type: Array, default: () => [0, 1500] },
    aggregationValue: { type: String, default: 'Monthly' },
    maxLimit: { type: Number, default: 1500}
})

const emit = defineEmits([
    'update:metricsValue', 
    'update:aggregationValue',
    'update:sizeRes',
    'update:priceValue',
    'update:propertyTypeSelected'
])

const metricSelectedComputed = computed({
    get: () => props.metricsValue,
    set: (val) => emit('update:metricsValue', val)
})

const sizeResComputed = computed({
    get: () => props.sizeRes,
    set: (val) => emit('update:sizeRes', val)
})

const propertyTypeComputed = computed({
    get: () => props.propertyTypeSelected,
    set: (val) => emit('update:propertyTypeSelected', val)
})

const aggregationTypeComputed = computed({
    get: () => props.aggregationValue,
    set: (val) => emit('update:aggregationValue', val)
})

const priceRangeComputed = computed({
    get: () => props.priceValue,
    set: (val) => emit('update:priceValue', val)
})


function resetFilters() {
    metricSelectedComputed.value = metrics[0]
    sizeResComputed.value = 'Entire City'
    propertyTypeComputed.value = 'Entire Home'
    aggregationTypeComputed.value = 'Monthly'
    priceRangeComputed.value = [0, 1500]
    priceRangeComputed.value = [0, props.maxLimit]
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

    .button{
        background-color: var(--bg);
        color: var(--accent);
        border: 3px solid var(--accent);
        cursor: pointer;
        font-size: 15px;
        height: 30px;
    }
</style>
