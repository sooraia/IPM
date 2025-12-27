<template>
    <div class = "grid-container">
        <div class="filter-column">
            <div class="Filters">
                <RankingFilters v-if="chartType === 'Ranking'" v-model:metricsValue="selectedMetric" v-model:sizeRes="sizeRes"/>
                <TrendsFilters v-else-if="chartType === 'Trends'" v-model="selectedMetric"/>
                <PieChartFilters 
                    v-else-if="chartType === 'PieChart'" 
                    v-model:metricsValue="selectedMetric" 
                    v-model:sizeRes="sizeRes"a
                    v-model:maxPriceValue="priceLimit" 
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
import { ref, computed, watch } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import RankingFilters from '@/components/filters/RankingFilters.vue'
import TrendsFilters from '@/components/filters/TrendsFilters.vue'
import PieChartFilters from '@/components/filters/PieChartFilters.vue'
const chartType = ref('Ranking')
const selectedMetric = ref('Property Type')
const sizeRes = ref('Entire City')
const priceLimit = ref(1500)

const metrics = ["Ranking", "Trends", "PieChart"]

const shareDescriptions = {
    Ranking: 'Horizontal bar chart showing the number of listings in each neighborhood, sorted in descending order.',
    PieChart: 'Share of entire homes, private rooms, shared rooms, and hotel rooms in all areas.',
    Trends: 'Shows monthly changes in the average price per night for active listings.'
}

const shareTitle = computed(() => {
    if (!selectedMetric.value) return chartType.value
    switch (chartType.value) {
        case 'Ranking':
            return `Top Neighbour hoods by ${selectedMetric.value}`
        case 'Trends':
            return `${selectedMetric.value} Over Time`
        case 'PieChart':
            return `City ${selectedMetric.value} Distribution`
    }
})

const shareText = computed(() => {
    const base = shareDescriptions[chartType.value] ?? ''
    return selectedMetric.value ? `${base} Métrica selecionada: ${selectedMetric.value}.` : base
})
</script>


<style scoped>
    .grid-container{
        display: flex;
        width: 99%;
    }

    .searchbar{
        display: flex;
        margin-left: auto;
        width: 90%;
        height: 45px;
        margin-bottom: 30px;
    }

    #titleContainer{
        margin-bottom: 12px;
        font-size: 20px;
    }

    .subtitle{
        font-size: 18px;
        color: var(--accent);
        margin-left: 10px;
        margin-bottom: 10px;
    }

    .category{
        margin-bottom: 20px;
    }

    .filter-column{
        width: 20%;
        padding: 30px 35px;
        overflow-y: scroll;
    }

    .main-column{
        width: 60%;
        padding: 30px 15px;
    }

    .share-column{
        width: 20%;
        padding: 30px 15px;
    }

    .charts-container{
        display: flex;
        flex-direction: column;
    }

    label{
        margin: 3px 15px;
        color: var(--metrics-text);
        font-weight: 500;
    }

    .select-metric{
        accent-color: var(--accent);
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