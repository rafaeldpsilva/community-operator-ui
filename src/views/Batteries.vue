<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <batteries-table />
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <battery-optimization-graph />
            </div>
        </div>
    </div>
</template>
<script>
import BatteriesTable from "./components/Batteries/BatteriesTable.vue";
import BatteryOptimizationGraph from "./components/Batteries/BatteryOptimizationGraph.vue";

export default {
    name: "batteries",
    components: {
        BatteriesTable,
        BatteryOptimizationGraph
    },
};
</script>
