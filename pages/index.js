import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

const cardSelector = document.querySelector("#card-template");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;

/*=============================================
=            wrapper            =
=============================================*/
const profileEditModal = document.querySelector("#profileEditModal");
const profileEditForm = profileEditModal.querySelector(".modal__form");

const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardsWrap = document.querySelector(".cards__list");
const previewPictureModal = document.querySelector("#preview-image-modal");
const previewPictureInput = document.querySelector(".modal__picture");
const previewModalDescription = document.querySelector(".modal__description");

/*=============================================
=             Buttons and other DOM nodes            =
=============================================*/

const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addcardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const previewPictureCloseButton = previewPictureModal.querySelector(
  "#image_close-button"
);

/*=============================================
=            form data            =
=============================================*/

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardModal.querySelector(".modal__input_type_title");
const cardUrlInput = addCardModal.querySelector(".modal__input_type_url");

/*=============================================
=           functions            =
=============================================*/

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeWithEscape);
  modal.removeEventListener("mousedown", closePopupOverlay);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeWithEscape);
  modal.addEventListener("mousedown", closePopupOverlay);
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardsWrap.prepend(cardElement);
}

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handlePreviewPicture
  );
  return cardElement.getView();
}

initialCards.forEach((cardData) => renderCard(cardData));

/*=============================================
=            Event Handlers            =
=============================================*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardEditSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ link, name }, cardsWrap);
  closeModal(addCardModal);
  addCardFormElement.reset();
  addFormValidator.disableButton();
}

function closeWithEscape(e) {
  if (e.key === "Escape") {
    const openPopup = document.querySelector(".modal_opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

function closePopupOverlay(e) {
  if (e.target === e.currentTarget) {
    closeModal(e.currentTarget);
  }
}

/*=============================================
=            Event Listeners            =
=============================================*/

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
  editFormValidator.disableButton();
});

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

/*=============================================
=            form listeners            =
=============================================*/

addCardFormElement.addEventListener("submit", handleAddCardEditSubmit);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/*=============================================
=            preview image close button            =
=============================================*/
function handlePreviewPicture(cardData) {
  previewPictureInput.src = cardData.link;
  previewPictureInput.alt = cardData.name;
  previewModalDescription.textContent = cardData.name;
  openModal(previewPictureModal);
}

previewPictureCloseButton.addEventListener("click", () => {
  closeModal(previewPictureModal);
});

/*=============================================
=            new card button            =
=============================================*/

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addcardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

/*=============================================
=            validators            =
=============================================*/

const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inputErrorClass: "modal__input-error",
  inactiveButtonClass: "modal__button_disabled",
  errorclass: "modal__error",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditModal
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);
addFormValidator.enableValidation();
