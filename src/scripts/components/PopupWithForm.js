import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupSubmit) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.form');
    this._inputList = Array.from(
      this._popupForm.querySelectorAll('.form__input')
    );
    this._submitButton = this._popup.querySelector('.form__submit');
    this._submitButtonText = this._submitButton.textContent;
    this._popupSubmit = popupSubmit;
  }

  // приватный метот, собирает данные всех полей форм
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  // перезапись родительского метода setEventListeners
  // добавляет обработчик submit формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._popupSubmit(this._getInputValues());
      // this.close();
    });
  }

  loading(isLoad) {
    if (isLoad) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
