<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6>{{ title }}</h6>
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
    detail1: {
      type: String,
      default: "4% more",
    },
    detail2: {
      type: String,
      default: "in 2021",
    },
  },
  data() {
    return {
      loading: true,
    }
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  mounted() {
    this.loadBatteryOptimization();
  },
  methods: {
    async loadBatteryOptimization() {
      /* let optimization = {
        "bought": [4.321000000000001, 0.2, 0.4, 3.8, 0.4, 6.0, 0.8, 0.0, 0.0, 0.0, 0.0, 1.5444083333333332, 6.0, 6.0, 4.47243888888889, 3.481740972222222, 0.5763548611111116, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        "gen": [0.4, 0.2, 0.4, 0.6, 0.4, 0.2, 0.8, 1.0, 1.8, 2.4, 4.0, 6.0, 5.0, 3.2, 2.6, 3.8, 4.2, 1.8, 1.0, 0.6, 0.4, 0.8, 0.8, 0.0], "sold": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        "x": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0],
        "y_batteries": [
          ["Building1_Battery_4", [0.9, 0.9, 0.9, 0.99, 0.99, 2.7, 2.7, 2.7, 2.11, 1.22, 0.9, 0.9, 0.9, 2.61, 2.7, 2.68, 1.80, 0.89, 0.90, 0.90, 0.90, 0.90, 0.90, 0.90]],
          ["Building1_Battery_5", [0.6, 0.6, 0.6, 1.80, 1.80, 1.80, 1.80, 1.38, 1.38, 1.38, 0.6, 0.6, 1.80, 1.80, 1.80, 1.80, 0.60, 0.60, 0.60, 0.60, 0.60, 0.60, 0.60, 0.60]],
          ["Building1_Battery_6", [0.9, 0.9, 0.9, 1.51, 1.51, 2.7, 2.7, 2.7, 2.7, 2.7, 2.50, 0.9, 0.92, 1.14, 2.7, 2.7, 2.7, 2.7, 2.2, 1.90, 1.70, 1.30, 0.90, 0.90]],
          ["Building2_Battery_1", [0.6, 0.6, 0.6, 0.6, 0.6, 1.80, 1.80, 1.80, 1.21, 0.6, 0.6, 0.6, 0.62, 1.80, 1.80, 1.80, 1.5, 0.60, 0.60, 0.60, 0.60, 0.60, 0.60, 0.60]],
          ["Building2_Battery_2", [0.9, 0.9, 0.9, 1.0, 1.0, 2.7, 2.7, 2.7, 2.7, 2.7, 1.90, 0.9, 0.9, 1.65, 2.7, 2.7, 2.7, 1.70, 1.70, 1.70, 1.70, 1.30, 0.90, 0.90]],
          ["Building2_Battery_3", [0.6, 0.6, 0.6, 1.80, 1.80, 1.80, 1.80, 1.38, 1.38, 1.10, 0.6, 0.6, 1.80, 1.80, 1.80, 1.80, 0.6, 1.6, 1.1, 0.8, 0.60, 0.60, 0.60, 0.60]]]
      }; */
      let optimization = await BatteryService.getBatteriesOptimization();
      let legend = [];

      const now_hour = new Date().getHours()
      
      this.option.xAxis.data = [now_hour - 5, now_hour - 4, now_hour - 3, now_hour - 2, now_hour - 1, now_hour, now_hour + 1, now_hour + 2, now_hour + 3, now_hour + 4, now_hour + 5, now_hour + 6]

      for (var i = 0; i < optimization['y_batteries'].length; i++) {
        var seriesName = optimization['y_batteries'][i][0]
        legend.push(seriesName)

        var array = [NaN, NaN, NaN, NaN, NaN, ...optimization['y_batteries'][i][1].slice(now_hour - 1)]

        this.option.series.push({
          name: legend[i],
          type: 'line',
          lineStyle: {
            type: 'dashed'
          },
          data: array,
          showSymbol: false,
          smooth: false,
        })
      }
      //var historic = await BatteryService.getBatteriesHistoric();
      var historic = { "historic": [[99.76, 99.92, 99.84, 99.81, 99.8, 99.9], [99.86, 99.86, 99.78, 99.84, 99.88, 99.82], [99.85, 99.88, 99.77, 99.86, 99.8, 99.85], [80.0, 80.0, 80.0, 79.89, 79.0, 79.0], [99.8, 99.84, 99.78, 99.83, 99.8, 99.8], [99.87, 100.0, 100.0, 100.0, 99.77, 100.0]], "names": ["Building1_Battery_4", "Building1_Battery_5", "Building1_Battery_6", "Building2_Battery_1", "Building2_Battery_2", "Building2_Battery_3"] }
      
      for (i = 0; i < historic['historic'].length; i++) {
        for (var j = 0; j < historic['historic'][i].length; j++) {
          historic['historic'][i][j] = historic['historic'][i][j] / 100 * 3.6
        }
      }
      for (i = 0; i < historic['historic'].length; i++) {
        this.option.series.push({
          name: legend[i],
          type: 'line',
          data: historic['historic'][i],
          showSymbol: false,
          smooth: false,
        })
      }

      this.option.xAxis.axisPointer.value = now_hour.toString();
      this.option.legend.data = legend
    }
  },
  setup() {
    const option = ref({
      tooltip: {
        trigger: 'axis',
        triggerOn: 'none',
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
