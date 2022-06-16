(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var n=function(){function n(e,r){var o=this,i=e.data,u=e.handleCardClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),t(this,"_handleDeleteCard",(function(){o._element.remove(),o._element=null})),t(this,"_handleLikeCard",(function(){o._buttonLike.classList.toggle("card__like-button_active")})),this._title=i.name,this._image=i.link,this._handleCardClick=u,this._cardSelector=r}var r,o;return r=n,(o=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._cardImage=this._element.querySelector(".card__image"),this._cardTitle=this._element.querySelector(".card__name"),this._buttonLike=this._element.querySelector(".card__like-button"),this._buttonDelete=this._element.querySelector(".card__trach-icon"),this._cardImage.src=this._image,this._cardImage.alt=this._title,this._cardTitle.textContent=this._title,this._setEventListeners(),this._element}},{key:"_setEventListeners",value:function(){this._cardImage.addEventListener("click",this._handleCardClick),this._buttonDelete.addEventListener("click",this._handleDeleteCard),this._buttonLike.addEventListener("click",this._handleLikeCard)}}])&&e(r.prototype,o),Object.defineProperty(r,"prototype",{writable:!1}),n}();function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=o((function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,"_showInputError",(function(e){var t=r._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(r._inputErrorClass),t.classList.add(r._errorClass),t.textContent=e.validationMessage})),i(this,"_hideInputError",(function(e){var t=r._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(r._inputErrorClass),t.classList.remove(r._errorClass),t.textContent=""})),i(this,"_hasInvalidInput",(function(){return r._inputList.some((function(e){return!e.validity.valid}))})),i(this,"_checkInputValidity",(function(e){e.validity.valid?r._hideInputError(e):r._showInputError(e)})),i(this,"_setEventListeners",(function(){r.toggleButtonState(),r._formElement.addEventListener("submit",(function(e){e.preventDefault()})),r._inputList.forEach((function(e){e.addEventListener("input",(function(){r._checkInputValidity(e),r.toggleButtonState()}))}))})),i(this,"toggleButtonState",(function(){r._hasInvalidInput()?(r._buttonElement.disabled=!0,r._buttonElement.classList.add(r._inactiveButtonClass)):(r._buttonElement.disabled=!1,r._buttonElement.classList.remove(r._inactiveButtonClass))})),i(this,"enableValidation",(function(){r._setEventListeners()})),i(this,"resetError",(function(){r._inputList.forEach((function(e){r._hideInputError(e)})),r.toggleButtonState()})),this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._inputErrorClass=t.inputErrorClass,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._errorClass=t.errorClass,this._formElement=n,this._buttonElement=this._formElement.querySelector(this._submitButtonSelector),this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector))}));function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t,n){var r=t.data,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._rendererItems=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"renderItems",value:function(){var e=this;this._rendererItems.forEach((function(t){e._renderer(t)}))}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(t){var n=t.userName,r=t.userAbout;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userName=n,this._userAbout=r}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._userName.textContent,about:this._userAbout.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.about;this._userName.textContent=t,this._userAbout.textContent=n}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var p=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=t,this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__close"))&&e.close()}))}},{key:"open",value:function(){document.addEventListener("keydown",this._handleEscClose),this._popup.classList.add("popup_opened")}},{key:"close",value:function(){document.removeEventListener("keydown",this._handleEscClose),this._popup.classList.remove("popup_opened")}}])&&f(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(){return _="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=y(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},_.apply(this,arguments)}function y(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=v(e)););return e}function m(e,t){return m=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},m(e,t)}function b(e,t){if(t&&("object"===d(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function v(e){return v=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},v(e)}var g=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&m(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=v(r);if(o){var n=v(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return b(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._popupForm=n._popup.querySelector(".form"),n._inputList=Array.from(n._popupForm.querySelectorAll(".form__input")),n._submitButton=n._popup.querySelector(".form__submit"),n._popupSubmit=t,n}return t=u,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){return e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){var e=this;_(v(u.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",(function(t){t.preventDefault(),e._popupSubmit(e._getInputValues()),e.close()}))}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(p),E={formSelector:".form",inputSelector:".form__input",inputErrorClass:"form__input_inactive",submitButtonSelector:".form__submit",inactiveButtonClass:"form__submit_disabled",errorClass:"form__input-error_active"},w=document.querySelector(".popup_type_profile"),S=document.querySelector(".popup_type_add-photo"),k=document.querySelector(".profile__edit-button"),O=document.querySelector(".profile__title"),C=document.querySelector(".profile__subtitle"),j=document.querySelector(".profile__add-button"),L=document.querySelector(".popup_type_photo"),P=document.querySelector(".photo-container__photo"),q=document.querySelector(".photo-container__photo-title"),I=document.querySelector(".form_edit-profile"),B=I.querySelector(".form__input_profile-name"),x=I.querySelector(".form__input_profile-job"),R=document.querySelector(".form_add-photo");function T(e){return T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},T(e)}function D(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function V(){return V="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=A(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},V.apply(this,arguments)}function A(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=F(e)););return e}function N(e,t){return N=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},N(e,t)}function U(e,t){if(t&&("object"===T(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function F(e){return F=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},F(e)}var z=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&N(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=F(r);if(o){var n=F(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return U(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._imagePhoto=P,t._imageTitle=q,t}return t=u,(n=[{key:"open",value:function(e){this._imagePhoto.src=e.link,this._imagePhoto.alt=e.name,this._imageTitle.textContent=e.name,V(F(u.prototype),"open",this).call(this)}}])&&D(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(p),M=new u(E,I),G=new u(E,R),H=new z(L),J=function(e){var t=new n({data:e,handleCardClick:function(){H.open(e)}},".card-template").generateCard();K.addItem(t)},K=new c({data:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:J},".cards"),Q=new g(S,(function(e){var t={name:e.title,link:e.src};J(t),Q.close()})),W=new l({userName:O,userAbout:C}),X=new g(w,(function(e){for(var t=0;t<=e.length;t++)W.setUserInfo(e[t]);X.close()}));k.addEventListener("click",(function(){var e=W.getUserInfo();B.value=e.name,x.value=e.about,M.toggleButtonState(),M.resetError(),X.open()})),j.addEventListener("click",(function(){R.reset(),G.resetError(),Q.open()})),G.enableValidation(),M.enableValidation(),K.renderItems(),Q.setEventListeners(),H.setEventListeners(),X.setEventListeners()})();