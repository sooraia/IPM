<template>
    <LabelMenu title="Analysis Category" id="labelMenu"/>
    <div class="category-container">  
        <p class="subtitle">Show Metrics:</p>
        <CategoryMetrics 
            :metrics="metrics" 
            v-model:metricSelected="metricSelectedComputed" />
    </div>
    
    <LabelMenu title="Advanced Filters" id="labelMenu"/>
    <div class="category-container">  
        <div class="rows_number">
            <div class="rows-label">Show</div>
            <select v-model="RowsSelectedComputed" id="select_row" class="select_menu">
                <option v-for="value in source" :key="value" :value="value">{{ value }}</option>
            </select>
            <div class="rows-label">Rows</div>
        </div>
    </div>
    
    <div class="category-container"> 
        <p class="subtitle">Price (per night):</p>
        <RangeBar v-model="priceRangeComputed" 
                        :min="0" 
                        :max="props.maxPrice"
                        :gap="props.maxPrice / 100"
                        :currencySymbol="props.currencySymbol"/>
    </div>

    <div class="category-container">  
        <p class="subtitle">Property Type:</p>
        <select v-model="propertyTypeComputed" id="property-type-selected" class="select_menu">
            <option v-for="p in property_type" :key="p" :value="p">{{ p }}</option>
        </select>
    </div>

    <Button buttonLabel="Reset Filters" @click="resetFilters" class="button"/>
</template>

<script setup>
    import { computed } from 'vue';
    import RangeBar from '../SideBar/RangeBar.vue';
    import LabelMenu from '../SideBar/LabelMenu.vue';
    import CategoryMetrics from '../SideBar/CategoryMetrics.vue';
    import Button from '../Button.vue';

    const metrics = ["Number of Listings", "Average Price per Night", 
                     "Average Review Score", "License Status"];
    const property_type = ["All", "Entire Home", "Private Room", "Shared Room", "Hotel Room"];

    const props = defineProps({ 
        metricsValue: String,
        n_rowsValue: Number,
        priceValue: Array,
        propertyTypeSelected: String,
        maxPrice: { type: Number, default: 1500},
        currencySymbol: { type: String, default: ''}
    })

    const source = computed(() => {
        return Array.from({ length: props.n_rowsValue }, (_, i) => i + 1)
    })

    const emit = defineEmits([
        'update:metricsValue', 
        'update:n_rowsValue',
        'update:propertyTypeSelected',
        'update:priceValue',
        'update:maxPrice'
    ])

    const metricSelectedComputed = computed({
        get: () => props.metricsValue,
        set: (val) => emit('update:metricsValue', val)
    })

    const RowsSelectedComputed = computed({
        get: () => props.n_rowsValue,
        set: (val) => emit('update:n_rowsValue', val)
    })

    const propertyTypeComputed = computed({
        get: () => props.propertyTypeSelected,
        set: (val) => emit('update:propertyTypeSelected', val)
    })

    const priceRangeComputed = computed({
        get: () => props.priceValue || [0, 1500],
        set: (val) => emit('update:priceValue', val)
    })

    function resetFilters() {
        metricSelectedComputed.value = 'Number of Listings'
        propertyTypeComputed.value = 'All'
        RowsSelectedComputed.value = 10
        priceRangeComputed.value = [0, props.maxPrice]
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

    .select_menu{
        font-size: 16px;
        color: var(--metrics-text);
        background-color: rgba(198, 196, 196, 0.425);
        border: 1px solid rgba(118, 118, 118, 1);
        border-radius: 15px;
        padding-left: 10px;
        height: 25px;
    }

    #property-type-selected{
        width: 95%;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 8px;
    }

    #select_row{
        width: 20%;
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