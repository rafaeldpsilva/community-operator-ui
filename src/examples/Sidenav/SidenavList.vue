<template>
  <div class="collapse navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item url="/dashboard" :class="getRoute() === 'dashboard' ? 'active' : ''"
          :navText="'Dashboard'">
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item url="/demand-response" :class="getRoute() === 'demand-response' ? 'active' : ''" :navText="'Demand Response'">
          <template v-slot:icon>
            <i class="fas fa-exchange-alt  text-warning text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item url="/p2p" :class="getRoute() === 'p2p' ? 'active' : ''" :navText="'P2P Transactions'">
          <template v-slot:icon>
            <i class="fa fa-people-arrows text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item url="/batteries" :class="getRoute() === 'batteries' ? 'active' : ''" :navText="'Batteries'">
          <template v-slot:icon>
            <i class="fas fa-battery-three-quarters text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item url="/members" :class="getRoute() === 'members' ? 'active' : ''" :navText="'Members'">
          <template v-slot:icon>
            <i class="fa fa-users text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
<!--       <li class="nav-item">
        <sidenav-item url="/tables" :class="getRoute() === 'tables' ? 'active' : ''" :navText="'Tables'">
          <template v-slot:icon>
            <i class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item url="/billing" :class="getRoute() === 'billing' ? 'active' : ''" :navText="'Billing'">
          <template v-slot:icon>
            <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item url="/virtual-reality" :class="getRoute() === 'virtual-reality' ? 'active' : ''"
          :navText="'Virtual Reality'">
          <template v-slot:icon>
            <i class="ni ni-app text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="mt-3 nav-item">
        <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="'ms-2'">
          ACCOUNT PAGES
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-item url="/profile" :class="getRoute() === 'profile' ? 'active' : ''"
          :navText="'Profile'">
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item url="/signin" :class="getRoute() === 'signin' ? 'active' : ''"
          :navText="'Sign In'">
          <template v-slot:icon>
            <i class="ni ni-single-copy-04 text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item url="/signup" :class="getRoute() === 'signup' ? 'active' : ''"
          :navText="'Sign Up'">
          <template v-slot:icon>
            <i class="ni ni-collection text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li> -->
    </ul>
  </div>
<!--   <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card :class="cardBg" textPrimary="Need Help?" textSecondary="Please check our docs" />
  </div> -->
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
//import SidenavCard from "./SidenavCard.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Community Operator",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  components: {
    SidenavItem,
    //SidenavCard
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    }
  }
};
</script>
