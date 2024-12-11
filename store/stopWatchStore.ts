import { defineStore } from "pinia";
import { riderInterface } from "../types/riderInterface";

export const useStopWatchStore = defineStore("stopWatch", {
  state: () => ({
    riders: [
      { name: "Tibo", time: 0, isRunning: false, intervalId: null },
      { name: "Peter", time: 0, isRunning: false, intervalId: null },
    ] as riderInterface[],
    activeRider: {} as riderInterface | null,
    activeRiderIndex: 0,
  }),

  actions: {
    start() {
      const rider = this.activeRider;
      if (rider && !rider.isRunning) {
        rider.isRunning = true;
        rider.intervalId = window.setInterval(() => {
          rider.time++;
        }, 1000);
      }
    },

    stop() {
      const rider = this.activeRider;
      if (rider && rider.isRunning) {
        rider.isRunning = false;
        if (rider.intervalId !== null) {
          clearInterval(rider.intervalId);
          rider.intervalId = null;
        }
      }
      this.activeRiderIndex = 0;
    },

    reset() {
      const rider = this.activeRider;
      if (rider) {
        rider.time = 0;
        if (rider.isRunning && rider.intervalId !== null) {
          clearInterval(rider.intervalId);
          rider.intervalId = null;
        }
        rider.isRunning = false;
      }
    },
    setActiveRider(riderIndex: number) {
      this.activeRiderIndex = riderIndex;
      this.activeRider = this.riders[riderIndex];
    },
  },
});
