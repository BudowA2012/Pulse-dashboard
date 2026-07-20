import "./style.css";

import { cpuWidget } from "./widgets/cpu";
import { gpuWidget } from "./widgets/gpu";
import { ramWidget } from "./widgets/ram";
import { weatherWidget } from "./widgets/weather";

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

  function showSystem() {
    if (!content) return;

    content.innerHTML = `


<div class="dashboard">


${cpuWidget.render()}


${gpuWidget.render()}


${ramWidget.render()}


</div>


`;

    cpuWidget.update();

    gpuWidget.update();

    ramWidget.update();
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

  document.getElementById("system-tab")?.addEventListener("click", () => {
    showSystem();

    setActiveTab("system-tab");
  });

  document.getElementById("weather-tab")?.addEventListener("click", () => {
    showWeather();

    setActiveTab("weather-tab");
  });

  showSystem();

  setInterval(() => {
    if (document.getElementById("cpu-value")) {
      cpuWidget.update();

      gpuWidget.update();

      ramWidget.update();
    }
  }, 2000);
}
