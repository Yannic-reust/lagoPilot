<template>
  <div class="bg-white rounded-3xl h-full">
    <div class="flex flex-col divide-y-2">
      <div
        class="aspect-square flex justify-center cursor-pointer select-none"
        @click="toggleModes(index)"
        :class="[
          { 'bg-primary ': item.active },
          { 'rounded-t-3xl': index === 0 },
          { 'rounded-b-3xl': index === icons.length - 1 },
        ]"
        v-for="(item, index) in icons"
        :key="index"
      >
        <img :src="item.url" :alt="item.name" class="w-6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useModeStore } from "../../../store/modesStore";

const store = useModeStore();

const toggleModes = (i: number) => {
  icons.value[i].active = !icons.value[i].active;

  store.toggleMode(i);
};

const icons = ref([
  {
    name: "wind",
    url: "./icons/wind.svg",
    active: false,
  },
  {
    name: "temperatur",
    url: "./icons/temperature.svg",
    active: false,
  },
  {
    name: "anchor",
    url: "./icons/anchor_black.svg",
    active: false,
  },
  {
    name: "ship",
    url: "./icons/ship.svg",
    active: false,
  },
  {
    name: "moon",
    url: "./icons/moon.svg",
    active: false,
  },
]);
</script>
