import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
// import sunny from "../../assets/Day/sunny.svg";

function WeatherCard({ weatherData }) {
  const filteredWeatherOption = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOptionUrl = filteredWeatherOption[0]?.url;
  const weatherOptionCondition = filteredWeatherOption[0]?.condition;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img
        src={weatherOptionUrl}
        alt={weatherOptionCondition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
