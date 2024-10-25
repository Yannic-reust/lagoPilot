<!-- src/components/NavBar.vue -->
<template>
  <ion-tabs>
    <ion-router-outlet></ion-router-outlet>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="home" href="/home">
        <ion-icon :icon="playCircle" />
        <ion-label>Listen Now</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="stopWatch" href="/stopWatch">
        <ion-icon :icon="stopwatch" />
        <ion-label>Stop Watch</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="boat" href="/boat">
        <ion-icon :icon="boat" />
        <ion-label>Boat</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="options" href="/options">
        <ion-icon :icon="options" />
        <ion-label>Options</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script lang="ts">
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/vue";
import { playCircle, stopwatch, boat, options } from "ionicons/icons";

export default {
  components: {
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
  },
  data() {
    return {
      playCircle,
      stopwatch,
      boat,
      options,
    };
  },
};
</script>

<style scoped></style>
