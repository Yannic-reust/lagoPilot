<template>
  <div>
    <h2 class="text-center text-h-l h-[72px]">
      <span v-if="store.activeRider?.name">
        {{ store.activeRider.name }}
      </span>
     
    </h2>
    <div class="pb-6">
      <h3 class="text-h-xl text-center" v-if="store.riders.length > 0">
        {{ numberToTime(store.riders[store.activeRiderIndex].time) }}
      </h3>
      <h3 class="text-h-xl text-center" v-else=>
        00:00
      </h3>
    </div>
    <div class="flex justify-between mx-16" v-if="store.riders.length > 0">
      <ion-button @click="reset">Reset</ion-button>
      <ion-button
        v-if="!store.riders[store.activeRiderIndex].isRunning"
        @click="startTimer"
        >Start</ion-button
      >
      <ion-button @click="stopTimer" v-else>Stop</ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { IonButton } from "@ionic/vue";
import { useStopWatchStore } from "../../../store/stopWatchStore";
import { numberToTime } from "../../../utils/numberToTime";

const store = useStopWatchStore();
const startTimer = () => {
  store.start();
};
const stopTimer = () => {
  store.stop();
};
const reset = () => {
  store.reset();
};

onMounted(() => {
  store.setActiveRider(0);
});
</script>

<style scoped></style>
