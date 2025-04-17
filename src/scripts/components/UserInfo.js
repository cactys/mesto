export default class UserInfo {
  constructor({ userName, userAbout, userAvatar }) {
    this._name = document.querySelector(userName);
    this._job = document.querySelector(userAbout);
    this._avatar = document.querySelector(userAvatar);
    this._id = null;
    this._city = '';
    this._website = '';
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    const info = {
      name: this._name.textContent,
      about: this._job.textContent,
    };
    
    if (this._city) {
      info.city = this._city;
    }
    
    if (this._website) {
      info.website = this._website;
    }
    
    return info;
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, about, avatar, _id, city, website }) {
    if (name) this._name.textContent = name;
    if (about) this._job.textContent = about;
    if (avatar) this._avatar.src = avatar;
    if (_id) this._id = _id;
    if (city) this._city = city;
    if (website) this._website = website;
  }
}
