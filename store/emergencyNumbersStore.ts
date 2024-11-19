import { defineStore } from "pinia";
import { emergencyNumbersInterface } from "../types/emergencyNumbersInterface";

export const useEmergencyNumbersStore = defineStore("emergencyNumbers", {
  state: () => ({
    numbers: [
      {
        name: "Polizei",
        number: 117,
      },
    ] as emergencyNumbersInterface[],
  }),
});
