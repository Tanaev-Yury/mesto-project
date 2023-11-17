import { openPopup, closePopup, closeEsc, closeOverlay } from "./modal.js";
import { initialCards, createCard } from "./card.js";
import "../pages/index.css";
//Попап профиля
const editButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const formElement = popupProfile.querySelector(".popup__form");
const nameInput = popupProfile.querySelector(".popup__field_value_name");
const jobInput = popupProfile.querySelector(".popup__field_value_description");
const popupButtonClose = popupProfile.querySelector(".popup__close");
const valueName = document.querySelector(".profile__title");
const valueJob = document.querySelector(".profile__subtitle");
//Разворот картинки
const popupImg = document.querySelector(".popup_photo");
const popupButtonImgClose = document.querySelector(".popup__close_photo");
const photoImg = document.querySelector(".popup__image");
const photoFigcaption = document.querySelector(".popup__figcaption");
//Попап и список карточек
const popupCard = document.querySelector(".popup_card");
const formCard = popupCard.querySelector(".popup__form");
const nameInputCard = popupCard.querySelector(".popup__field_value_name");
const urlInputCard = popupCard.querySelector(".popup__field_value_description");
const popupButtonCardClose = popupCard.querySelector(".popup__close");
const addButton = document.querySelector(".profile__add-button");
const cardSection = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;

//Сохранение значений
function savePopupProfile(evt) {
  evt.preventDefault();

  valueName.textContent = nameInput.value;
  valueJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

function renderCard(initialCards) {
  initialCards.forEach(function (item) {
    cardSection.append(createCard(item.name, item.link));
  });
}

renderCard(initialCards);

// Взаимодействие с карточками добавленными

function submitFormCard(evt) {
  evt.preventDefault();

  cardSection.prepend(createCard(nameInputCard.value, urlInputCard.value));
  closePopup(popupCard);
}

// Слушатель добавления карточки
formCard.addEventListener("submit", submitFormCard);
// Слушатель открыть/закрыть попапы
addButton.addEventListener("click", function () {
  openPopup(popupCard);
});
editButton.addEventListener("click", function () {
  openPopup(popupProfile);
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
document.addEventListener("keydown", closeEsc);
document.addEventListener("mousedown", closeOverlay);
//Сохранение значений профиля
formElement.addEventListener("submit", savePopupProfile);

export { cardTemplate, nameInputCard, urlInputCard, photoFigcaption, photoImg };
export { popupProfile, popupCard, popupImg };
