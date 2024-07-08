<template>
    <div class="card">
      <div class="card-header pb-0">
        <h6>Community Members</h6>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Values</th>
                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">URL</th>
                <!--th class="text-secondary opacity-7"></th-->
              </tr>
            </thead>
            <tbody>
              <tr v-for="member in membersList" :key="member.name">
                <td>
                  <div class="d-flex px-2 py-1">
                    <div>
                        <i class="fa fa-user me-sm-2" aria-hidden="true"></i>
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">{{ member.name }}</h6>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="text-xs font-weight-bold mb-0">{{ member.values.map(item => item.tag) }}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <span class="badge badge-sm bg-gradient-success">Online</span>
                </td>
                <td class="align-middle text-center">
                  <a
                    href="javascript:;"
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user"
                  >Edit</a>
                  
                </td>
                <!--td class="align-middle">
                  <span class="text-secondary text-xs font-weight-bold">Edit</span>
                </td-->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>
  
<script>
import CommunityService from '../../../services/community/CommunityService.js';

export default {
name: "members-table",
components: {
},
async mounted() {
    await this.loadmembersList();
},
data() {
    return {
        membersList: []
    }
},
methods: {
    async loadmembersList() {
        var list = await CommunityService.getCommunity()
        console.log(list)
        this.membersList = list
        localStorage.setItem("members", JSON.stringify(this.membersList))
    },
}
};
</script>
<style scoped>
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