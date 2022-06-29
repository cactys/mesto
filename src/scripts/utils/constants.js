// *формы валидации
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_inactive',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  errorClass: 'form__input-error_active',
};

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

// !DOM элеиенты
// * DOM попапы
const popupProfile = document.querySelector('.popup_type_profile');
const popupEditAvatar = document.querySelector('.popup_type_avatar');
const popupAddPhoto = document.querySelector('.popup_type_add-photo');
const popupConfirm = document.querySelector('.popup_type_confirm');
// * находим в DOM кнопку редактирования профиля
const buttonEditProfile = document.querySelector('.profile__edit-button');
// * находим в DOM кнопку редактирования аватара
const buttonEditAvatar = document.querySelector('.profile__avatar-edit');
// ? поля в DOM имя и об авторе
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const avatarProfile = document.querySelector('.profile__avatar');
// * находим в DOM кнопку добавления фотографии
const buttonAddPhoto = document.querySelector('.profile__add-button');
// * Находим в DOM элементы карточки
const cardTemplate = '.card-template';
const popupPhoto = document.querySelector('.popup_type_photo');
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
  initialCards,
  popupProfile,
  popupEditAvatar,
  popupAddPhoto,
  popupConfirm,
  buttonEditProfile,
  buttonEditAvatar,
  nameProfile,
  jobProfile,
  avatarProfile,
  buttonAddPhoto,
  cardTemplate,
  popupPhoto,
  formProfile,
  nameInput,
  jobInput,
  formAvatar,
  formPhoto,
  API_CONFIG,
};
