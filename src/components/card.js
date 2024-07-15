export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._link;
    this._cardTitle = this._cardElement.querySelector(".card__subtitle");
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
