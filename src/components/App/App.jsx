import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

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
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

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

  const handleLoginLinkClick = () => {
    closeModal();
    setActiveModal("signup");
  };

  const handleSignUpLinkClick = () => {
    closeModal();
    setActiveModal("login");
  };

  const handleProfileClick = () => {
    setActiveModal("change-profile-data");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  //SIGNUP & SIGNIN

  const handleGetUserInfo = () => {
    const token = localStorage.getItem("jwt");

    auth
      .checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((error) => console.log(error));
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    auth
      .register(name, avatar, email, password)
      .then((userData) => {
        if (userData) {
          // setIsLoggedIn(true);
          handleLogin({ email, password });
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
        handleGetUserInfo();
        closeModal();
      })
      .catch((error) => console.log(error));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  };

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    auth
      .editProfile(name, avatar, token)
      .then((userUpdate) => {
        setCurrentUser(userUpdate);
        closeModal();
      })
      .catch((error) => console.log(error));
  };

  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? api
          .addCardLike(_id, token)
          .then((cardUpdate) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? cardUpdate : item))
            );
          })
          .catch((error) => console.log(error))
      : api
          .removeCardLike(_id, token)
          .then((cardUpdate) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? cardUpdate : item))
            );
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
    handleGetUserInfo();
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
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleProfileClick={handleProfileClick}
                      onCardLike={handleCardLike}
                      handleLogout={handleLogout}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
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
          {/* need to able to click the button to open the modal */}
          <EditProfileModal
            handleEditProfile={handleEditProfile}
            isOpen={activeModal === "change-profile-data"}
            closeModal={closeModal}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
