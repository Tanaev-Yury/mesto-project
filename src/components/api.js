const cohortId = "wff-cohort-6";
const token = "7a10f87e-ee06-4de3-b41d-822d415ea854";
const apiUrl = `https://nomoreparties.co/v1/${cohortId}`;
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialData = () => {
  return Promise.all([getCardsUsers(), getUserProfile()]);
};

//снятие лайка
export const deleteLikeCard = (cardId) => {
  return fetch(`${apiUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checkResponse(res);
  });
};
//установка лайка
export const likeCard = (cardId) => {
  return fetch(`${apiUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checkResponse(res);
  });
};

//иконка мусорки
export const deleteCardImg = (cardId) => {
  return fetch(`${apiUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checkResponse(res);
  });
};

//сохранение профиля
export const saveProfileValue = (name, about) => {
  return fetch(`${apiUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
};
//смена аватара
export const changeAvatar = (link) => {
  return fetch(`${apiUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
};

export const getUserProfile = () => {
  return fetch(`${apiUrl}/users/me`, {
    headers: {
      authorization: token,
    },
  }).then((res) => {
    return checkResponse(res);
  });
};

export const getCardsUsers = () => {
  return fetch(`${apiUrl}/cards`, {
    headers: {
      authorization: token,
    },
  }).then((res) => {
    return checkResponse(res);
  });
};

export const addNewCard = (nameInput, linkInput) => {
  return fetch(`${apiUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput,
      link: linkInput,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
};
