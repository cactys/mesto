const validationConfig = {
  formSelector: '.form',
  formSet: '.form__set',
  inputSelector: '.form__input',
  inputErrorClass: '.form__input_inactive',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: '.form__submit_disabled',
  errorText: 'form__input-error',
  errorClass: 'form__input-error_active',
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector('.form__input-error');
  inputElement.classList.add('form__input_inactive');
  errorElement.classList.add('form__input-error_active');
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector('.form__input-error');
  inputElement.classList.remove('form__input_inactive');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit_disabled');
  } else {
    buttonElement.classList.remove('form__submit_disabled');
  }
};

enableValidation();
