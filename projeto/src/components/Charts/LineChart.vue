
<template>
  <div>
    <Line ref="lineChart" :data="lineData" :options="lineOptions" />
  </div>
</template>

<script>
import { color } from 'chart.js/helpers';
import { computed } from 'vue';
import { Line } from 'vue-chartjs';

export default {
  props: {
    labels: {
        type: Array,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    data: {
        type: Array,
        required: true
    },
    color: {
        type: String,
        required: false,
        default: 'rgba(75, 192, 192, 1)'
    },
    legendcolor: {
        type: String,
        required: false,
        default: 'rgba(180, 180, 180, 0.8)'
    },
    gridcolor: {
        type: String,
        required: false,
        default: 'rgba(180, 180, 180, 0.8)'
    }
  },
  components: {
    Line
  },
  setup(props) {
    const lineData = computed(() => ({
      labels: props.labels,
      datasets: [
        {
          label: props.label,
          data: props.data,
          borderColor: props.color,
          backgroundColor: 'rgba(105, 145, 153, 0.2)',
          tension: 0.3,
        },
      ],
    }));
    const lineOptions = computed(() => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          x: {
              grid: {color: props.gridcolor},
              ticks: {color: props.legendcolor}
          },
          y: {
              grid: {color: props.gridcolor},
              ticks: {color: props.legendcolor}
          }
      },
      color: 'rgba(105, 145, 153, 1)',
    }));
    return { lineData, lineOptions };
  },
}
</script>