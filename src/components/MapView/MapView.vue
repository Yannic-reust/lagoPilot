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
  map.value = L.map("map").setView([46.8182, 8.2275], 13); // Coordinates for Switzerland

  // Add Swisstopo tile layer
  L.tileLayer(
    "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg",
    {
      maxZoom: 19,
      attribution:
        'Map data © <a href="https://www.swisstopo.admin.ch/en/home.html">Swisstopo</a>',
      tileSize: 256,
    }
  ).addTo(map.value);
}

// Define a custom icon for the marker
const customIcon = L.icon({
  iconUrl: "arrow.png", // Replace with the path to your custom icon
  iconSize: [32, 32], // Adjust the size as needed
  iconAnchor: [16, 32], // Anchor point of the icon (center bottom for typical marker)
  popupAnchor: [0, -32], // Position of the popup relative to the icon
});

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
    marker.value = L.marker([latitude, longitude], { icon: customIcon }).addTo(
      map.value
    ); // Apply custom icon here
    currentPosition.value = initialPosition; // Set initial position for SpeedOverlay
  }

  map.value.invalidateSize(); // Recalculate map size for proper display

  // Update position on location change
  watchPosition((position) => {
    const { latitude, longitude } = position.coords;
    if (marker.value) {
      marker.value.setLatLng([latitude, longitude]);
    } else {
      marker.value = L.marker([latitude, longitude], {
        icon: customIcon,
      }).addTo(map.value); // Apply custom icon here as well
    }
    map.value.setView([latitude, longitude], map.value.getZoom());

    // Update currentPosition to trigger speed calculation in SpeedOverlay
    currentPosition.value = position;
  });
});
</script>
