<template>
  <ion-content>
    <div id="map" class="z-40" style="height: 100%"></div>
    <SpeedOverlay
      :position="currentPosition"
      class="absolute left-2 bottom-2 z-50"
    />
  </ion-content>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { IonContent } from "@ionic/vue";
import { Geolocation } from "@capacitor/geolocation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import SpeedOverlay from "@/components/SpeedOverlay/SpeedOverlay.vue";

const map = ref(null);
const marker = ref(null);
const currentPosition = ref(null); // Stores the current position to pass to SpeedOverlay
let positionInterval = null; // Store interval reference for cleanup

// Initialize the map
async function initMap() {
  map.value = L.map("map").setView([51.505, -0.09], 17);
  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "Map data © OpenStreetMap contributors",
  }).addTo(map.value);
}

const customIcon = L.icon({
  iconUrl: "arrow.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Function to update the position
async function updatePosition() {
  try {
    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    });
    const { latitude, longitude } = position.coords;

    if (marker.value) {
      marker.value.setLatLng([latitude, longitude]);
    } else {
      marker.value = L.marker([latitude, longitude], {
        icon: customIcon,
      }).addTo(map.value);
    }
    map.value.setView([latitude, longitude], map.value.getZoom());

    // Update currentPosition to trigger speed calculation in SpeedOverlay
    currentPosition.value = position;
  } catch (error) {
    console.error("Error getting current position:", error);
  }
}

onMounted(async () => {
  await initMap();

  // Set initial position
  await updatePosition();

  // Start the interval to update position every 0.1 seconds
  positionInterval = setInterval(updatePosition, 100);
  map.value.invalidateSize(); // Recalculate map size for proper display
});

onUnmounted(() => {
  // Clear the interval when component is unmounted
  if (positionInterval) {
    clearInterval(positionInterval);
  }
});
</script>
