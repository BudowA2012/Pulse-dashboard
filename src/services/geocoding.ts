import type { CityResult } from "../types/weather";

export async function searchCity(query: string): Promise<CityResult[]> {
  if (query.trim().length < 2) {
    return [];
  }

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=8&language=pl&format=json`,
  );

  const data = await response.json();

  if (!data.results) {
    return [];
  }

  return data.results.map((city: any) => ({
    name: `${city.name}${city.country ? ", " + city.country : ""}`,

    lat: city.latitude,

    lon: city.longitude,
  }));
}
