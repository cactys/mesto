export default class Popup {
  constructor(popupName) {
    this._popup = popupName;
    this._buttonClose = this._popup.querySelector('.popup__close');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClose.setEventListeners('click', this.close);
    this._popup.addEventListener('mousedown', (evt) => {
      if (
        evt.target.classList.contains(this.open()) ||
        evt.target.classList.contains(this.close())
      ) {
        this.close(this._popup);
      }
    });
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }
}
