import { openPopup, closePopup } from "./modal";
const cohortId = "wff-cohort-6";
const token = "7a10f87e-ee06-4de3-b41d-822d415ea854";
const apiUrl = `https://nomoreparties.co/v1/${cohortId}`;
const cardSection = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
const valueName = document.querySelector(".profile__title");
const valueJob = document.querySelector(".profile__subtitle");
const avatarOpen = document.querySelector(".avatar");
const photoImg = document.querySelector(".popup__image");
const photoFigcaption = document.querySelector(".popup__figcaption");
const popupImg = document.querySelector(".popup_photo");
const popupCard = document.querySelector(".popup_card");
const nameInputCard = popupCard.querySelector(".popup__field_value_name");
const urlInputCard = popupCard.querySelector(".popup__field_value_description");
const popupAvatar = document.querySelector(".popup_avatar");
const popupAvatarButtonClose = popupAvatar.querySelector(".popup__close");
const saveAvatar = popupAvatar.querySelector(".popup__form");
const avatarUrl = popupAvatar.querySelector(".popup__field");
const popupProfile = document.querySelector(".popup_profile");
const nameInput = popupProfile.querySelector(".popup__field_value_name");
const jobInput = popupProfile.querySelector(".popup__field_value_description");
const submitButton = document.querySelector(".popup__save");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_active",
};

export const getInitialCards = () => {
  Promise.all([getCardsUsers(), getUserProfile()])
    .then(([initialCards, userInfo]) => {
      initialCards.forEach((card) => {
        cardSection.append(
          createCard(card, userInfo._id, deleteCardImg, likeCard, handleClick)
        );
      });
      valueName.textContent = userInfo.name;
      valueJob.textContent = userInfo.about;
      avatarOpen.style.backgroundImage = `url(${userInfo.avatar})`;
      saveProfileValue(userInfo.name, userInfo.about);
    })
    .catch((err) => {
      console.log(err);
    });
};
//снятие лайка
export const deleteLikeCard = (cardId) => {
  return fetch(`${apiUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
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
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
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
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
//сохранение профиля
export const saveProfileValue = (name, about) => {
  submitButton.textContent = "Сохранение...";
  return fetch(`${apiUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
};
//смена аватара
export const changeAvatar = (link) => {
  submitButton.textContent = "Сохранение...";
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
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      avatarOpen.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
};

export const getUserProfile = () => {
  return fetch(`${apiUrl}/users/me`, {
    headers: {
      authorization: token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCardsUsers = () => {
  return fetch(`${apiUrl}/cards`, {
    headers: {
      authorization: token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const submitFormCard = (evt) => {
  evt.preventDefault();
  submitButton.textContent = "Сохранение...";
  addNewCard(nameInputCard.value, urlInputCard.value)
    .then((res) => {
      cardSection.prepend(
        createCard(res, res._id, deleteCardImg, likeCard, handleClick)
      );
      closePopup(popupCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
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
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAvatar = () => {
  saveAvatar.addEventListener("submit", (evt) => {
    const form = evt.target.closest(".popup__form");
    const submitButton = form.querySelector(".popup__save");
    submitButton.textContent = "Сохранение...";
    changeAvatar(avatarUrl.value)
      .then((res) => {
        closePopup(popupAvatar);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButton.textContent = "Сохранить";
      });
  });
};

export const createCard = (card, userId, deleteCard, likeCard, handleClick) => {
  const newCardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardLikeCounter = newCardElement.querySelector(".card__like-counter");
  const likeButton = newCardElement.querySelector(".card__like-button");
  cardLikeCounter.textContent = card.likes.length;
  newCardElement.querySelector(".card__image").src = card.link;
  newCardElement.querySelector(".card__title").textContent = card.name;
  newCardElement.querySelector(".card__image").alt = card.name;
  let isLiked = card.likes.some((like) => like._id === userId);
  if (card.owner._id !== "23d9e98a98f2e37f8afb77f3") {
    newCardElement.querySelector(".card__delete-button").style.display = "none";
  }
  newCardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      deleteCard(card._id)
        .then(() => {
          newCardElement.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  newCardElement
    .querySelector(".card__like-button")
    .addEventListener("click", () => {
      if (isLiked) {
        deleteLikeCard(card._id)
          .then((res) => {
            cardLikeCounter.textContent = res.likes.length;
            isLiked = !isLiked;
            likeButton.classList.remove("card__like-button_active");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        likeCard(card._id)
          .then((res) => {
            cardLikeCounter.textContent = res.likes.length;
            isLiked = !isLiked;
            likeButton.classList.add("card__like-button_active");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  newCardElement
    .querySelector(".card__image")
    .addEventListener("click", handleClick);
  return newCardElement;
};

export const handleClick = (evt) => {
  photoImg.src = evt.target.src;
  photoFigcaption.textContent = evt.target.closest(".card").textContent;
  photoImg.alt = evt.target.alt;
  openPopup(popupImg);
};

export const savePopupProfile = (evt) => {
  evt.preventDefault();
  const form = evt.target.closest(".popup__form");
  const submitButton = form.querySelector(".popup__save");
  submitButton.textContent = "Сохранение...";
  saveProfileValue(nameInput.value, jobInput.value)
    .then(() => {
      valueName.textContent = nameInput.value;
      valueJob.textContent = jobInput.value;
      closePopup(popupProfile);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
};

export {
  valueName,
  valueJob,
  avatarOpen,
  popupImg,
  popupCard,
  popupAvatar,
  popupAvatarButtonClose,
  nameInput,
  jobInput,
  popupProfile,
  validationConfig,
};
