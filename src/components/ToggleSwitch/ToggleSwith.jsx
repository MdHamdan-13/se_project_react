import { useContext, useState } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  // const [currentTempUnit, handleToggleChange] = useState("C");

  // const handleChange = (event) => {
  //   if (currentTempUnit === "C") handleToggleChange("F");
  //   if (currentTempUnit === "F") handleToggleChange("C");
  // };

  // console.log(currentTempUnit);

  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  // console.log(currentTemperatureUnit);

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__checkBox"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
}
export default ToggleSwitch;
