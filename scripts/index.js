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