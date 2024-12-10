import { defineStore } from "pinia";
import { emergencyNumbersInterface } from "../types/emergencyNumbersInterface";

export const useEmergencyNumbersStore = defineStore("emergencyNumbers", {
  state: () => ({
    numbers: [
      {
        name: "Europäische Notfallnummer",
        number: 112,
      },
      {
        name: "Feuerwehr",
        number: 114,
      },
      {
        name: "Polizei",
        number: 117,
      },
      {
        name: "Feuerwehr",
        number: 118,
      },
    ] as emergencyNumbersInterface[],
  }),
});
