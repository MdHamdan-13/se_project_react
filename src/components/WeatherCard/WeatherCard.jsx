import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const filteredWeatherOption = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOptionUrl = filteredWeatherOption[0]?.url;
  const weatherOptionCondition = filteredWeatherOption[0]?.condition;
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
        {currentTemperatureUnit}
      </p>
      <img
        src={weatherOptionUrl}
        alt={weatherOptionCondition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
