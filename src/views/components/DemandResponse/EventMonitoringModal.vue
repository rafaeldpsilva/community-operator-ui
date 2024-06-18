<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask" @keydown.esc="close()">
            <div class="modal-container">
                <div class="modal-header ">
                    <div class="d-flex justify-content-between w-100">
                        <h5 name="header">Event</h5>
                        <button class="btn btn-transparent align-self-start" type="button" aria-haspopup="true"
                            aria-expanded="false" @click="close()">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="card">
                        <div class="pb-0 card-header mb-0" @click="getMonitoringValues()">
                        <h6 >{{ title }}</h6>
                        <p v-if="loading" class="text-sm" >
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
                </div>
            </div>
        </div>
    </Transition>
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
        show: Boolean,
        event_time: String,
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
        }
    },
    provide: {
        [THEME_KEY]: 'light',
    },
    watch: {
        show(newVal) {
            if (newVal) {
                this.getMonitoringValues();
            }
        }
    },
    mounted() {
        if(this.event_time != ''){
            this.getMonitoringValues()
        }
    },
    methods: {
        async getMonitoringValues(){
            const response = await DemandResponseService.getDemandResponseEvent(this.event_time);
            console.log('eventmonitoring', response['aggregated_balance'])
            if (response == false){
                this.loading = false
            } else{
                let aggregated_balance = response['aggregated_balance']
                if (aggregated_balance[0][1] != null) {
                    let corrections = aggregated_balance[1];
                    
                    for(let i = 0; i < corrections.length; i++){
                        for(let j = 0; j < corrections[i].length; j++){
                            if (j < i){
                                this.option.series[i+1].data.push(NaN);
                            } else {
                                if (j == i){
                                    this.option.series[i+1].data.push(aggregated_balance[0][j])
                                }else{
                                    this.option.series[i+1].data.push(corrections[i][j]);
                                }
                            }
                        }
                        //this.option.series[i+1].data = corrections[i]
                    }
                }
                console.log(this.option.series[1].data)
                this.option.series[0].data = aggregated_balance[0];
            }
            this.loading = false;
        },
        close() {
            this.$emit('close');
        },
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
<style>
.chart {
  height: 40vh;
}
.modal-mask {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-body {
    padding: 20px 30px;
    overflow-y: auto; /* Enable vertical scrolling if content overflows */
    flex-grow: 1; /* Allow the body to grow and take up space */
}

.modal-container {
    width: 80vw;
    max-height: 80vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 10px;
    /* Adjust the value to control the roundness of the corners */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h5 {
    margin-top: 0;
    color: orange;
}

.modal-default-button {
    float: right;
}

/*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

/* Custom CSS for transparent button */
.btn-transparent {
    background-color: transparent;
    border: none;
    color: #000 !important;
    box-shadow: none !important;
    padding-left: 3.25rem !important;
    padding-right: 0px !important;
    padding-top: 0px !important;
    /* Adjust the color as needed */
}

/* Style for three dots */
.three-dots {
    font-size: 1.5rem;
    /* Adjust the size as needed */
}

/* Hide the default dropdown button arrow */
.btn-transparent::after {
    content: none;
}
</style>
    
