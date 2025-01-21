<template>
  <div
    class="aspect-square bg-[#e6e6e6] w-16 flex justify-center items-center rounded-full"
  >
    <!-- <p class="align-baseline text-h-md">{{ speed ? speed : "0" }}</p> -->
    <!-- <p class="text-xs align-baseline mb-1">km/h</p> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Geolocation, type Position } from "@capacitor/geolocation";
/*
const speed = ref<any>(null);
const updatePosition = async () => {
  const position = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
  });
  if (position.coords.speed != null) {
    console.log("cords:", position.coords.speed * 3.6);
  }
};

onMounted(() => {
  setInterval(updatePosition, 1000);
});*/

/*let lastPosition: Position | null = null;

const updatePosition = async () => {
  const position = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
  });

  if (lastPosition) {
    const distance: any = calculateDistance(
      lastPosition.coords.latitude,
      lastPosition.coords.longitude,
      position.coords.latitude,
      position.coords.longitude
    );

    const timeElapsed = (position.timestamp - lastPosition.timestamp) / 1000; // in seconds
    speed.value = (distance / timeElapsed) * 3.6; // convert m/s to km/h
    console.log(speed.value);
  }

  lastPosition = position;
};

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // in metres
  return distance;
};*/

// Clear the watcher when the component is unmounted
/*onUnmounted(() => {
  Geolocation.clearWatch({ id: watchId });
});*/

// Clear the watcher when the component is unmounted
/*onUnmounted(() => {
    Geolocation.clearWatch({ id: watchId });
  });*/
</script>
