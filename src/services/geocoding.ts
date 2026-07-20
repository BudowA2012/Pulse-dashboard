export async function searchCity(city: string) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`,
  );

  const data = await response.json();

  if (data.length === 0) return null;

  return {
    name: data[0].display_name,

    lat: Number(data[0].lat),

    lon: Number(data[0].lon),
  };
}
