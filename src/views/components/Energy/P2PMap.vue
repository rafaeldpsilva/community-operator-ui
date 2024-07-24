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
            <label class="btn btn-outline-warning" for="btnradio1">Cost</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" @click='loadQuantity'>
            <label class="btn btn-outline-warning" for="btnradio2">Quantity</label>
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
      default: "To be defined",
    }
  },
  data() {
    return {
      transactions: [],
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
          if (this.transactions[x][y]==1){
            const value =Math.floor(Math.random()*12);
            if (value > max){
              max = value;
            }
            if (y > x){
              sold.push([y, x, value]);
              bought.push([x, y, value]);
            } 
          }
        }
      }
      console.log(max)
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
      for (let x = 0; x < 27; x++) {
        for (let y = 0; y < 27; y++) {
          if (this.transactions[x][y]==1){
            const value =Math.random().toFixed(2);
            //const value =Math.floor(Math.random()* 11);
            if (y > x){
              sold.push([y, x, value]);
              bought.push([x, y, value]);
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
      this.option.visualMap.max = 1
    },
    async loadP2PTransaction(){
      const members = await CommunityService.getCommunity();
      const names = members.map(building => building.name);
      
      this.option.xAxis.data = names;
      this.option.yAxis.data = names;
      for (let x = 0; x < 27; x++) {
        this.transactions.push([])
        for (let y = 0; y < 27; y++) {
          this.transactions[x].push([])
          if (Math.random()> 0.7){
            this.transactions[x][y].push(1)
          }else{
            this.transactions[x][y].push(0)
          }
        }
      }
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
              left: '7%'
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
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
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
