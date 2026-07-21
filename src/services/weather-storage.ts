import type { CityResult } from "../types/weather";

const KEY = "pulse-weather-cities";

export function saveCities(cities: CityResult[]) {
  localStorage.setItem(KEY, JSON.stringify(cities));
}

export function loadCities(): CityResult[] {
  const data = localStorage.getItem(KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}
