const BASE_URL = "http://localhost:3001";
const getToken = () => localStorage.getItem("jwt");
import api from "./api";

const register = (name, avatar, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(api.checkResponse);
};

const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    //changed login to signin
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(api.checkResponse);
};

const editProfile = (name, avatar) => {
  console.log(name, avatar);
  const token = getToken();
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(api.checkResponse);
};

const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(api.checkResponse);
};

export { register, login, editProfile, checkToken };
