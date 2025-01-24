<template>
  <div
    class="aspect-square bg-[#e6e6e6] w-16 flex justify-center items-center rounded-full"
  >
    <p class="align-baseline text-h-md">{{ smoothedSpeed }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
const props = defineProps<{
  geolocation: any;
}>();

const speedArray = ref([0, 0, 0, 0]);
const weights = ref([0.05, 0.1, 0.25, 0.6]);
const smoothedSpeed = ref<number>(0);

const calculateSmoothedSpeed = () => {
  let sum = 0;
  for (let i = 0; i < speedArray.value.length; i++) {
    sum += speedArray.value[i] * weights.value[i];
  }
  smoothedSpeed.value = Number(sum.toFixed(0));
};

onMounted(async () => {
  watch(
    () => props.geolocation,
    (newGeolocation) => {
      if (newGeolocation) {
        speedArray.value.push(
          Math.max(0, props.geolocation.coords.speed) * 3.6
        );

        if (speedArray.value.length > 4) {
          speedArray.value.shift();
        }
        calculateSmoothedSpeed();
      }
    }
  );
});
</script>
