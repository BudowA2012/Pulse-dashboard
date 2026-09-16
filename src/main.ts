import "./styles/base.css";
import "./styles/components.css";
import "./styles/layout.css";
import "./styles/system.css";
import "./styles/weather.css";
import "./styles/notes.css";
import "./styles/calendar.css";
import "./styles/settings.css";
import "./styles/animations.css";

import { cpuWidget } from "./widgets/cpu";
import { gpuWidget } from "./widgets/gpu";
import { ramWidget } from "./widgets/ram";
import { diskWidget } from "./widgets/disk";
import { systemInfoWidget } from "./widgets/system-info";

import { weatherWidget } from "./widgets/weather";
import { notesWidget } from "./widgets/notes";
import { calendarWidget } from "./widgets/calendar";

import { showSettingsPage } from "./views/settings";

import {
  applySettings,
  getSettings,
} from "./services/settings-service";

import { startCursorGlow } from "./services/cursor-glow";

import { startReminderService } from "./services/reminder-service";


applySettings();

startCursorGlow();


const app =
  document.querySelector<HTMLDivElement>(
    "#app"
  );


let systemInterval: number | null = null;

let diskInterval: number | null = null;

let updating = false;


if (app) {
  app.innerHTML = `
    <div class="app">

      <header class="header">

        <div class="brand">

          <div class="brand-name">
            PULSE
          </div>

          <div class="brand-sub">
            SMART DASHBOARD
          </div>

        </div>


        <nav class="top-nav">

          <button
            id="system-tab"
          >
            System
          </button>

          <button
            id="weather-tab"
          >
            Pogoda
          </button>

          <button
            id="notes-tab"
          >
            Notatki
          </button>

          <button
            id="calendar-tab"
          >
            Kalendarz
          </button>

          <button
            id="settings-tab"
          >
            Ustawienia
          </button>

        </nav>

      </header>


      <main id="content">
      </main>

    </div>
  `;


  const content =
    document.getElementById(
      "content"
    );


  function setActiveTab(
    id: string
  ) {
    document
      .querySelectorAll(
        ".top-nav button"
      )
      .forEach((btn) => {
        btn.classList.remove(
          "active"
        );
      });


    document
      .getElementById(id)
      ?.classList.add(
        "active"
      );
  }


  function stopSystemUpdates() {
    if (systemInterval) {
      clearInterval(
        systemInterval
      );

      systemInterval = null;
    }


    if (diskInterval) {
      clearInterval(
        diskInterval
      );

      diskInterval = null;
    }
  }


  async function updateSystem() {
    if (updating) return;


    if (
      !document.getElementById(
        "cpu-value"
      )
    ) {
      return;
    }


    updating = true;


    try {
      await Promise.all([
        cpuWidget.update(),
        gpuWidget.update(),
        ramWidget.update(),
      ]);
    } catch (error) {
      console.error(
        "System update error:",
        error
      );
    }


    updating = false;
  }


  function startSystemUpdates() {
    stopSystemUpdates();


    const settings =
      getSettings();


    systemInterval =
      window.setInterval(() => {
        updateSystem();
      }, settings.systemRefreshInterval);


    diskInterval =
      window.setInterval(() => {
        if (
          document.getElementById(
            "disk-value"
          )
        ) {
          diskWidget.update();
        }
      }, settings.diskRefreshInterval);
  }


  async function showSystem() {
    if (!content) return;


    stopSystemUpdates();


    content.innerHTML = `
      <div class="system-dashboard">

        ${cpuWidget.render()}

        ${gpuWidget.render()}

        ${ramWidget.render()}

        ${systemInfoWidget.render()}

        ${diskWidget.render()}

      </div>
    `;


    cpuWidget.setup();

    gpuWidget.setup();

    ramWidget.setup();

    systemInfoWidget.setup();

    diskWidget.setup();


    await updateSystem();

    await diskWidget.update();


    startSystemUpdates();
  }


  async function showWeather() {
    stopSystemUpdates();


    if (!content) return;


    content.innerHTML = `
      <div class="weather-page">

        ${weatherWidget.render()}

      </div>
    `;


    await weatherWidget.setup();
  }


  function showNotes() {
    stopSystemUpdates();


    if (!content) return;


    content.innerHTML = `
      <div class="notes-page">

        ${notesWidget.render()}

      </div>
    `;


    notesWidget.setup();
  }


  function showCalendar() {
    stopSystemUpdates();


    if (!content) return;


    content.innerHTML = `
      <div class="calendar-page">

        ${calendarWidget.render()}

      </div>
    `;


    calendarWidget.setup();
  }


  function showSettings() {
    stopSystemUpdates();

    showSettingsPage();
  }


  function openPage(
    page:
      | "system"
      | "weather"
      | "notes"
      | "calendar"
  ) {
    if (page === "weather") {
      showWeather();

      setActiveTab(
        "weather-tab"
      );

      return;
    }


    if (page === "notes") {
      showNotes();

      setActiveTab(
        "notes-tab"
      );

      return;
    }


    if (page === "calendar") {
      showCalendar();

      setActiveTab(
        "calendar-tab"
      );

      return;
    }


    showSystem();

    setActiveTab(
      "system-tab"
    );
  }


  document
    .getElementById(
      "system-tab"
    )
    ?.addEventListener(
      "click",
      () => {
        showSystem();

        setActiveTab(
          "system-tab"
        );
      }
    );


  document
    .getElementById(
      "weather-tab"
    )
    ?.addEventListener(
      "click",
      () => {
        showWeather();

        setActiveTab(
          "weather-tab"
        );
      }
    );


  document
    .getElementById(
      "notes-tab"
    )
    ?.addEventListener(
      "click",
      () => {
        showNotes();

        setActiveTab(
          "notes-tab"
        );
      }
    );


  document
    .getElementById(
      "calendar-tab"
    )
    ?.addEventListener(
      "click",
      () => {
        showCalendar();

        setActiveTab(
          "calendar-tab"
        );
      }
    );


  document
    .getElementById(
      "settings-tab"
    )
    ?.addEventListener(
      "click",
      () => {
        showSettings();

        setActiveTab(
          "settings-tab"
        );
      }
    );


  window.addEventListener(
    "show-system",
    () => {
      showSystem();

      setActiveTab(
        "system-tab"
      );
    }
  );


  window.addEventListener(
    "pulse-settings-changed",
    () => {
      if (
        document.getElementById(
          "cpu-value"
        )
      ) {
        startSystemUpdates();
      }
    }
  );


  const settings =
    getSettings();


  openPage(
    settings.startPage
  );


  startReminderService();
}