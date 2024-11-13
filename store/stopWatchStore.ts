import { defineStore } from "pinia";
import { riderInterface } from "../types/riderInterface";

export const useStopWatchStore = defineStore("stopWatch", {
  state: () => ({
    riders: [{ name: "tibo", time: 22 }] as riderInterface[],
  }),

  getters: {},

  actions: {
    reset() {
      //this.counter = 0;
    },
  },
});
