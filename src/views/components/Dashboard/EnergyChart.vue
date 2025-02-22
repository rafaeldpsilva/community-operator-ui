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
        LegendComponent,
        GridComponent,
    } from 'echarts/components';
    import VChart, { THEME_KEY } from 'vue-echarts';
    import { ref, defineComponent } from 'vue';
    import DashboardService from "../../../services/dashboard/DashboardService.js";

    use([
        CanvasRenderer,
        LineChart,
        GridComponent,
        LegendComponent
    ]);

    export default defineComponent({
        components: {
            VChart,
        },
        props: {
            title: {
                type: String,
                default: "Energy Overview",
            },
        },
        data() {
            return {
                loading: true,
                detail1: " Loading...",
            }
        },
        provide: {
            [THEME_KEY]: 'light',
        },
        mounted() {
            this.loadOverview();
        },
        methods: {
            async loadOverview() {
                let overview = await DashboardService.getEnergyHistoric();
                this.option.xAxis.data = overview[0]
                this.option.series[0].data = overview[1].map(element => element / 1000);
                this.option.series[1].data = overview[2].map(element => element / 1000);
                this.option.series[2].data = overview[3].map(element => element / 1000);
                this.loading = false;
            },
        },
        setup() {
            const option = ref({
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Consumption', 'Generation', 'Flexibility']
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    name: 'Hours (h)',
                    nameLocation: 'middle',
                    nameTextStyle:{
                        padding: [5, 0, 0, 0]
                    },
                    type: 'category',
                    boundaryGap: false,
                    data: [0]
                },
                yAxis: {
                    name: 'Energy (kWh)',
                    nameLocation: 'middle',
                    nameTextStyle:{
                        padding: [0, 0, 35, 0]
                    },
                    type: 'value'
                },
                series: [
                    {
                        name: 'Consumption',
                        type: 'line',
                        showSymbol: false,
                        color: '#825ee4',
                        data: [0]
                    },
                    {
                        name: 'Generation',
                        type: 'line',
                        showSymbol: false,
                        color: '#f56036',
                        data: [0]
                    },
                    {
                        name: 'Flexibility',
                        type: 'line',
                        showSymbol: false,
                        color: '#2dce89',
                        data: [0]
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
