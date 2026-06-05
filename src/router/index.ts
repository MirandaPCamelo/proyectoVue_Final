import { createRouter, createWebHistory } from "vue-router";
import VistaFlujo from "@/components/VistaFlujo.vue";
const routes = [{ path: "/", component: VistaFlujo }];
export default createRouter({ history: createWebHistory(), routes });
