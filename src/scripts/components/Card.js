export default class Card {
  constructor(
    { name, link, likes, _id, owner },
    userId,
    handleCardClick,
    handleLikeCard,
    handleDeleteClick,
    cardSelector
  ) {
    this._title = name;
    this._image = link;
    this._likes = likes;
    this._id = _id;
    this._owner = owner;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteClick = handleDeleteClick;
    this._countLike = this._likes.length;
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
    this._likeCounter = this._element.querySelector('.card__like-count');
    this._buttonDelete = this._element.querySelector('.card__trach-icon');
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;
    this._likeCounter.textContent = this._likes.length;

    if (this._owner._id !== this._userId) {
      this._buttonDelete.remove();
    }

    if (this._likes.some((likeUser) => likeUser._id === this._userId)) {
      this._buttonLike.classList.add('card__like-button_active');
    }

    this._setEventListeners();
    return this._element;
  }

  addLike(isLike) {
    if (isLike) {
      this._buttonLike.classList.add('card__like-button_active');
      this._likeCounter.textContent = String(this._countLike + 1);
      this._countLike += 1;
    } else {
      this._buttonLike.classList.remove('card__like-button_active');
      this._likeCounter.textContent = String(this._countLike - 1);
      this._countLike -= 1;
    }
  }

  handleDeleteCard = () => {
    // удалить карточку
    console.log('DELETE');
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    }); // открыть фотографию карточки
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick(this);
    }); // удалить карточку
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeCard(
        this,
        this._buttonLike.classList.toggle('card__like-button_active')
      );
    }); // лайкнуть карточку
  }
}
