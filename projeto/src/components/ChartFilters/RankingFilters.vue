<template>
    <LabelMenu title="Analysis Category" id="labelMenu"/>
    <div class="category-container">  
        <p class="subtitle">Show Metrics:</p>
        <CategoryMetrics 
            :metrics="metrics" 
            v-model:metricSelected="metricSelectedR"/>
    </div>
    
    <LabelMenu title="Advanced Filters" id="labelMenu"/>
    <div class="category-container">  
        <div class="rows_number">
            <div class="rows-label">Show</div>
            <select v-model="nRowsSelected" class="select_row">
                <option v-for="value in source" :key="value" :value="value">{{ value }}</option>
            </select>
            <div class="rows-label">Rows</div>
        </div>
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
        <p class="subtitle">Property Type:</p>
        <select v-model="propertyTypeComputed" class="property-type-selected" >
            <option v-for="p in property_type" :key="p" :value="p">{{ p }}</option>
        </select>
    </div>

    <div class="category-container">
        <DateRange/>
    </div>

    <ResetButton @click="resetFilters" />
</template>

<script setup>
    import { computed, ref } from 'vue';
    import DateRange from '../SideBar/DateRange.vue';
    import RangeBar from '../SideBar/RangeBar.vue';
    import LabelMenu from '../SideBar/LabelMenu.vue';
    import CategoryMetrics from '../SideBar/CategoryMetrics.vue';
    import ResetButton from '../SideBar/ResetButton.vue';

    const priceRange = ref([0, 1500]);
    const source = [1,2,3,4,5,6,7,8,9,10];
    const metrics = ["Number of Listings", "Average Price per Night", "Occupancy Rate", 
                     "Average Review Score", "License Status"];
    const property_type = ["Entire Home", "Private Room", "Shared Room", "Hotel Room"];

    const props = defineProps({ 
        metricsValue: { type: String, default: 'Number of Listings' },
        n_rowsValue: { type: Number, default: 1 },
        propertyTypeSelected: { type: String, default: 'Entire Home' }
    })

    const emit = defineEmits([
        'update:metricsValue', 
        'update:n_rowsValue',
        'update:propertyTypeSelected'
    ])

    const metricSelectedR = computed({
        get: () => props.metricsValue,
        set: (val) => emit('update:metricsValue', val)
    })

    const nRowsSelected = computed({
        get: () => props.n_rowsValue,
        set: (val) => emit('update:n_rowsValue', val)
    })

    const propertyTypeComputed = computed({
        get: () => props.propertyTypeSelected,
        set: (val) => emit('update:propertyTypeSelected', val)
    })


    function resetFilters() {
        metricSelectedR.value = 'Number of Listings'
        propertyTypeComputed.value = 'Entire Home'
        nRowsSelected.value = 1
        priceRange.value = [0, 1500]
    }
</script>

<style scoped>
    .rows_number{
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--accent);
        font-size: 18px;
        justify-content: center;
    }

    .metrics-container{
        display: flex;
        flex-direction: column;
    }

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

    .property-type-selected{
        width: 95%;
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

    .select_row{
        width: 20%;
        height: 25px;
        font-size: 16px;
        color: var(--metrics-text);
        background-color: rgba(198, 196, 196, 0.425);
        border: 1px solid rgba(118, 118, 118, 1);
        border-radius: 15px;
        padding-left: 10px;
    }
</style>