import { popupProfile, popupCard, popupImg } from "./index.js";
//Открыть попапы
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

//Закрыть попапы
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

// Закрытие кнопкой
function closeEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(popupProfile);
    closePopup(popupCard);
    closePopup(popupImg);
  }
}
//Закрытие кликом по оверлею
function closeOverlay(evt) {
  if (
    evt.target === popupProfile ||
    evt.target === popupCard ||
    evt.target === popupImg
  ) {
    closePopup(popupProfile);
    closePopup(popupCard);
    closePopup(popupImg);
  }
}

export { openPopup, closePopup, closeEsc, closeOverlay };
