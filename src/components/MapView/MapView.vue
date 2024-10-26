<template>
  <ion-content>
    <div id="map" class="z-40" style="height: 100%"></div>
    <SpeedOverlay
      :position="currentPosition"
      class="absolute left-2 bottom-2 z-50"
    />
  </ion-content>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { IonContent } from "@ionic/vue";
import { Geolocation } from "@capacitor/geolocation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import SpeedOverlay from "@/components/SpeedOverlay/SpeedOverlay.vue";

const map = ref(null);
const marker = ref(null);
const currentPosition = ref(null); // Stores the current position to pass to SpeedOverlay

// Initialize the map
async function initMap() {
  map.value = L.map("map").setView([51.505, -0.09], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "Map data © OpenStreetMap contributors",
  }).addTo(map.value);
}

// Watch position updates
function watchPosition(callback) {
  Geolocation.watchPosition({}, (position, err) => {
    if (position) callback(position);
    if (err) console.error("Error watching position:", err);
  });
}

onMounted(async () => {
  await initMap();

  const initialPosition = await Geolocation.getCurrentPosition();
  if (initialPosition) {
    const { latitude, longitude } = initialPosition.coords;
    map.value.setView([latitude, longitude], 13);
    marker.value = L.marker([latitude, longitude]).addTo(map.value);
    currentPosition.value = initialPosition; // Set initial position for SpeedOverlay
  }

  map.value.invalidateSize(); // Recalculate map size for proper display

  // Update position on location change
  watchPosition((position) => {
    const { latitude, longitude } = position.coords;
    if (marker.value) {
      marker.value.setLatLng([latitude, longitude]);
    } else {
      marker.value = L.marker([latitude, longitude]).addTo(map.value);
    }
    map.value.setView([latitude, longitude], map.value.getZoom());

    // Update currentPosition to trigger speed calculation in SpeedOverlay
    currentPosition.value = position;
  });
});
</script>

<style scoped>
#map {
  height: 100vh;
  width: 100%;
}
</style>
