export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _checkingResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkingResponse);
  }

  editUserInfo(data) {
    const userData = {
      name: data.name,
      about: data.job
    };
    
    // Добавляем дополнительные поля, если они есть
    if (data.city) userData.city = data.city;
    if (data.website) userData.website = data.website;
    
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then(this._checkingResponse);
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.src,
      }),
    }).then(this._checkingResponse);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkingResponse);
  }

  getFavorites() {
    return fetch(`${this._url}/cards/favorites`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkingResponse);
  }

  addCard(data) {
    // Формируем массив изображений из данных формы
    const images = [data.src];
    
    // Добавляем дополнительные фотографии, если они есть
    if (data.additionalImages && data.additionalImages.length > 0) {
      images.push(...data.additionalImages);
    }
    
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.src,
        additionalImages: data.additionalImages || []
      }),
    }).then(this._checkingResponse);
  }

  deletCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkingResponse);
  }

  putLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkingResponse);
  }

  deletLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkingResponse);
  }

  addToFavorites(id) {
    return fetch(`${this._url}/cards/favorites/${id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkingResponse);
  }

  removeFromFavorites(id) {
    return fetch(`${this._url}/cards/favorites/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkingResponse);
  }

  getAllPromise() {
    return Promise.all([this.getUser(), this.getCards()]);
  }

  getComments(cardId) {
    return fetch(`${this._url}/cards/${cardId}/comments`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkingResponse);
  }

  addComment(cardId, commentText) {
    return fetch(`${this._url}/cards/${cardId}/comments`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        text: commentText
      }),
    }).then(this._checkingResponse);
  }

  deleteComment(cardId, commentId) {
    return fetch(`${this._url}/cards/${cardId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkingResponse);
  }
}
