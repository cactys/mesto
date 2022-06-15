import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import {
  validationConfig,
  initialCards,
  popups,
  popupProfile,
  popupAddPhoto,
  buttonEditProfile,
  buttonAddPhoto,
  nameProfile,
  jobProfile,
  cardTemplate,
  cardGrid,
  popupPhoto,
  photoImage,
  photoTitle,
  formProfile,
  nameInput,
  jobInput,
  formPhoto,
  inputPhotoTitle,
  inputPhotoSrc,
} from '../utils/constants.js';

// * валидация
const validateFormProfile = new FormValidator(validationConfig, formProfile);
const validateFormCard = new FormValidator(validationConfig, formPhoto);

// ? открыть popup картинки
const openPhotoPopup = (title, image) => {
  photoImage.src = image;
  photoImage.alt = title;
  photoTitle.textContent = title;
  openPopup(popupPhoto);
};

const renderCard = (item) => {
  const card = new Card(item, cardTemplate, openPhotoPopup);
  const cardElement = card.generateCard();
  defaultCards.addItem(cardElement);
};

const defaultCards = new Section(
  {
    data: initialCards,
    renderer: renderCard,
  },
  '.cards'
);

// ? добавление пользовательской карточки
const handleSubmitAddCardForm = () => {
  const addCard = { name: inputPhotoTitle.value, link: inputPhotoSrc.value };
  const cardElement = renderCard(addCard);

  formPhoto.reset();
  closePopup(popupAddPhoto);
  validateFormCard.resetError();

  return cardElement;
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

validateFormCard.enableValidation();
validateFormProfile.enableValidation();
defaultCards.renderItems();
