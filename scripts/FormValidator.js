export class FormValidator {
  constructor(obj, formElement) {
    this._formSelector = obj.formSelector;
    this._inputSelector = obj.inputSelector;
    this._inputErrorClass = obj.inputErrorClass;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._errorClass = obj.errorClass;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }

  // показать ошибку
  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  // спрятать ошибку
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // проверить валидность поля ввода
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // показать|убрать сообщение об ошибки
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      // если ошибка
      this._showInputError(inputElement);
    } else {
      // если ошибок нет
      this._hideInputError(inputElement);
    }
  };

  // установтиь слушателя событий
  _setEventListeners = () => {
    this.toggleButtonState();

    this._formElement.addEventListener('submit', (evt) => {
      // ! Эта строчка отменяет стандартную отправку формы.
      evt.preventDefault();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  };

  // включить|отключить кнопку
  toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  // включить валидацию форм
  enableValidation = () => {
    this._setEventListeners();
  };

  // обнулить ошибки
  resetError = () => {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this.toggleButtonState();
  };
}
