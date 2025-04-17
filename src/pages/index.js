import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';
import Api from '../scripts/components/Api.js';
import Auth from '../scripts/components/Auth.js';
import InfoTooltip from '../scripts/components/InfoTooltip.js';
import Search from '../scripts/components/Search.js';
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
  formLogin,
  formRegister,
  buttonLogin,
  buttonRegister,
  buttonLogout,
  userEmail,
  API_CONFIG,
  AUTH_CONFIG,
} from '../scripts/utils/constants.js';
import './index.css';

const api = new Api(API_CONFIG);
const auth = new Auth(AUTH_CONFIG);

// * валидация
const validateFormProfile = new FormValidator(validationConfig, formProfile);
const validateFormAvatar = new FormValidator(validationConfig, formAvatar);
const validateFormCard = new FormValidator(validationConfig, formPhoto);
const validateFormLogin = new FormValidator(validationConfig, formLogin);
const validateFormRegister = new FormValidator(validationConfig, formRegister);

let userId = null;
let favoriteCards = [];

// Проверка авторизации
const checkAuth = () => {
  const token = localStorage.getItem('token');
  if (token) {
    auth.checkToken(token)
      .then((userData) => {
        userEmail.textContent = userData.email;
        showAuthState(true);
        userId = userData._id;
        loadData();
      })
      .catch(err => {
        console.log(err);
        showAuthState(false);
      });
  } else {
    showAuthState(false);
  }
};

// Показываем или скрываем элементы в зависимости от состояния авторизации
const showAuthState = (isLoggedIn) => {
  if (isLoggedIn) {
    document.querySelector('.profile').classList.remove('hidden');
    document.querySelector('.search').classList.remove('hidden');
    document.querySelector('.grid').classList.remove('hidden');
    buttonLogin.classList.add('hidden');
    buttonRegister.classList.add('hidden');
    buttonLogout.classList.remove('hidden');
    userEmail.classList.remove('hidden');
  } else {
    document.querySelector('.profile').classList.add('hidden');
    document.querySelector('.search').classList.add('hidden');
    document.querySelector('.grid').classList.add('hidden');
    buttonLogin.classList.remove('hidden');
    buttonRegister.classList.remove('hidden');
    buttonLogout.classList.add('hidden');
    userEmail.classList.add('hidden');
  }
};

const loadData = () => {
  api.getAllPromise()
    .then(([userData, cardsData]) => {
      profile.setUserInfo(userData);
      // Загружаем избранные карточки
      api.getFavorites()
        .then((favoritesData) => {
          // Помечаем карточки как избранные
          favoriteCards = favoritesData.map(card => card._id);
          const cardsWithFavorites = cardsData.map(card => {
            return {
              ...card,
              isFavorite: favoriteCards.includes(card._id)
            };
          });
          // Устанавливаем карточки
          search.setCards(cardsWithFavorites);
          search.setUserId(userId);
          cardRender.renderItems(cardsWithFavorites);
        })
        .catch(err => console.log(err));
    })
    .catch((err) => console.log(err));
};

const handleCardClick = (name, link, cardId) => {
  // Загружаем комментарии при открытии карточки
  api.getComments(cardId)
    .then((comments) => {
      popupPhoto.open(name, link, cardId, comments);
    })
    .catch(err => {
      console.log(err);
      popupPhoto.open(name, link, cardId, []);
    });
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

const handleSaveToFavorites = (card, cardId) => {
  const isFavorite = card.isFavorite();
  const action = isFavorite
    ? api.removeFromFavorites(cardId)
    : api.addToFavorites(cardId);
  
  action
    .then(() => {
      card.setFavorite(!isFavorite);
      // Обновляем список избранных
      if (isFavorite) {
        favoriteCards = favoriteCards.filter(id => id !== cardId);
      } else {
        favoriteCards.push(cardId);
      }
      // Обновляем поисковый компонент
      search.updateCardsList();
    })
    .catch((err) => console.log(err));
};

const handleDeleteClick = (card) => {
  popupConfirmDeleteCard.open();
  api
    .deletCard(card._id)
    .then(() => {
      deletCard(card);
      popupConfirmDeleteCard.close();
      // Удаляем из избранных, если карточка была в избранном
      favoriteCards = favoriteCards.filter(id => id !== card._id);
      // Обновляем список карточек в поиске
      search.updateCardsList();
    })
    .catch((err) => console.log(err));
};

const handleCommentSubmit = (cardId, commentText) => {
  api.addComment(cardId, commentText)
    .then((comment) => {
      popupPhoto.addComment(comment);
    })
    .catch(err => console.log(err));
};

// * создать карточку
const createCard = (data) => {
  const card = new Card(
    data,
    userId,
    handleCardClick,
    handleLikeCard,
    handleDeleteClick,
    handleSaveToFavorites,
    cardTemplate
  );
  const cardElement = card.generateCard();

  return cardElement;
};

// * отрисовка карт
const cardRender = new Section((item) => {
  cardRender.addItem(createCard(item));
}, '.cards');

// * компонент поиска
const search = new Search({
  searchSelector: '.search__input',
  filterSelector: '.search__filter-button',
  cardsContainer: '.cards',
  renderCards: (cards) => {
    // Очищаем контейнер карточек
    document.querySelector('.cards').innerHTML = '';
    // Отрисовываем отфильтрованные карточки
    cards.forEach(card => {
      cardRender.addItem(createCard(card));
    });
  }
});

// * попап картинки
const popupPhoto = new PopupWithImage('.popup_type_photo');
popupPhoto.setCommentSubmitHandler(handleCommentSubmit);

// * попап добавление фотографии
const popupAddCard = new PopupWithForm('.popup_type_add-photo', (data) => {
  popupAddCard.loading(true);
  
  // Собираем дополнительные изображения
  const additionalImageInputs = document.querySelectorAll('.form__input_additional-photo');
  const additionalImages = [];
  
  additionalImageInputs.forEach(input => {
    if (input.value) {
      additionalImages.push(input.value);
    }
  });
  
  // Добавляем дополнительные изображения к данным формы
  data.additionalImages = additionalImages;

  api
    .addCard(data)
    .then((res) => {
      cardRender.addItem(createCard(res));
      popupAddCard.close();
      // Обновляем список карточек в поиске
      search.setCards([...search._allCards, res]);
    })
    .catch((err) => console.log(err))
    .finally(() => popupAddCard.loading(false));
});

const popupConfirmDeleteCard = new PopupWithConfirm('.popup_type_confirm');

const deletCard = (data) => {
  data.handleDeleteCard();
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

// * Попапы авторизации и регистрации
const popupLogin = new PopupWithForm('.popup_type_login', (data) => {
  popupLogin.loading(true);
  
  auth.login(data.email, data.password)
    .then((res) => {
      if (res.token) {
        userEmail.textContent = data.email;
        showAuthState(true);
        popupLogin.close();
        checkAuth();
      }
    })
    .catch(err => {
      console.log(err);
      infoTooltip.showStatus(false, 'Ошибка при входе. Проверьте логин и пароль.');
    })
    .finally(() => popupLogin.loading(false));
});

const popupRegister = new PopupWithForm('.popup_type_register', (data) => {
  popupRegister.loading(true);
  
  auth.register(data.email, data.password)
    .then(() => {
      infoTooltip.showStatus(true);
      popupRegister.close();
    })
    .catch(err => {
      console.log(err);
      infoTooltip.showStatus(false);
    })
    .finally(() => popupRegister.loading(false));
});

const infoTooltip = new InfoTooltip('.popup_type_status');

// ? события
// ! popup редактировать профиль
buttonEditProfile.addEventListener('click', () => {
  const getProfile = profile.getUserInfo();

  nameInput.value = getProfile.name;
  jobInput.value = getProfile.about;

  // Заполняем дополнительные поля профиля, если они есть
  const cityInput = formProfile.querySelector('.form__input_profile-city');
  const websiteInput = formProfile.querySelector('.form__input_profile-website');
  
  if (cityInput && getProfile.city) {
    cityInput.value = getProfile.city;
  }
  
  if (websiteInput && getProfile.website) {
    websiteInput.value = getProfile.website;
  }

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
  // Очищаем список дополнительных фотографий
  document.querySelector('.form__photos-list').innerHTML = '';
  popupAddCard.open();
});

// Обработчик для добавления дополнительных полей фотографий
document.querySelector('.form__add-photo-button').addEventListener('click', () => {
  const photosList = document.querySelector('.form__photos-list');
  const photoItem = document.createElement('div');
  photoItem.classList.add('form__photo-item');
  
  const photoInput = document.createElement('input');
  photoInput.type = 'url';
  photoInput.placeholder = 'Ссылка на еще одну фотографию';
  photoInput.classList.add('form__input', 'form__input_additional-photo');
  photoInput.name = `additional-image-${photosList.children.length}`;
  photoInput.required = true;
  
  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.classList.add('form__remove-photo-button');
  removeButton.textContent = 'Удалить';
  removeButton.addEventListener('click', () => {
    photoItem.remove();
  });
  
  photoItem.appendChild(photoInput);
  photoItem.appendChild(removeButton);
  photosList.appendChild(photoItem);
});

// События для авторизации
buttonLogin.addEventListener('click', () => {
  validateFormLogin.resetValidation();
  popupLogin.open();
});

buttonRegister.addEventListener('click', () => {
  validateFormRegister.resetValidation();
  popupRegister.open();
});

buttonLogout.addEventListener('click', () => {
  auth.logout();
  showAuthState(false);
});

// Обработчик для ссылки "Войти" в форме регистрации
document.querySelector('.form__link').addEventListener('click', (evt) => {
  evt.preventDefault();
  popupRegister.close();
  popupLogin.open();
});

// Проверяем авторизацию
checkAuth();

// * включить валидация
validateFormCard.enableValidation();
validateFormProfile.enableValidation();
validateFormAvatar.enableValidation();
validateFormLogin.enableValidation();
validateFormRegister.enableValidation();

// * открыть попап
popupAddCard.setEventListeners();
popupConfirmDeleteCard.setEventListeners();
popupPhoto.setEventListeners();
popupProfileEdit.setEventListeners();
popupAvatarEdit.setEventListeners();
popupLogin.setEventListeners();
popupRegister.setEventListeners();
infoTooltip.setEventListeners();

// Инициализируем поиск
search.setEventListeners();
