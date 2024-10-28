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
const previousPosition = ref(null); // Tracks the last known position to filter fluctuations
const MIN_DISTANCE_THRESHOLD = 2; // Minimum distance (in meters) to consider movement
let positionInterval = null; // Store interval reference for cleanup

// Calculate distance between two positions
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Radius of Earth in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

// Calculate the bearing (in degrees) between two positions
function getBearing(lat1, lon1, lat2, lon2) {
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360; // Normalize to 0-360 degrees
}

// Initialize the map
async function initMap() {
  map.value = L.map("map").setView([51.505, -0.09], 17);
  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    maxZoom: 19,
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

    // Check if the new position is significantly different from the last
    if (
      previousPosition.value &&
      getDistance(
        previousPosition.value.latitude,
        previousPosition.value.longitude,
        latitude,
        longitude
      ) < MIN_DISTANCE_THRESHOLD
    ) {
      // Skip update if within the threshold distance
      return;
    }

    // Calculate the bearing if there’s a previous position
    let bearing = 0;
    if (previousPosition.value) {
      bearing = getBearing(
        previousPosition.value.latitude,
        previousPosition.value.longitude,
        latitude,
        longitude
      );
    }

    // Update previous position with current for the next check
    previousPosition.value = { latitude, longitude };

    // Update marker position and rotate it
    if (marker.value) {
      marker.value.setLatLng([latitude, longitude]);

      // Apply rotation to the marker icon
      marker.value.getElement().style.transform = `rotate(${bearing}deg)`;
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

<style scoped>
/* Ensures smooth rotation transitions for the marker */
.leaflet-marker-icon {
  transition: transform 0.1s linear;
}
</style>
