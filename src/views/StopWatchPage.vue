<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <StopWatch />

      <div class="mt-8">
        <ListOfPeople />
      </div>

      <ion-fab
        vertical="bottom"
        horizontal="end"
        slot="fixed"
        class="mb-2 mr-2"
      >
        <ion-fab-button @click="openAddPersonDialog" id="addPerson-alert">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <AddPersonModal
        @close="closeAddPersonDialog"
        :isOpen="showAddPersonModal"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IonContent, IonPage, IonFab, IonFabButton, IonIcon } from "@ionic/vue";
import { addOutline } from "ionicons/icons";
import StopWatch from "@/components/StopWatch/StopWatch.vue";

import ListOfPeople from "@/components/ListOfPeople/ListOfPeople.vue";
import AddPersonModal from "@/components/AddPersonModal/AddPersonModal.vue";
const showAddPersonModal = ref(false);

const openAddPersonDialog = () => {
  showAddPersonModal.value = true;
};

const closeAddPersonDialog = () => {
  showAddPersonModal.value = false;
};
</script>

<style scoped></style>
