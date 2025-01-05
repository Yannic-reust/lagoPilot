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
        name: "Hafen Güetital",
        lang: 46.66912819158574,
        long: 7.717767685327991,
      },
      {
        name: "Hafen Därligen",
        lang: 46.66390947496857,
        long: 7.807800191336789,
      },
      {
        name: "Hafen Faulensee",
        lang: 46.67396505712566,
        long: 7.704349442869484,
      },
      {
        name: "Hafen BKW Spiez",
        lang: 46.696817826665544,
        long: 7.665769917819068,
      },
      {
        name: "Hafen Einigen",
        lang: 46.71021869973428,
        long: 7.645733653324263,
      },
      {
        name: "Hafen Gwatt Deltapark",
        lang: 46.72078716874117,
        long: 7.631992556611251,
      },
      {
        name: "Hafen Gwatt Camping",
        lang: 46.72813441317046,
        long: 7.629879959457986,
      },
      {
        name: "Yachtclub Thunersee",
        lang: 46.73452447824042,
        long: 7.63230453050297,
      },
      {
        name: "Pfaffenbühl Hafen",
        lang: 46.736425473015345,
        long: 7.630604943369186,
      },
      {
        name: "Alter Lachenkanal",
        lang: 46.74222304262321,
        long: 7.629253116538882,
      },
      {
        name: "Kohleweiher",
        lang: 46.74851303980016,
        long: 7.6347203295195305,
      },
      {
        name: "Bahnhof Quai",
        lang: 46.750690369153574,
        long: 7.636651123223224,
      },
      {
        name: "Hafen Hilterfingen",
        lang: 46.73678644961652,
        long: 7.6550214519719235,
      },
      {
        name: "Hafen Oberhofen",
        lang: 46.72764944731492,
        long: 7.675743576319439,
      },
      {
        name: "Hafen Merligen",
        lang: 46.694014913546695,
        long: 7.742327808672517,
      },
    ] as portPositionsInterface[],
  }),

  getters: {},

  actions: {
    reset() {},
  },
});
