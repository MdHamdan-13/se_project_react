import React, { useState, useEffect } from "react";
import "./Avatar.css";

function Avatar({ avatar, name }) {
  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    setIsValidImage(true);
  }, [avatar]);

  const handleError = () => {
    setIsValidImage(false);
  };

  return (
    <div className="avatar">
      {isValidImage ? (
        <img
          src={avatar}
          alt={name}
          onError={handleError}
          className="avatar__image"
        />
      ) : (
        <div className="avatar__placeholder">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}

export default Avatar;
