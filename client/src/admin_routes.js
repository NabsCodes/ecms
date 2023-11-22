import Dashboard from "views/admin/Dashboard.js";
import CareGiver from "views/admin/CareGiver.js";
import Client from "views/admin/Client.js";
import Schedule from "views/admin/Schedule.js";
import Invoice from "views/admin/Invoice.js";
import Contract from "views/admin/Contract";
import UserPage from "views/admin/User.js";
import { FaFileInvoice, FaFileContract } from "react-icons/fa";


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/invoice",
    name: "Invoice",
    icon: "nc-icon nc-notes",
    icon_comp: <FaFileInvoice size={28} />,
    component: Invoice,
    layout: "/admin",
  },
  {
    path: "/caregiver",
    name: "Care Givers",
    icon: "nc-icon nc-tile-56",
    component: CareGiver,
    layout: "/admin",
  },
  {
    path: "/clients",
    name: "Clients",
    icon: "nc-icon nc-tile-56",
    component: Client,
    layout: "/admin",
  },
  {
    path: "/contract",
    name: "Contract",
    icon: "nc-icon nc-notes",
    icon_comp: <FaFileContract size={28} />,
    component: Contract,
    layout: "/admin",
  },
  {
    path: "/schedule",
    name: "Schedule",
    icon: "nc-icon nc-watch-time",
    component: Schedule,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  }
];
export default routes;
