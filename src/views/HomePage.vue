<template>
  <ion-page>
    <!-- <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header> -->

    <ion-content :fullscreen="true">
      <MapView />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
//@ts-ignore
import MapView from "@/components/MapView/MapView.vue";

import { IonContent, IonPage } from "@ionic/vue";
</script>

<style scoped></style>
