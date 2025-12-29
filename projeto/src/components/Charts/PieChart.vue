<template>
  <div>
    <Pie ref="pieChart" :data="pieData" :options="pieOptions" />
  </div>
</template>

<script>
import {Pie } from 'vue-chartjs';
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
  data() {
    return {
      pieData: {
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            data: this.data,
            backgroundColor: this.colors,
            borderWidth: this.borderWidth,
          },
        ],
      },
      pieOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: this.legendcolor,
            }
          },
          datalabels: {               // use "datalabels" key
            color: this.legendcolor,
            display: true
          }
        }
      }
    }
  },
    watch: {
        data(newdata) {
        this.pieData.datasets[0].data = newdata;
            this.update();
        },
        labels(newlabels) {
        this.pieData.labels = newlabels;
            this.update();
        },
        colors(newcolors) {
        this.pieData.datasets[0].backgroundColor = newcolors;
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
