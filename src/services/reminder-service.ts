import type { CalendarEvent } from "../storage";

import { loadCalendarEvents, saveCalendarEvents } from "./calendar-storage";

import { sendNotification } from "@tauri-apps/plugin-notification";

function getReminderMoment(event: CalendarEvent) {
  const eventDate = new Date(`${event.date}T${event.time}:00`);

  return new Date(eventDate.getTime() - event.reminder * 60 * 1000);
}

function formatReminderText(event: CalendarEvent) {
  if (event.reminder === 60) {
    return "za 1 godzinę";
  }

  return `za ${event.reminder} minut`;
}

export function startReminderService() {
  setInterval(() => {
    const now = new Date();

    const events = loadCalendarEvents();

    events.forEach((event) => {
      // brak przypomnienia
      if (event.reminder === 0) {
        return;
      }

      const reminderTime = getReminderMoment(event);

      const diff = Math.abs(now.getTime() - reminderTime.getTime());

      // okno 1 minuty
      if (diff < 60000 && !event.notified) {
        sendNotification({
          title: "Pulse",

          body: `${event.title} zaczyna się ${formatReminderText(event)}`,
        });

        console.log("🔔 Notification sent:", event.title);

        event.notified = true;

        event.lastReminder = new Date().toISOString();

        saveCalendarEvents(events);
      }
    });
  }, 60000);
}
