import { defineStore } from "pinia";
import { temperatureInterface } from "../types/temperatureInterface";
import { fetchWeatherApi } from "openmeteo";

export const useTemperatureStore = defineStore("temperature", {
  state: () => ({
    temperature: [] as temperatureInterface[], // Initially empty
    params: [
      {
        latitude: 46.737294,
        longitude: 7.640435,
        hourly: ["temperature_2m", "wind_speed_10m", "wind_direction_10m"],
        forecast_days: 1,
      },
      {
        latitude: 46.71422940582759,
        longitude: 7.671377428426401,
        hourly: ["temperature_2m", "wind_speed_10m", "wind_direction_10m"],
        forecast_days: 1,
      },
      {
        latitude: 46.677534840629164,
        longitude: 7.736541751136224,
        hourly: ["temperature_2m", "wind_speed_10m", "wind_direction_10m"],
        forecast_days: 1,
      },
      {
        latitude: 46.67251056544195,
        longitude: 7.795318720557785,
        hourly: ["temperature_2m", "wind_speed_10m", "wind_direction_10m"],
        forecast_days: 1,
      },
    ],
  }),

  getters: {},

  actions: {
    async pullData() {
      // Parameters for the API call
      //console.log(this.params);
      const url = "https://api.open-meteo.com/v1/forecast";

      for (let i = 0; i < this.params.length; i++) {
        try {
          // Fetch the weather data
          const responses = await fetchWeatherApi(url, this.params[i]);

          // Process the response for the first location
          const response = responses[0];

          const utcOffsetSeconds = response.utcOffsetSeconds();
          const hourly = response.hourly();

          // Helper function to form time ranges
          const range = (start: number, stop: number, step: number) =>
            Array.from(
              { length: (stop - start) / step },
              (_, i) => start + i * step
            );

          const weatherData = {
            hourly: {
              time: range(
                Number(hourly.time()),
                Number(hourly.timeEnd()),
                hourly.interval()
              ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
              temperature2m: hourly.variables(0)!.valuesArray()!,
              windSpeed10m: hourly.variables(1)!.valuesArray()!,
              windDirection10m: hourly.variables(2)!.valuesArray()!,
            },
          };

          // Update the state with the processed data
          this.temperature = weatherData.hourly.time.map((time, index) => ({
            lang: this.params[i].latitude,
            long: this.params[i].longitude,
            temp: weatherData.hourly.temperature2m[index],
            windSpeed: weatherData.hourly.windSpeed10m[index],
            windDirection: weatherData.hourly.windDirection10m[index],
          }));
        } catch (error) {
          console.error("Failed to fetch weather data:", error);
        }
      }
    },

    reset() {
      this.temperature = []; // Reset the temperature data
    },
  },
});
