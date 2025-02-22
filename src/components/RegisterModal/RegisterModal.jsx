import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, closeModal }) => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Need to call once a handleRegistration has been completed.
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ModalWithForm
      title="Register"
      buttonText={"Sign Up"}
      isOpen={handleChange}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          id="email"
          value={signUpData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          id="password"
          value={signUpData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>

      <label htmlFor="name" className="modal__label">
        Name*{" "}
        <input
          type="text"
          id="name"
          value={signUpData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </label>

      <label htmlFor="avatar" className="modal__label">
        Avatar URL*{" "}
        <input
          type="url"
          id="avatar"
          value={signUpData.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
