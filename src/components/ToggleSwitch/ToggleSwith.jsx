import React from "react";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  console.log("toggle");
  return (
    <label htmlFor="" className="switch">
      <input type="checkbox" className="switch__checkBox" />
    </label>
  );
}
export default ToggleSwitch;
