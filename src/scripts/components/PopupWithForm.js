import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupSubmit) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.form');
    this._inputList = Array.from(
      this._popupForm.querySelectorAll('.form__input')
    );
    this._submitButton = this._popup.querySelector('.form__submit');
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

  // Можно сделать метод  setInputValues в классе PopupWithForm, который будет вставлять данные в инпуты:
  // ! setInputValues(data) {
  // !   this._inputList.forEach((input) => {
  // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
  // !     input.value = data[input.name];
  // !   });
  // ! }
  // И не нужно будет искать эти инпуты в index.js и что-то вставлять в них при открытии профиля.
  // МОЖНО ЛУЧШЕ
  // Gennadiy Barsegyan
  // ревьюер

  // перезапись родительского метода setEventListeners
  // добавляет обработчик submit формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._popupSubmit(this._getInputValues());
      this.close();
      this._popupForm.reset();
    });
  }
}
