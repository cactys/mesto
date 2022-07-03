export default class UserInfo {
  constructor({ userName, userAbout, userAvatar}) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._userAvatar = userAvatar;
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    // debugger;
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.src,
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
