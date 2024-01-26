<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Batteries Table</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Capacity (Wh)</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Action</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Charging
                Rate (W)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="battery in batteries" :key="battery.name">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ battery.name }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ battery.capacity }}</p>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ battery.action }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <p class="text-xs font-weight-bold mb-0">{{ battery['charging_rate'] }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import BatteryService from '../../../services/battery/BatteryService.js'

export default {
  name: "batteries-table",
  data() {
    return {
      batteries: []
    }
  },
  mounted() {
    this.loadBatteries();
  },
  methods: {
    async loadBatteries() {
      let batteries = await BatteryService.getCommunityBatteries();
      for (let i = 0; i < batteries.length; i++) {
        let action = "";
        if (batteries[i]['charging_rate'] == 0) {
          action = "On Hold (Until ...)"
        } else {
          if (batteries[i]['charging_rate'] > 0) {
            action = "Charging (Until ...)"
          } else {
            action = "Discharging (Until ...)"
          }
        }
        this.batteries[i] = {
          'name': batteries[i]['name'], 'capacity': batteries[i]['capacity'], 'action': action, 'charging_rate': batteries[i]['charging_rate']
        }
      }
    }
  }
}
</script>
