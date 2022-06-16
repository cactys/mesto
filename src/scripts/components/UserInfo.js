export default class UserInfo {
  constructor({ userName, userAbout }) {
    this._userName =userName;
    this._userAbout = userAbout;
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
    };
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
  }
}
