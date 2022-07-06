export default class Card {
  constructor(
    { data, handle },
    // { name, link, likes, _id, owner },
    userId,
    // handleClickCard,
    // handleLikeCard,
    // handleClickDelete,
    cardSelector
  ) {
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;
    this._userId = userId;
    this._handleClickCard = handle.handleClickCard;
    this._handleLikeCard = handle.handleLikeCard;
    this._handleClickDelete = handle.handleClickDelete;
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
    this._buttonLikeActive = 'card__like-button_active';
    this._likeCounter = this._element.querySelector('.card__like-count');
    this._buttonDelete = this._element.querySelector('.card__trach-icon');
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;

    if (this._owner._id !== this._userId) {
      this._buttonDelete.remove();
    }

    this.setLikes(this._likes);

    this._updateLikesView();
    this._setEventListeners();
    return this._element;
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  _updateLikesView() {
    this._likeCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this._buttonLike.classList.add('card__like-button_active');
    } else {
      this._buttonLike.classList.remove('card__like-button_active');
    }
  }

  setLikes(likes) {
    this._likes = likes;
    this._updateLikesView();
  }

  toggleButton() {
    return this._buttonLike.classList.toggle(this._buttonLikeActive);
  }

  handleDeleteCard = () => {
    // удалить карточку
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleClickCard(this._title, this._image);
    }); // открыть фотографию карточки
    this._buttonDelete.addEventListener('click', () => {
      this._handleClickDelete(this);
    }); // удалить карточку
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeCard(this, this._id);
    }); // лайкнуть карточку
  }
}
