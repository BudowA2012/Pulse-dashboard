import type { WeatherData } from "../types/weather";

export class WeatherCard {
  render(): string {
    return `

<div class="weather-card">

    <h2 id="weather-city">
        Wybierz miasto
    </h2>

    <div
        class="weather-temp"
        id="weather-temp"
    >
        --°C
    </div>

    <div
        class="weather-details"
    >

        <div>
            🌡 Odczuwalna:
            <span id="weather-feels">
                --
            </span>
        </div>

        <div>
            💧 Wilgotność:
            <span id="weather-humidity">
                --
            </span>
        </div>

        <div>
            💨 Wiatr:
            <span id="weather-wind">
                --
            </span>
        </div>

    </div>

</div>

`;
  }

  update(data: WeatherData) {
    document.getElementById("weather-city")!.textContent = data.city;

    document.getElementById("weather-temp")!.textContent =
      `${Math.round(data.temperature)}°C`;

    document.getElementById("weather-feels")!.textContent =
      `${Math.round(data.apparentTemperature)}°C`;

    document.getElementById("weather-humidity")!.textContent =
      `${data.humidity}%`;

    document.getElementById("weather-wind")!.textContent =
      `${Math.round(data.windSpeed)} km/h`;
  }
}

export const weatherCard = new WeatherCard();
