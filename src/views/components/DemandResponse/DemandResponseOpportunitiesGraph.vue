<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <div class="row justify-content-between">
        <div class="col-md-auto">
          <h6>{{ title }}</h6>
          <p v-if="loading" class="text-sm">
            <i class="fas fa-circle-notch fa-spin"></i>
            <span class="font-weight-bold">{{ detail1 }}</span>
          </p>
        </div>
        <div class="col-md-auto justify-content-end">
          <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="showDropdown = !showDropdown">
              Event Hour
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" :class="showDropdown ? 'show' : ''">
              <div v-for="p in dropportunities" :key="p">
                <a class="dropdown-item" @click="setEventHour(p)">{{ p }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import { LineChart, ScatterChart } from 'echarts/charts';
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, defineComponent } from 'vue';
import DemandResponseService from '../../../services/demandresponse/DemandResponseService.js';
import ForecastService from '../../../services/ForecastService.js';

use([
  CanvasRenderer,
  LineChart,
  ScatterChart,
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
      default: "Demand Response Opportunities",
    },
    detail1: {
      type: String,
      default: " Loading...",
    }
  },
  data() {
    return {
      showDropdown: false,
      loading: true,
      dropportunities: [],
    }
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  mounted() {
    //this.setEventHour(null)
    this.getDROpportunities()
  },
  methods: {
    setEventHour(p){
      this.showDropdown = false
      this.$emit("set-event-hour", p)
    },
    async getDROpportunities(){
      this.loading = true;

      this.option.series[0].data = await ForecastService.getConsumption()
      this.option.series[1].data = await ForecastService.getGeneration()
      this.option.series[2].data = await ForecastService.getFlexibility()
      const dro = await DemandResponseService.getDRO()

      if (dro['reducing'].length == 0){
        this.dropportunities = ['No opportunities']
      } else {
        this.dropportunities = Object.keys(dro['reducing']).map(Number)
      }
      const periodArray = Array(24).fill(NaN);
      Object.keys(dro['reducing']).forEach(key => {
          const hour = parseInt(key);
          periodArray[hour] = dro['reducing'][key] + this.option.series[1].data[key];
      });
      this.option.series[3].data = periodArray;
      
      const array = Array(24).fill(NaN);
      Object.keys(dro['surplus']).forEach(key => {
          const hour = parseInt(key);
          array[hour] = dro['surplus'][key] + this.option.series[1].data[key];
      });
      this.option.series[4].data = array;

      this.loading = false;
      return dro
    }
  },
  setup() {
    const option = ref({
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Consumption', 'Generation', 'Flexibility', 'Reducing', 'Surplus']
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
        data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Consumption',
          type: 'line',
          showSymbol: false,
          data: []
        },
        {
          name: 'Generation',
          type: 'line',
          showSymbol: false,
          data: []
        },
        {
          name: 'Flexibility',
          type: 'line',
          showSymbol: false,
          data: []
        },
        {
          name: 'Reducing',
          type: 'scatter',
          showSymbol: false,
          data: []
        },
        {
          name: 'Surplus',
          type: 'scatter',
          showSymbol: false,
          data: []
        },
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
