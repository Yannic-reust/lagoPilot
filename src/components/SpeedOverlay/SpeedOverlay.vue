<template>
  <div
    class="aspect-square bg-[#e6e6e6] w-16 flex justify-center items-center rounded-full"
  >
    <p class="align-baseline text-h-md">{{ speed ? speed : "0" }}</p>
    <!-- <p class="text-xs align-baseline mb-1">km/h</p> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Geolocation, type Position } from "@capacitor/geolocation";

const speed = ref<any>(null);

onMounted(() => {
  const watchId = Geolocation.watchPosition({}, (position: Position | null) => {
    if (position && position.coords.speed !== null) {
      // Convert speed from m/s to km/h
      speed.value = (position.coords.speed * 3.6).toFixed(1);
    } else {
      speed.value = null;
    }
  });

  setInterval(() => {
    console.log("Current speed:", speed.value ? speed.value : "0 asd");
  }, 1000);
});

// Clear the watcher when the component is unmounted
onUnmounted(() => {
  Geolocation.clearWatch({ id: watchId });
});

// Clear the watcher when the component is unmounted
/*onUnmounted(() => {
    Geolocation.clearWatch({ id: watchId });
  });*/
</script>
