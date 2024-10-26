<template>
  <div
    class="aspect-square bg-black rounded-full flex justify-center items-center p-3"
  >
    <span class="flex items-end align-baseline">
      <p class="text-4xl align-baseline">{{ speed }}</p>
      <p class="text-xs align-baseline mb-1">km/h</p>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Position } from "@capacitor/geolocation";

const speed = ref(0); // Holds the calculated speed in km/h
const props = defineProps<{ position: Position | null }>();

// Variables to store the previous position and timestamp
let prevPosition: Position | null = null;
let prevTimestamp: number | null = null;

// Calculate distance between two latitude/longitude points (in meters)
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
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

// Watch for position prop changes and calculate speed
watch(
  () => props.position,
  (newPosition) => {
    if (newPosition && prevPosition) {
      const { latitude, longitude } = newPosition.coords;
      const currentTimestamp = newPosition.timestamp;

      // Calculate distance and time difference
      const distance = calculateDistance(
        prevPosition.coords.latitude,
        prevPosition.coords.longitude,
        latitude,
        longitude
      );
      const timeDiff =
        (currentTimestamp - (prevTimestamp ?? currentTimestamp)) / 1000; // in seconds

      // Calculate speed in km/h
      const currentSpeed = (distance / timeDiff) * 3.6;
      speed.value = Math.round(currentSpeed);

      console.log("Current Speed (km/h):", speed.value);
    }

    // Update previous position and timestamp
    prevPosition = newPosition;
    prevTimestamp = newPosition?.timestamp ?? null;
  },
  { immediate: true } // Start watching immediately
);
</script>
