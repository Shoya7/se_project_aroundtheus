import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";

// DOM elements
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// Create instances
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", () => {
        imagePopup.open(item);
      });
      cardSection.addItem(card.generateCard());
    },
  },
  ".cards__list"
);

const editProfilePopup = new PopupWithForm(".popup_type_edit", (formData) => {
  userInfo.setUserInfo(formData);
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(".popup_type_add", (formData) => {
  const card = new Card(formData, "#card-template", () => {
    imagePopup.open(formData);
  });
  cardSection.addItem(card.generateCard());
  addCardPopup.close();
});
addCardPopup.setEventListeners();

// Event listeners
profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  document.querySelector("#name-input").value = currentUserInfo.name;
  document.querySelector("#description-input").value = currentUserInfo.job;
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

// Initialize the page
cardSection.renderItems();

// Form validators
const editFormValidator = new FormValidator(
  config,
  document.querySelector(".popup__form_type_edit")
);
const addFormValidator = new FormValidator(
  config,
  document.querySelector(".popup__form_type_add")
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
