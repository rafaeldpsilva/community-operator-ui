import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import DemandResponse from "../views/DemandResponse.vue";
import Batteries from "../views/Batteries.vue";
import Tables from "../views/Tables.vue";
import P2P from "../views/P2P.vue";
import VirtualReality from "../views/VirtualReality.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/demand-response",
    name: "Demand Response",
    component: DemandResponse,
  },
  {
    path: "/batteries",
    name: "Batteries",
    component: Batteries,
  },
  {
    path: "/members",
    name: "Members",
    component: Tables,
  },
  {
    path: "/p2p",
    name: "P2P",
    component: P2P,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
