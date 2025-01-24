import { defineStore } from "pinia";
import { modesInterface } from "../types/modesInterface";

export const useModeStore = defineStore("mode", {
  state: () => ({
    modes: [
      {
        active: false,
        name: "temperatur",
      },

      {
        active: false,
        name: "ship",
      },
      {
        active: false,
        name: "night",
      },
    ] as modesInterface[],
  }),

  getters: {},

  actions: {
    toggleMode(i: number) {
      this.modes[i].active = !this.modes[i].active;
    },

    reset() {},
  },
});
