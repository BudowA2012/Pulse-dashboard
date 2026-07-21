import type { WeatherData } from "../types/weather";

export class WeatherCard {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  render(): string {
    return `

<div class="weather-card" id="${this.id}">


<div class="weather-add">


<input
class="card-city-input"
placeholder="🔍 Wpisz miasto..."
/>


<div class="card-city-results">
</div>


</div>


<div class="weather-content" style="display:none">


<h2 class="weather-city">
</h2>


<div class="weather-temp">
</div>


<div class="weather-details">
</div>


</div>


</div>

`;
  }

  showWeather(data: WeatherData) {
    const card = document.getElementById(this.id);

    if (!card) return;

    const add = card.querySelector(".weather-add") as HTMLElement;

    const content = card.querySelector(".weather-content") as HTMLElement;

    add.style.display = "none";

    content.style.display = "block";

    card.querySelector(".weather-city")!.textContent = data.city;

    card.querySelector(".weather-temp")!.textContent =
      `${Math.round(data.temperature)}°C`;

    card.querySelector(".weather-details")!.innerHTML = `

    💧 ${data.humidity}%

    <br>

    💨 ${Math.round(data.windSpeed)} km/h

    `;
  }

  getId() {
    return this.id;
  }
}
