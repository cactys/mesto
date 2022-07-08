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
} from '../scripts/utils/constants.js';
import './index.css';

const api = new Api(API_CONFIG);

// * валидация
const validateFormProfile = new FormValidator(validationConfig, formProfile);
const validateFormAvatar = new FormValidator(validationConfig, formAvatar);
const validateFormCard = new FormValidator(validationConfig, formPhoto);

const handleCardClick = (name, link) => {
  popupPhoto.open(name, link);
};

const handleLikeCard = (card, cardId) => {
  const cardLiked = card.isLiked()
    ? api.deletLike(cardId)
    : api.putLike(cardId);
  cardLiked
    .then((res) => {
      card.setLikes(res.likes);
    })
    .catch((err) => console.log(err));
};

const handleDeleteClick = (card) => {
  popupConfirmDeleteCard.open();
  // popupConfirmDeleteCard.setCardId(card);
  api
    .deletCard(card._id)
    .then(() => {
      deletCard(card);
      popupConfirmDeleteCard.close();
    })
    .catch((err) => console.log(err));
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
const cardRender = new Section((item) => {
  cardRender.addItem(createCard(item));
}, '.cards');

// * попап картинки
const popupPhoto = new PopupWithImage('.popup_type_photo');

// * попап добавление фотографии
const popupAddCard = new PopupWithForm('.popup_type_add-photo', (data) => {
  popupAddCard.loading(true);

  api
    .addCard(data)
    .then((res) => {
      cardRender.addItem(createCard(res));
      popupAddCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAddCard.loading(false));
});

const popupConfirmDeleteCard = new PopupWithConfirm('.popup_type_confirm');

const deletCard = (data) => {
  data.handleDeleteCard();
  // console.log(data);
};

// * информация о авторе
const profile = new UserInfo({
  userName: '.profile__title',
  userAbout: '.profile__subtitle',
  userAvatar: '.profile__avatar',
});

// * попап редактирование профиля
const popupProfileEdit = new PopupWithForm('.popup_type_profile', (data) => {
  popupProfileEdit.loading(true);

  api
    .editUserInfo(data)
    .then((res) => {
      profile.setUserInfo(res);
      popupProfileEdit.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupProfileEdit.loading(false));
});

const popupAvatarEdit = new PopupWithForm('.popup_type_avatar', (data) => {
  popupAvatarEdit.loading(true);

  api
    .editAvatar(data)
    .then((res) => {
      profile.setUserInfo(res);
      popupAvatarEdit.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAvatarEdit.loading(false));
});

// ? события
// ! popup редактировать профиль
buttonEditProfile.addEventListener('click', () => {
  const getProfile = profile.getUserInfo();

  nameInput.value = getProfile.name;
  jobInput.value = getProfile.about;

  validateFormProfile.resetValidation();
  popupProfileEdit.open();
});
// ! popup редактировать аватара
buttonEditAvatar.addEventListener('click', () => {
  validateFormAvatar.resetValidation();
  popupAvatarEdit.open();
});
// ! popup добавить фотографию
buttonAddPhoto.addEventListener('click', () => {
  validateFormCard.resetValidation();
  popupAddCard.open();
});

api
  .getAllPromise()
  .then(([userData, cardsData]) => {
    profile.setUserInfo(userData);
    cardRender.renderItems(cardsData);
  })
  .catch((err) => console.log(err));

// * включить валидация
validateFormCard.enableValidation();
validateFormProfile.enableValidation();
validateFormAvatar.enableValidation();
// * открыть попап
popupAddCard.setEventListeners();
popupConfirmDeleteCard.setEventListeners();
popupPhoto.setEventListeners();
popupProfileEdit.setEventListeners();
popupAvatarEdit.setEventListeners();
