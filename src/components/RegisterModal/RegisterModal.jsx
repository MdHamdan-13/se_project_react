import "./RegisterModal.css";
import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  handleRegistration,
  handleSignUpLinkClick,
  isOpen,
  closeModal,
}) => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  // const [error, setError] = useState("");

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
    handleRegistration(signUpData);
  };

  useEffect(() => {
    if (isOpen) {
      setSignUpData({
        email: "",
        password: "",
        name: "",
        avatar: "",
      });
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText={"Sign Up"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      closeModal={closeModal}
      hasLink={true}
      linkContent="or Log In"
      // linkHref="/login"
      onClick={handleSignUpLinkClick}
    >
      <label htmlFor="email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          id="email"
          name="email"
          className="modal__input"
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
          name="password"
          className="modal__input"
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
          name="name"
          className="modal__input"
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
          name="avatar"
          className="modal__input"
          value={signUpData.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
