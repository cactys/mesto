export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._rendererItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

  // метод, который отвечает за отрисовку всех элементов
  renderItems() {
    this._rendererItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
