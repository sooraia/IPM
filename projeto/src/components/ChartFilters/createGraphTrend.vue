<template>
    <chartViewLayout>
        <template #filters>
            <TrendsFilters 
                v-model:metricsValue="metricSelected" 
                v-model:sizeRes="sizeRes"
                v-model:propertyTypeSelected="propertyType"
                v-model:aggregationType="aggregation"
                v-model:priceValue="priceRange"
                :maxLimit="maxPrice"
            />
        </template>
            
        <template #chart>
            <div class="charts-container">
                <LineChart 
                    :key="metricSelected + aggregation + propertyType + priceRange[0] + priceRange[1]"
                    style="width: 100%; height: 100%;"
                    :labels="labels"
                    :label="metricSelected" 
                    :data="dataBC"
                    color="rgba(242, 144, 47, 1)"
                />
            </div>
        </template>

        <template #share-content>
            <p class = "share-title">{{metricSelected}} Over Time</p>
            <p class = "share-text">Shows {{ aggregation }} changes in the average price per night for active listings.</p>
        </template>
    </chartViewLayout>
</template>


<script setup>
import { ref, computed } from 'vue'
import TrendsFilters from '@/components/ChartFilters/TrendsFilters.vue'
import LineChart from '../Charts/LineChart.vue'
import chartViewLayout from './chartViewLayout.vue'

const metricSelected = ref('Average Price Per Night')
const aggregation = ref('Monthly')
const priceRange = ref([0, 1500])
const sizeRes = ref('Entire City')
const propertyType = ref('Entire Home')


/*   G R Á F I C O   */
import { useListingsStore } from '@/stores/listings';
import { parsePrice } from '@/utils/chartHelpers';
import { groupDataByPopertyType, groupDataByReviewsPerMonth, groupDataByCategory } from '@/utils/GroupByCategory';
import { storeToRefs } from 'pinia'

const listingsStore = useListingsStore();
const { listings } = storeToRefs(listingsStore);
const maxPrice = ref(1500);

onMounted(async () => {
    await listingsStore.fetchListings();
    if (listings.value.length > 0) {
        const prices = listings.value.map(item => parsePrice(item.price));
        const cityMax = Math.max(...prices);
        maxPrice.value = cityMax;
        priceRange.value = [0, cityMax];
    }
});
</script>


<style scoped>
    .searchbar{
        display: flex;
        margin-left: auto;
        width: 90%;
        height: 45px;
        margin-bottom: 30px;
    }

    .subtitle{
        font-size: 18px;
        color: var(--accent);
        margin-left: 10px;
        margin-bottom: 10px;
    }

    .charts-container{
        height: 98%;
        border-radius: 25px;
        padding: 15px;
    }

    .share-title{
        font-weight: 700;
        font-size: 50PX;
        margin-left: 20px;
    }

    .share-text{
        font-weight: normal;
        margin: 10px 40px 15px 15px;
        color: rgba(120, 120, 120, 1);
    }
</style>