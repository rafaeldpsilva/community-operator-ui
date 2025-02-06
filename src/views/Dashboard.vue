<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-12">
                        <card :title="stats.consumption.title" :value="stats.consumption.value" :percentage="stats.consumption.percentage"
                            :iconClass="stats.consumption.iconClass" :iconBackground="stats.consumption.iconBackground"
                            :detail="stats.consumption.detail" directionReverse></card>
                    </div>
                    <div class="col-lg-3 col-md-6 col-12">
                        <card :title="stats.generation.title" :value="stats.generation.value" :percentage="stats.generation.percentage"
                            :iconClass="stats.generation.iconClass" :iconBackground="stats.generation.iconBackground"
                            :detail="stats.generation.detail" directionReverse></card>
                    </div>
                    <div class="col-lg-3 col-md-6 col-12">
                        <card :title="stats.flexibility.title" :value="stats.flexibility.value"
                            :percentage="stats.flexibility.percentage" :iconClass="stats.flexibility.iconClass"
                            :iconBackground="stats.flexibility.iconBackground" :percentageColor="stats.flexibility.percentageColor"
                            :detail="stats.flexibility.detail" directionReverse></card>
                    </div>
                    <div class="col-lg-3 col-md-6 col-12">
                        <card :title="stats.members.title" :value="stats.members.value" :percentage="stats.members.percentage"
                            :iconClass="stats.members.iconClass" :iconBackground="stats.members.iconBackground"
                            :detail="stats.members.detail" directionReverse></card>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-7 mb-lg">
                    <!-- line chart -->
                    <div class="card z-index-2">
                        <energy-chart />
                    </div>
                </div>
                <div class="col-lg-5 mb-lg">
                    <!-- line chart -->
                    <div class="card z-index-2">
                        <energy-forecast-chart />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import EnergyChart from "./components/Dashboard/EnergyChart.vue";
import EnergyForecastChart from "./components/Dashboard/EnergyForecastChart.vue";
import DashboardService from "../services/dashboard/DashboardService.js"

export default {
    name: "dashboard-default",
    data() {
        return {
            stats: {
                consumption: {
                    title: "Consumption",
                    value: "-- W",
                    percentage: "",
                    iconClass: "fa fa-bolt",
                    detail: "",
                    iconBackground: "bg-gradient-primary",
                },
                generation: {
                    title: "Generation",
                    value: "-- W",
                    percentage: "",
                    iconClass: "fa fa-sun",
                    iconBackground: "bg-gradient-danger",
                    detail: "",
                },
                flexibility: {
                    title: "Flexibility",
                    value: "-- W",
                    percentage: "",
                    iconClass: "ni ni-sound-wave",
                    percentageColor: "text-danger",
                    iconBackground: "bg-gradient-success",
                    detail: "",
                },
                members: {
                    title: "Members",
                    value: "--",
                    percentage: "",
                    iconClass: "fa fa-user",
                    iconBackground: "bg-gradient-warning",
                    detail: "",
                },
            },
        };
    },
    components: {
        Card,
        EnergyChart,
        EnergyForecastChart
    },
    mounted() {
        this.updateMonitoringValues();
        this.getMembers();
        this.monitoringInterval = setInterval(() => {
            this.updateMonitoringValues();
        }, 5000);
    },
    methods: {
        async updateMonitoringValues() {
            let energyValues = await DashboardService.getEnergyValues();
            this.stats.consumption.value = energyValues[0]/1000 + ' kW';
            this.stats.generation.value = energyValues[1]/1000 + ' kW';
            this.stats.flexibility.value = energyValues[2]/1000 + ' kW';
        },
        async getMembers(){
            let members = await DashboardService.getMembers();
            this.stats.members.value = members
        }
    },
    beforeUnmount() {
        clearInterval(this.monitoringInterval);
    },
};
</script>
