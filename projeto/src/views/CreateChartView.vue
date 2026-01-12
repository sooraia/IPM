<template>
    <component :is="componentToRender" />
</template>

<script setup>
import { defineProps, computed } from 'vue'
import CreateGraphRank from '@/components/ChartFilters/createChartRank.vue'
import CreateGraphTrend from '@/components/ChartFilters/createChartTrend.vue' 
import CreateGraphPie from '@/components/ChartFilters/createChartPie.vue'

const props = defineProps({
  chartType: String
})

const componentToRender = computed(() => {
  switch(props.chartType) {
    case 'BarChart':
      return CreateGraphRank
    case 'LineChart':
      return CreateGraphTrend
    case 'PieChart':
      return CreateGraphPie
    default:
      return CreateGraphRank
  }
})
</script>

<style scoped>
</style>