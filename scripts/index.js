// !DOM элеиенты
const popups = document.querySelectorAll('.popup');
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
// ?форма добавление карточки
const formPhoto = document.querySelector('.form_add-photo'); // форма добавления карточки
const inputPhotoTitle = formPhoto.querySelector('.form__input_photo-title'); // поле ввода названия
const inputPhotoSrc = formPhoto.querySelector('.form__input_photo-src'); // поле ввода ссылки на фотографию

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

  evt.target.reset(inputPhotoTitle, inputPhotoSrc);

  const buttonElement = formPhoto.querySelector('.form__submit');
  disableSubmitButton(buttonElement, validationConfig.inactiveButtonClass);

  closePopup(popupAddPhoto);
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
  const deleteCard = newCard.querySelector('.card__trach-icon');
  deleteCard.addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  });

  // ?событие кнопки "like"
  const likeCard = newCard.querySelector('.card__like-button');
  likeCard.addEventListener('click', () => {
    likeCard.classList.toggle('card__like-button_active');
  });

  return newCard;
};

// ?rendering card
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
// ?открыть popup редактировать профиль
function openPropfilePopup() {
  // ?получить значение полей nameProfile и jobProfile из свойства textContent
  // ?втсавить новые значения с помощью value
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  openPopup(popupProfile);
}

// ?открыть popup
function openPopup(popupName) {
  document.addEventListener('keydown', heandleClosePopup);
  popupName.classList.add('popup_opened');
}

// ?заркрыть popup
function closePopup(popupName) {
  document.removeEventListener('keydown', heandleClosePopup);
  popupName.classList.remove('popup_opened');
}

// ?закрыть popup по нажатию Escape или оверлей мыши
function heandleClosePopup(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
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
formPhoto.addEventListener('submit', handleSubmitAddCardForm);

// ?прикрепить обработчик к форме редактировать профиль:
// ?он будет следить за событием “submit” - «сохранить»
formProfile.addEventListener('submit', handleSubmitEditProfileForm);

// *==== кнопки ====
// ?закрыть popup
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

// ?открыть popup
// !popup редактировать профиль
buttonEditProfile.addEventListener('click', function () {
  openPropfilePopup();
});

// !popu добавить фотографию
buttonAddPhoto.addEventListener('click', function () {
  openPopup(popupAddPhoto);
});
