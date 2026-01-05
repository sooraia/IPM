<template>
     <chartViewLayout>
        <template #filters>
            <PieChartFilters 
                v-model:metricsValue = "metricSelected" 
                v-model:sizeRes = "sizeRes"
                v-model:priceRange = "priceRange"
                :maxLimit="maxPrice"
            />
        </template>

        <template #chart>
            <div class="charts-container">
                <PieChart class ="pieChart"
                    :key="metricSelected + priceRange"
                    :labels="pieChartDisplay.labels" 
                    :data="pieChartDisplay.data" 
                    :label="metricSelected" 
                    :colors="chartColors"
                />
            </div>
        </template>
        
        <template #share-content>
            <p class = "share-title">City {{metricSelected}} Distribution</p>
            <p class = "share-text">Share of entire homes, private rooms, shared rooms, and hotel rooms in all areas.</p>
            <ButtonsShare/>
        </template>
     </chartViewLayout>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import PieChartFilters from '@/components/ChartFilters/PieChartFilters.vue'
import PieChart from '@/components/Charts/PieChart.vue'
import ButtonsShare from '../SideBar/3ButtonsShare.vue'
import chartViewLayout from './chartViewLayout.vue'

const metricSelected = ref('Property Type')
const sizeRes = ref('Entire City')
const priceRange = ref([0, 1500]);
const chartColors = [
    'rgba(242, 144, 47, 0.8)',
    'rgba(60, 195, 223, 0.8)',
    'rgba(91, 119, 218, 0.8)',
    'rgba(134, 224, 159, 0.8)',
    'rgb(2, 84, 69, 0.8)',
    'rgb(237, 185, 18, 0.8)'
]

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

const chartData = computed(() => {
    const data = listings.value;
    const cleaned = {};
    if (!data || data.length === 0) return {};

    for (const item of data) {
        const id = item.id;
        const price = parsePrice(item.price);
        let metricValue = 'Unknown';

        if (metricSelected.value === 'Property Type') {
            metricValue = item.property_type;
        } else if (metricSelected.value === 'Reviews') {
            metricValue = item.reviews_per_month;
        } else if (metricSelected.value === 'Host Type') {
            metricValue = item.host_is_superhost === 't' ? 'Superhost' : 'Regular Host';
        } else if (metricSelected.value === 'License Status') {
            metricValue = item.license === 't' ? 'Licensed' : 'No License';
        }
        cleaned[id] = [metricValue, price];
    }
    return cleaned;
});

const pieChartDisplay = computed(() => {
    const cleaned = chartData.value;
    const currentMetric = metricSelected.value ;

    if (currentMetric === 'Property Type') {
        return groupDataByPopertyType(cleaned, priceRange.value);  
    } else if (currentMetric === 'Reviews') {
        return groupDataByReviewsPerMonth(cleaned, priceRange.value);
    } else {
        return groupDataByCategory(cleaned, priceRange.value);
    }
});
</script>


<style scoped>
    .pieChart{
        height: 100%;
    }
    .subtitle{
        font-size: 18px;
        color: var(--accent);
        margin-left: 10px;
        margin-bottom: 10px;
    }

    .charts-container{
        height: 95%;
        background-color: white;
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