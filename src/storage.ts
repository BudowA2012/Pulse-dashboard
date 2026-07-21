// =======================
// TYPES
// =======================

export interface WeatherCity {
  id: string;

  name: string;

  lat: number;

  lon: number;

  position: number;

  createdAt: string;
}

export interface Note {
  id: string;

  title: string;

  content: string;

  createdAt: string;

  updatedAt: string;
}

// =======================
// STORAGE
// =======================

const STORAGE_KEY = "pulse-storage";

export interface PulseStorage {
  weatherCities: WeatherCity[];

  notes: Note[];
}

function getDefaultStorage(): PulseStorage {
  return {
    weatherCities: [],

    notes: [],
  };
}

export function loadStorage(): PulseStorage {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return getDefaultStorage();
  }

  try {
    const parsed = JSON.parse(data);

    return {
      weatherCities: parsed.weatherCities ?? [],

      notes: parsed.notes ?? [],
    };
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

  storage.weatherCities = storage.weatherCities.map((city, index) => ({
    ...city,

    position: index,
  }));

  saveStorage(storage);
}

export function loadWeatherCities() {
  const storage = loadStorage();

  return storage.weatherCities.map((city) => ({
    name: city.name,

    lat: city.lat,

    lon: city.lon,
  }));
}

// =======================
// NOTES
// =======================

export function addNote(note: Note) {
  const storage = loadStorage();

  storage.notes.push(note);

  saveStorage(storage);
}

export function removeNote(id: string) {
  const storage = loadStorage();

  storage.notes = storage.notes.filter((note) => note.id !== id);

  saveStorage(storage);
}

export function updateNote(updatedNote: Note) {
  const storage = loadStorage();

  const index = storage.notes.findIndex((note) => note.id === updatedNote.id);

  if (index === -1) return;

  storage.notes[index] = updatedNote;

  saveStorage(storage);
}
