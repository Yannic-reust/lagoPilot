<template>
  <ion-content>
    <div id="map" class="z-40" style="height: 100%"></div>
    <SpeedOverlay
      :position="currentPosition"
      class="absolute left-2 bottom-2 z-50"
    />
    <div class="w-16 min-h-48 absolute right-4 top-48 z-50">
      <SideBarNavigation />
    </div>
  </ion-content>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { IonContent } from "@ionic/vue";
import { Geolocation } from "@capacitor/geolocation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import SpeedOverlay from "@/components/SpeedOverlay/SpeedOverlay.vue";

import { useFuelStationsStore } from "../.././../store/fuelStations";
import { usePortPositionsStore } from "../.././../store/portPositionsStore";
import { useTemperatureStore } from "../.././../store/temperatureStore";
import { useModeStore } from "../.././../store/modesStore";
import { useBoatStoreStop } from "../.././../store/boatStopStore";

const storeFuelStation = useFuelStationsStore();
const storePortStation = usePortPositionsStore();
const storeTemperature = useTemperatureStore();
const storeModes = useModeStore();
const boatStoreStop = useBoatStoreStop();

// Import your GeoJSON file
import geojsonData from "./ufer_150.json";
import geojsonData2 from "./ufer_300.json";
import SideBarNavigation from "../SideBarNavigation/SideBarNavigation.vue";

const map = ref(null);
const marker = ref(null);
const currentPosition = ref(null);
const weatherMarker = ref([]);
const boatMarker = ref([]);
const temp = ref([]);

async function initMap() {
  map.value = L.map("map", { zoomControl: false }).setView(
    [46.8182, 8.2275],
    13
  );

  /*const colorLayer = L.tileLayer(
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
  );*/

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
      return { color: "#65B891", weight: 3, fillOpacity: 0 };
    },
  });
  const geojsonLayer2 = L.geoJSON(geojsonData2, {
    style: function (feature) {
      // Optional: Style for GeoJSON features
      return { color: "#00241B", weight: 3, fillOpacity: 0 };
    },
  });

  geojsonLayer.addTo(map.value);
  geojsonLayer2.addTo(map.value);
}

const customIcon = L.icon({
  iconUrl: "arrow.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function createCircleMarker(lat, lng, icon) {
  const circleMarkerIcon = L.divIcon({
    html: `
      <div style="width: 36px; height: 36px; background-color: rgba(255, 255, 255, 1); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
        <img src="${icon}" style="width: 24px; height: 24px;" />
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
}

function createCircleMarker2(lat, lng, icon) {
  const circleMarkerIcon = L.divIcon({
    html: `
      <div style="width: 36px; height: 36px; background-color: rgba(255, 255, 255, 1); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
        <img src="${icon}" style="width: 24px; height: 24px;" />
      </div>
    `,
    className: "",
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25],
  });
  return L.marker([lat, lng], { icon: circleMarkerIcon });
}

function watchPosition(callback) {
  Geolocation.watchPosition({}, (position, err) => {
    if (position) callback(position);
    if (err) console.error("Error watching position:", err);
  });
}

storeTemperature.pullData();
const currentHour = new Date().getHours();

/*const setWind = () => {
  console.log("storeTemperature.temperature[currentHour]");
};*/
const setTemperature = (e) => {
  temp.value.push(e);
};
const showTemperature = () => {
  // Remove existing weather markers if already present
  if (weatherMarker.value.length === 0) {
    temp.value.forEach((temperature) => {
      const marker = createCircleMarker2(
        temperature.lang,
        temperature.long,
        "./icons/temperature.svg"
      );

      weatherMarker.value.push(marker);
    });
    weatherMarker.value.forEach((marker) => marker.addTo(map.value));
  } else {
    weatherMarker.value.forEach((marker) => map.value.removeLayer(marker));
    weatherMarker.value = [];
  }
};

const showBoatStopAndBoatLine = () => {
  if (boatMarker.value.length === 0) {
    boatStoreStop.boatStop.forEach((stop) => {
      const marker = createCircleMarker2(
        stop.lang,
        stop.long,
        "./icons/ship.svg"
      );

      boatMarker.value.push(marker);
    });
    boatMarker.value.forEach((marker) => marker.addTo(map.value));
  } else {
    boatMarker.value.forEach((marker) => map.value.removeLayer(marker));
    boatMarker.value = [];
  }
};

onMounted(async () => {
  await initMap();

  watch(
    () => storeTemperature.temperature,
    (newTemperature) => {
      setTemperature(newTemperature[currentHour]);
      //console.log(newTemperature[currentHour]);
    }
  );

  watch(
    () => storeModes.modes[0].active,
    () => {
      showTemperature();
    }
  );
  watch(
    () => storeModes.modes[1].active,
    () => {
      showBoatStopAndBoatLine();
    }
  );

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

  const createFuelStationMarker = () => {
    for (const station of storeFuelStation.fuelStations) {
      createCircleMarker(station.lang, station.long, station.imagePath);
    }
  };

  const createPortsMarker = () => {
    for (const station of storePortStation.ports) {
      createCircleMarker(
        station.lang,
        station.long,
        "./icons/anchor_black.svg"
      );
    }
  };

  createFuelStationMarker();
  createPortsMarker();
});
</script>
