<style scoped></style>
<template>
  <div
    :class="{ ' bg-black/40': store.modes[2].active }"
    class="absolute top-0 left-0 w-screen h-screen z-50 pointer-events-none"
  ></div>
  <ion-app>
    <ion-tabs>
      <ion-tab tab="home">
        <div id="home-page">
          <HomePage />
        </div>
      </ion-tab>
      <ion-tab tab="stopWatch">
        <div id="stopWatch-page">
          <StopWatchPage />
        </div>
      </ion-tab>
      <ion-tab tab="boat">
        <div id="boat-page">
          <BoatPage />
        </div>
      </ion-tab>
      <!-- <ion-tab tab="options">
        <div id="options-page">
          <OptionsPage />
        </div>
      </ion-tab> -->

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home">
          <ion-icon :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="stopWatch">
          <ion-icon :icon="stopwatch" />
          <ion-label>Stop Watch</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="boat">
          <ion-icon :icon="boat" />
          <ion-label>Boat</ion-label>
        </ion-tab-button>
        <!-- <ion-tab-button tab="options">
          <ion-icon :icon="options" />
          <ion-label>Options</ion-label>
        </ion-tab-button> -->
      </ion-tab-bar>
    </ion-tabs>
  </ion-app>
</template>

<script lang="ts">
import StopWatchPage from "@/views/StopWatchPage.vue";
import BoatPage from "@/views/BoatPage.vue";
import OptionsPage from "@/views/OptionsPage.vue";
import HomePage from "@/views/HomePage.vue";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonPage,
  IonApp,
  IonTab,
} from "@ionic/vue";
import { home, stopwatch, boat, options } from "ionicons/icons";
import { useModeStore } from "../store/modesStore";

export default {
  components: {
    IonApp,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonPage,
    HomePage,
    StopWatchPage,
    BoatPage,
    OptionsPage,
    IonTab,
  },
  data() {
    return {
      home,
      stopwatch,
      boat,
      options,
      store: useModeStore(),
    };
  },
};
</script>
