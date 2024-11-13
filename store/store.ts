import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    counter: 0,
    name: "Eduardo",
  }),

  getters: {
    doubleCounter: (state) => state.counter * 2,

    doubleCounterPlusOne(): number {
      return this.doubleCounter + 1;
    },
  },

  actions: {
    reset() {
      this.counter = 0;
    },
  },
});
