import { Widget } from "./widget";

export class WeatherWidget extends Widget {
  constructor() {
    super("weather", "🌤 Pogoda");
  }

  render(): string {
    return `


        <div class="widget weather-widget">


            <h2>

                ${this.title}

            </h2>



            <h3>

                📍 Jelenia Góra

            </h3>



            <div 
            class="value"
            id="weather-temperature"
            >

                Ładowanie...

            </div>



            <div
            id="weather-status"
            >

            </div>



        </div>


        `;
  }

  update() {
    const temperature = document.getElementById("weather-temperature");

    const status = document.getElementById("weather-status");

    if (!temperature) return;

    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=50.8997&longitude=15.7289&current=temperature_2m,weather_code",
    )
      .then((response) => response.json())

      .then((data) => {
        temperature.textContent = `${data.current.temperature_2m} °C`;

        if (status) {
          status.textContent = "Aktualna pogoda";
        }
      })

      .catch(() => {
        temperature.textContent = "Błąd pogody";
      });
  }

  setup() {
    this.update();
  }
}

export const weatherWidget = new WeatherWidget();
