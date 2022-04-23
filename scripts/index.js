// ==== Cards ====
// масив карточек
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

// DOM элемент карт
const cardsContainer = document.querySelector('.cards');

// ==== card ====
// шаблон
const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.card');

// генератор карточек
const generateCard = (cardData) => {
  const newCard = cardTemplate.cloneNode(true);

  const nameCard = newCard.querySelector('.card__name');
  nameCard.textContent = cardData.name;
  const linkCard = newCard.querySelector('.card__image');
  linkCard.src = cardData.link;

  // const deleteButton = newTodoCard.querySelector(
  //   '.todo-card__button_type_delete'
  // );
  // deleteButton.addEventListener('click', handleDeleteTodoCard);

  // const checkButton = newTodoCard.querySelector(
  //   '.todo-card__button_type_check'
  // );
  // checkButton.addEventListener('click', handleCheckTodoCard);

  return newCard;
};

// rendering card
const renderingCard = (cardData) => {
  cardsContainer.prepend(generateCard(cardData));
};

initialCards.forEach((cardData) => {
  renderingCard(cardData);
});

// ==== Forms & popups ====
// DOM элементы forms & popups
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close-button');
const popupProfile = document.querySelector('.popup_type_profile');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const popupPhoto = document.querySelector('.popup_type_photo');
const namePhoto = document.querySelector('.card__title');
const urlPhoto = document.querySelector('.card__image');

// ==== работа с формами profile ====
// Находим форму в DOM
let formElement = document.querySelector('.form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form__input_profile-name');
let jobInput = formElement.querySelector('.form__input_profile-job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  targetPopup(popupProfile);

  // Получите значение полей jobInput и nameInput из свойства value
  // Вставьте новые значения с помощью textContent
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// ==== pop-up's ====
// функция открыть/закрыть попап
function targetPopup(popupName) {
  if (!popupName.classList.contains('popup_opened')) {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
  }
  popupName.classList.toggle('popup_opened');
}

// ==== кнопки ====
// закрыть попапы
closeButton.forEach(function (arrElement) {
  arrElement.addEventListener('click', function () {
    targetPopup(this.closest('.popup'));
  });
});

// открыть попапы
editButton.addEventListener('click', function () {
  targetPopup(popupProfile);
});
addButton.addEventListener('click', function () {
  targetPopup(popupPhoto);
});
