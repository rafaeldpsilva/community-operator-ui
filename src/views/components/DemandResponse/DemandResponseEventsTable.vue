<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <div class="row">
        <div class="col-md-11">
          <h6 class="mb-0">Demand Response Events</h6>
          <div class="col-2">
            <div class="row">
              <div class="btn btn-invisible col-1" @click="previousDate()">
                <i class="fa fa-angle-left"></i>
              </div>
              <p class="text-sm col-md-auto align-self-center">{{ selectedDay }}</p>
              <div class="btn btn-invisible col-1" @click="nextDate()">
                <i class="fa fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-1 justify-content-end align-items-center">
          <button class="btn btn-sm btn-warning mb-0" @click="showCreateEventModal()">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div v-if="events.length != 0" class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Time</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Accepted</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Declined</th>
              <th class="align-start text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Pending</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events" :key="event.time" @click="showMonitoring(event)">
              <td class="limited-width">
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ event.time }}</h6>
                  </div>
                </div>
              </td>
              <td class="limited-width">
                <p class="text-xs font-weight-bold mb-0 text-success">{{ event.accept }}</p>
              </td>
              <td class="limited-width">
                <p class="text-xs font-weight-bold mb-0 text-danger">{{ event.declined }}</p>
              </td>
              <td class="align-middle text-center text-sm limited-width">
                <p class="text-xs font-weight-bold mb-0 text-warning">{{ event.pending }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="container text-center">
        <p>No events registered</p>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <create-event-modal :show="isModalVisible" @close="isModalVisible = false"></create-event-modal>
    <event-modal :show="isModalMonitoringVisible" :event_time="monitoringTime" @close="isModalMonitoringVisible = false"></event-modal>
  </Teleport>
</template>

<script>
import EventModal from './EventModal.vue';
import CreateEventModal from './CreateEventModal.vue';
import DemandResponseService from '../../../services/demandresponse/DemandResponseService.js';

export default {
  name: "ranking-table",
  components: {
    CreateEventModal,
    EventModal
  },
  data() {
    return {
      date: '',
      selectedDay: '',
      isModalVisible: false,
      isModalMonitoringVisible: false,
      monitoringTime: '',
      events: []
    }
  },
  async mounted() {
    this.date = new Date();
    this.selectedDay = this.formatDate(this.date)
    this.getEvents()
  },
  methods: {
    showMonitoring(event){
      this.isModalMonitoringVisible = true;
      this.monitoringTime = event['time'];
    },
    async getEvents(){
      const todayEvents = await DemandResponseService.getEvents(this.date);
      if (todayEvents.length == 0){
        this.events = []
      } else {
        var json = [];
        for (const ev of todayEvents) {
          json.push({ "time": ev[0], "accept": ev[1]["accepted"], "declined": ev[1]["declined"], "pending": ev[1]["pending"] })
        }
        this.events = json
      }
    },
    formatDate(date){
      let year = date.getFullYear()
      let month = date.getMonth()+1
      let day = date.getDate()
      return `${year}-${month}-${day}`
    },
    nextDate(){
      this.date.setDate(this.date.getDate() + 1);
      this.selectedDay = this.formatDate(this.date)
      this.getEvents()
    },
    previousDate(){
      this.date.setDate(this.date.getDate() - 1);
      this.selectedDay = this.formatDate(this.date)
      this.getEvents()
    },
    showCreateEventModal() {
      this.isModalVisible = true;
    },
  }
}
</script>

<style scoped>
.limited-width {
  max-width: 150px; /* Adjust the width as needed */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.btn-invisible {
  box-shadow: none;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: left;
}

tr:hover {
  background-color: #f5f5f5;
}

tr:hover td {
  background-color: #f5f5f5; /* Or any other color you prefer */
}

tr.active {
  background-color: #e0e0e0; /* Highlight color when row is active */
}

</style>
