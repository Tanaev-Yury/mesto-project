import { deleteCardImg, likeCard, deleteLikeCard } from "./api";

export const createCard = (
  card,
  userId,
  handleCardDelete,
  handleCardLike,
  openImagePopup
) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const newCardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardLikeCounter = newCardElement.querySelector(".card__like-counter");
  const likeButton = newCardElement.querySelector(".card__like-button");
  cardLikeCounter.textContent = card.likes.length;
  newCardElement.querySelector(".card__image").src = card.link; //(Можно лучше ПР7 ревью от 26.02) убрать повторы поиска элемента
  newCardElement.querySelector(".card__title").textContent = card.name;
  newCardElement.querySelector(".card__image").alt = card.name;
  let isLiked = card.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_active");
  }
  if (card.owner._id !== userId) {
    newCardElement.querySelector(".card__delete-button").style.display = "none";
  }
  newCardElement
    .querySelector(".card__delete-button") //(Можно лучше ПР7 ревью от 26.02) Навешивание обработчика лучше переместить в else
    .addEventListener("click", () => {
      handleCardDelete(card._id, newCardElement);
    });
  newCardElement
    .querySelector(".card__like-button")
    .addEventListener("click", () => {
      handleCardLike(card._id, likeButton, cardLikeCounter);
    });
  newCardElement
    .querySelector(".card__image")
    .addEventListener("click", () => openImagePopup(card.link, card.name));
  return newCardElement;
};

export const handleCardDelete = (cardId, cardElement) => {
  deleteCardImg(cardId).then(() => {
    deleteCard(cardElement).catch((err) => {
      console.log(err);
    });
  });
};

export const deleteCard = (cardElement) => {
  cardElement.remove();
};

const updateCardLike = (likeButton, cardLikeCounter, isLiked) => {
  if (isLiked) {
    likeButton.classList.add("card__like-button_active");
    cardLikeCounter.textContent++;
  } else {
    likeButton.classList.remove("card__like-button_active");
    cardLikeCounter.textContent--;
  }
};

export const handleCardLike = (cardId, likeButton, cardLikeCounter) => {
  const isLiked = likeButton.classList.contains("card__like-button_active");

  if (isLiked) {
    deleteLikeCard(cardId)
      .then(() => {
        updateCardLike(likeButton, cardLikeCounter, false);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCard(cardId)
      .then(() => {
        updateCardLike(likeButton, cardLikeCounter, true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
