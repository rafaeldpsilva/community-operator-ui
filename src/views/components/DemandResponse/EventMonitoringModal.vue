<template>
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
            console.log(response)
            if (response == false){
                this.loading = false
            } else {
                this.option.series[0].data = response['aggregated_balance'][0];
            }

            Object.keys(response['corrections']).forEach(key => {
                const correctionNumber = parseInt(key.split(' ')[1]);
                const array = response['corrections'][key];

                if (array.length > 0) {
                    const nanArray = Array(correctionNumber).fill(NaN);
                    response['corrections'][key] = [...nanArray, ...array];
                    this.option.series[correctionNumber].data = response['corrections'][key]
                }
            });

            console.log(response['corrections']);
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
            data: ['Aggregated Balance', 'Correction 1', 'Correction 2', 'Correction 3', 'Correction 4', 'Correction 5']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            name: 'Minutes (m)',
            nameLocation: 'middle',
            nameTextStyle:{
                padding: [5, 0, 0, 0]
            },
            type: 'category',
            boundaryGap: false,
            data: [0, 10, 20, 30, 40, 50, 60]
        },
        yAxis: {
            name: 'Energy (Wh)',
            nameLocation: 'middle',
            nameTextStyle:{
                padding: [0, 0, 35, 0]
            },
            type: 'value'
        },
        series: [
            {
            name: 'Aggregated Balance',
            type: 'line',
            showSymbol: false,
            data: []
            },
            {
            name: 'Correction 1',
            type: 'line',
            showSymbol: false,
            data: []
            },
            {
            name: 'Correction 2',
            type: 'line',
            showSymbol: false,
            data: []
            },
            {
            name: 'Correction 3',
            type: 'line',
            showSymbol: false,
            data: []
            },
            {
            name: 'Correction 4',
            type: 'line',
            showSymbol: false,
            data: []
            },
            {
            name: 'Correction 5',
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
    
