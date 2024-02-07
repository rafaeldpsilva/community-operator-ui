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
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Charging Rate (W)</th>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">State of
                                Charge (%)</th>
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
                                <span v-if="battery.action == 'Charging'" class="badge badge-sm bg-gradient-success">Charging</span>
                                <span v-else-if="battery.action == 'On Hold'" class="badge badge-sm bg-gradient-secondary">On Hold</span>
                                <span v-else class="badge badge-sm bg-gradient-danger">Discharging</span>
                                <p class="text-xs text-secondary mb-0">Until {{ battery.next_decision }} </p>
                            </td>
                            <td>
                                <p class="text-xs font-weight-bold mb-0">{{ battery['charging_rate'] }}</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <p class="text-xs font-weight-bold mb-0">{{ battery['charge'] }}</p>
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
            this.tableUpdate = setInterval(() => {
                this.loadBatteries();
            }, 5000);
        },
        beforeUnmount(){
            clearInterval(this.tableUpdate);
        },
        methods: {
            async loadBatteries() {
                let batteries = await BatteryService.getBatteriesTable();
                this.batteries = [];
                for (var key in batteries) {
                    this.batteries.push(
                        {
                            'name': key, 
                            'capacity': batteries[key]['capacity'], 
                            'charging_rate': batteries[key]['charging_rate'], 
                            'charge': batteries[key]['state_of_charge'], 
                            'action': batteries[key]['action'],
                            'next_decision': batteries[key]['action_until'] + ':00'
                        });
                }
            }
        }
    }
</script>
