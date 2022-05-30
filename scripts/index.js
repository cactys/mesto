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
const popupPhoto = document.querySelector('.popup_type_photo');
const photoImage = document.querySelector('.photo-container__photo');
const photoTitle = document.querySelector('.photo-container__photo-title');
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
  const card = new Card(initialCard, '.card-template', openPhotoPopup);
  const cardElement = card.generateCard();
  return cardElement;
};

// ? добавление пользовательской карточки
const handleSubmitAddCardForm = () => {
  const addCard = { name: inputPhotoTitle.value, link: inputPhotoSrc.value };
  const cardElement = renderCard(addCard);
  cardGrid.prepend(cardElement);

  formPhoto.reset();
  closePopup(popupAddPhoto);
  validateFormCard.resetError();
};

// ? редактирование профиля
const handleSubmitEditProfileForm = () => {
  // ? получить значение полей jobInput и nameInput из свойства value
  // ? втсавить новые значения с помощью textContent
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup(popupProfile);
};

// *==== POPUP ====
// ? открыть popup картинки
const openPhotoPopup = (title, image) => {
  photoImage.src = image;
  photoImage.alt = title;
  photoTitle.textContent = title;
  openPopup(popupPhoto);
};

// ? открыть popup редактировать профиль
const openPropfilePopup = () => {
  // ? получить значение полей nameProfile и jobProfile из свойства textContent
  // ? втсавить новые значения с помощью value
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  validateFormProfile.toggleButtonState();
  validateFormProfile.resetError();
  openPopup(popupProfile);
};

// ? открыть popup
const openPopup = (popupName) => {
  document.addEventListener('keydown', handleEscapeKey);
  popupName.classList.add('popup_opened');
};

// ? заркрыть popup
const closePopup = (popupName) => {
  document.removeEventListener('keydown', handleEscapeKey);
  popupName.classList.remove('popup_opened');
};

// ? закрыть popup по нажатию Escape или оверлей мыши
const handleEscapeKey = (evt) => {
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
    if (
      evt.target.classList.contains('popup_opened') ||
      evt.target.classList.contains('popup__close')
    ) {
      closePopup(popup);
    }
  });
});

// ? открыть popup
// ! popup редактировать профиль
buttonEditProfile.addEventListener('click', () => {
  openPropfilePopup();
});

// ! popu добавить фотографию
buttonAddPhoto.addEventListener('click', () => {
  openPopup(popupAddPhoto);
});
