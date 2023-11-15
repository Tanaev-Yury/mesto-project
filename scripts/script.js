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
//Открыть попапы
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

//Закрыть попапы
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

//Сохранение значений
function savePopupProfile(evt) {
  evt.preventDefault();

  valueName.textContent = nameInput.value;
  valueJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

function createCard(name, link) {
  const newCardElement = cardTemplate.querySelector(".card").cloneNode(true);

  newCardElement.querySelector(".card__image").src = link;
  newCardElement.querySelector(".card__title").textContent = name;
  newCardElement.querySelector(".card__image").alt = name;
  nameInputCard.value='';
  urlInputCard.value='';
  newCardElement
    .querySelector(".card__card-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__card-button_active");
    });
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
    .addEventListener("click", function (evt) {
      evt.target.closest(".card").remove();
    });
  return newCardElement;
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
//Сохранение значений профиля
formElement.addEventListener("submit", savePopupProfile);
