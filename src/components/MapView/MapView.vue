<template>
  <ion-content>
    <div id="map" style="height: 100%"></div>
  </ion-content>
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
      await initMap();

      const currentPosition = await getCurrentPosition();
      if (currentPosition) {
        const { latitude, longitude } = currentPosition.coords;
        map.value.setView([latitude, longitude], 13);
        marker.value = L.marker([latitude, longitude]).addTo(map.value);
      }

      map.value.invalidateSize(); // Force recalculation of map size

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

    async function initMap() {
      map.value = L.map("map").setView([51.505, -0.09], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "Map data © OpenStreetMap contributors",
      }).addTo(map.value);
    }

    async function getCurrentPosition() {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        return coordinates;
      } catch (error) {
        console.error("Error getting location:", error);
        return null;
      }
    }

    function watchPosition(callback) {
      Geolocation.watchPosition({}, (position, err) => {
        if (position) callback(position);
        if (err) console.error("Error watching position:", err);
      });
    }
  },
};
</script>

<style scoped>
#map {
  height: 100vh;
  width: 100%;
}
</style>
