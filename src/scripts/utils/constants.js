// *формы валидации
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_inactive',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  errorClass: 'form__input-error_active',
};

// !DOM элеиенты
// * находим в DOM кнопку редактирования профиля
const buttonEditProfile = document.querySelector('.profile__edit-button');
// * находим в DOM кнопку редактирования аватара
const buttonEditAvatar = document.querySelector('.profile__avatar-edit');
// * находим в DOM кнопку добавления фотографии
const buttonAddPhoto = document.querySelector('.profile__add-button');
// * Находим в DOM элементы карточки
const cardTemplate = '.card-template';
// * объявить form || input
// ? форма редактирование профиля
const formProfile = document.querySelector('.form_edit-profile'); // форма редактирования профиля
const nameInput = formProfile.querySelector('.form__input_profile-name'); // поле ввода имени
const jobInput = formProfile.querySelector('.form__input_profile-job'); // поле ввода деятельности
// ? форма редактирования аватара
const formAvatar = document.querySelector('.form_edit-avatar'); // форма редактирования аватарки
// ? форма добавление карточки
const formPhoto = document.querySelector('.form_add-photo'); // форма добавления карточки

const API_CONFIG = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: '78b845d7-f9bb-43fd-9d7f-fb92a3c4ec96',
    'Content-Type': 'application/json',
  },
};

export {
  validationConfig,
  buttonEditProfile,
  buttonEditAvatar,
  buttonAddPhoto,
  cardTemplate,
  formProfile,
  nameInput,
  jobInput,
  formAvatar,
  formPhoto,
  API_CONFIG,
};
