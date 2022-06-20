import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePhoto = document.querySelector('.photo-container__photo');
    this._imageTitle = document.querySelector('.photo-container__photo-title');
    // Эти элементы нужно находить внутри попапа this._popup, который доступен тут от родительского класса.
    // Не нужно этого делать во всем document, так как это может быть дольше по времени.
    // МОЖНО ЛУЧШЕ
    // Gennadiy Barsegyan
    // ревьюер
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
