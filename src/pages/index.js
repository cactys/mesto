import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import {
  validationConfig,
  initialCards,
  popupProfile,
  popupAddPhoto,
  buttonEditProfile,
  buttonAddPhoto,
  cardTemplate,
  popupPhoto,
  formProfile,
  nameInput,
  jobInput,
  formPhoto,
  nameProfile,
  jobProfile,
} from '../scripts/utils/constants.js';
import './index.css';

// * валидация
const validateFormProfile = new FormValidator(validationConfig, formProfile);
const validateFormCard = new FormValidator(validationConfig, formPhoto);
// Если будет интересно, можно универсально создать экземпляры валидаторов всех форм, поместив их все в один объект, а потом брать из него валидатор по атрибуту name, который задан для формы. Это очень универсально и для любого кол-ва форм подходит.
// ! const formValidators = {}

// Включение валидации
// ! const enableValidation = (config) => {
// ! const formList = Array.from(document.querySelectorAll(config.formSelector))
// ! formList.forEach((formElement) => {
// !   const validator = new FormValidator(formElement, config)
//  получаем данные из атрибута `name` у формы
// !  const formName = formElement.getAttribute('name')
//  вот тут в объект записываем под именем формы
// !    formValidators[formName] = validator;
// !   validator.enableValidation();
// !  });
// !};
// ! enableValidation(config);
// И теперь можно использовать валидаторы для деактивации кнопки и тд
// ! formValidators[ profileForm.getAttribute('name') ].resetValidation()
// или можно использовать строку (ведь Вы знаете, какой атрибут `name` у каждой формы)
// ! formValidators['profile-form'].resetValidation()
// МОЖНО ЛУЧШЕ
// Gennadiy Barsegyan
// ревьюер

// * попап картинки
const openPhotoPopup = new PopupWithImage(popupPhoto);

// * создать карточку
const createCard = (item) => {
  const card = new Card(
    {
      data: item,
      handleCardClick: () => {
        openPhotoPopup.open(item);
      },
    },
    cardTemplate
  );
  const cardElement = card.generateCard();

  return cardElement;
};

// * рендер карт
const renderCard = (item) => {
  const cardElement = createCard(item);
  defaultCards.addItem(cardElement);
};

// * отрисовка карт
const defaultCards = new Section(
  {
    data: initialCards,
    renderer: renderCard,
  },
  '.cards'
);

// * попап добавление фотографии
const openAddPhotoPopup = new PopupWithForm(popupAddPhoto, (data) => {
  const addCard = {
    name: data.title,
    link: data.src,
  };
  renderCard(addCard);
});

// * информация о авторе
const profile = new UserInfo({
  userName: nameProfile,
  userAbout: jobProfile,
});

// * попап редактирование профиля
const openPropfilePopup = new PopupWithForm(popupProfile, (data) => {
  profile.setUserInfo({
    name: data.name,
    about: data.job,
  });
});

// ? события
// ! popup редактировать профиль
buttonEditProfile.addEventListener('click', () => {
  const getProfile = profile.getUserInfo();

  nameInput.value = getProfile.name;
  jobInput.value = getProfile.about;

  validateFormProfile.resetValidation();
  openPropfilePopup.open();
});
// ! popup добавить фотографию
buttonAddPhoto.addEventListener('click', () => {
  validateFormCard.resetValidation();
  openAddPhotoPopup.open();
});

// * включить валидация
validateFormCard.enableValidation();
validateFormProfile.enableValidation();
// * отрисовать карты
defaultCards.renderItems();
// * открыть попап
openAddPhotoPopup.setEventListeners();
openPhotoPopup.setEventListeners();
openPropfilePopup.setEventListeners();

fetch('https://mesto.nomoreparties.co/v1/cohort-44/cards', {
  headers: {
    authorization: '78b845d7-f9bb-43fd-9d7f-fb92a3c4ec96',
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });
