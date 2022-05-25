import { openPopup, popupElement, photoImage, photoTitle } from './index.js';

export class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
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
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__name').textContent = this._title;

    return this._element;
  }

  _handleDeleteCard = () => {
    this._element.remove();
  };

  _handleLikeCard(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  _handleOpenPopup = () => {
    photoImage.src = this._image;
    photoImage.alt = this._title;
    photoTitle.textContent = this._title;
    openPopup(popupElement);
  };

  _setEventListeners() {
    this._element
      .querySelector('.card__image')
      .addEventListener('click', this._handleOpenPopup);
    this._element
      .querySelector('.card__trach-icon')
      .addEventListener('click', this._handleDeleteCard);
    this._element
      .querySelector('.card__like-button')
      .addEventListener('click', this._handleLikeCard);
  }
}
