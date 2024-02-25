import { openPopup, closePopup } from "./modal.js";
import "../pages/index.css";
import { enableValidation } from "./validation.js";
import {
  getInitialCards,
  submitFormCard,
  getAvatar,
  savePopupProfile,
  valueJob,
  valueName,
  avatarOpen,
  popupImg,
  popupCard,
  popupAvatar,
  popupAvatarButtonClose,
  nameInput,
  jobInput,
  popupProfile,
  validationConfig,
} from "./api.js";

//Попап профиля

const editButton = document.querySelector(".profile__edit-button");
const formElement = popupProfile.querySelector(".popup__form");
const popupButtonClose = popupProfile.querySelector(".popup__close");
//Разворот картинки
const popupButtonImgClose = document.querySelector(".popup__close_photo");
//Попап и список карточек
const formCard = document.querySelector(".popup__form");
const popupButtonCardClose = popupCard.querySelector(".popup__close");
const addButton = document.querySelector(".profile__add-button");

// Слушатель добавления карточки
formCard.addEventListener("submit", submitFormCard);
// Слушатель открыть/закрыть попапы
addButton.addEventListener("click", function () {
  formCard.reset();
  openPopup(popupCard);
});
editButton.addEventListener("click", function () {
  nameInput.value = valueName.textContent;
  jobInput.value = valueJob.textContent;
  openPopup(popupProfile);
});
avatarOpen.addEventListener("click", function () {
  openPopup(popupAvatar);
});
popupButtonClose.addEventListener("click", function () {
  closePopup(popupProfile);
});
popupButtonCardClose.addEventListener("click", function () {
  closePopup(popupCard);
});
popupButtonImgClose.addEventListener("click", function () {
  closePopup(popupImg);
});
popupAvatarButtonClose.addEventListener("click", function () {
  closePopup(popupAvatar);
});
//Сохранение значений профиля
formElement.addEventListener("submit", savePopupProfile);

//Валидация полей
enableValidation(validationConfig);
//взаимодействие с сервером

getInitialCards();
getAvatar();
