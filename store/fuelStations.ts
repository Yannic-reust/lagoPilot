import { defineStore } from "pinia";
import { fuelStationInterface } from "../types/fuelStationInterface";

export const useFuelStationsStore = defineStore("fuelStations", {
  state: () => ({
    fuelStations: [
      {
        name: "Bootstankstelle Merligen",
        imagePath: "./icons/fuel-station_black.svg",
        lang: 46.698360053806326,
        long: 7.737102456831085,
      },
    ] as fuelStationInterface[],
  }),

  getters: {},

  actions: {
    reset() {},
  },
});
