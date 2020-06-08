import {lazy} from "react";

const Home = lazy(() => import("views/Home.jsx"));
const Mapa = lazy(() => import("views/Mapa.jsx"));
const Buses = lazy(() => import("views/Buses.jsx"));
const Alarms = lazy(() => import("views/Alarms.jsx"));
const Profile = lazy(() => import("views/Profile.jsx"));

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    sidebar: true,
    icon: "fas fa-home",
    component: Home,
  },
  {
    path: "/map",
    name: "Map",
    sidebar: true,
    icon: "fas fa-map-marked-alt",
    component: Mapa,
  },
  {
    path: "/buses",
    name: "Buses",
    sidebar: true,
    icon: "fas fa-bus",
    component: Buses,
  },
  {
    path: "/alarms",
    name: "Alarms",
    sidebar: true,
    icon: "fas fa-bell",
    component: Alarms,
  },
  {
    pro: true,
    path: "/logout",
    name: "Logout",
    sidebar: true,
    icon: "fas fa-sign-out-alt",
    component: Profile,
  },
  {
    redirect: true, path: "/", to: "/dashboard"
  },
];
export default routes;
