import { defineStore } from "pinia";
import { fuelStationInterface } from "../types/fuelStationInterface";

export const fuelStations = defineStore("fuelStations", {
  state: () => ({
    fuelStations: [
      {
        name: "Bootstankstelle Merligen",
        lang: 46.69935696103335,
        long: 7.7415917676102906,
      },
    ] as fuelStationInterface[],
  }),

  getters: {},

  actions: {
    reset() {},
  },
});
