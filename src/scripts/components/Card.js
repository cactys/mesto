export default class Card {
  constructor(
    data,
    userId,
    handleCardClick,
    handleLikeCard,
    handleDeleteClick,
    handleSaveToFavorites,
    cardSelector
  ) {
    this._title = data.name;
    this._src = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteClick = handleDeleteClick;
    this._handleSaveToFavorites = handleSaveToFavorites;
    this._isFavorite = data.isFavorite || false;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  isLiked() {
    return this._likes.some((user) => user._id === this._userId);
  }

  isFavorite() {
    return this._isFavorite;
  }

  setFavorite(status) {
    this._isFavorite = status;
    this._toggleFavoriteIcon();
  }

  _toggleFavoriteIcon() {
    if (this._isFavorite) {
      this._favoriteButton.classList.add('card__favorite-button_active');
    } else {
      this._favoriteButton.classList.remove('card__favorite-button_active');
    }
  }

  setLikes(likes) {
    this._likes = likes;
    this._toggleLikeIcon();
    this._showLikesCount();
  }

  _toggleLikeIcon() {
    if (this.isLiked()) {
      this._likeButton.classList.add('card__like-button_active');
    } else {
      this._likeButton.classList.remove('card__like-button_active');
    }
  }

  _showLikesCount() {
    this._likeCount.textContent = this._likes.length;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.card__image');
    this._elementTitle = this._element.querySelector('.card__name');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeCount = this._element.querySelector('.card__like-count');
    this._favoriteButton = this._element.querySelector('.card__favorite-button');
    this._trashIcon = this._element.querySelector('.card__trach-icon');

    if (this._ownerId !== this._userId) {
      this._trashIcon.remove();
    }

    this._elementTitle.textContent = this._title;
    this._elementImage.alt = this._title;
    this._elementImage.src = this._src;
    this._showLikesCount();
    this._toggleLikeIcon();
    this._toggleFavoriteIcon();
    this._setEventListeners();

    return this._element;
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard(this, this._id);
    });

    this._favoriteButton.addEventListener('click', () => {
      this._handleSaveToFavorites(this, this._id);
    });

    if (this._ownerId === this._userId) {
      this._trashIcon.addEventListener('click', () => {
        this._handleDeleteClick(this);
      });
    }

    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._src, this._id);
    });
  }
}
