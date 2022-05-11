const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.form__input');

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function (evt) {
  console.log(evt.target.validity);
});

// const enableValidation = (conf) => {
//   const formList = Array.from(document.querySelectorAll(conf.formSelector));

//   formList.forEach((form) => {
//     form.addEventList('submit', (evt) => {
//       evt.preventDefault();
//     });

//     setEventListeners(conf, form);
//   });
// };

// enableValidation({
//   formSelector: '.form',
//   inputSelector: '.form__input',
//   submitButtonSelector: '.form__submit',
//   inactiveButtonSelector: 'form__submit_disabled',
//   inputErrorClass: 'form__input_inactive',
//   errorClass: 'form__input-error_active'
// });
