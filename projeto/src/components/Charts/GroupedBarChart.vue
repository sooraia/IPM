<template>
  <div>
    <Bar :data="barData" :options="barOptions" />
  </div>
</template>


<script>
import { computed } from 'vue';
import {Bar} from 'vue-chartjs';

export default {
  props: {
    labels: {
        type: Array,
        required: true
    },
    label: {
        type: Array,
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
        default: 'rgba(180, 180, 180, 1)'
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
    },
    percentage: {
        type: Boolean,
        required: false,
        default: false
    }
  },
  components: {
    Bar
  },
  setup(props) {
    const barData = computed(()=>({
        labels: props.labels,
        datasets: [
          {
            label: props.label[0],
            data: props.data[0],
            backgroundColor: props.barcolors[0],
            borderWidth: 1,
            borderRadius: props.borderradius,
            borderSkipped: false,
          },
          {
            label: props.label[1],
            data: props.data[1],
            backgroundColor: props.barcolors[1],
            borderWidth: 0,
            borderRadius: 0,
            borderSkipped: false,
          }
        ]
      }
    ));
    const barOptions = computed(() => ({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {color: props.gridcolor},
                ticks: {color: props.legendcolor}
            },
            y: {
                grid: {color: props.gridcolor},
                ticks: {color: props.legendcolor, 
                  callback:function(v) {
                    if (props.percentage) {
                      return v + '%';
                    } else {
                      return v;
                    }
                  }}
            }
        },
        color: 'black',
        plugins: {
          datalabels: {display: false}}
    }));
    return { barOptions, barData};
  }
}
</script>