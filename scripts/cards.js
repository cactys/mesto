// *==== Cards ====
// ?масив карточек
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export class Card {
  constructor(title, image) {
    this._title = title;
    this._image = image;
  }

  _getTemplate() {
    const newCard = document
      .querySelector('.card-template')
      .content.querySelector('.card')
      .cloneNode(true);

    return newCard;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__name').textContent = this._title;

    return this._element;
  }
}

initialCards.forEach((initialCard) => {
  const card = new Card(initialCard.title, initialCard.image);
  const cardElement = card.generateCard();

  document.querySelector('.cards').append(cardElement);
});
