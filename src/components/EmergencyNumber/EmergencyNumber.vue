<template>
  <div class="rounded-lg bg-primary py-4 px-4">
    <div @click="toggleOpen" class="flex justify-between items-center">
      <h4 class="font-bold text-h-xs">{{ props.numbers.name }}</h4>

      <a :href="`tel:${props.numbers.number}`" class="font-bold text-h-xs">{{
        props.numbers.number
      }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IonIcon } from "@ionic/vue";
import { caretBack } from "ionicons/icons";
import { emergencyNumbersInterface } from "../../../types/emergencyNumbersInterface";

const props = defineProps<{ numbers: emergencyNumbersInterface }>();

const open = ref(false);

const toggleOpen = () => {
  open.value = !open.value;
};
</script>

<style scoped></style>
