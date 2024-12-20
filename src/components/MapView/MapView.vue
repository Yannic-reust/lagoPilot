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

// Import your GeoJSON file
import geojsonData from "./ufer.json";

const map = ref(null);
const marker = ref(null);
const currentPosition = ref(null);

async function initMap() {
  map.value = L.map("map").setView([46.8182, 8.2275], 13);

  const colorLayer = L.tileLayer(
    "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg",
    {
      maxZoom: 19,
      attribution:
        'Map data © <a href="https://www.swisstopo.admin.ch/en/home.html">Swisstopo</a>',
      tileSize: 256,
    }
  );
  const grayLayer = L.tileLayer(
    "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-grau/default/current/3857/{z}/{x}/{y}.jpeg",
    {
      maxZoom: 19,
      attribution:
        'Map data © <a href="https://www.swisstopo.admin.ch/en/home.html">Swisstopo</a>',
      tileSize: 256,
    }
  );

  const aerialLayer = L.tileLayer(
    "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg",
    {
      maxZoom: 19,
      attribution:
        'Map data © <a href="https://www.swisstopo.admin.ch/en/home.html">Swisstopo</a>',
      tileSize: 256,
    }
  );

  aerialLayer.addTo(map.value);

  // Load the GeoJSON data into the map
  const geojsonLayer = L.geoJSON(geojsonData, {
    style: function (feature) {
      // Optional: Style for GeoJSON features
      return { color: "#007BFF", weight: 2 };
    },
    pointToLayer: function (feature, latlng) {
      // Optional: Customize point markers
      return L.marker(latlng, { icon: customIcon });
    },
    onEachFeature: function (feature, layer) {
      // Optional: Bind a popup to each feature
      if (feature.properties && feature.properties.name) {
        layer.bindPopup(feature.properties.name);
      }
    },
  });

  geojsonLayer.addTo(map.value);
}

const customIcon = L.icon({
  iconUrl: "arrow.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function createCircleMarker(lat, lng, popupText) {
  const circleMarkerIcon = L.divIcon({
    html: `
      <div style="width: 36px; height: 36px; background-color: rgba(255, 255, 255, 1); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
        <img src="./icons/fuel-station_black.svg" style="width: 24px; height: 24px;" />
      </div>
    `,
    className: "",
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25],
  });

  const circleMarker = L.marker([lat, lng], { icon: circleMarkerIcon }).addTo(
    map.value
  );

  if (popupText) {
    circleMarker.bindPopup(popupText).openPopup();
  }
}

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
    marker.value = L.marker([latitude, longitude], {
      icon: customIcon,
    }).addTo(map.value);
    currentPosition.value = initialPosition;
  }

  map.value.invalidateSize();

  watchPosition((position) => {
    const { latitude, longitude } = position.coords;
    if (marker.value) {
      marker.value.setLatLng([latitude, longitude]);
    } else {
      marker.value = L.marker([latitude, longitude], {
        icon: customIcon,
      }).addTo(map.value);
    }
    map.value.setView([latitude, longitude], map.value.getZoom());

    currentPosition.value = position;
  });

  createCircleMarker(46.73758568435726, 7.632387350914479);
});
</script>
