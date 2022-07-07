export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // закрыть попап по нажатию Escape
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // слушатель событий
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      // модальное окно закрываеться при нажатии на затемнунную область вокруг формы
      // или по нажатию кнопки закрыть "Х"
      if (
        evt.target === evt.currentTarget ||
        evt.target.classList.contains('popup__close')
      ) {
        this.close();
      }
    });
  }

  // открыть попап, добавить слушателя клавиш клавиатуры
  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  // закрыть попап, удалить слушателя клавиш клавиатуры
  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }
}
