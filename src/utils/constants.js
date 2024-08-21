export const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const initialCards = [
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
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

/* elements */
export const modalAdd = document.querySelector(".js-add-modal");
export const modalEdit = document.querySelector(".js-edit-modal");
export const modalePreview = document.querySelector(".js-preview-modal");
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const modalPreviewImageElement = document.querySelector(
  ".modal__preview-image"
);
export const modalPreviewImageCaption =
  document.querySelector("#preview-caption");
export const profilAddModal = document.querySelector("#profile-add-modal");
export const profileCloseModal = modalEdit.querySelector(
  "#profile-close-modal"
);
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-title-description"
);

export const profileImageInput = document.querySelector(".profile__image");
export const profileEditForm = profileEditModal.querySelector(".modal__form");

export const addModalButton = document.querySelector("#profile-add-button");
export const addModalCloseButton = modalAdd.querySelector("#add-close-modal");
export const cardsAddForm = document.querySelector("#modal__form-add");
export const cardListEl = document.querySelector(".cards__list");
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const previewModal = document.querySelector("#preview-modal");
export const previewCloseModal = modalePreview.querySelector(
  "#preview-close-modal"
);
export const editFormElemenet = modalEdit.querySelector(".modal__form");
export const addFormElemenet = modalAdd.querySelector(".modal__form");
export const editAvatarForm = document.querySelector("#edit-avatar-modal-form");
