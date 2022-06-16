import { photoImage, photoTitle } from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePhoto = photoImage;
    this._imageTitle = photoTitle;
  }

  // перезаписывает родительский метод open
  // вставляет в попап карточки изображение,
  // альтернативное название и подпись картинке
  open(data) {
    this._imagePhoto.src = data.link;
    this._imagePhoto.alt = data.name;
    this._imageTitle.textContent = data.name;

    super.open();
  }
}
