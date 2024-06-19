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
    
  },
  methods: {
    
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
          'metric1',
          'metric2',
          'metric3',
          'metric4'
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
          data: [
            { value: 12.39, name: 'metric1' },
            { value: 11.7, name: 'metric2' },
            { value: 14.5, name: 'metric3' },
            { value: 19.76, name: 'metric4' },
          ]
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
