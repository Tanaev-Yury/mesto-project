import { createCard, openImagePopup } from ".";
import {
  valueJob,
  valueName,
  userAvatar,
  cardSection,
  submitButtonProfile,
} from ".";
const cohortId = "wff-cohort-6";
const token = "7a10f87e-ee06-4de3-b41d-822d415ea854";
const apiUrl = `https://nomoreparties.co/v1/${cohortId}`;
let userId = "";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = () => {
  Promise.all([getCardsUsers(), getUserProfile()]).then(
    ([initialCards, userInfo]) => {
      userId = userInfo._id;
      initialCards.forEach((card) => {
        cardSection.append(
          createCard(
            card,
            userId,
            deleteCardImg,
            likeCard,
            deleteLikeCard,
            openImagePopup
          )
        );
      });
      valueName.textContent = userInfo.name;
      valueJob.textContent = userInfo.about;
      userAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    }
  );
};
//снятие лайка
export const deleteLikeCard = (
  cardId,
  likeButton,
  cardLikeCounter,
  updateIsLiked
) => {
  return fetch(`${apiUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return checkResponse(res);
    })
    .then((data) => {
      updateIsLiked();
      likeButton.classList.remove("card__like-button_active");
      cardLikeCounter.textContent = data.likes.length;
    });
};
//установка лайка
export const likeCard = (
  cardId,
  likeButton,
  cardLikeCounter,
  updateIsLiked
) => {
  return fetch(`${apiUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return checkResponse(res);
    })
    .then((data) => {
      updateIsLiked();
      likeButton.classList.add("card__like-button_active");
      cardLikeCounter.textContent = data.likes.length;
    });
};
//иконка мусорки
export const deleteCardImg = (cardId, cardElement) => {
  return fetch(`${apiUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return checkResponse(res);
    })
    .then(() => {
      cardElement.remove();
    });
};
//сохранение профиля
export const saveProfileValue = (name, about) => {
  submitButtonProfile.textContent = "Сохранение...";
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
  })
    .then((res) => {
      return checkResponse(res);
    })
    .finally(() => {
      submitButtonProfile.textContent = "Сохранить";
    });
};
//смена аватара
export const changeAvatar = (link) => {
  submitButtonProfile.textContent = "Сохранение...";
  return fetch(`${apiUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then((res) => {
      return checkResponse(res);
    })
    .then((data) => {
      userAvatar.style.backgroundImage = `url(${data.avatar})`;
    })
    .finally(() => {
      submitButtonProfile.textContent = "Сохранить";
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
