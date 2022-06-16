import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
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
} from '../utils/constants.js';

// * валидация
const validateFormProfile = new FormValidator(validationConfig, formProfile);
const validateFormCard = new FormValidator(validationConfig, formPhoto);

// * попап картинки
const openPhotoPopup = new PopupWithImage(popupPhoto);

// * рендер карт
const renderCard = (item) => {
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
  openAddPhotoPopup.close();
});

// * информация о авторе
const profile = new UserInfo({
  userName: nameProfile,
  userAbout: jobProfile,
});

// * попап редактирование профиля
const openPropfilePopup = new PopupWithForm(popupProfile, (data) => {
  for (let i = 0; i <= data.length; i++) {
    profile.setUserInfo(data[i]);
  }
  openPropfilePopup.close();
});

// ? события
// ! popup редактировать профиль
buttonEditProfile.addEventListener('click', () => {
  const getProfile = profile.getUserInfo();

  nameInput.value = getProfile.name;
  jobInput.value = getProfile.about;

  validateFormProfile.toggleButtonState();
  validateFormProfile.resetError();
  openPropfilePopup.open();
});
// ! popup добавить фотографию
buttonAddPhoto.addEventListener('click', () => {
  formPhoto.reset();
  validateFormCard.resetError();
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
