<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6>{{ title }}</h6>
      <p v-if="loading" class="text-sm">
        <i class="fas fa-circle-notch fa-spin"></i>
        <span class="font-weight-bold">{{ detail1 }}</span>
      </p>
    </div>
    <div class="p-3 card-body">
      <div class="chart">
        <v-chart class="chart" :option="option" autoresize />
      </div>
    </div>
  </div>
</template>
<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, defineComponent } from 'vue';
import BatteryService from '../../../services/battery/BatteryService.js'

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  LegendComponent
]);

export default defineComponent({
  components: {
    VChart,
  },
  props: {
    title: {
      type: String,
      default: "Battery Optimization",
    },
  },
  data() {
    return {
      loading: true,
      detail1: "Loading...",
    }
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  async mounted() {
    this.loading = true;
    const now_hour = new Date().getHours();

    this.detail1 = " Getting Batteries Historic";
    await this.loadHistoric(now_hour);

    this.detail1 = " Optimizing Batteries";
    await this.loadOptimization(now_hour);

    this.option.xAxis.axisPointer.value = now_hour.toString();
    this.loading = false;
  },
  methods: {
    async loadHistoric(now_hour) {
      let historic = await BatteryService.getBatteriesHistoric();
      this.option.xAxis.data = [now_hour - 5, now_hour - 4, now_hour - 3, now_hour - 2, now_hour - 1, now_hour];

      for (var i = 0; i < historic['historic'].length; i++) {
        let num = historic['names'][i].slice(-1)
        let capacity = 2.4;
        if (num % 2 == 0){
            capacity = 3.6;
        }
        for (var j = 0; j < historic['historic'][i].length; j++) {
            historic['historic'][i][j] = historic['historic'][i][j] / 100 * capacity;
        }
      }
      for (i = 0; i < historic['historic'].length; i++) {
        this.option.series.push({
          name: historic['names'][i],
          type: 'line',
          data: historic['historic'][i],
          showSymbol: false,
          smooth: false,
        });
      }
    },
    async loadOptimization(now_hour) {
      let optimization = await BatteryService.getBatteriesOptimization();
        
      this.option.xAxis.data = this.option.xAxis.data.concat([now_hour + 1, now_hour + 2, now_hour + 3, now_hour + 4, now_hour + 5, now_hour + 6]);
      
      let legend = [];
      for (var i = 0; i < optimization['y_batteries'].length; i++) {
        var seriesName = optimization['y_batteries'][i][0];
        legend.push(seriesName);

        var array = [NaN, NaN, NaN, NaN, NaN, ...optimization['y_batteries'][i][1]];

        this.option.series.push({
          name: legend[i],
          type: 'line',
          lineStyle: {
            type: 'dashed'
          },
          data: array,
          showSymbol: false,
          smooth: false,
        });
      }
      this.option.legend.data = legend;
      
    },
  },
  setup() {
    const option = ref({
      tooltip: {
        trigger: 'axis',
        //triggerOn: 'none',
      },
      legend: {
        data: []
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisPointer: {
          triggerOn: 'none',
          value: '0',
          snap: true,
          lineStyle: {
            color: '#7581BD',
            width: 2
          },
          label: {
            show: true,
            backgroundColor: '#7581BD'
          },
          handle: {
            show: true,
            color: '#7581BD'
          }
        },
      },
      yAxis: {
        type: 'value'
      },
      series: []
    });
    return { option };
  },
});
</script>

<style scoped>
.chart {
  height: 30vh;
}
</style>
