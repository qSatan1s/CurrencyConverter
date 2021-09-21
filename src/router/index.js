import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import currencyConverter from "../views/currencyConverter.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/currencyConverter",
    name: "currencyConverter",
    component: currencyConverter,
  },
];

const router = createRouter({
  history: createWebHistory(),
  mode: "history",
  routes,
});

export default router;
