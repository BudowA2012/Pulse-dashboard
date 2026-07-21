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

export const addWeatherCard = new AddWeatherCard();
