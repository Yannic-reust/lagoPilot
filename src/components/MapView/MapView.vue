<template>
  <div id="map" style="height: 100%"></div>
</template>

<script>
import { onMounted, ref } from "vue";
import { IonContent } from "@ionic/vue";
import { Geolocation } from "@capacitor/geolocation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "MapView",
  setup() {
    const map = ref(null);
    const marker = ref(null);

    onMounted(async () => {
      // Initialize the map with a default view
      map.value = L.map("map").setView([51.505, -0.09], 13);

      // Add a tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map.value);

      // Center map to current position on load
      const currentPosition = await getCurrentPosition();
      if (currentPosition) {
        const { latitude, longitude } = currentPosition.coords;
        map.value.setView([latitude, longitude], 13);

        // Add a marker for the current location
        marker.value = L.marker([latitude, longitude]).addTo(map.value);
      }

      // Watch position to track changes
      watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        if (marker.value) {
          marker.value.setLatLng([latitude, longitude]);
        } else {
          marker.value = L.marker([latitude, longitude]).addTo(map.value);
        }
        map.value.setView([latitude, longitude], map.value.getZoom());
      });
    });

    // Function to get the current position
    async function getCurrentPosition() {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        console.log("Current position:", coordinates);
        return coordinates;
      } catch (error) {
        console.error("Error getting location:", error);
        return null;
      }
    }

    // Function to watch position changes
    function watchPosition(callback) {
      Geolocation.watchPosition({}, (position, err) => {
        if (position) {
          console.log("Position changed:", position);
          callback(position);
        }
        if (err) {
          console.error("Error watching position:", err);
        }
      });
    }
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 100vh; /* Full height */
}
</style>
