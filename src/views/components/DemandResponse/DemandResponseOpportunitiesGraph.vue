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
      /* const dro = {"consumption":[2711.65380859375,2733.986328125,2700.49609375,2593.73876953125,2478.3876953125,2352.77197265625,2182.390869140625,2038.42529296875,1941.1826171875,1808.6583251953125,1697.60302734375,1633.8192138671875,1557.3466796875,1506.63818359375,1473.8428955078125,1481.63671875,1526.9368896484375,1597.58935546875,1783.93896484375,1922.753662109375,2130.72412109375,2312.277587890625,2475.989501953125,2605.3662109375],
        "dr_energy":[1600,1645],"dr_period":[9,11],
        "flexibility":[231.34742736816406,235.2463836669922,233.2059326171875,228.99551391601562,220.92681884765625,208.47003173828125,196.33111572265625,180.28311157226562,165.46783447265625,151.27944946289062,143.03831481933594,135.39968872070312,129.7207489013672,127.423583984375,127.07835388183594,126.61946105957031,130.5587158203125,136.08131408691406,145.37625122070312,158.03916931152344,170.44598388671875,186.5887908935547,202.93917846679688,217.3510284423828],
        "generation":[0.0,0.0,0.0,0.0,0.0,0.0,1410,1431,1337,1600,2000,1645,393,219,147,194,348,565,822,1095,1302,0.0,0.0,0.0],
        "gs_energy":[2000],"gs_period":[10]} */
      const dro = await DemandResponseService.getDRO()
      this.option.series[0].data = dro['consumption']
      this.option.series[1].data = dro['generation']
      this.option.series[2].data = dro['flexibility']

      if (dro['dr_period'].length == 0){
        this.dropportunities = ['No opportunities']
        this.dropportunities = [12,14,18]
      } else {
        this.dropportunities = dro['dr_period']
      }

      for (let i = 0; i < dro['dr_period'].length; i++){
        while(dro['dr_period'][i] != this.option.series[3].data.length){
          this.option.series[3].data.push(NaN)
        }
        this.option.series[3].data.push(dro['consumption'][dro['dr_period'][i]]-dro['dr_energy'][i])
      }

      for (let i = 0; i < dro['gs_period'].length; i++){
        while(dro['gs_period'][i] != this.option.series[4].data.length){
          this.option.series[4].data.push(NaN)
        }
        this.option.series[4].data.push(dro['consumption'][dro['gs_period'][i]]+dro['gs_energy'][i])
      }

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
        data: ['Consumption', 'Generation', 'Flexibility', 'DR', 'GS']
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
          name: 'DR',
          type: 'scatter',
          showSymbol: false,
          data: []
        },
        {
          name: 'GS',
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
