const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button')
const closeButton = document.querySelector('.popup__close-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupPhoto = document.querySelector('.popup_type_photo');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

// ==== pop-up's ====
// функция открыть попап
function openPopup(popupName) {
  popupName.classList.add('popup_opened');

  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

// функция закрыть попап
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}

// ==== кнопки ====
// закрыть попапы
closeButton.addEventListener('click', function () { closePopup(popupProfile); });

// открыть попапы
editButton.addEventListener('click', function () { openPopup(popupProfile); });

// ==== работа с формами ====
// Находим форму в DOM
let formElement = document.querySelector('.form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('#profile-name');
let jobInput = formElement.querySelector('#profile-job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();   // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  closePopup(popupProfile);

  // Получите значение полей jobInput и nameInput из свойства value
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  // Вставьте новые значения с помощью textContent
  nameProfile.textContent = nameValue;
  jobProfile.textContent = jobValue;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler)