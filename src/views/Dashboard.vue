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
                <div class="row">
                    <div class="col-lg-7 mb-lg">
                        <!-- line chart -->
                        <div class="card z-index-2">
                            <energy-chart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import EnergyChart from "./components/Dashboard/EnergyChart.vue";
import DashboardService from "../services/dashboard/DashboardService.js"

import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";

export default {
    name: "dashboard-default",
    data() {
        return {
            stats: {
                consumption: {
                    title: "Consumption",
                    value: "0 W",
                    percentage: "+55%",
                    iconClass: "fa fa-flash",
                    detail: "than forecasted",
                    iconBackground: "bg-gradient-primary",
                },
                generation: {
                    title: "Generation",
                    value: "0 W",
                    percentage: "+3%",
                    iconClass: "fa fa-sun-o",
                    iconBackground: "bg-gradient-danger",
                    detail: "than forecasted",
                },
                flexibility: {
                    title: "Flexibility",
                    value: "0 W",
                    percentage: "-2%",
                    iconClass: "ni ni-sound-wave",
                    percentageColor: "text-danger",
                    iconBackground: "bg-gradient-success",
                    detail: "since last quarter",
                },
                members: {
                    title: "Members",
                    value: "4",
                    percentage: "+5%",
                    iconClass: "fa fa-user",
                    iconBackground: "bg-gradient-warning",
                    detail: "than last month",
                },
            },
            sales: {
                us: {
                    country: "United States",
                    sales: 2500,
                    value: "$230,900",
                    bounce: "29.9%",
                    flag: US,
                },
                germany: {
                    country: "Germany",
                    sales: "3.900",
                    value: "$440,000",
                    bounce: "40.22%",
                    flag: DE,
                },
                britain: {
                    country: "Great Britain",
                    sales: "1.400",
                    value: "$190,700",
                    bounce: "23.44%",
                    flag: GB,
                },
                brasil: {
                    country: "Brasil",
                    sales: "562",
                    value: "$143,960",
                    bounce: "32.14%",
                    flag: BR,
                },
            },
        };
    },
    components: {
        Card,
        EnergyChart
    },
    mounted() {
        this.updateMonitoringValues();
        this.getMembers();
    },
    methods: {
        async updateMonitoringValues() {
            let energyValues = await DashboardService.getEnergyValues();
            this.stats.consumption.value = energyValues[0] + ' W';
            this.stats.generation.value = energyValues[1] + ' W';
            this.stats.flexibility.value = energyValues[2] + ' W';
        },
        async getMembers(){
            let members = await DashboardService.getMembers();
            this.stats.members.value = members
        }
    }
};
</script>
