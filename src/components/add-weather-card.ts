export class AddWeatherCard {
  render(): string {
    return `

<div class="add-weather-card">

    <span>
        +
    </span>

    <p>
        Dodaj pogodę
    </p>

</div>

`;
  }
}

export const addWeatherCard = {
  render() {
    return `

<div class="weather-card add-weather-card">

<h3>
Dodaj miasto
</h3>

</div>

`;
  },
};
