function getWeatherIcon(code: number) {
  if (code === 0) return "☀️";

  if (code >= 1 && code <= 3) return "🌤️";

  if (code >= 45 && code <= 48) return "🌫️";

  if (code >= 51 && code <= 67) return "🌧️";

  if (code >= 71 && code <= 77) return "❄️";

  if (code >= 80 && code <= 82) return "🌦️";

  if (code >= 95 && code <= 99) return "⛈️";

  return "🌡️";
}

function getWeatherName(code: number) {
  if (code === 0) return "Bezchmurnie";

  if (code >= 1 && code <= 3) return "Częściowe zachmurzenie";

  if (code >= 45 && code <= 48) return "Mgła";

  if (code >= 51 && code <= 67) return "Deszcz";

  if (code >= 71 && code <= 77) return "Śnieg";

  if (code >= 80 && code <= 82) return "Przelotne opady";

  if (code >= 95 && code <= 99) return "Burza";

  return "Nieznana pogoda";
}

export class WeatherCard {
  private id: string;

  private cityName: string = "";

  private temperature: string = "-- °C";

  private wind: string = "-- km/h";

  private humidity: string = "-- %";

  private weatherIcon: string = "🌡️";

  private weatherName: string = "Pogoda";

  constructor(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }

  render(): string {
    return `


<div
class="weather-card"
id="${this.id}"
>



<button
class="weather-remove"
>
×
</button>





<h2 class="weather-city">

${this.cityName || "Wybierz miasto"}

</h2>






<div
class="weather-temp"
>

${this.temperature}

</div>







<div
class="weather-details"
>


${
  this.cityName
    ? `

<div class="weather-status">

${this.weatherIcon}

${this.weatherName}

</div>



<div>
💨 Wiatr ${this.wind}
</div>



<div>
💧 Wilgotność ${this.humidity}
</div>

`
    : ""
}



</div>








<div
class="weather-add"
style="${this.cityName ? "display:none;" : ""}"
>



<input
class="card-city-input"
placeholder="Wpisz miasto..."
>



<div
class="card-city-results"
>

</div>



</div>





</div>


`;
  }

  showWeather(data: any) {
    this.cityName = data.city;

    this.temperature = `${data.temperature} °C`;

    this.wind = `${data.wind} km/h`;

    this.humidity = `${data.humidity}%`;

    this.weatherIcon = getWeatherIcon(data.code);

    this.weatherName = getWeatherName(data.code);

    const element = document.getElementById(this.id);

    if (!element) return;

    const city = element.querySelector(".weather-city");

    const temp = element.querySelector(".weather-temp");

    const details = element.querySelector(".weather-details");

    if (city) {
      city.textContent = this.cityName;
    }

    if (temp) {
      temp.textContent = this.temperature;
    }

    if (details) {
      details.innerHTML = `

<div class="weather-status">

${this.weatherIcon}

${this.weatherName}

</div>



<div>
💨 Wiatr ${this.wind}
</div>



<div>
💧 Wilgotność ${this.humidity}
</div>


`;
    }

    const search = element.querySelector(".weather-add") as HTMLElement;

    if (search) {
      search.style.display = "none";
    }
  }
}
