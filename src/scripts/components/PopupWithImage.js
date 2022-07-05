import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePhoto = this._popup.querySelector('.photo-container__photo');
    this._imageTitle = this._popup.querySelector('.photo-container__photo-title');
  }

  // перезаписывает родительский метод open
  // вставляет в попап карточки изображение,
  // альтернативное название и подпись картинке
  open(name, link) {
    this._imagePhoto.src = link;
    this._imagePhoto.alt = name;
    this._imageTitle.textContent = name;

    super.open();
  }
}
