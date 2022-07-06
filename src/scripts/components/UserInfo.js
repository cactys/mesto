export default class UserInfo {
<<<<<<< HEAD
  constructor({ userName, userAbout, userAvatar}) {
    this._userName = document.querySelector(userName);
    this._userAbout = document.querySelector(userAbout);
    this._userAvatar = document.querySelector(userAvatar);
=======
  constructor(userInfo) {
    this._userName = document.querySelector(userInfo.userName);
    this._userAbout = document.querySelector(userInfo.userAbout);
    this._userAvatar = document.querySelector(userInfo.userAvatar);
>>>>>>> develop
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
<<<<<<< HEAD
      // avatar: this._userAvatar.src,
=======
>>>>>>> develop
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
