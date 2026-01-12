<template>
    <chartViewLayout :chartType="'LineChart'">
        <template #filters>
            <TrendsFilters 
                v-model:metricsValue="metricSelected" 
                v-model:propertyTypeSelected="propertyType"
                v-model:aggregationValue="aggregation"
                v-model:priceValue="priceRange"
                :maxLimit="maxPrice"
                v-model:sizeRes="sizeRes"
                :neighborhoodsList="neighborhoods"
                @neighbourhoodSelected="handleNeighbourhoodSelected"
                :currencySymbol="currencySymbol"
            />
        </template>
            
        <template #chart>
            <LineChart class ="lineChart"
                v-if="labels.length > 0"
                :key="aggregation" 
                style="width: 100%; height: 100%;"
                :labels="labels"
                :label="metricSelected" 
                :data="dataBC"
                color="rgba(242, 144, 47, 1)"
            /> 
            <div v-else class="no-data-msg">
                No data available for the selected filter.
            </div>
        </template>

        <template #share-content>
            <p class = "share-title">{{metricSelected}} Over Time</p>
            <p class = "share-text">Shows {{ aggregation }} changes in the average price per night for active listings.</p>
            <ButtonsShare
                chartType="LineChart"
                :city="cityName"
                :filters="{
                    metricSelected: metricSelected,
                    aggregation: aggregation,
                    priceRange: priceRange,
                    propertyType: propertyType,
                    neighborhood: selectedNeighbourhood
                }"
            />
        </template>
    </chartViewLayout>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import TrendsFilters from '@/components/ChartFilters/TrendsFilters.vue'
import LineChart from '../Charts/LineChart.vue'
import chartViewLayout from './chartViewLayout.vue'
import ButtonsShare from '../SideBar/3ButtonsShare.vue'
import { filterCalendar } from '@/utils/chartFilters'
import { fetchListingsForCity, fetchCalendarForCity } from '@/utils/cityData'
import { formatCalendar, formatListings } from '@/utils/chartHelpers'
import { groupedCalendarByWeek, groupedCalendarByMonth, groupedCalendarByQuart, getNeighborhoodsList } from '@/utils/groupByCategory'

const route = useRoute()
const cityName = computed(() => route.params.city)

const metricSelected = ref('Average Price Per Night')
const aggregation = ref('Monthly')
const priceRange = ref([0, 1500])
const propertyType = ref('All')
const maxPrice = ref(1500)
const sizeRes = ref('Entire City')
const selectedNeighbourhood = ref('')

const listings = ref([])
const calendar = ref({})
const neighborhoods = ref([])
const currencySymbol = ref('');

async function loadData() {
    const listingsData = await fetchListingsForCity(cityName.value)
    const calendarData = await fetchCalendarForCity(cityName.value)
    listings.value = formatListings(listingsData).data
    calendar.value = formatCalendar(calendarData, listings.value).calendar_data
    maxPrice.value = formatCalendar(calendarData, listings.value).maxPrice
    priceRange.value = [0, maxPrice.value]
    currencySymbol.value = formatListings(listingsData).currencySymbol

}

onMounted(async () => {
    await loadData()
})

watch( () => cityName.value, async (newCity, oldCity) => {
    if (newCity !== oldCity) {
        await loadData()
    }
  }
)

const chartData = computed(() => {
    neighborhoods.value = getNeighborhoodsList(listings.value)
    let aggregatedData = {};

    const filteredCalendar = filterCalendar(
        calendar.value, 
        priceRange.value, 
        propertyType.value,
        sizeRes.value === 'Neighbourhood' ? selectedNeighbourhood.value : 'Entire City'
    );
    const weeklyData = groupedCalendarByWeek(filteredCalendar)

    if (aggregation.value === 'Weekly') {
        Object.entries(weeklyData).forEach(([month, weeks]) => {
            weeks.forEach((week, index) => {
                aggregatedData[`${month} ${index + 1}`] = week;
            });
        });
    } else if (aggregation.value === 'Monthly') {
        aggregatedData = groupedCalendarByMonth(weeklyData)
    } else if (aggregation.value === 'Quarterly') {
        aggregatedData = groupedCalendarByQuart(weeklyData)
    }
    return aggregatedData;
})


const labels = computed(() => {
    return Object.keys(chartData.value);
})

const dataBC = computed(() => {
    return labels.value.map(label => {
        const dataPoint = chartData.value[label];
        if (metricSelected.value === 'Average Price Per Night') {
            return dataPoint[0]; // preço
        } else {
            return dataPoint[1]; // occupancy
        }
    });
})

function handleNeighbourhoodSelected(neighbourhood) {
    let cleanNeighbourhood = neighbourhood.trim();
    if(neighborhoods.value.includes(cleanNeighbourhood)) {
        selectedNeighbourhood.value = neighbourhood;
    } else {
        selectedNeighbourhood.value = '';
    }
}
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