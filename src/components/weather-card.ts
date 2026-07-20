export class WeatherCard {
  render() {
    return `


<div id="weather">

<h2 id="weather-city">
Brak miasta
</h2>


<h1 id="weather-temp">
-- °C
</h1>


</div>


`;
  }

  update(data: any) {
    const city = document.getElementById("weather-city");

    const temp = document.getElementById("weather-temp");

    if (city) city.textContent = data.city;

    if (temp) temp.textContent = data.temperature + "°C";
  }
}

export const weatherCard = new WeatherCard();
