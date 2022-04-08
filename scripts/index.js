let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button')
let closeButton = document.querySelectorAll('.popup__close-button');
let popupProfile = document.querySelector('.popup_type_profile');
let popupPhoto = document.querySelector('.popup_type_photo');

// ==== pop-up's ====
// функция открыть попап
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
}

// функция закрыть попап
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}

// ==== кнопки ====
// закрыть попапы
closeButton.forEach(function (arrElement) {
  arrElement.addEventListener('click', function () {
    closePopup(this.closest('.popup'));
  });
});

// открыть попапы
editButton.addEventListener('click', function () { openPopup(popupProfile); });
addButton.addEventListener('click', function () { openPopup(popupPhoto); });

// ==== lick button ====
for (let lickButton of document.querySelectorAll(".card__like-button")) {
  lickButton.addEventListener("click", function () {
    this.classList.toggle("card__like-button_active");
  });
}

// ==== работа с формами ====
// Находим форму в DOM
let formElement = document.querySelector('.form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('#profile-name');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('#profile-job'); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();   // Эта строчка отменяет стандартную отправку формы.
                          // Так мы можем определить свою логику отправки.
                          // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  console.log(nameInput);

  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler)