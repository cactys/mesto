export default class Card {
  constructor({ name, link }, handleCardClick, cardSelector) {
    // debugger;
    this._title = name;
    this._image = link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
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
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    }); // открыть фотографию карточки
    this._buttonDelete.addEventListener('click', this._handleDeleteCard); // удалить карточку
    this._buttonLike.addEventListener('click', this._handleLikeCard); // лайкнуть карточку
  }
}
