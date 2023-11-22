import Contracts from "views/client/Contract";
import Dashboard from "views/client/Dashboard.js";
import Invoice from "views/client/Invoice.js";
import UserPage from "views/client/User.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/client",
  },
  {
    path: "/invoices",
    name: "Invoices",
    icon: "nc-icon nc-tile-56",
    component: Invoice,
    layout: "/client",
  },
  {
    path: "/contracts",
    name: "Contracts",
    icon: "nc-icon nc-tile-56",
    component: Contracts,
    layout: "/client",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/client",
  }
];
export default routes;
