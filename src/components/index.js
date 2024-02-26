import { openPopup, closePopup } from "./modal.js";
import "../pages/index.css";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getInitialCards,
  changeAvatar,
  saveProfileValue,
  addNewCard,
  deleteCardImg,
  likeCard,
  deleteLikeCard,
} from "./api.js";
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_active",
};

const popupProfile = document.querySelector(".popup_profile");
const profileFormElement = popupProfile.querySelector(".popup__form");
const popupProfileButtonClose = popupProfile.querySelector(".popup__close");
const nameInput = popupProfile.querySelector(".popup__field_value_name");
const jobInput = popupProfile.querySelector(".popup__field_value_description");
const submitButtonProfile = popupProfile.querySelector(".popup__save");

const avatarForm = document.querySelector(".popup_avatar");
const avatarFormButtonClose = avatarForm.querySelector(".popup__close");
const saveAvatar = avatarForm.querySelector(".popup__form");
const avatarInput = avatarForm.querySelector(".popup__field");

const popupCard = document.querySelector(".popup_card");
const popupButtonCardClose = popupCard.querySelector(".popup__close");
const popupImg = document.querySelector(".popup_photo");
const userAvatar = document.querySelector(".avatar");
const editButton = document.querySelector(".profile__edit-button");
const nameInputCard = popupCard.querySelector(".popup__field_value_name");
const urlInputCard = popupCard.querySelector(".popup__field_value_description");

const popupButtonImgClose = document.querySelector(".popup__close_photo");
const formCard = document.querySelector(".popup__form");
const addButton = document.querySelector(".profile__add-button");
const cardTemplate = document.querySelector("#card-template").content;
const photoImg = document.querySelector(".popup__image");
const photoFigcaption = document.querySelector(".popup__figcaption");
const valueName = document.querySelector(".profile__title");
const valueJob = document.querySelector(".profile__subtitle");

const cardSection = document.querySelector(".elements");

const savePopupProfile = (evt) => {
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
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  submitButtonProfile.textContent = "Сохранение...";
  addNewCard(nameInputCard.value, urlInputCard.value)
    .then((res) => {
      cardSection.prepend(
        createCard(
          res,
          res.owner._id,
          deleteCardImg,
          likeCard,
          deleteLikeCard,
          openImagePopup
        )
      );
      clearValidation(formCard, validationConfig);
      closePopup(popupCard);
      formCard.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButtonProfile.textContent = "Сохранить";
    });
};

// Слушатель добавления карточки
formCard.addEventListener("submit", handleCardFormSubmit);
// Слушатель открыть/закрыть попапы
addButton.addEventListener("click", function () {
  openPopup(popupCard);
});
editButton.addEventListener("click", function () {
  nameInput.value = valueName.textContent;
  jobInput.value = valueJob.textContent;
  clearValidation(popupProfile, validationConfig);
  openPopup(popupProfile);
});
userAvatar.addEventListener("click", function () {
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarForm);
});
popupProfileButtonClose.addEventListener("click", function () {
  //(Можно лучше ПР7 ревью от 26.02) код добавления обработчика закрытия попапа на кнопки закрытия дублируется в трех местах для каждого попапа
  closePopup(popupProfile);
});
popupButtonCardClose.addEventListener("click", function () {
  closePopup(popupCard);
});
popupButtonImgClose.addEventListener("click", function () {
  closePopup(popupImg);
});
avatarFormButtonClose.addEventListener("click", function () {
  closePopup(avatarForm);
});
saveAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const form = evt.target.closest(".popup__form"); //(Можно лучше ПР7 ревью от 26.02) Было бы лучше найти форму редактирования аватара и кнопку сабмита один раз в глобальной области
  const submitButton = form.querySelector(".popup__save");
  submitButton.textContent = "Сохранение...";
  changeAvatar(avatarInput.value)
    .then(() => {
      closePopup(avatarForm);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
});

//Сохранение значений профиля
profileFormElement.addEventListener("submit", savePopupProfile);

//Валидация полей
enableValidation(validationConfig);
//взаимодействие с сервером

getInitialCards();

const createCard = (
  card,
  userId,
  deleteCardImg,
  likeCard,
  deleteLikeCard,
  openImagePopup
) => {
  const newCardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardLikeCounter = newCardElement.querySelector(".card__like-counter");
  const likeButton = newCardElement.querySelector(".card__like-button");
  cardLikeCounter.textContent = card.likes.length;
  newCardElement.querySelector(".card__image").src = card.link; //(Можно лучше ПР7 ревью от 26.02) убрать повторы поиска элемента
  newCardElement.querySelector(".card__title").textContent = card.name;
  newCardElement.querySelector(".card__image").alt = card.name;
  let isLiked = card.likes.some((like) => like._id === userId);
  if (card.owner._id !== userId) {
    newCardElement.querySelector(".card__delete-button").style.display = "none";
  }
  newCardElement
    .querySelector(".card__delete-button") //(Можно лучше ПР7 ревью от 26.02) Навешивание обработчика лучше переместить в else
    .addEventListener("click", () => {
      deleteCardImg(card._id, newCardElement);
    });
  newCardElement
    .querySelector(".card__like-button")
    .addEventListener("click", () => {
      if (isLiked) {
        deleteLikeCard(card._id, likeButton, cardLikeCounter, () => {
          isLiked = false;
        });
      } else {
        likeCard(card._id, likeButton, cardLikeCounter, () => {
          isLiked = true;
        });
      }
    });
  newCardElement
    .querySelector(".card__image")
    .addEventListener("click", () => openImagePopup(card.link, card.name));
  return newCardElement;
};

const openImagePopup = (link, name) => {
  photoImg.src = link;
  photoFigcaption.textContent = name;
  photoImg.alt = name;
  openPopup(popupImg);
};

export {
  createCard,
  openImagePopup,
  valueJob,
  valueName,
  userAvatar,
  cardSection,
  submitButtonProfile,
};
