<template>
    <div class="card mb-4">
      <div class="card-header pb-0">
        <h6>Invites Table</h6>
        <p v-if="loading" class="text-sm">
          <i class="fas fa-circle-notch fa-spin"></i>
          <span class="font-weight-bold">Loading...</span>
        </p>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0" style="max-height: 400px; overflow-y: auto;">
          <table class="table align-items-center justify-content-center mb-0">
            <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Interval</th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Decision</th>
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
                  <p class="text-xs font-weight-bold mb-0">{{ p.interval }}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <p class="text-xs font-weight-bold mb-0">{{ p.decision }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
import DemandResponseService from '../../../services/demandresponse/DemandResponseService.js';

export default {
name: "ranking-table",
props: {
    event_time: String,
},
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
    let response = await DemandResponseService.getDemandResponseEvent(this.event_time);
    let transformedData = [];

    const decisions = ['accepted', 'declined', 'pending'];
    decisions.forEach(decision => {
        for (const interval in response.participants_responses[decision]) {
        response.participants_responses[decision][interval].forEach(name => {
            transformedData.push({
            name: name,
            interval: interval,
            decision: decision
            });
        });
        }
    });

    this.participants = transformedData;
    this.loading = false;
    },
}
}
</script>

<style scoped>
.table-responsive {
  max-height: 40vh;
  overflow-y: auto;
}
</style>
