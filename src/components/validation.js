function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__save_inactive");
    buttonElement.disabled = false;
  }
}
function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener("submit", function () {
    });
    setEventListeners(form, config);
  });

  function setEventListeners(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonElement = form.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((el) => {
      el.addEventListener("input", function () {
        checkInputValidity(form, el, config);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }
  const checkInputValidity = (form, input, config) => {
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity("");
    }
    if (!input.validity.valid) {
      showInputError(form, input, input.validationMessage, config);
    } else {
      hideInputError(form, input, config);
    }
  };
}
const showInputError = (form, input, errorMessage, config) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (form, input, config) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

//Очистка валидации
function clearValidation(form, validationConfig) {
  const inputList = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  inputList.forEach((input) => {
    hideInputError(form, input, validationConfig);
  });

  const buttonElement = form.querySelector(
    validationConfig.submitButtonSelector
  );
  if (buttonElement !== null) {
    toggleButtonState(inputList, buttonElement);
  }
}

export { enableValidation, clearValidation };
