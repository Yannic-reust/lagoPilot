<template>
  <div class="rounded-lg bg-primary py-4 px-4 text-white">
    <div @click="toggleOpen" class="flex justify-between items-center">
      <h4 class="font-bold text-h-xs text-white">{{ props.knot.name }}</h4>

      <ion-icon
        :icon="caretBack"
        :class="{ '-rotate-90': open }"
        class="w-6 h-6 mr-2 text-white"
      ></ion-icon>
    </div>

    <Transition>
      <div v-if="open">
        <p class="text-p-lg">{{ props.knot.text }}</p>

        <div class="w-full flex justify-center my-6">
          <img :src="props.knot.imageUrl" :alt="props.knot.name" class="w-60" />
        </div>
        <a :href="props.knot.link" class="underline text-h-xs">Tutorial</a>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IonIcon } from "@ionic/vue";
import { caretBack } from "ionicons/icons";
import { knotsInterface } from "../../../types/knotsInterface";

const props = defineProps<{ knot: knotsInterface }>();

const open = ref(false);

const toggleOpen = () => {
  open.value = !open.value;
};
</script>

<style scoped></style>
