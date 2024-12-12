import { defineStore } from "pinia";
import { portPositionsInterface } from "../types/portPositionsInterface";

export const usePortPositionsStore = defineStore("portPositions", {
  state: () => ({
    ports: [
      {
        name: "Lachen Hafen",
        lang: 46.74075405096675,
        long: 7.630978372360757,
      },
      {
        name: "Spiez Hafen",
        lang: 46.68794123814346,
        long: 7.68974276389407,
      },
      {
        name: "Neuhaus Hafen",
        lang: 46.6784193699961,
        long: 7.816321245889768,
      },
      {
        name: " Hafen Güetital",
        lang: 46.66912819158574,
        long: 7.717767685327991,
      },
    ] as portPositionsInterface[],
  }),

  getters: {},

  actions: {
    reset() {},
  },
});
