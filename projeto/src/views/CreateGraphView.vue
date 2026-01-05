<template>
    <CreateGraphRank v-if="chartType === 'Rank'" />
    <CreateGraphTrend v-else-if="chartType === 'Trend'" />
    <CreateGraphPie v-else-if="chartType === 'Pie'" />
</template>

<script setup>
import { defineProps } from 'vue'
import CreateGraphRank from '@/components/ChartFilters/createGraphRank.vue'
import CreateGraphTrend from '@/components/ChartFilters/createGraphTrend.vue' 
import CreateGraphPie from '@/components/ChartFilters/createGraphPie.vue'

const props = defineProps({
  chartType: String
})

</script>


<style scoped>
</style>