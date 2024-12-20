import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "hot",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState(""); //turn of if needed
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const onAddItem = (values) => {
    console.log(values);
  };

  const closeModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // console.log(currentTemperatureUnit);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          closeModal={closeModal}
          onAddItem={onAddItem}
        />

        <ItemModal
          activeModal={activeModal}
          item={selectedCard}
          closeModal={closeModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
