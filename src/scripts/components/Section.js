export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // принимает DOM-элемент и добавляет его в контейнер
  addItem(data) {
    this._container.prepend(data);
  }

  // метод, который отвечает за отрисовку всех элементов
  renderItems(items) {
    items.reverse().forEach((item) => {
<<<<<<< HEAD
      // const element = this._renderer(item);
      this._renderer(item);
      // this.addItem(element);
=======
      this._renderer(item);
>>>>>>> develop
    });
  }
}
