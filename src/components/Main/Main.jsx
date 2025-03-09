import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
// import { defaultClothingItems } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;
          {currentTemperatureUnit} / You may want to wear
        </p>

        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              //comment this to update CSS
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLike={onCardLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
