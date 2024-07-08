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
import { PieChart } from 'echarts/charts';
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
  PieChart,
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
      default: "Average Metric Score",
    }
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
    this.getMetricsAverage();
  },
  methods: {
    async getMetricsAverage(){
      const average = await DemandResponseService.getMetricsAverage()
      console.log(average)
      const transformedMetrics = Object.entries(average).map(([key, value]) => {
        return {
            value: value,
            name: key
        };
      });
      console.log(transformedMetrics)
      this.option.series[0].data = transformedMetrics
    }
  },
  setup() {
    const option = ref({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
      },
      legend: {
        left: 'center',
        top: 'bottom',
        data: [
          'metric_1',
          'metric_2',
          'metric_3',
          'metric_4'
        ]
      },
      series: [
        {
          name: 'Average Metric Score',
          type: 'pie',
          radius: [20, 140],
          roseType: 'radius',
          itemStyle: {
            borderRadius: 5
          },
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true
            }
          },
          data: []
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
