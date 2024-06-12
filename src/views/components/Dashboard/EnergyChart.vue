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
                this.option.series[0].data = overview[1];
                this.option.series[1].data = overview[2];
                this.option.series[2].data = overview[3];
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
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [0]
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'Consumption',
                        type: 'line',
                        showSymbol: false,
                        data: [0]
                    },
                    {
                        name: 'Generation',
                        type: 'line',
                        showSymbol: false,
                        data: [0]
                    },
                    {
                        name: 'Flexibility',
                        type: 'line',
                        showSymbol: false,
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
