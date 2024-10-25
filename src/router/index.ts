import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import StopWatchPage from "@/views/StopWatchPage.vue";
import BoatPage from "@/views/BoatPage.vue";
import OptionsPage from "@/views/OptionsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/components/NavBar/NavBar.vue"), // Parent container for tabs
    children: [
      {
        path: "home",
        name: "Home",
        component: HomePage,
      },
      {
        path: "stopWatch",
        name: "StopWatch",
        component: StopWatchPage,
      },
      {
        path: "boat",
        name: "Boat",
        component: BoatPage,
      },
      {
        path: "options",
        name: "Options",
        component: OptionsPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
