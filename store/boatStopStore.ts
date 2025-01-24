import { defineStore } from "pinia";
import { boatStopInterface } from "../types/boatStopInterface";

export const useBoatStoreStop = defineStore("boatStop", {
  state: () => ({
    boatStop: [
      {
        name: "Thun",
        lang: 46.754086,
        long: 7.631497,
      },
      {
        name: "Gwatt Deltapark",
        lang: 46.720777,
        long: 7.636058,
      },
      {
        name: "Hünibach",
        lang: 46.743407357461535,
        long: 7.6427218172564775,
      },
      {
        name: "Hilterfingen",
        lang: 46.734816586121006,
        long: 7.657526943297231,
      },
      {
        name: "Oberhofen am Thunersee",
        lang: 46.73035568525052,
        long: 7.66698166137286,
      },
      {
        name: "Gunten",
        lang: 46.71229721822579,
        long: 7.700482233706202,
      },
      {
        name: "Spiez Schiffstation",
        lang: 46.68843489377029,
        long: 7.690210948350076,
      },
      {
        name: "Merligen",
        lang: 46.695668788191306,
        long: 7.737399325625161,
      },
      {
        name: "Spiez - Faulensee",
        lang: 46.67606769301487,
        long: 7.70403876484822,
      },
      {
        name: "Beatenbucht",
        lang: 46.68567018906964,
        long: 7.746725032610336,
      },
      {
        name: "Leissigen",
        lang: 46.6555821283864,
        long: 7.770613996813493,
      },
      {
        name: "Beatushöhlen-Sundlauenen",
        lang: 46.68487680931938,
        long: 7.790001437994207,
      },
      {
        name: "Neuhaus (Unterseen)",
        lang: 46.67813919759225,
        long: 7.8159253882594895,
      },
      {
        name: "Interlaken West",
        lang: 46.68206151487905,
        long: 7.850457730283544,
      },
    ] as boatStopInterface[],
  }),
});
