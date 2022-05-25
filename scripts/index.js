import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { validationConfig } from './validate.js';
import { initialCards } from './cards.js';

// !DOM элеиенты
// * DOM попапы
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddPhoto = document.querySelector('.popup_type_add-photo');
// * находим в DOM кнопку редактирования профиля
const buttonEditProfile = document.querySelector('.profile__edit-button');
// * находим в DOM кнопку добавления фотографии
const buttonAddPhoto = document.querySelector('.profile__add-button');
// * находим в DOM заголовок и описание профиля
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
// * Находим в DOM элементы карточки
const cardGrid = document.querySelector('.cards');
export const popupElement = document.querySelector('.popup_type_photo');
export const photoImage = document.querySelector('.photo-container__photo');
export const photoTitle = document.querySelector(
  '.photo-container__photo-title'
);
// * объявить form || input
// ? форма редактирование профиля
const formProfile = document.querySelector('.form_edit-profile'); // форма редактирования профиля
const nameInput = formProfile.querySelector('.form__input_profile-name'); // поле ввода имени
const jobInput = formProfile.querySelector('.form__input_profile-job'); // поле ввода деятельности
// ? форма добавление карточки
const formPhoto = document.querySelector('.form_add-photo'); // форма добавления карточки
const inputPhotoTitle = formPhoto.querySelector('.form__input_photo-title'); // поле ввода названия
const inputPhotoSrc = formPhoto.querySelector('.form__input_photo-src'); // поле ввода ссылки на фотографию
// * валидация
const validateFormProfile = new FormValidator(validationConfig, formProfile);
validateFormProfile.enableValidation();
const validateFormCard = new FormValidator(validationConfig, formPhoto);
validateFormCard.enableValidation();

// ? рендер карт
const renderCard = (initialCard) => {
  const card = new Card(initialCard, '.card-template');
  const cardElement = card.generateCard();
  return cardElement;
};

// ? добавление пользовательской карточки
const handleSubmitAddCardForm = (evt) => {
  // ! Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();

  const addCard = { name: inputPhotoTitle.value, link: inputPhotoSrc.value };
  const cardElement = renderCard(addCard);
  cardGrid.prepend(cardElement);

  evt.target.reset();
  closePopup(popupAddPhoto);
  validateFormCard.resetError();
};

// *==== работа с формами profile ====
// ? редактирование профиля
const handleSubmitEditProfileForm = (evt) => {
  // ! Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();

  // ? получить значение полей jobInput и nameInput из свойства value
  // ? втсавить новые значения с помощью textContent
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup(popupProfile);
};

// *==== POPUP ====
// ? открыть popup редактировать профиль
const openPropfilePopup = () => {
  // ? получить значение полей nameProfile и jobProfile из свойства textContent
  // ? втсавить новые значения с помощью value
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  
  validateFormProfile.toggleButtonState();
  openPopup(popupProfile);
};

// ? открыть popup
export const openPopup = (popupName) => {
  document.addEventListener('keydown', handleEscageKey);
  popupName.classList.add('popup_opened');
};

// ? заркрыть popup
const closePopup = (popupName) => {
  document.removeEventListener('keydown', handleEscageKey);
  popupName.classList.remove('popup_opened');
};

// ? закрыть popup по нажатию Escape или оверлей мыши
const handleEscageKey = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

// *==== обработка событий ====
// ? генерация карточек
initialCards.forEach((data) => {
  const cardElement = renderCard(data);
  cardGrid.append(cardElement);
});

// ? прикрепить обработчик к форме добавить фото:
// ? он будет следить за событием “submit” - «создать»
formPhoto.addEventListener('submit', handleSubmitAddCardForm);

// ? прикрепить обработчик к форме редактировать профиль:
// ? он будет следить за событием “submit” - «сохранить»
formProfile.addEventListener('submit', handleSubmitEditProfileForm);

// *==== кнопки ====
// ? закрыть popup
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

// ? открыть popup
// ! popup редактировать профиль
buttonEditProfile.addEventListener('click', function () {
  openPropfilePopup();
});

// ! popu добавить фотографию
buttonAddPhoto.addEventListener('click', function () {
  openPopup(popupAddPhoto);
});
