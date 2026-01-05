<template>
  <div>
    <Bar :data="barData" :options="barOptions" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { computed } from 'vue';

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
    barcolors: {
      type: [String, Array],
      required: false,
      default: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)']
    },
    legendcolor: {
      type: String,
      required: false,
      default: 'rgba(180, 180, 180, 0.9)'
    },
    gridcolor: {
      type: String,
      required: false,
      default: 'rgba(180, 180, 180, 0.8)'
    },
    borderradius: {
      type: Number,
      required: false,
      default: 0
    }
  },
  components: {
    Bar
  },
setup(props) {
  const barData = computed(() => ({
      labels: props.labels,
      datasets: [{
          label: props.label,
          data: props.data,
          backgroundColor: props.barcolors,
          borderWidth: 1,
          borderColor: props.barcolors,
          borderRadius: props.borderradius,
          borderSkipped: false
        }],}));
  const barOptions = computed(() => ({
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        x: {grid: {color: props.gridcolor },
          ticks: {color: props.legendcolor }
        },
        y: {grid: {color: props.gridcolor},
          ticks: {color: props.legendcolor}
        }
      },
      color: props.legendcolor
    }));
    return {
      barData,
      barOptions
    };
  }
}
</script>