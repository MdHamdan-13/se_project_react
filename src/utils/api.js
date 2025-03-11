const baseUrl = "http://localhost:3001";
const getToken = () => localStorage.getItem("jwt");

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`);
}

function addItems(name, imageUrl, weather) {
  const token = getToken();
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
}

function deleteItems(id) {
  const token = getToken();
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

function addCardLike(id) {
  const token = getToken();
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function removeCardLike(id) {
  const token = getToken();
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

const api = {
  getItems,
  addItems,
  deleteItems,
  addCardLike,
  removeCardLike,
};

export default api;
