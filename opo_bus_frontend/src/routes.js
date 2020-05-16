import {lazy} from "react";

const Login = lazy(() => import("views/Login.jsx"));

const routes = [
  {
    path: "/login",
    component: Login,
  },
];
export default routes;
