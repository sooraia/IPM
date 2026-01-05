<template>
  <div>
    <Pie ref="pieChart" :data="pieData" :options="pieOptions" />
  </div>
</template>

<script>
import {Pie } from 'vue-chartjs';
import { computed } from 'vue';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { color } from 'chart.js/helpers';
import { sys } from 'typescript';

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
    colors: {
        type: [String, Array],
        required: false,
        default: 'rgba(75, 192, 192, 1)'
    },
    legendcolor: {
        type: String,
        required: false,
        default: 'rgba(180, 180, 180, 0.8)'
    },
    borderWidth: {
        type: Number,
        required: false,
        default: 1.5
    }
  },
  components: {
    Pie
  },
  setup(props) {
    const pieData= computed(() => ({
      labels: props.labels,
      datasets: [
        {
          label: props.label,
          data: props.data,
          backgroundColor: props.colors,
          borderWidth: props.borderWidth,
        }
      ],
    }));
    const pieOptions = computed(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: props.legendcolor,
            }
          },
          datalabels: {
            color: props.legendcolor,
            display: true
          }
        },
    }));
    return { pieData, pieOptions };
  }
}
</script>
