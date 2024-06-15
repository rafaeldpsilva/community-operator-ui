<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <demand-response-events-table />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <event-monitoring-graph />
      </div>
      <div class="col-6">
        <benefit-distribution-table />
      </div>
    </div>
  </div>
</template>

<script>
import DemandResponseEventsTable from "./components/DemandResponse/DemandResponseEventsTable.vue";
import EventMonitoringGraph from "./components/DemandResponse/EventMonitoringGraph.vue";
import BenefitDistributionTable from "./components/DemandResponse/BenefitDistributionTable.vue";

export default {
  name: "demand-response",
  components: {
    DemandResponseEventsTable,
    EventMonitoringGraph,
    BenefitDistributionTable,
  },
  data() {
    return {
      stats: {
        titleColor: "opacity-7 text-white",
        descColor: "text-white",
        trip: {
          title: "Today's Trip",
          desc: "145 KM",
          classIcon: "text-dark ni ni-money-coins",
        },
        health: {
          title: "Battery Health",
          desc: "99 %",
          classIcon: "text-dark ni ni-controller ",
        },
        speed: {
          title: "Average Speed",
          desc: "56 Km/h",
          classIcon: "text-dark ni ni-delivery-fast",
        },
        volume: {
          title: "Music Volume",
          desc: "15/100",
          classIcon: "text-dark ni ni-note-03",
        },
      },
    };
  },
};
</script>
