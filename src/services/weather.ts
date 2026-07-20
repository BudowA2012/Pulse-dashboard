export async function getWeather(city: string, lat: number, lon: number) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`,
  );

  const data = await response.json();

  return {
    city: city,

    temperature: data.current.temperature_2m,

    code: data.current.weather_code,
  };
}
