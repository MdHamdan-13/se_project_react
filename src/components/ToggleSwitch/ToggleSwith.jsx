import React, { useContext, useState } from "react";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const [currentTempUnit, handleToggleChange] = useState("C");

  const handleChange = (event) => {
    if (currentTempUnit === "C") handleToggleChange("F");
    if (currentTempUnit === "F") handleToggleChange("C");
  };

  console.log(currentTempUnit);
  return (
    <label htmlFor="" className="switch">
      <input
        type="checkbox"
        className="switch__checkBox"
        onChange={handleChange}
      />
      <span
        className={
          currentTempUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider-C"
        }
      ></span>
      <p className="switch__temp-F">F</p>
      <p className="switch__temp-C">C</p>
    </label>
  );
}
export default ToggleSwitch;
