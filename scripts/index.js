// DOM элеиенты
const closeButton = document.querySelectorAll('.popup__close-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddPhoto = document.querySelector('.popup_type_add-photo');
const popupPhoto = document.querySelector('.popup_type_photo');

// ==== Photo ====

// ==== Cards ====
// масив карточек
const initialCards = [
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

// Шаблон
const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.card');

// DOM элемент
const cardsContainer = document.querySelector('.cards');
const formPhoto = document.querySelector('.form_add-photo');
const inputPhotoTitle = formPhoto.querySelector('.form__input_photo-title');
const inputPhotoSrc = formPhoto.querySelector('.form__input_photo-src');

// ==== card ====
// Обработчик событий
const handleSubmitAddCardForm = (evt) => {
  evt.preventDefault();

  targetPopup(popupAddPhoto);

  renderingCard({ name: inputPhotoTitle.value, link: inputPhotoSrc.value });

  inputPhotoTitle.value = '';
  inputPhotoSrc.value = '';
};

const handleDeleteCard = (evt) => {
  evt.target.closest('.card').remove();
};

const handlelikeCard = (evt) => {
  evt.target
    .closest('.card__like-button')
    .classList.toggle('card__like-button_active');
};

// generate card
const generateCard = (cardData) => {
  const newCard = cardTemplate.cloneNode(true);

  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = cardData.link;

  // открыть картинку в размере 75% дисплея
  cardImage.addEventListener('click', function () {
    targetPopup(popupPhoto);

    const photoImage = document.querySelector('.photo-container__photo');
    photoImage.src = cardImage.src;

    const photoTitle = document.querySelector('.photo-container__photo-title');
    photoTitle.textContent = cardTitle.textContent;
  });

  const cardTitle = newCard.querySelector('.card__name');
  cardTitle.textContent = cardData.name;

  const deleteButton = newCard.querySelector('.card__trach-icon');
  deleteButton.addEventListener('click', handleDeleteCard);

  const likeButton = newCard.querySelector('.card__like-button');
  likeButton.addEventListener('click', handlelikeCard);

  return newCard;
};

// rendering card
const renderingCard = (cardData) => {
  cardsContainer.prepend(generateCard(cardData));
};

initialCards.forEach((cardData) => {
  renderingCard(cardData);
});

formPhoto.addEventListener('submit', handleSubmitAddCardForm);

// ==== Forms & popups ====
// DOM элементы forms & popups
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

// ==== работа с формами profile ====
// Находим форму в DOM
const formProfile = document.querySelector('.form_edit-profile');
// Находим поля формы в DOM
const nameInput = formProfile.querySelector('.form__input_profile-name');
const jobInput = formProfile.querySelector('.form__input_profile-job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleSubmitEditProfileForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  targetPopup(popupProfile);

  // Получите значение полей jobInput и nameInput из свойства value
  // Вставьте новые значения с помощью textContent
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', handleSubmitEditProfileForm);

// ==== pop-up's ====
// функция открыть/закрыть попап
function targetPopup(popupName) {
  if (!popupName.classList.contains('popup_opened')) {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
  }
  popupName.classList.toggle('popup_opened');
}

// ==== кнопки ====
// закрыть попапы
closeButton.forEach(function (arrElement) {
  arrElement.addEventListener('click', function () {
    targetPopup(this.closest('.popup'));
  });
});

// открыть попапы
editButton.addEventListener('click', function () {
  targetPopup(popupProfile);
});
addButton.addEventListener('click', function () {
  targetPopup(popupAddPhoto);
});
