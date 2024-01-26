<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <create-demand-response-event />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <demand-response-events-table />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <event-monitoring-graph />
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-8">
        <demand-response-opportunities-graph />
      </div>
      <div class="col-4">
        <average-metric-score-graph />
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-12">
        <ranking-table />
      </div>
    </div>
  </div>
</template>

<script>
import CreateDemandResponseEvent from "./components/DemandResponse/CreateDemandResponseEvent.vue";
import DemandResponseEventsTable from "./components/DemandResponse/DemandResponseEventsTable.vue";
import EventMonitoringGraph from "./components/DemandResponse/EventMonitoringGraph.vue";
import AverageMetricScoreGraph from "./components/DemandResponse/AverageMetricScoreGraph.vue";
import DemandResponseOpportunitiesGraph from "./components/DemandResponse/DemandResponseOpportunitiesGraph.vue";
import RankingTable from "./components/DemandResponse/RankingTable.vue";

export default {
  name: "demand-response",
  components: {
    CreateDemandResponseEvent,
    DemandResponseEventsTable,
    EventMonitoringGraph,
    AverageMetricScoreGraph,
    DemandResponseOpportunitiesGraph,
    RankingTable
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
