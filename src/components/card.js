import { cardTemplate, photoFigcaption, photoImg, popupImg } from "./index.js";
import { openPopup } from "./modal.js";
const initialCards = [
  {
    name: "Карачаевск",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCard(name, link) {
  const newCardElement = cardTemplate.querySelector(".card").cloneNode(true);

  newCardElement.querySelector(".card__image").src = link;
  newCardElement.querySelector(".card__title").textContent = name;
  newCardElement.querySelector(".card__image").alt = name;
  newCardElement
    .querySelector(".card__card-button")
    .addEventListener("click", likeCard);
  newCardElement
    .querySelector(".card__image")
    .addEventListener("click", function () {
      photoImg.src = link;
      photoFigcaption.textContent = name;
      photoImg.alt = name;
      openPopup(popupImg);
    });
  newCardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  return newCardElement;
}

function likeCard(evt) {
  evt.target.classList.toggle("card__card-button_active");
}
function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

export { initialCards, createCard };
