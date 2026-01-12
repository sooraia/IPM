<template>
    <chartViewLayout :chartType="'BarChart'">
        <template #filters>
            <RankingFilters 
                v-model:metricsValue="metricSelected" 
                v-model:n_rowsValue="n_rows"
                v-model:propertyTypeSelected="propertyType"
                v-model:priceValue="priceRange"
                :maxPrice="maxPrice"
                :currencySymbol="currencySymbol"
            />
        </template>

        <template #chart>
            <div class="charts-container">
                <BarChart 
                    :key="metricSelected + n_rows + propertyType + priceRange[0] + priceRange[1]"
                    style="width: 100%; height: 100%;"
                    :labels="Object.keys(chartData).slice(0, n_rows)"
                    :data="Object.values(chartData).slice(0, n_rows)"
                    :label="metricSelected"
                    :barcolors="'rgba(242, 144, 47, 1)'"
                    :horizontal="true"
                />
            </div>
        </template>
        
        <template #share-content>
            <p id = "share-title">Top Neighbour hoods by {{metricSelected}}</p>
            <p id = "share-text">Horizontal bar chart showing the number of listings in each neighborhood, sorted in descending order.</p>
            <ButtonsShare
                chartType="BarChart"
                :city="cityName"
                :filters="{
                    metric: metricSelected,
                    n_rows: n_rows,
                    propertyType: propertyType,
                    priceRange: priceRange
                }"
            />
        </template>
    </chartViewLayout>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import RankingFilters from '@/components/ChartFilters/RankingFilters.vue'
import BarChart from '@/components/Charts/BarChart.vue'
import ButtonsShare from '../SideBar/3ButtonsShare.vue'
import chartViewLayout from './chartViewLayout.vue'
import { fetchListingsForCity } from '@/utils/cityData'
import { formatListings } from '@/utils/chartHelpers'
import { filterListings } from '@/utils/chartFilters'
import { 
    groupByNeighborhoodsByNListings, 
    groupByNeighborhoodsByAvgPrice,
    groupByNeighborhoodsByAvgReviewScore,
    groupByNeighborhoodsByLicenseStatus 
} from '@/utils/groupByCategory'

const route = useRoute()
const cityName = computed(() => route.params.city)

const metricSelected = ref('Number of Listings')
const n_rows = ref(10)
const propertyType = ref('All') 
const maxPrice = ref(1500)
const priceRange = ref([0, maxPrice.value])
const listings = ref({})
const currencySymbol = ref('');

async function loadListings() {
    const listingsData = await fetchListingsForCity(cityName.value)
    const formattedListings = formatListings(listingsData)
    listings.value = formattedListings.data
    maxPrice.value = formattedListings.maxPrice
    priceRange.value = [0, maxPrice.value]
    currencySymbol.value = formattedListings.currencySymbol
}

onMounted(async () => {
    await loadListings()
})

watch( () => cityName.value, async (newCity, oldCity) => {
    if (newCity !== oldCity) {
        await loadListings()
    }
  }
)

const chartData = computed(() => {
    const cleaned = filterListings(
        listings.value, 
        { priceRange: priceRange.value, propertyType: propertyType.value }
    )
    let metricData = {};
    if (metricSelected.value === "Number of Listings") {
        metricData = groupByNeighborhoodsByNListings(cleaned)
    } else if (metricSelected.value === "Average Price per Night") {
        metricData = groupByNeighborhoodsByAvgPrice(cleaned)
    } else if (metricSelected.value === "Average Review Score") {
        metricData = groupByNeighborhoodsByAvgReviewScore(cleaned)
    } else if (metricSelected.value === "License Status") {
        metricData = groupByNeighborhoodsByLicenseStatus(cleaned)
    }

    n_rows.value = Object.keys(metricData).length
    return metricData;
})

</script>


<style scoped>
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

    #share-title{
        font-weight: 700;
        font-size: 50PX;
        margin-left: 20px;
    }

    #share-text{
        font-weight: normal;
        margin: 10px 40px 15px 15px;
        color: rgba(120, 120, 120, 1);
    }
</style>