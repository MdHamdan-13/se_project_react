import "./Header.css";
import logo from "../../assets/header-logo.svg";
import Avatar from "../Avatar/Avatar";
import ToggleSwitch from "../ToggleSwitch/ToggleSwith";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({
  handleAddClick,
  handleLoginClick,
  handleRegisterClick,
  weatherData,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              <Avatar avatar={currentUser.avatar} name={currentUser.name} />
            </div>
          </Link>
        </>
      ) : (
        <>
          <button
            type="button"
            className="header__signup"
            onClick={handleRegisterClick}
          >
            Sign Up
          </button>

          <button
            type="button"
            className="header__login"
            onClick={handleLoginClick}
          >
            Log In
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
