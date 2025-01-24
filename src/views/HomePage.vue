<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <MapView :geolocation="geolocation" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
//@ts-ignore
import MapView from "@/components/MapView/MapView.vue";

import { IonContent, IonPage } from "@ionic/vue";

import { ref, onMounted, onUnmounted } from "vue";
import { Geolocation, type Position } from "@capacitor/geolocation";

const speed = ref<any>(null);
const geolocation = ref<any>(null);

const updatePosition = async () => {
  const position = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
  });

  geolocation.value = position;
};

onMounted(() => {
  setInterval(updatePosition, 1000);
});
</script>

<style scoped></style>
