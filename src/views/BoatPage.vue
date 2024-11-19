<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <h2 class="mb-4 px-6 mt-8 text-h-md">Notruf</h2>
      <div class="grid grid-cols-1 gap-4 px-6">
        <div
          v-for="(item, index) in storeEmergencyNumbers.numbers"
          :key="index"
        >
          <EmergencyNumber :numbers="item" />
        </div>
      </div>

      <h2 class="mb-4 px-6 mt-8 text-h-md">Knoten</h2>
      <div class="grid grid-cols-1 gap-4 px-6">
        <div v-for="(item, index) in storeKnots.knots" :key="index">
          <KnotDropdown :knot="item" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";

import KnotDropdown from "@/components/KnotDropdown/KnotDropdown.vue";
import EmergencyNumber from "@/components/EmergencyNumber/EmergencyNumber.vue";

import { useKnotsStore } from "../../store/knotsStore";
const storeKnots = useKnotsStore();

import { useEmergencyNumbersStore } from "../../store/emergencyNumbersStore";
const storeEmergencyNumbers = useEmergencyNumbersStore();
</script>

<style scoped></style>
