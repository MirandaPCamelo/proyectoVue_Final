import { createRouter, createWebHistory } from "vue-router";
import VistaFlujo from "../componentes/Flujo/VistaFlujo.vue";

const routes = [
  { path: "/", component: VistaFlujo }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
