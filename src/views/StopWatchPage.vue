<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <!-- Timer Display -->
      <!-- <div class="timer-display">{{ activePersonTime }}</div> -->

      <!-- Play/Pause Buttons -->
      <div class="controls">
        <!-- <ion-button @click="toggleTimer">{{
          isRunning ? "Pause" : "Play"
        }}</ion-button> -->
      </div>

      <!-- List of People -->
      <ion-list class="people-list">
        <ion-item v-for="(person, index) in store.riders" :key="index" button>
          <ion-label>
            <h2>{{ person.name }}</h2>
            <p>{{ person.time }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- Add Button -->
      <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button @click="openAddPersonDialog">
          <ion-icon name="add-outline"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <!-- Add Person Modal -->
      <ion-modal
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
        <!-- export to component -->
        <ion-content>
          <ion-item>
            <ion-label position="stacked">Name</ion-label>
            <ion-input
              v-model="newPersonName"
              placeholder="Enter name"
            ></ion-input>
          </ion-item>
          <!-- <ion-button expand="full" @click="addPerson">Add Person</ion-button> -->
        </ion-content>
      </ion-modal>
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
} from "@ionic/vue";

import { useStopWatchStore } from "../../store/stopWatchStore";

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
