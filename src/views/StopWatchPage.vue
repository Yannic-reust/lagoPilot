<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <StopWatch />
      <!-- List of People -->
      <div class="mt-8">
        <ListOfPeople />
      </div>

      <!-- Add Button -->
      <ion-fab
        vertical="bottom"
        horizontal="end"
        slot="fixed"
        class="mb-2 mr-2"
      >
        <ion-fab-button @click="openAddPersonDialog">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <!-- Add Person Modal export -->
      <!-- <ion-modal
        :is-open="showAddPersonModal"
        @didDismiss="closeAddPersonDialog"
      >
        <ion-header>
          <ion-toolbar>
            <ion-title>Add New Person</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeAddPersonDialog">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
      </ion-modal> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonInput,
  IonButtons,
} from "@ionic/vue";
import { addOutline } from "ionicons/icons";
import StopWatch from "@/components/StopWatch/StopWatch.vue";
import { useStopWatchStore } from "../../store/stopWatchStore";
import ListOfPeople from "@/components/ListOfPeople/ListOfPeople.vue";

const store = useStopWatchStore();

const showAddPersonModal = ref(false);
const newPersonName = ref("");

const openAddPersonDialog = () => {
  showAddPersonModal.value = true;
};

const closeAddPersonDialog = () => {
  showAddPersonModal.value = false;
  newPersonName.value = "";
};
</script>

<style scoped></style>
