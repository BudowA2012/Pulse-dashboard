import { Widget } from "./widget";

import { searchCity } from "../services/geocoding";

import { getWeather } from "../services/weather";

import { weatherCard } from "../components/weather-card";

class WeatherWidget extends Widget {
  constructor() {
    super("weather", "🌤 Pogoda");
  }

  render(): string {
    return `

<div class="widget weather-widget">


    <h2>
        ${this.title}
    </h2>


    <div class="city-search">


        <input
            id="city-input"
            placeholder="🔍 Wpisz miasto..."
        >


        <div
            id="city-results"
            class="city-results"
        ></div>


    </div>



    ${weatherCard.render()}



</div>

`;
  }

  setup() {
    const input = document.getElementById("city-input") as HTMLInputElement;

    const results = document.getElementById("city-results");

    if (!input || !results) return;

    input.addEventListener("input", async () => {
      const value = input.value.trim();

      if (value.length < 2) {
        results.innerHTML = "";

        return;
      }

      const cities = await searchCity(value);

      results.innerHTML = cities
        .map(
          (city, index) => `

            <div
                class="city-option"
                data-index="${index}"
            >

                ${city.name}

            </div>

            `,
        )
        .join("");

      document.querySelectorAll(".city-option").forEach((element) => {
        element.addEventListener("click", async () => {
          const index = Number(element.getAttribute("data-index"));

          const city = cities[index];

          const weather = await getWeather(city.name, city.lat, city.lon);

          weatherCard.update(weather);

          input.value = city.name;

          results.innerHTML = "";
        });
      });
    });
  }
}

export const weatherWidget = new WeatherWidget();
