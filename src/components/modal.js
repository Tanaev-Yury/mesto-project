//Открыть попапы
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closeEsc);
  document.addEventListener("mousedown", closeOverlay); //(Можно лучше ПР7 ревью от 26.02) Нет необходимости привязывать/снимать обработчик закрытия
}

//Закрыть попапы
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEsc);
  document.removeEventListener("mousedown", closeOverlay);
}

// Закрытие кнопкой
function closeEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
//Закрытие кликом по оверлею
function closeOverlay(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup, closeEsc, closeOverlay };
