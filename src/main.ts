// styles imports:
import "./styles/base.css";
import "./styles/components.css";
import "./styles/layout.css";
import "./styles/system.css";
import "./styles/weather.css";
import "./styles/notes.css";
import "./styles/calendar.css";
import "./styles/animations.css";

// System imports:
import { cpuWidget } from "./widgets/cpu";
import { gpuWidget } from "./widgets/gpu";
import { ramWidget } from "./widgets/ram";
import { diskWidget } from "./widgets/disk";

// Views
import { showCpuDetails } from "./views/cpu-details";

// Other imports:
import { weatherWidget } from "./widgets/weather";
import { notesWidget } from "./widgets/notes";
import { calendarWidget } from "./widgets/calendar";
import { startReminderService } from "./services/reminder-service";

const app = document.querySelector<HTMLDivElement>("#app");

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
    document.querySelectorAll(".top-nav button").forEach((button) => {
      button.classList.remove("active");
    });

    document.getElementById(id)?.classList.add("active");
  }

  function bindSystemClicks() {
    document.getElementById("cpu-widget")?.addEventListener("click", () => {
      showCpuDetails();
    });
  }

  function showSystem() {
    if (!content) return;

    content.innerHTML = `


<div class="system-dashboard">


${cpuWidget.render()}


${gpuWidget.render()}


${ramWidget.render()}


${diskWidget.render()}


</div>


`;

    cpuWidget.update();

    gpuWidget.update();

    ramWidget.update();

    diskWidget.update();

    bindSystemClicks();
  }

  function showWeather() {
    if (!content) return;

    content.innerHTML = `


<div class="weather-page">


${weatherWidget.render()}


</div>


`;

    weatherWidget.setup();
  }

  function showNotes() {
    if (!content) return;

    content.innerHTML = `


<div class="notes-page">


${notesWidget.render()}


</div>


`;

    notesWidget.setup();
  }

  function showCalendar() {
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

  showSystem();

  startReminderService();

  setInterval(() => {
    if (document.getElementById("cpu-value")) {
      cpuWidget.update();

      gpuWidget.update();

      ramWidget.update();

      diskWidget.update();
    }
  }, 2000);
}
