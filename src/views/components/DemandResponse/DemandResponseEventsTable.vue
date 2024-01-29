<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <div class="row">
        <div class="col-md-11">
          <h6 class="mb-0">Demand Response Events</h6>
          <div class="col-2">
            <div class="row">
              <div class="btn btn-neutral col-1">
                <i class="fa fa-angle-left"></i>
              </div>
              <p class="text-sm col-md-auto align-self-center">{{ selectedDay }}</p>
              <div class="btn btn-neutral col-1">
                <i class="fa fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-1 justify-content-end align-items-center">
          <button class="btn btn-sm btn-warning mb-0 " @click="showCreateEventModal()">
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
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Pending
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events" :key="event.time">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ event.time }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ event.accept }}</p>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ event.declined }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <p class="text-xs font-weight-bold mb-0">{{ event.pending }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="container text-center" >
        <p > No Events Registered For Today</p>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <create-event-modal :show="isModalVisible" @close="isModalVisible = false"></create-event-modal>
  </Teleport>
</template>

<script>
import CreateEventModal from './CreateEventModal.vue';
//import DemandResponseService from '../../../services/demandresponse/DemandResponseService.js';

export default {
  name: "ranking-table",
  components: {
    CreateEventModal
  },
  data() {
    return {
      selectedDay: "2024-01-24",
      isModalVisible: false,
      events: []
    }
  },
  async mounted() {
    //const today = new Date();
    //const todayEvents = await DemandResponseService.getEvents(today);
    this.events = [
      { "time": "11:00", "accept": "Mario", "declined": "Jose", "pending": "Tony" },
      { "time": "12:00", "accept": "Mario", "declined": "Jose", "pending": "Tony" },
      { "time": "14:00", "accept": "Mario", "declined": "Jose", "pending": "Tony" },
    ];
    //console.log(todayEvents);
  },
  methods: {
    showCreateEventModal() {
      this.isModalVisible = true;
    },
  }
}
</script>
