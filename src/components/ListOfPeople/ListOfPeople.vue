<template>
  <div>
    <ion-list class="people-list">
      <ion-item v-for="(person, index) in store.riders" :key="index">
        <div
          class="flex justify-between flex-row items-center w-full"
          @click="setActiveRider(index)"
        >
          <h2>{{ person.name }}</h2>

          <p>{{ numberToTime(person.time) }}</p>
        </div>
      </ion-item>
    </ion-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IonList, IonItem, IonLabel } from "@ionic/vue";
import { useStopWatchStore } from "../../../store/stopWatchStore";
import { numberToTime } from "../../../utils/numberToTime";

const store = useStopWatchStore();

const setActiveRider = (index: number) => {
  store.setActiveRider(index);
};
</script>

<style scoped></style>
