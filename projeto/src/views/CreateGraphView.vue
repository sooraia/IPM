<template>
    <div class = "grid-container">
        <div class="filter-column">
            <div class="Filters">
                <RankingFilters 
                    v-if="chartType === 'Ranking'" 
                    v-model:metricsValue="metricSelectedR" 
                    v-model:sizeRes="sizeRes"
                    v-model:propertyTypeSelected="propertyType"
                    v-model:n_rowsValue="n_rows"
                />
                
                <TrendsFilters 
                    v-else-if="chartType === 'Trends'" 
                    v-model:metricsValue="metricSelectedT" 
                    v-model:sizeRes="sizeRes"
                />
                
                <PieChartFilters 
                    v-else-if="chartType === 'PieChart'" 
                    v-model:metricsValue="metricSelectedP" 
                    v-model:sizeRes="sizeRes"
                />
            </div>
        </div>

        <div class="main-column">
            <p class="subtitle">Chart Type:</p>
            <div class="charts-container">
                <label v-for="t in metrics" :key="t">
                    <input type="radio" name="chartType" :value="t" v-model="chartType" />
                    {{ t }}
                </label>


                <p>Size Results: {{ sizeRes }} </p>
                <p>propertyType: {{ propertyType }}</p>
                <p>rows: {{ n_rows }}</p>
            </div>
        </div>
        
        <div class = "share-column">
            <p class = "subtitle" style="font-weight: bold;">City:</p>
            <SearchBar class = "searchbar"></SearchBar>
            <p class = "share-title">{{ shareTitle }}</p>
            <p class = "share-text">{{ shareText }}</p>
        </div>
    </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import RankingFilters from '@/components/ChartFilters/RankingFilters.vue'
import TrendsFilters from '@/components/ChartFilters/TrendsFilters.vue'
import PieChartFilters from '@/components/ChartFilters/PieChartFilters.vue'

const chartType = ref('Ranking')
const metricSelectedP = ref('Property Type')
const metricSelectedT = ref('Average Price Per Night')
const metricSelectedR = ref('Number of Listings')
const sizeRes = ref('Entire City')
const propertyType = ref('Entire Home')
const n_rows = ref(1)

const metrics = ["Ranking", "Trends", "PieChart"]

const shareDescriptions = {
    Ranking: 'Horizontal bar chart showing the number of listings in each neighborhood, sorted in descending order.',
    PieChart: 'Share of entire homes, private rooms, shared rooms, and hotel rooms in all areas.',
    Trends: 'Shows monthly changes in the average price per night for active listings.'
}

const shareTitle = computed(() => {
    switch (chartType.value) {
        case 'Ranking':
            return `Top Neighbour hoods by ${metricSelectedR.value}`
        case 'Trends':
            return `${metricSelectedT.value} Over Time`
        case 'PieChart':
            return `City ${metricSelectedP.value} Distribution`
    }
})

const shareText = computed(() => {
    return shareDescriptions[chartType.value] || ""
})
</script>


<style scoped>
    .Filters{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .grid-container{
        display: flex;
        width: 100%;
        max-height: calc(100vh - 190px);
    }

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

    .filter-column{
        width: 20%;
        padding: 25px 7px;
        overflow-y: auto;
        max-height: 100%;
        box-sizing: border-box;
    }

    .main-column{
        width: 60%;
        padding: 30px 15px;
    }

    .share-column{
        width: 20%;
        padding: 30px 15px;
        overflow-y: scroll;
    }

    .charts-container{
        display: flex;
        flex-direction: column;
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