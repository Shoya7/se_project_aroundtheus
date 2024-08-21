export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeButton
    //handleCardLike,
    //handleCardDislike
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeButton = handleLikeButton;
    //this._handleCardDislike = handleCardDislike;
    this.isLiked = isLiked;
  }
  getCardId() {
    return this._id;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    // ".card__like-button"
    /*this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this.like();
      });*/

    //".card__trash-button"
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard(this);
      });
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick({ name: this._name, link: this._link })
      );
    this._likeButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target === this._likeButton) {
        this._handleLikeButton(this);
      }
    });
  }

  /*like() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
    //this._isLiked = true;
  }*/

  /*dislike() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.remove("card__like-button_active");
    //this._isLiked = false;
  }*/

  updateIsLiked(isLiked) {
    this.isLiked = isLiked;
    this.renderLikes();
  }

  renderLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  remove() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    // get the card view
    // set eventn listeners
    this._setEventListeners();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this.renderLikes();

    // return the card

    return this._cardElement;
  }
}
