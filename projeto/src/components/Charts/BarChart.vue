<template>
  <div>
    <Bar :data="barData" :options="barOptions" />
  </div>
</template>


<script>
import {Bar} from 'vue-chartjs';
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
  data() {
    return {
      barData: {
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            data: this.data,
            backgroundColor: this.barcolors,
            borderWidth: 1,
            borderColor: this.barcolors,
            borderRadius: this.borderradius,
            borderSkipped: false,
          },
        ],
      },
      barOptions: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            x: {
                grid: {color: this.gridcolor},
                ticks: {color: this.legendcolor}
            },
            y: {
                grid: {color: this.gridcolor},
                ticks: {color: this.legendcolor}
            }
        },
        color: this.legendcolor
      }
    }
  },
  watch: {
    data(newdata) {
      this.barData.datasets[0].data = newdata;
    },
    labels(newlabels) {
      this.barData.labels = newlabels;
    },
    label(newlabel) {
      this.barData.datasets[0].label = newlabel;

    },
    barcolors(newcolors) {
      this.barData.datasets[0].backgroundColor = newcolors;
      this.barData.datasets[0].borderColor = newcolors;
    }
  }
}
</script>