// !DOM элеиенты
const buttonsClose = document.querySelectorAll('.popup__close-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddPhoto = document.querySelector('.popup_type_add-photo');
const popupPhoto = document.querySelector('.popup_type_photo');
// *находим блок для карт
const cardsContainer = document.querySelector('.cards');
// *находим в DOM кнопку редактирования профиля
const buttonEditProfile = document.querySelector('.profile__edit-button');
// *находим в DOM кнопку добавления фотографии
const buttonAddPhoto = document.querySelector('.profile__add-button');
// *находим в DOM заголовок и описание профиля
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
// *находим в DOM фотографию и подпись карточки
const photoImage = document.querySelector('.photo-container__photo');
const photoTitle = document.querySelector('.photo-container__photo-title');
// *объявить form || input
// ?форма редактирование профиля
const formProfile = document.querySelector('.form_edit-profile'); // форма редактирования профиля
const nameInput = formProfile.querySelector('.form__input_profile-name'); // поле ввода имени
const jobInput = formProfile.querySelector('.form__input_profile-job'); // поле ввода деятельности
const buttonSubmitProfile = formProfile.querySelector('.form__submit'); // кнопка отправки формы
// // ?форма добавление карточки
const formPhoto = document.querySelector('.form_add-photo'); // форма добавления карточки
const inputPhotoTitle = formPhoto.querySelector('.form__input_photo-title'); // поле ввода названия
const inputPhotoSrc = formPhoto.querySelector('.form__input_photo-src'); // поле ввода ссылки на фотографию
const buttonSubmitPhoto = formPhoto.querySelector('.form__submit'); // кнопка отправки формы

// *==== Cards ====
// ?масив карточек
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

// *==== card ====
// ?Шаблон
const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.card');

// ?Обработчик событий
const handleSubmitAddCardForm = (evt) => {
  // !Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();

  renderingCard({ name: inputPhotoTitle.value, link: inputPhotoSrc.value });

  evt.target.reset(inputPhotoTitle);
  evt.target.reset(inputPhotoSrc);

  closePopup(popupAddPhoto);
};

// ?обработка кнопки "delete". Удаление карточки
const handleDeleteCard = (evt) => {
  if (evt.target.classList.contains('card__trach-icon')) {
    evt.target.closest('.card').remove();
  }
};

// ?обработка кнопки "like"
const handlelikeCard = (evt) => {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_active');
  }
};

// ?generate card
const generateCard = (cardData) => {
  // ?клонировать узел карт
  const newCard = cardTemplate.cloneNode(true);

  // ?находим в DOM изображение карты
  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = cardData.link;

  // ?открыть картинку в размере 75% дисплея
  cardImage.addEventListener('click', function () {
    photoImage.src = cardData.link;

    photoTitle.textContent = cardTitle.textContent;
    photoImage.alt = cardData.name;

    openPopup(popupPhoto);
  });

  // ?находим в DOM описание карты
  const cardTitle = newCard.querySelector('.card__name');
  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;

  // ?событие кнопки "delete"
  cardsContainer.addEventListener('click', handleDeleteCard);

  // ?событие кнопки "like"
  cardsContainer.addEventListener('click', handlelikeCard);

  return newCard;
};

// rendering card
const renderingCard = (cardData) => {
  cardsContainer.prepend(generateCard(cardData));
};

// *==== работа с формами profile ====
// ?Обработчик «отправки» формы редактирования профиля
const handleSubmitEditProfileForm = (evt) => {
  // !Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();

  // ?получить значение полей jobInput и nameInput из свойства value
  // ?втсавить новые значения с помощью textContent
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup(popupProfile);
};

// *==== POPUP ====
// ?открыть popup
const openPopup = (popupName) => {
  popupName.classList.add('popup_opened');
};

// ?открыть popup редактировать профиль
const openPropfilePopup = () => {
  // ?получить значение полей nameProfile и jobProfile из свойства textContent
  // ?втсавить новые значения с помощью value
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  openPopup(popupProfile);
};

// ?заркрыть popup
const closePopup = (popupName) => {
  popupName.classList.remove('popup_opened');
};

// *==== FUNCTION ====
function heandleClosePopup(evt) {
  const openedPopup = document.querySelector('.popup_opened');

  if ((openedPopup && evt.key === 'Escape') || evt.target === openedPopup) {
    closePopup(openedPopup);
  }
}

// *==== обработка событий ====
// ?перебрать массив с карточками
initialCards.forEach((cardData) => {
  renderingCard(cardData);
});

// ?прикрепить обработчик к форме добавить фото:
// ?он будет следить за событием “submit” - «создать»
// formPhoto.addEventListener('submit', handleSubmitAddCardForm);

// ?прикрепить обработчик к форме редактировать профиль:
// ?он будет следить за событием “submit” - «сохранить»
// formProfile.addEventListener('submit', handleSubmitEditProfileForm);

// *==== кнопки ====
// ?закрыть popup
buttonsClose.forEach(function (arrElement) {
  arrElement.addEventListener('click', function () {
    closePopup(this.closest('.popup'));
  });
});

document.addEventListener('keydown', heandleClosePopup);
document.addEventListener('click', heandleClosePopup);

// ?открыть popup
// !popup редактировать профиль
buttonEditProfile.addEventListener('click', function () {
  openPropfilePopup();
});

// !popu добавить фотографию
buttonAddPhoto.addEventListener('click', function () {
  openPopup(popupAddPhoto);
});
