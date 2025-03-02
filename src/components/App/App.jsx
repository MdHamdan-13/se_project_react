import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

import api from "../../utils/api";
import * as auth from "../../utils/auth";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setActiveModal("signup");
  };

  const handleLoginLinkClick = (RegisterModal) => {
    closeModal();
    setActiveModal(RegisterModal);
  };

  const handleSignUpLinkClick = (LoginModal) => {
    closeModal();
    setActiveModal(LoginModal);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  //SIGNUP & SIGNIN
  const handleRegistration = ({ name, avatar, email, password }) => {
    auth
      .register(name, avatar, email, password)
      .then((userData) => {
        if (userData) {
          setIsLoggedIn(true);
          closeModal();
        } else {
          console.error("Registration failed");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .login(email, password)
      .then((userData) => {
        localStorage.setItem("jwt", userData.token);
      })
      .catch((error) => console.log(error));
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const onAddItem = ({ name, imageUrl, weather }) => {
    api
      .addItems(name, imageUrl, weather)
      .then((values) => {
        setClothingItems([values, ...clothingItems]);
        closeModal();
      })
      .catch((error) => console.log(error));
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
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          console.log(data, "Success");
          setIsLoggedIn(true);
        })
        .catch(() => {
          console.error("Token verification failed");
          setIsLoggedIn(false);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />
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
                  isLoggedIn ? (
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>

            <Footer />
          </div>

          {/* <ModalWithForm handleLoginLinkClick={handleLoginLinkClick} /> */}

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

          <RegisterModal
            handleRegistration={handleRegistration}
            handleSignUpLinkClick={handleSignUpLinkClick}
            isOpen={activeModal === "signup"}
            closeModal={closeModal}
          />
          <LoginModal
            handleLogin={handleLogin}
            handleLoginLinkClick={handleLoginLinkClick}
            isOpen={activeModal === "login"}
            closeModal={closeModal}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
