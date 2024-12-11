<template>
  <div>
    <h2 class="text-center text-h-l h-[72px]">
      <span v-if="store.activeRider?.name">
        {{ store.activeRider.name }}
      </span>
    </h2>
    <div class="pb-6">
      <h3 class="text-h-xl text-center">
        {{ numberToTime(store.riders[store.activeRiderIndex].time) }}
      </h3>
    </div>
    <div class="flex justify-between mx-16">
      <ion-button>Reset</ion-button>
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
import { IonList, IonItem, IonLabel, IonButton } from "@ionic/vue";
import { useStopWatchStore } from "../../../store/stopWatchStore";
import { numberToTime } from "../../../utils/numberToTime";

const store = useStopWatchStore();
const startTimer = () => {
  store.start();
};
const stopTimer = () => {
  store.stop();
};
onMounted(() => {
  store.setActiveRider(0);
});
</script>

<style scoped></style>
