export default class UserInfo {
  constructor(userInfo) {
    this._userName = document.querySelector(userInfo.userName);
    this._userAbout = document.querySelector(userInfo.userAbout);
    this._userAvatar = document.querySelector(userInfo.userAvatar);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
    };
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
    this._userAvatar.src = data.avatar;
    this._id = data._id;
  }
}
