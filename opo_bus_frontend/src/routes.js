import {lazy} from "react";

const Home = lazy(() => import("views/Home.jsx"));

const routes = [
  {
    path: "/home",
    name: "Home",
    sidebar: true,
    icon: "fas fa-home",
    component: Home,
  },
  {
    redirect: true, path: "/", to: "/home"
  },
];
export default routes;
