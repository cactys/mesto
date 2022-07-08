import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, popupSubmit) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.form');
    this._submitButton = this._popup.querySelector('.form__submit');
    this._popupSubmit = popupSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('click', (evt) => {
      evt.preventDefault();
      // this._popupSubmit(this._id);
      this._popupSubmit(this);
    });
  }

  setCardId(card) {
    this._id = card._id;
    this.delete = card.handleDeleteCard;
  }
}
