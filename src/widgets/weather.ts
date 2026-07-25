import { Widget } from "./widget";

import { addWeatherCard } from "../components/add-weather-card";
import { WeatherCard } from "../components/weather-card";

import { searchCity } from "../services/geocoding";
import { getWeather } from "../services/weather";

import {
  loadWeatherCities,
  addWeatherCity,
  removeWeatherCity,
  loadStorage,
} from "../storage";

class WeatherWidget extends Widget {
  private cards: WeatherCard[] = [];

  constructor() {
    super("weather", "🌤 Pogoda");
  }

  render(): string {
    return `

<div class="weather-widget">

<h2>
${this.title}
</h2>

<div
class="weather-grid"
id="weather-grid"
>

${addWeatherCard.render()}

</div>

</div>

`;
  }

  async setup() {
    this.bindAddButton();

    await this.loadSavedCities();
  }

  private bindAddButton() {
    document
      .querySelector(".add-weather-card")
      ?.addEventListener("click", () => {
        this.addWeatherWidget();
      });
  }

  private addWeatherWidget() {
    const id = "weather-" + Date.now();

    const card = new WeatherCard(id);

    this.cards.push(card);

    this.renderCards();
  }

  private renderCards() {
    const grid = document.getElementById("weather-grid");

    if (!grid) return;

    grid.innerHTML = "";

    this.cards.forEach((card) => {
      grid.insertAdjacentHTML("beforeend", card.render());

      const element = document.getElementById(card.getId());

      element
        ?.querySelector(".weather-remove")
        ?.addEventListener("click", () => {
          this.removeCard(card);
        });

      this.setupSearch(card);
    });

    grid.insertAdjacentHTML("beforeend", addWeatherCard.render());

    this.bindAddButton();
  }

  private removeCard(card: WeatherCard) {
    const storageId = card.getStorageId();

    if (storageId) {
      removeWeatherCity(storageId);
    }

    this.cards = this.cards.filter((item) => item !== card);

    this.renderCards();
  }

  private setupSearch(card: WeatherCard) {
    const element = document.getElementById(card.getId());

    if (!element) return;

    const input = element.querySelector(".card-city-input") as HTMLInputElement;

    const results = element.querySelector(".card-city-results") as HTMLElement;

    if (!input || !results) return;

    input.addEventListener("input", async () => {
      const value = input.value.trim();

      if (value.length < 2) {
        results.innerHTML = "";

        return;
      }

      const cities = await searchCity(value);

      if (!cities || cities.length === 0) {
        results.innerHTML = "";

        return;
      }

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

      results.querySelectorAll(".city-option").forEach((option) => {
        option.addEventListener("click", async () => {
          const index = Number(option.getAttribute("data-index"));

          const city = cities[index];

          const data = await getWeather(city.name, city.lat, city.lon);

          card.showWeather(data);

          addWeatherCity({
            name: city.name,
            lat: city.lat,
            lon: city.lon,
          });

          const storage = loadStorage();

          const saved = storage.weatherCities.find(
            (c) =>
              c.name === city.name && c.lat === city.lat && c.lon === city.lon,
          );

          if (saved) {
            card.setStorageId(saved.id);
          }
        });
      });
    });
  }

  private async loadSavedCities() {
    const cities = loadWeatherCities();

    if (cities.length === 0) return;

    for (const city of cities) {
      const id = "weather-" + Date.now() + Math.random();

      const card = new WeatherCard(id);

      card.setStorageId(city.id);

      this.cards.push(card);
    }

    this.renderCards();

    for (let i = 0; i < cities.length; i++) {
      const data = await getWeather(
        cities[i].name,
        cities[i].lat,
        cities[i].lon,
      );

      this.cards[i].showWeather(data);
    }
  }
}

export const weatherWidget = new WeatherWidget();
