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

// * Elements *//

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modalCloseButton = document.querySelector("#modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileAddModal = document.querySelector("#profile-add-modal");
const removeButton = document.querySelector(".card__remove-button");

const modalAddClose = document.querySelector("#modal-add-close-button");
const cardTitleInput = document.querySelector(".modal__input_type_title");
const cardUrlInput = document.querySelector(".modal__input_type_url");
const addCardFormElement = document.querySelector("#add-card-form");

//
const imageModal = document.querySelector("#image-modal");

const imageModalDescription = document.querySelector(".modal__description");
const imageClose = document.querySelector("#image-close");

//  Function

function closePopUp() {
  profileEditModal.classList.remove("modal_opened");
  profileAddModal.classList.remove("modal_opened");
}
//
function openModal(modal) {
  modal.classList.add("modal_opened");
}
function handleModalClose(modal) {
  modal.classList.remove("modal_opened");
}
//
function handleProfileEditSubmit(e) {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  e.preventDefault();
  closePopUp();
}
////
function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);

  closePopUp();
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const removeButton = cardElement.querySelector(".card__remove-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  removeButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.addEventListener("click", () => {
    const modalImageElement = imageModal.querySelector(".modal__image");
    const modalDescriptionElement = imageModal.querySelector(
      ".modal__description"
    );

    modalImageElement.src = cardData.link;
    modalImageElement.alt = cardData.name;
    modalDescriptionElement.textContent = cardData.name;
    openModal(imageModal);
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

/// Event Listener ////

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openModal(profileEditModal);
});

imageClose.addEventListener("click", () => {
  handleModalClose(imageModal);
});

modalCloseButton.addEventListener("click", closePopUp);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);
modalAddClose.addEventListener("click", closePopUp);

addNewCardButton.addEventListener("click", () => {
  openModal(profileAddModal);
});

const closeButtons = document.querySelectorAll("modal_close");

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
