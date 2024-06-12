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
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, defineComponent } from 'vue';
import DemandResponseService from '../../../services/demandresponse/DemandResponseService.js';

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
]);

export default defineComponent({
  components: {
    VChart,
  },
  props: {
    title: {
      type: String,
      default: "Event Monitoring",
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
  },
  methods: {
    async getMonitoringValues(){
      const monitoring = await DemandResponseService.getMonitoring();
      console.log(monitoring);
    }
  },
  setup() {
    const option = ref({
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['w/ DR', 'w/o DR', 'w/o Correction 1', 'w/o Correction 2', 'w/o Correction 3', 'w/o Correction 4', 'w/o Correction 5']
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
        data: [0, 10, 20, 30, 40, 50, 60]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'w/ DR',
          type: 'line',
          showSymbol: false,
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'w/o DR',
          type: 'line',
          showSymbol: false,
          data: [150, 182, 191, 154, 190, 330, 310]
        },
        {
          name: 'w/o Correction 1',
          type: 'line',
          showSymbol: false,
          data: [NaN, 232, 201, 234, 290, 370, 410]
        }
      ]
    });
    return { option };
  },
});
</script>

<style scoped>
.chart {
  height: 40vh;
}
</style>
