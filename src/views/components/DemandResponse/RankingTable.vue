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
            <tr v-for="p in participants" :key="p.name">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ p.name }}</h6>
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
      var json = [];
      for (const iot of response['ranking']) {
          json.push({'name':iot[7],'flexibility':iot[0],'metric1':iot[1],'metric2':iot[2],'metric3':iot[3],'metric4':iot[4], 'totalscore':iot[5].toFixed(2),'fairscore':iot[6]})
      }
      this.participants = json 
      this.loading = false;
    },
  }
}
</script>
