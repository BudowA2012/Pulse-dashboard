import { loadStorage, saveStorage } from "../storage";

import type { CalendarEvent } from "../storage";

export function loadCalendarEvents() {
  return loadStorage().calendarEvents;
}

export function saveCalendarEvents(events: CalendarEvent[]) {
  const storage = loadStorage();

  storage.calendarEvents = events;

  saveStorage(storage);
}

export function addCalendarEvent(event: CalendarEvent) {
  const storage = loadStorage();

  storage.calendarEvents.push(event);

  saveStorage(storage);
}

export function removeCalendarEvent(id: string) {
  const storage = loadStorage();

  storage.calendarEvents = storage.calendarEvents.filter(
    (event) => event.id !== id,
  );

  saveStorage(storage);
}
