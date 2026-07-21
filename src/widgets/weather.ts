import { Widget } from "./widget";

import { addWeatherCard } from "../components/add-weather-card";

import { WeatherCard } from "../components/weather-card";

import { searchCity } from "../services/geocoding";

import { getWeather } from "../services/weather";

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

  setup() {
    this.bindAddButton();
  }

  private bindAddButton() {
    document
      .querySelector(".add-weather-card")
      ?.addEventListener("click", () => {
        this.addWeatherWidget();
      });
  }

  private addWeatherWidget() {
    const grid = document.getElementById("weather-grid");

    if (!grid) return;

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
    });

    grid.insertAdjacentHTML("beforeend", addWeatherCard.render());

    this.bindAddButton();

    this.cards.forEach((card) => {
      this.setupSearch(card);
    });
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
        });
      });
    });
  }
}

export const weatherWidget = new WeatherWidget();
