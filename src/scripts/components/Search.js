export default class Search {
  constructor({ searchSelector, filterSelector, cardsContainer, renderCards }) {
    this._searchInput = document.querySelector(searchSelector);
    this._searchButton = document.querySelector('.search__button');
    this._filterButtons = document.querySelectorAll(filterSelector);
    this._cardsContainer = cardsContainer;
    this._renderCards = renderCards;
    this._currentFilter = 'all';
    this._searchQuery = '';
    this._allCards = [];
  }

  setCards(cards) {
    this._allCards = cards;
  }

  filterCards() {
    let filteredCards = [...this._allCards];
    
    // Применяем фильтр по категории
    if (this._currentFilter === 'favorites') {
      filteredCards = filteredCards.filter(card => card.isFavorite);
    } else if (this._currentFilter === 'my') {
      filteredCards = filteredCards.filter(card => card.owner._id === this._userId);
    }
    
    // Применяем поиск по названию
    if (this._searchQuery) {
      const query = this._searchQuery.toLowerCase();
      filteredCards = filteredCards.filter(card => 
        card.name.toLowerCase().includes(query)
      );
    }
    
    return filteredCards;
  }

  updateCardsList() {
    const filteredCards = this.filterCards();
    this._renderCards(filteredCards);
  }

  setUserId(userId) {
    this._userId = userId;
  }

  setEventListeners() {
    this._searchButton.addEventListener('click', () => {
      this._searchQuery = this._searchInput.value;
      this.updateCardsList();
    });
    
    this._searchInput.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        this._searchQuery = this._searchInput.value;
        this.updateCardsList();
      }
    });
    
    this._filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Убираем активный класс со всех кнопок
        this._filterButtons.forEach(btn => {
          btn.classList.remove('search__filter-button_active');
        });
        
        // Устанавливаем активный класс на нажатую кнопку
        button.classList.add('search__filter-button_active');
        
        // Запоминаем текущий фильтр
        this._currentFilter = button.dataset.filter;
        
        // Обновляем список карточек
        this.updateCardsList();
      });
    });
  }
} 