export interface WeatherCity {
  id: string;

  name: string;

  lat: number;

  lon: number;

  position: number;

  createdAt: string;
}

const STORAGE_KEY = "pulse-storage";

export interface PulseStorage {
  weatherCities: WeatherCity[];
}

function getDefaultStorage(): PulseStorage {
  return {
    weatherCities: [],
  };
}

export function loadStorage(): PulseStorage {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return getDefaultStorage();
  }

  try {
    return JSON.parse(data);
  } catch {
    return getDefaultStorage();
  }
}

export function saveStorage(storage: PulseStorage) {
  localStorage.setItem(
    STORAGE_KEY,

    JSON.stringify(storage),
  );
}

// =======================
// WEATHER
// =======================

export function addWeatherCity(
  city: Omit<WeatherCity, "id" | "position" | "createdAt">,
) {
  const storage = loadStorage();

  const exists = storage.weatherCities.some(
    (c) => c.name === city.name && c.lat === city.lat && c.lon === city.lon,
  );

  if (exists) return;

  storage.weatherCities.push({
    id: crypto.randomUUID(),

    name: city.name,

    lat: city.lat,

    lon: city.lon,

    position: storage.weatherCities.length,

    createdAt: new Date().toISOString(),
  });

  saveStorage(storage);
}

export function removeWeatherCity(id: string) {
  const storage = loadStorage();

  storage.weatherCities = storage.weatherCities.filter(
    (city) => city.id !== id,
  );

  // poprawienie kolejności

  storage.weatherCities = storage.weatherCities.map((city, index) => ({
    ...city,

    position: index,
  }));

  saveStorage(storage);
}
// =======================
// COMPATIBILITY
// =======================

export function loadWeatherCities() {
  const storage = loadStorage();

  return storage.weatherCities.map((city) => ({
    name: city.name,

    lat: city.lat,

    lon: city.lon,
  }));
}
