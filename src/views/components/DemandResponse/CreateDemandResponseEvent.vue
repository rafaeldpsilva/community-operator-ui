<template>
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
      <card :title="stats.flexibility.title" :value="stats.flexibility.value" :percentage="stats.flexibility.percentage"
        :iconClass="stats.flexibility.iconClass" :iconBackground="stats.flexibility.iconBackground"
        :percentageColor="stats.flexibility.percentageColor" :detail="stats.flexibility.detail" directionReverse></card>
    </div>
    <div class="col-lg-3 col-md-6 col-12">
      <card :title="stats.members.title" :value="stats.members.value" :percentage="stats.members.percentage"
        :iconClass="stats.members.iconClass" :iconBackground="stats.members.iconBackground" :detail="stats.members.detail"
        directionReverse></card>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
export default {
  name: "dashboard-default",
  data() {
    return {
      stats: {
        consumption: {
          title: "Identify DR Opportunities",
          value: "0 W",
          percentage: "+55%",
          iconClass: "fa fa-area-chart",
          detail: "than forecasted",
          iconBackground: "bg-gradient-primary",
        },
        generation: {
          title: "Flexibility Forecast",
          value: "0 W",
          percentage: "+3%",
          iconClass: "fa fa-bar-chart",
          iconBackground: "bg-gradient-danger",
          detail: "than forecasted",
        },
        flexibility: {
          title: "Ranking",
          value: "0 W",
          percentage: "-2%",
          iconClass: "fa fa-list-ol",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-success",
          detail: "since last quarter",
        },
        members: {
          title: "Invite Participants",
          value: "4",
          percentage: "+5%",
          iconClass: "fa fa-envelope",
          iconBackground: "bg-gradient-warning",
          detail: "than last month",
        },
      },
    };
  },
  components: {
    Card
  },
  mounted() {
  },
  methods: {
  }
};
</script>