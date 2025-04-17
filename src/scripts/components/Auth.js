export default class Auth {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  _checkingResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(this._checkingResponse);
  }

  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(this._checkingResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }
    });
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._checkingResponse);
  }

  logout() {
    localStorage.removeItem('token');
  }
} 