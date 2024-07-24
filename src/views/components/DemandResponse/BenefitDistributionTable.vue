<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <div class="row">
        <div class="col-md-11">
          <h6 class="mb-0">Benefit Distribution</h6>
        </div>
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div  class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Member</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Benefit (€)</th>
            </tr>
          </thead>
          <tbody v-if="benefits.length != 0">
            <tr v-for="benefit in benefits" :key="benefit.name" @click="showBenefitModal(benefit.name)">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ benefit.name }}</h6>
                  </div>
                </div>
              </td>
              <td class="align-middle text-center text-sm">
                <p class="text-xs font-weight-bold mb-0">{{ parseFloat(benefit.benefit).toFixed(2) }}</p>
              </td>
            </tr>
          </tbody>
          <div v-else class="container text-center" >
            <p > No Benefits</p>
          </div>
        </table>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <benefit-modal :show="isModalVisible" :individualBenefits="individualBenefits" :buildingName="buildingName" @close="isModalVisible = false"></benefit-modal>
  </Teleport>
</template>

<script>
import DemandResponseService from '../../../services/demandresponse/DemandResponseService.js';
import BenefitModal from './Benefit/BenefitModal.vue';

export default {
  name: "ranking-table",
  components: {
    BenefitModal,
  },
  data() {
    return {
      isModalVisible: false,
      benefits: [],
      detailedBenefits: [],
      buildingName: '',
      individualBenefits: {},
    }
  },
  async mounted() {
    this.getBenefits()
  },
  methods: {
    async getBenefits(){
      const benefits = await DemandResponseService.getBenefits();
      this.detailedBenefits = benefits['detailed']
      if (benefits.length == 0){
        this.benefits = []
      } else {
        const result = Object.entries(benefits['total']).map(([name, benefit]) => ({
          name,
          benefit
        }));
        this.benefits = result
        
      }
      
    },
    showBenefitModal(building) {
      this.individualBenefits = {};
  
      for (let key in this.detailedBenefits) {
        if (key.startsWith(building)) {
          this.individualBenefits[key] = this.detailedBenefits[key];
        }
      }
      this.buildingName = building
      this.isModalVisible = true;
    },
  }
}
</script>
<style scoped>
.table-responsive {
  max-height: 40vh;
  overflow-y: auto;
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

