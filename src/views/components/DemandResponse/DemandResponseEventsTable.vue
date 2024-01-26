<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Demand Response Events</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "ranking-table",
  data() {
    return {
      events: [
        {"time": "2024-01-26", "accept": "Mario", "declined": "Jose", "pending": "Tony"},
        {"time": "2024-01-27", "accept": "Mario", "declined": "Jose", "pending": "Tony"},
        {"time": "2024-01-28", "accept": "Mario", "declined": "Jose", "pending": "Tony"},
      ]
    }
  },
}
</script>
