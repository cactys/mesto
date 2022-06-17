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
const popupAddPhoto = document.querySelector('.popup_type_add-photo');
// * находим в DOM кнопку редактирования профиля
const buttonEditProfile = document.querySelector('.profile__edit-button');
// ? поля в DOM имя и об авторе
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
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
// ? форма добавление карточки
const formPhoto = document.querySelector('.form_add-photo'); // форма добавления карточки

export {
  validationConfig,
  initialCards,
  popupProfile,
  popupAddPhoto,
  buttonEditProfile,
  nameProfile,
  jobProfile,
  buttonAddPhoto,
  cardTemplate,
  popupPhoto,
  formProfile,
  nameInput,
  jobInput,
  formPhoto,
};
