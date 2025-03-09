import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  handleLoginLinkClick,
  handleLogin,
  isOpen,
  closeModal,
}) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(loginData);
  };

  useEffect(() => {
    if (isOpen) {
      setLoginData({
        email: "",
        password: "",
      });
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Log In "
      buttonText={"Log In"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      closeModal={closeModal}
      hasLink={true}
      linkContent="or Sign Up"
      onClick={handleLoginLinkClick}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          id="email"
          name="email"
          className="modal__input"
          value={loginData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          id="password"
          name="password"
          className="modal__input"
          value={loginData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
