import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
// import { getItems, addItems } from "../../utils/api";
import api from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "hot",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState(""); //turn of if needed
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

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

  const closeModal = () => {
    setActiveModal("");
  };

  const onAddItem = ({ name, imageUrl, weather }) => {
    // console.log(name, imageUrl, weather);
    // setClothingItems([values, ...clothingItems]);
    api
      .addItems(name, imageUrl, weather)
      .then((values) => {
        setClothingItems([values, ...clothingItems]);
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  const onDeleteItem = (id) => {
    api
      .deleteItems(id)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== id));
        closeModal();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        // console.log(data);
        setClothingItems(data);
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
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>

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
          onDeleteItem={onDeleteItem}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
