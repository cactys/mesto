const validationConfig = {
  formSelector: '.form',
  formSet: '.form__set',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_inactive',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  errorText: 'form__input-error',
  errorClass: 'form__input-error_active',
};

// показать ошибку
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

// спрятать ошибку
const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// проверить валидность поле ввода
const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (!inputElement.validity.valid) {
    // если ошибка
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    // если ошибок нет
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

// установтиь слушателя событий
const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorInput
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  // состояние кнопки
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorInput
      );

      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

// включить валидацию форм
const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(
      formElement,
      validationConfig.inputSelector,
      validationConfig.submitButtonSelector,
      validationConfig.inactiveButtonClass,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  });
};

// проверить валидность поля ввода
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// включить || отключить кнопку
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

enableValidation(validationConfig);
