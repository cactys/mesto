import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector('.photo-container__photo');
    this._popupPhotoTitle = this._popup.querySelector('.photo-container__photo-title');
    this._commentsList = this._popup.querySelector('.photo-container__comments-list');
    this._commentForm = this._popup.querySelector('.photo-container__comment-form');
    this._commentInput = this._popup.querySelector('.photo-container__comment-input');
    this._commentTemplate = document.querySelector('.comment-template');
    this._currentCardId = null;
  }

  // перезаписывает родительский метод open
  // вставляет в попап карточки изображение,
  // альтернативное название и подпись картинке
  open(name, link, cardId, comments = []) {
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    this._popupPhotoTitle.textContent = name;
    this._currentCardId = cardId;
    
    // Очищаем список комментариев
    this._commentsList.innerHTML = '';
    
    // Отображаем комментарии
    this._renderComments(comments);
    
    super.open();
  }

  _renderComments(comments) {
    comments.forEach(comment => {
      const commentElement = this._createCommentElement(comment);
      this._commentsList.append(commentElement);
    });
  }

  _createCommentElement(comment) {
    const commentElement = this._commentTemplate.content.querySelector('.comment').cloneNode(true);
    
    const author = commentElement.querySelector('.comment__author');
    const date = commentElement.querySelector('.comment__date');
    const text = commentElement.querySelector('.comment__text');
    const avatar = commentElement.querySelector('.comment__avatar');
    
    author.textContent = comment.author;
    
    // Форматируем дату
    const commentDate = new Date(comment.createdAt);
    date.textContent = commentDate.toLocaleDateString();
    
    text.textContent = comment.text;
    
    // Если есть аватар, устанавливаем его
    if (comment.authorAvatar) {
      avatar.style.backgroundImage = `url(${comment.authorAvatar})`;
    }
    
    return commentElement;
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._commentForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (this._handleCommentSubmit && this._currentCardId) {
        const commentText = this._commentInput.value;
        this._handleCommentSubmit(this._currentCardId, commentText);
        this._commentInput.value = '';
      }
    });
  }

  setCommentSubmitHandler(handler) {
    this._handleCommentSubmit = handler;
  }

  addComment(comment) {
    const commentElement = this._createCommentElement(comment);
    this._commentsList.append(commentElement);
  }
}
