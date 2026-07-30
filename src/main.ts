import "./styles/base.css";
import "./styles/components.css";
import "./styles/layout.css";
import "./styles/system.css";
import "./styles/weather.css";
import "./styles/notes.css";
import "./styles/calendar.css";
import "./styles/animations.css";

import { cpuWidget } from "./widgets/cpu";
import { gpuWidget } from "./widgets/gpu";
import { ramWidget } from "./widgets/ram";
import { diskWidget } from "./widgets/disk";

import { weatherWidget } from "./widgets/weather";
import { notesWidget } from "./widgets/notes";
import { calendarWidget } from "./widgets/calendar";

import { startReminderService } from "./services/reminder-service";

const app = document.querySelector<HTMLDivElement>("#app");

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


<button id="system-tab" class="active">
System
</button>


<button id="weather-tab">
Pogoda
</button>


<button id="notes-tab">
Notatki
</button>


<button id="calendar-tab">
Kalendarz
</button>


</nav>


</header>



<main id="content">

</main>


</div>

`;

  const content = document.getElementById("content");

  function setActiveTab(id: string) {
    document.querySelectorAll(".top-nav button").forEach((btn) => {
      btn.classList.remove("active");
    });

    document.getElementById(id)?.classList.add("active");
  }

  function stopSystemUpdates() {
    if (systemInterval) {
      clearInterval(systemInterval);

      systemInterval = null;
    }

    if (diskInterval) {
      clearInterval(diskInterval);

      diskInterval = null;
    }
  }

  async function updateSystem() {
    if (updating) return;

    if (!document.getElementById("cpu-value")) {
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
      console.error("System update error:", error);
    }

    updating = false;
  }

  function startSystemUpdates() {
    stopSystemUpdates();

    systemInterval = window.setInterval(() => {
      updateSystem();
    }, 3000);

    diskInterval = window.setInterval(() => {
      if (document.getElementById("disk-value")) {
        diskWidget.update();
      }
    }, 15000);
  }

  async function showSystem() {
    if (!content) return;

    stopSystemUpdates();

    content.innerHTML = `

<div class="system-dashboard">


${cpuWidget.render()}


${gpuWidget.render()}


${ramWidget.render()}


${diskWidget.render()}


</div>

`;

    cpuWidget.setup();

    gpuWidget.setup();

    ramWidget.setup();

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

  document.getElementById("system-tab")?.addEventListener("click", () => {
    showSystem();

    setActiveTab("system-tab");
  });

  document.getElementById("weather-tab")?.addEventListener("click", () => {
    showWeather();

    setActiveTab("weather-tab");
  });

  document.getElementById("notes-tab")?.addEventListener("click", () => {
    showNotes();

    setActiveTab("notes-tab");
  });

  document.getElementById("calendar-tab")?.addEventListener("click", () => {
    showCalendar();

    setActiveTab("calendar-tab");
  });

  window.addEventListener("show-system", () => {
    showSystem();

    setActiveTab("system-tab");
  });

  showSystem();

  startReminderService();
}
