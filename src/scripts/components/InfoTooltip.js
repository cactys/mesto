import Popup from './Popup.js';
import successIcon from '../../images/success-icon.svg';
import errorIcon from '../../images/error-icon.svg';

export default class InfoTooltip extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._statusIcon = this._popup.querySelector('.popup__status-icon');
    this._statusTitle = this._popup.querySelector('.popup__status-title');
  }

  showStatus(isSuccess, message) {
    if (isSuccess) {
      this._statusIcon.src = successIcon;
      this._statusTitle.textContent = message || 'Вы успешно зарегистрировались!';
    } else {
      this._statusIcon.src = errorIcon;
      this._statusTitle.textContent = message || 'Что-то пошло не так! Попробуйте ещё раз.';
    }
    this.open();
  }
} 