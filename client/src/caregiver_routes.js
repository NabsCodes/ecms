import Contracts from "views/caregiver/Contract";
import Dashboard from "views/caregiver/Dashboard.js";
import Invoice from "views/caregiver/Invoice.js";
import UserPage from "views/caregiver/User.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/caregiver",
  },
  {
    path: "/invoices",
    name: "Invoices",
    icon: "nc-icon nc-tile-56",
    component: Invoice,
    layout: "/caregiver",
  },
  {
    path: "/contracts",
    name: "Contracts",
    icon: "nc-icon nc-tile-56",
    component: Contracts,
    layout: "/caregiver",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/caregiver",
  }
];
export default routes;
