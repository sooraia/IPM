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
            <PieChart class ="pieChart"
                :key="metricSelected + priceRange"
                :labels="chartData.labels" 
                :data="chartData.data" 
                :label="metricSelected" 
                :colors="chartColors"
            />
        </template>
        
        <template #share-content>
            <p class = "share-title">City {{metricSelected}} Distribution</p>
            <p class = "share-text">Share of entire homes, private rooms, shared rooms, and hotel rooms in all areas.</p>
            <ButtonsShare
                :chartType="'PieChart'"
                :city="cityName"
                :filters="{
                    metricSelected: metricSelected,
                    sizeRes: sizeRes,
                    priceRange: priceRange
                }"
            />
        </template>
     </chartViewLayout>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PieChartFilters from '@/components/ChartFilters/PieChartFilters.vue'
import PieChart from '@/components/Charts/PieChart.vue'
import ButtonsShare from '../SideBar/3ButtonsShare.vue'
import chartViewLayout from './chartViewLayout.vue'
import { groupDataByCategory } from '@/utils/groupByCategory'
import { fetchListingsForCity } from '@/utils/cityData'
import { formatListings } from '@/utils/chartHelpers'
import { filterListings } from '@/utils/chartFilters'

const route = useRoute()
const cityName = computed(() => route.params.city)

const metricSelected = ref('Property Type')
const sizeRes = ref('Entire City')
const priceRange = ref([0, 1500])
const maxPrice = ref(1500)
const chartColors = [
    'rgba(242, 144, 47, 0.8)',
    'rgba(60, 195, 223, 0.8)',
    'rgba(91, 119, 218, 0.8)',
    'rgba(134, 224, 159, 0.8)',
    'rgb(2, 84, 69, 0.8)',
    'rgb(237, 185, 18, 0.8)'
]

const listings = ref([])

onMounted(async () => {
    const listingsData = await fetchListingsForCity(cityName.value)
    const formattedListings = formatListings(listingsData)
    listings.value = formattedListings.data
    maxPrice.value = formattedListings.maxPrice
    priceRange.value = [0, maxPrice.value]
})

const chartData = computed(() => {
    const cleaned = filterListings(
        listings.value, 
        { priceRange: priceRange.value, neighborhood: sizeRes.value }
    )
    
    if (!cleaned || Object.keys(cleaned).length === 0) {
        return { labels: [], data: [] };
    }

    let metricData = groupDataByCategory(cleaned, metricSelected.value);
    
    return metricData;
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