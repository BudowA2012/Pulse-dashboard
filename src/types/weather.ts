export interface WeatherData {
  city: string;

  temperature: number;

  feelsLike: number;

  humidity: number;

  wind: number;

  weatherCode: number;

  hourly: {
    time: string;
    temp: number;
    code: number;
  }[];

  daily: {
    date: string;
    max: number;
    min: number;
    code: number;
  }[];
}
