export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._rendererItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
    // Можно было бы сделать функцию renderer обычной функцией создания карточки
    // (без вставки ее в DOM), тогда в методе addItem можно было бы сразу создавать
    // карточку и тут же вставлять ее в DOM. Тогда в index.js не нужно было бы отдельно
    // создавать функцию createCard, чтобы в 2х местах создавать карточки.
    // ! addItem(item) {
    // !    const card = this._renderer(item)
    // !    this._container.prepend(card);
    // ! }
    // А можно переиспользовать метод _renderer, чтобы создавать и вставлять карточку
    // ! renderCard(item) {
    // !     this._renderer(item);
    // ! }
    // МОЖНО ЛУЧШЕ
    // Gennadiy Barsegyan
    // ревьюер
  }

  // метод, который отвечает за отрисовку всех элементов
  renderItems() {
    this._rendererItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
