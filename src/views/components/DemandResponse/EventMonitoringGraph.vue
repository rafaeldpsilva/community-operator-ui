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
      <div v-if="hasEvent" class="chart">
        <v-chart class="chart" :option="option" autoresize />
      </div>
      <div v-else class="container text-center">
        <p > No Event Ongoing</p>
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
      default: " Loading...",
    },
  },
  data() {
    return {
      loading: true,
      hasEvent: true,
    }
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  mounted() {
    this.getMonitoringValues()
  },
  methods: {
    async getMonitoringValues(){
      const response = await DemandResponseService.getMonitoring();
      console.log('eventmonitoring', response)
      if (response == false){
        this.hasEvent = false;
        this.loading = false;
      } else{
          let aggregated_balance = response['aggregated_balance']
          if (aggregated_balance[0][1] != null) {
              let corrections = aggregated_balance[1];
              
              for(let i = 0; i < corrections.length; i++){
                  for(let j = 0; j < corrections[i].length; j++){
                      if (j <= i+1){
                          this.option.series[i+1].data.push(NaN);
                      } else {
                          //if (j == i){
                          //    this.option.series[i+1].data.push(aggregated_balance[0][j])
                          //}else{
                              this.option.series[i+1].data.push(corrections[i][j]);
                          //}
                      }
                  }
                  //this.option.series[i+1].data = corrections[i]
              }
          }
          console.log(this.option.series[1].data)
          this.option.series[0].data = aggregated_balance[0];
      }
      this.loading = false;
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
          data: []
        },
        {
          name: 'w/o DR',
          type: 'line',
          showSymbol: false,
          data: []
        },
        {
          name: 'w/o Correction 1',
          type: 'line',
          showSymbol: false,
          data: []
        },
        {
          name: 'w/o Correction 2',
          type: 'line',
          showSymbol: false,
          data: []
        },
        {
          name: 'w/o Correction 3',
          type: 'line',
          showSymbol: false,
          data: []
        },
        {
          name: 'w/o Correction 4',
          type: 'line',
          showSymbol: false,
          data: []
        },
        {
          name: 'w/o Correction 5',
          type: 'line',
          showSymbol: false,
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
