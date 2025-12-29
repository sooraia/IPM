
<template>
  <div>
    <Line ref="lineChart" :data="lineData" :options="lineOptions" />
  </div>
</template>

<script>
import { color } from 'chart.js/helpers';
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
  data() {
    return {
      lineData: {
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            data: this.data,
            borderColor: this.color,
            backgroundColor: 'rgba(105, 145, 153, 0.2)',
            tension: 0.3,
          },
        ],
      },
      lineOptions: {
        responsive: true,
        maintainAspectRatio: false,
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
        color: 'rgba(105, 145, 153, 1)',
    },
    }
  },
  watch: {
    labels(newlabels) {
      this.lineData.labels = newlabels;
      this.update();
    },
    data(newdata) {
      this.lineData.datasets[0].data = newdata;
      this.update();
    },
    label(newlabel) {
      this.lineData.datasets[0].label = newlabel;
      this.update();
    },
    color(newcolor) {
      this.lineData.datasets[0].borderColor = newcolor;
      this.update();
    }
  },
  methods: {
    update() {
      console.log("updating pie chart");
    }
  }
}
</script>