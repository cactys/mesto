import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';
import Api from '../scripts/components/Api.js';
import {
  validationConfig,
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
} from '../scripts/utils/constants.js';
import './index.css';

const api = new Api(API_CONFIG);

// * валидация
const validateFormProfile = new FormValidator(validationConfig, formProfile);
const validateFormAvatar = new FormValidator(validationConfig, formAvatar);
const validateFormCard = new FormValidator(validationConfig, formPhoto);

// * клик по картинке карты
const handleCardClick = (name, link) => {
  openPhotoPopup.open(name, link);
};

// * клик по значку лайк
const handleLikeCard = (card, isLike) => {
  const cardLiked = isLike ? api.putLike(card._id) : api.deletLike(card._id);
  cardLiked
    .then(() => {
      card.addLike(isLike);
    })
    .catch((err) => console.log(err));
};

// * клик по иконке удаления
const handleDeleteClick = (card) => {
  openConfirmDeletCard.open();
  openConfirmDeletCard.cardId(card);
};

// * создать карточку
const createCard = (data) => {
  const card = new Card(
    data,
    profile._id,
    handleCardClick,
    handleLikeCard,
    handleDeleteClick,
    cardTemplate
  );
  const cardElement = card.generateCard();

  return cardElement;
};

// * отрисовка карт
const defaultCards = new Section(createCard, '.cards');

// * информация о авторе
const profile = new UserInfo({
  userName: nameProfile,
  userAbout: jobProfile,
  userAvatar: avatarProfile,
});

// * попап картинки
const openPhotoPopup = new PopupWithImage(popupPhoto);

// * попап добавление фотографии
const openAddPhotoPopup = new PopupWithForm(popupAddPhoto, (data) => {
  openAddPhotoPopup.loading(true);

  // debugger;
  api
    .createCard(data)
    .then((res) => {
      defaultCards.addItem(createCard(res));
    })
    .catch((err) => console.log(err))
    .finally(() => openAddPhotoPopup.loading(false));
});

// * попап подтверждения удаления карты
const openConfirmDeletCard = new PopupWithConfirm(popupConfirm, (cardId) => {
  api
    .deletCard(cardId)
    .then(() => {
      cardId.handleDeleteClick();
    })
    .catch((err) => console.log(err));
});

// * попап редактирование профиля
const openPropfilePopup = new PopupWithForm(popupProfile, (data) => {
  openPropfilePopup.loading(true);

  api
    .editUserInfo(data)
    .then((res) => profile.setUserInfo(res))
    .catch((err) => console.log(err))
    .finally(() => openPropfilePopup.loading(false));
});

// * попап изменение аватарки профиля
const openAvatarPopup = new PopupWithForm(popupEditAvatar, (data) => {
  openAvatarPopup.loading(true);

  api
    .editAvatar(data)
    .then((res) => profile.setUserInfo(res))
    .catch((err) => console.log(err))
    .finally(() => openAvatarPopup.loading(false));
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
// ! popup редактировать аватара
buttonEditAvatar.addEventListener('click', () => {
  validateFormAvatar.resetValidation();
  openAvatarPopup.open();
});
// ! popup добавить фотографию
buttonAddPhoto.addEventListener('click', () => {
  validateFormCard.resetValidation();
  openAddPhotoPopup.open();
});

// ? Promise.all
api
  .getAllPromise()
  .then(([userData, cardsData]) => {
    profile.setUserInfo(userData);
    // debugger;
    defaultCards.renderItems(cardsData);
  })
  .catch((err) => console.log(err));

// * включить валидация
validateFormCard.enableValidation();
validateFormProfile.enableValidation();
validateFormAvatar.enableValidation();
// * открыть попап
openAddPhotoPopup.setEventListeners();
openConfirmDeletCard.setEventListeners();
openPhotoPopup.setEventListeners();
openPropfilePopup.setEventListeners();
openAvatarPopup.setEventListeners();
