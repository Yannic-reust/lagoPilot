<!-- src/components/NavBar.vue -->
<template>
  <ion-tabs>
    <ion-tab tab="home">
      <div id="home-page"><HomePage /></div>
    </ion-tab>
    <ion-tab tab="stopWatch">
      <div id="stopWatch-page">
        <StopWatchPage />
      </div>
    </ion-tab>

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
      <ion-tab-button tab="options">
        <ion-icon :icon="options" />
        <ion-label>Options</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script lang="ts">
import StopWatchPage from "@/views/StopWatchPage.vue";
import BoatPage from "@/views/BoatPage.vue";
import OptionsPage from "@/views/OptionsPage.vue";
import HomePage from "../views/HomePage.vue";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonPage,
} from "@ionic/vue";
import { home, stopwatch, boat, options } from "ionicons/icons";

export default {
  components: {
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
  },
  data() {
    return {
      home,
      stopwatch,
      boat,
      options,
    };
  },
};
</script>

<style scoped></style>
