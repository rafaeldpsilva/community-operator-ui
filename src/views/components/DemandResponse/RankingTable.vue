<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Rankings Table</h6>
      <p v-if="loading" class="text-sm">
        <i class="fas fa-circle-notch fa-spin"></i>
        <span class="font-weight-bold">Loading...</span>
      </p>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Flexibility</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Metric 1</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Metric 2</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Metric 3</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Metric 4</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Total Score</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Fair Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in participants" :key="p.fairscore">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm" :class="mainParticipants.includes(p.name) ? 'text-success' : ''">{{ p.name }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ p.flexibility }}</p>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ p.metric1 }}</p>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ p.metric2 }}</p>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ p.metric3 }}</p>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ p.metric4 }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <p class="text-xs font-weight-bold mb-0">{{ p.totalscore }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <p class="text-xs font-weight-bold mb-0">{{ p.fairscore }}</p>
              </td>
            </tr>
          </tbody>
      </table>
    </div>
  </div>
</div></template>

<script>
import DemandResponseService from '../../../services/demandresponse/DemandResponseService.js';

export default {
  name: "ranking-table",
  data() {
    return {
      mainParticipants: [],
      participants: [],
      loading: true,
    }
  },
  async mounted() {
    this.getRanking();
  },
  methods: {
    async getRanking(){
      this.loading = true;
      let response = await DemandResponseService.getRanking();
      let transformedData = Object.entries(response['ranking']).map(([name, values]) => {
        return {
            name: name,
            flexibility: values.flexibility,
            metric1: values.metric_1,
            metric2: values.metric_2,
            metric3: values.metric_3,
            metric4: values.metric_4,
            totalscore: values.total_score.toFixed(2), // Rounding to 2 decimal places
            fairscore: values.fair_score
        };
      });
      transformedData.sort((a, b) => b.fairscore - a.fairscore);
      this.participants = transformedData
      this.mainParticipants = response['main_participants']
      this.loading = false;
    },
  }
}
</script>
