<template>
  <div
    class="aspect-square bg-[#e6e6e6] w-16 flex justify-center items-center rounded-full"
  >
    <p class="align-baseline text-h-md">{{ speed }}</p>
    <!-- <p class="text-xs align-baseline mb-1">km/h</p> -->
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
const smoothingFactor = 0.5; // Adjusts the width of the bell curve

// Calculate distance between two latitude/longitude points (in meters)

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

      // Calculate raw speed in km/h
      const rawSpeed = (distance / timeDiff) * 3.6;

      console.log("Raw Speed (km/h):", rawSpeed);
    }

    // Update previous position and timestamp
    prevPosition = newPosition;
    prevTimestamp = newPosition?.timestamp ?? null;
  },
  { immediate: true } // Start watching immediately
);
</script>
