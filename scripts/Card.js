export class Card {
  constructor(data, cardSelector, openPhotoPopup) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleOpenPopup = openPhotoPopup;
  }

  _getTemplate() {
    const newCard = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return newCard;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__name');
    this._buttonLike = this._element.querySelector('.card__like-button');
    this._buttonDelete = this._element.querySelector('.card__trach-icon');

    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;

    this._setEventListeners();
    return this._element;
  }

  _handleCardClick = () => {
    // открыть фотографию карточки
    this._handleOpenPopup(this._title, this._image);
  };

  _handleDeleteCard = () => {
    // удалить карточку
    this._element.remove();
    this._element = null;
  };

  _handleLikeCard = () => {
    // лайкнуть карточку
    this._buttonLike.classList.toggle('card__like-button_active');
  };

  _setEventListeners() {
    this._cardImage.addEventListener('click', this._handleCardClick); // открыть фотографию карточки
    this._buttonDelete.addEventListener('click', this._handleDeleteCard); // удалить карточку
    this._buttonLike.addEventListener('click', this._handleLikeCard); // лайкнуть карточку
  }
}
