<template>
    <chartViewLayout>
        <template #filters>
            <TrendsFilters 
                v-model:metricsValue="metricSelected" 
                v-model:sizeRes="sizeRes"
                v-model:propertyTypeSelected="propertyType"
                v-model:aggregationValue="aggregation"
                v-model:priceValue="priceRange"
                :maxLimit="maxPrice"
            />
        </template>
            
        <template #chart>
            <div class="charts-container">
                <LineChart 
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
            </div>
        </template>

        <template #share-content>
            <p class = "share-title">{{metricSelected}} Over Time</p>
            <p class = "share-text">Shows {{ aggregation }} changes in the average price per night for active listings.</p>
            <ButtonsShare/>
        </template>
    </chartViewLayout>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import TrendsFilters from '@/components/ChartFilters/TrendsFilters.vue'
import LineChart from '../Charts/LineChart.vue'
import chartViewLayout from './chartViewLayout.vue'
import ButtonsShare from '../SideBar/3ButtonsShare.vue'

const metricSelected = ref('Average Price Per Night')
const aggregation = ref('Monthly')
const priceRange = ref([0, 1500])
const sizeRes = ref('Entire City')
const propertyType = ref('Entire Home')

/*   G R Á F I C O   */
import { useCalendarStore } from '@/stores/calendar';
import { useListingsStore } from '@/stores/listings'
import { parsePrice, filterCalendar } from '@/utils/chartHelpers';
import { calcAveragePerWeek, calcAveragePerMonth, calcAveragePerQuart} from '@/utils/calcChartValues'
import { groupAllCalendarsById } from '@/utils/GroupByCategory';
import { storeToRefs } from 'pinia';

const groupedCalendar = ref({});
const calendarStore = useCalendarStore();
const { calendarData } = storeToRefs(calendarStore);
const listingsStore = useListingsStore();
const { listings } = storeToRefs(listingsStore);
const maxPrice = ref(1500);

onMounted(async () => {
    await listingsStore.fetchListings();
    await calendarStore.fetchCalendar();

    if (calendarData.value.length > 0) {
        groupedCalendar.value = groupAllCalendarsById(calendarData.value, listings.value);
        const prices = listings.value.map(item => parsePrice(item.price));
        const cityMax = Math.max(...prices);
        maxPrice.value = cityMax;
        priceRange.value = [0, maxPrice.value];
    }
});

const calendarFiltered = computed(() => {
    if (!groupedCalendar.value || Object.keys(groupedCalendar.value).length === 0) return {};
    return filterCalendar(groupedCalendar.value, priceRange.value, propertyType.value, metricSelected.value);
});

const processedData = computed(() => {
    const weeklyData = calcAveragePerWeek(calendarFiltered.value);
    if (aggregation.value === 'Monthly') {
        return calcAveragePerMonth(weeklyData);
    } else if (aggregation.value === 'Quarterly') {
        return calcAveragePerQuart(weeklyData);
    }
    return weeklyData;
});

const labels = computed(() => Object.keys(processedData.value));
const dataBC = computed(() => Object.values(processedData.value));
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