<template>
    <div class="card mb-4" style="position: relative;">
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
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 tooltip">Metric 1
                  <span class="tooltiptext">Description for Metric 1</span>
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Metric 2</th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Metric 3</th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 tooltip">Metric 4
                  <span class="tooltiptext">Description for Metric 1</span>
                </th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Total Score</th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Fair Score</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in limitedParticipantsList" :key="p.fairscore">
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
        <div class="text-center mt-3">
          <button @click="toggleShowMore" class="btn btn-invisible">
            <i :class="showMore ? 'fas fa-angle-up' : 'fas fa-angle-down'"></i>
          </button>
        </div>
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
        mainParticipants: [],
        participants: [],
        loading: true,
        showMore: false,
        initialLimit: 5
    }
},
computed: {
    limitedParticipantsList() {
        return this.showMore ? this.participants : this.participants.slice(0, this.initialLimit);
    }
},
async mounted() {
    this.getRanking();
},
methods: {
    async getRanking(){
        this.loading = true;
        let response = await DemandResponseService.getDemandResponseEvent(this.event_time);
        let transformedData = Object.entries(response['ranking']).map(([name, values]) => {
            return {
                name: name,
                flexibility: values.flexibility,
                metric1: values.metric_1,
                metric2: values.metric_2,
                metric3: values.metric_3,
                metric4: values.metric_4,
                totalscore: values.total_score.toFixed(2),
                fairscore: values.fair_score
            };
        });
        transformedData.sort((a, b) => b.fairscore - a.fairscore);
        this.participants = transformedData
        this.mainParticipants = []
        this.loading = false;
    },
    toggleShowMore() {
        this.showMore = !this.showMore;
    }
}
}
</script>
<style scoped>
.btn-invisible {
  box-shadow: none;
}
.tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;
  z-index: 1000;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: fit-content;
  background-color: #555;
  z-index: 2000;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1000;
  bottom: -100%; /* Position above the text */
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: auto; /* Remove top positioning */
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
