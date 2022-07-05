export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // принимает DOM-элемент и добавляет его в контейнер
  addItem(data) {
    // debugger;
    this._container.prepend(data);
  }

  // метод, который отвечает за отрисовку всех элементов
  renderItems(items) {
    // debugger;
    items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
}
