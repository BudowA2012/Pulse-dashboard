import type { WeatherData } from "../types/weather";

export async function getWeather(
  city: string,
  lat: number,
  lon: number,
): Promise<WeatherData> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code`,
  );

  const data = await response.json();

  return {
    city,

    temperature: data.current.temperature_2m,

    apparentTemperature: data.current.apparent_temperature,

    humidity: data.current.relative_humidity_2m,

    windSpeed: data.current.wind_speed_10m,

    weatherCode: data.current.weather_code,
  };
}
