<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <div class="row">
        <div class="col-md-10">
          <h6>{{ title }}</h6>
        </div>
        <div class="col-md-2 justify-content-end align-items-center">
          <div class="btn-group" role="group">
            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked @click='loadCost'>
            <label class="btn btn-outline-warning" for="btnradio1">Cost (€)</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" @click='loadQuantity'>
            <label class="btn btn-outline-warning" for="btnradio2">Quantity (kW)</label>
          </div>
        </div>
      </div>
    </div>
    <div class="p-3 card-body">
      <v-chart class="chart" :option="option" autoresize />
    </div>
  </div>
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { HeatmapChart } from 'echarts/charts';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, defineComponent } from 'vue';
import {
  TooltipComponent,
  GridComponent,
  VisualMapComponent
} from 'echarts/components';
import CommunityService from '../../../services/community/CommunityService';
import P2PService from '../../../services/p2p/P2PService';

use([
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  HeatmapChart,
  CanvasRenderer
]);
export default defineComponent({
  name: "p2p-map",
  components:{
    VChart
  },
  props: {
    title: {
      type: String,
      default: "Transactions",
    }
  },
  data() {
    return {
      cost: [],
      quantity: []
    }
  },
  async mounted() {
    await this.loadP2PTransaction();
  },
  methods: {
    loadQuantity(){
      let max = 0;
      let sold = [];
      let bought = [];
      for (let x = 0; x < 27; x++) {
        for (let y = 0; y < 27; y++) {
          let value = this.quantity[x][y].reduce(function (x, y) {
              return x + y;
          }, 0);
          value = value /1000
          if (x > y){
            sold.push([y, x, Math.trunc(value)]);
            bought.push([x, y, Math.trunc(value)]);
          } 
          if (value > max){
            max = value;
          }
        }
      }
      sold = sold.map((item) => {
        return [item[1], item[0], item[2] || '-'];
      });
      bought = bought.map((item) => {
        return [item[1], item[0], item[2] || '-'];
      });
      this.option.visualMap.precision = 1
      this.option.series[0].data = sold
      this.option.series[1].data = bought
      
      this.option.visualMap.max = max
    },
    loadCost(){
      let sold = [];
      let bought = [];
      let max = 0;
      for (let x = 0; x < 27; x++) {
        for (let y = 0; y < 27; y++) {  
          const value = this.cost[x][y];
          if (x > y){
            if (value > 0){
              sold.push([x, y, (value).toFixed(4)]);
              bought.push([y, x, (value).toFixed(4)]);
            } else{
              sold.push([x, y, value]);
              bought.push([y, x, value]);
            }
            if (value > max){
            max = value;
          }
          }
        }
      }

      sold = sold.map((item) => {
        return [item[1], item[0], item[2] || '-'];
      });
      bought = bought.map((item) => {
        return [item[1], item[0], item[2] || '-'];
      });
      this.option.visualMap.precision = 2
      this.option.series[0].data = sold
      this.option.series[1].data = bought
      this.option.visualMap.max = max
    },
    async loadP2PTransaction(){
      const members = await CommunityService.getCommunity();
      const names = members.map(building => building.name);
      const res = await P2PService.getBidding();
      console.log(res)
      this.cost = res['costs']
      this.quantity = res['transactions']
      console.log(this.cost)
      this.option.xAxis.data = names;
      this.option.yAxis.data = names;
      this.loadCost()
    }
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  setup() {
    const option = ref({
          tooltip: {
              position: 'top',
              axisPointer: {
                type: 'cross'
              }
          },
          grid: {
              height: '80%',
              width: '85%',
              top: '10%',
              left: '5%'
          },
          xAxis: {
            name: 'Buyers',
            nameLocation: 'start',
            type: 'category',
            inverse: true,
            position: 'top',
            data: [],
            splitArea: {
              show: true
            },
            axisLabel: { rotate: 50, interval: 0 }
          },
          yAxis: {
              name: 'Sellers',
              nameLocation: 'start',
              type: 'category',
              data: [],
              splitArea: {
                show: true
              }
          },
          visualMap: {
              min: 0,
              max: 10,
              calculable: true,
              orient: 'vertical',
              bottom: '45%',
              left: '93%',
              align: 'left'
          },
          series:  [
              {
                name: 'Energy Sold',
                type: 'heatmap',
                data: [],
                label: {
                    show: true
                },
                emphasis: {
                    itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(20, 40, 0, 0.5)'
                    }
                }
              },
              {
                name: 'Energy Bought',
                type: 'heatmap',
                data: [],
                label: {
                    show: true
                },
                emphasis: {
                    itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
              }
          ]
          
      }
    );
    return { option };
  },
});
</script>
<style scoped>
.chart {
  height: 60vh;
}
</style>
