<template>
  <div class="chart-wrapper" style="height:420px">
    <Bar ref="chart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
Chart.register(...registerables, ChartDataLabels)

const props = defineProps({
  labels: { type: Array, required: true },     // y axis labels
  leftData: { type: Array, required: true },   // values for left side
  rightData: { type: Array, required: true },  // values for right side
  leftLabel: { type: String, default: 'Current' },
  rightLabel: { type: String, default: 'Previous' },
  gridColor: { type: String, default: 'rgba(0,0,0,0.06)' },
  displayLegend: { type: Boolean, default: true }
})

const chart = ref(null)

function absMax(a,b){
  return Math.max(...a.map(Math.abs), ...b.map(Math.abs), 1)
}

const chartData = ref({
  labels: props.labels,
  datasets: [
    {
      label: props.leftLabel,
      data: props.leftData.map(v => -Math.abs(v)), // negative for left side
      backgroundColor: 'rgb(0, 40, 55)',
      borderRadius: 40,
      barThickness: 100
    },
    {
      label: props.rightLabel,
      data: props.rightData.map(v => Math.abs(v)), // positive for right side
      backgroundColor: 'rgba(242,144,47,0.95)',
      borderRadius: 40,
      barThickness: 100
    }
  ]
})

const max = absMax(props.leftData, props.rightData)
const chartOptions = ref({
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      min: -max,
      max: max,
      ticks: {
        callback: v => Math.abs(v).toLocaleString(), // show positive numbers
        color: props.gridColor
      },
      grid: { color: props.gridColor }
    },
    y: {
      stacked: true,
      ticks: { color: props.gridColor }
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
        color: 'white',
        formatter: v => Math.abs(v).toLocaleString(),
        font: { weight: 'semi-bold', size: 14 }
    }
  }
})

// keep reactive to prop changes
watch(() => [props.leftData, props.rightData, props.labels], () => {
  chartData.value.labels = props.labels
  chartData.value.datasets[0].data = props.leftData.map(v => -Math.abs(v))
  chartData.value.datasets[1].data = props.rightData.map(v => Math.abs(v))
  const newMax = absMax(props.leftData, props.rightData)
  chartOptions.value.scales.x.min = -newMax
  chartOptions.value.scales.x.max = newMax
  // update instance
  const inst = chart.value
  const chartInstance = inst?.chart || inst?.$data?._chart || inst?._chart
  if (chartInstance) chartInstance.update()
}, { deep: true })
</script>

<style scoped>
.chart-wrapper { width:100%; }

</style>