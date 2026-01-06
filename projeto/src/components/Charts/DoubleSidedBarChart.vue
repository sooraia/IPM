<template>
  <div class="chart-wrapper" style="height:420px">
    <Bar ref="chart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { onMounted } from 'vue'
Chart.register(...registerables, ChartDataLabels)

const props = defineProps({
  labels: { type: Array, required: true },
  leftData: { type: Array, required: true },
  rightData: { type: Array, required: true },
  leftLabel: { type: String, default: 'Current' },
  rightLabel: { type: String, default: 'Previous' },
  gridColor: { type: String, default: 'rgba(0,0,0,0.06)' },
  displayLegend: { type: Boolean, default: true }
})

function absMax(a,b){
  return Math.max(...a.map(Math.abs), ...b.map(Math.abs), 1)
}

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: props.leftLabel,
      data: props.leftData.map(v => -Math.abs(v)),
      backgroundColor: 'rgb(0, 40, 55)',
      borderRadius: 40,
      barThickness: 100
    },
    {
      label: props.rightLabel,
      data: props.rightData.map(v => Math.abs(v)),
      backgroundColor: 'rgba(242,144,47,0.95)',
      borderRadius: 40,
      barThickness: 100
    }
  ]
}))

const compmax = computed(() => {
  return absMax(props.leftData, props.rightData)
})
const chartOptions = computed(() => {
  const max = compmax.value;
    return { 
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          min: -max,
          max: max,
          ticks: {
            callback: v => Math.abs(v).toLocaleString(),
            color: props.gridColor
          },
          grid: { color: props.gridColor },
          border: { display: false }
        },
        y: {
          stacked: true,
          ticks: { color: props.gridColor },
          grid: { color: props.gridColor },
          border: { display: false}
        }
      },
      plugins: {
        legend: { display: props.displayLegend,position: 'top', labels: { color: props.gridColor  } },
        tooltip: {
          callbacks: {
            label(ctx) {
              return ctx.dataset.label + ': ' + Math.abs(ctx.raw).toLocaleString()
            }
          }
        },
        datalabels: {
            color: 'rgb(225, 232, 234, 0.9)',
            formatter: v => Math.abs(v).toLocaleString(),
            font: { family: 'Josefin Sans', size: 25,weight: 500,lineHeight: 1.2 }
        }
      }
}})
</script>

<style scoped>
.chart-wrapper { width:100%; }

</style>