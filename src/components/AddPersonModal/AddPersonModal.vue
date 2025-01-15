<template>
  <!-- <ion-button id="present-alert">Click Me</ion-button> -->
  <ion-alert
    trigger="addPerson-alert"
    header="Person hinzufügen"
    :buttons="alertButtons"
    :inputs="alertInputs"
  ></ion-alert>
</template>

<script lang="ts" setup>
import { IonAlert } from "@ionic/vue";

import { useStopWatchStore } from "../../../store/stopWatchStore";
import { onMounted, ref } from "vue";
/*const handleAlertDismiss = () => {
  console.log("dismissed");
};*/
const store = useStopWatchStore();
const handleFormSubmission = (data: any) => {
  if (data[0] === "") return;
  store.addRider(data[0]);
  resetAlertInputs();
};

const alertInputs = ref([
  {
    placeholder: "Name",
    id: "passwordInput",
  },
]);
const resetAlertInputs = () => {
  const input = document.getElementById("passwordInput");

  if (input) {
    (input as HTMLInputElement).value = "";
  }
};
const alertButtons = [
  {
    text: "Hinzufügen",
    handler: (data: any) => {
      handleFormSubmission(data);
    },
  },
];
</script>
