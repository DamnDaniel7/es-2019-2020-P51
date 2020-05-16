import { lazy } from "react";
//Layouts
const MainLayout = lazy(() => import("layouts/LayoutProtected"));
const SecondaryLayout = lazy(() => import("layouts/Layout"));
//Components
const Home = lazy(() => import("views/Home.jsx"));
const Mapa = lazy(() => import("views/Mapa.jsx"));
const Buses = lazy(() => import("views/Buses.jsx"));
const Bus = lazy(() => import("views/Bus.jsx"));
const Alarms = lazy(() => import("views/Alarms.jsx"));
const Profile = lazy(() => import("views/Profile.jsx"));
const Logout = lazy(() => import("views/Logout.jsx"));
const Login = lazy(() => import("views/Login.jsx"));

const routes = [
  {
    path: "/dashboard",
    layout: MainLayout,
    component: Home,
  },
  {
    path: "/map",
    layout: MainLayout,
    component: Mapa,
  },
  {
    path: "/buses",
    layout: MainLayout,
    component: Buses,
  },
  {
    path: "/bus/:id",
    layout: MainLayout,
    component: Bus,
  },
  {
    path: "/alarms",
    layout: MainLayout,
    component: Alarms,
  },
  {
    path: "/routes",
    layout: MainLayout,
    component: Home,
  },
  {
    path: "/profile",
    layout: MainLayout,
    component: Profile,
  },
  {
    path: "/logout",
    layout: MainLayout,
    component: Logout,
  },
  {
    path: "/login",
    layout: SecondaryLayout,
    component: Login,
  },
  {
    redirect: true, path: "/", to: "/dashboard"
  },
];
export default routes;
