import {
  validationSettings,
  initialCards,
  modalAdd,
  modalEdit,
  modalePreview,
  profileEditButton,
  profileEditModal,
  modalPreviewImageElement,
  modalPreviewImageCaption,
  profilAddModal,
  profileCloseModal,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  addModalButton,
  addModalCloseButton,
  cardsAddForm,
  cardListEl,
  cardTemplate,
  previewModal,
  previewCloseModal,
  editFormElemenet,
  addFormElemenet,
  editAvatarForm,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import UserInfo from "../components/Userinfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopUpWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupConfirmDelete from "../components/PopupConfirmDelete.js";

//Api

const api = new Api(
  {
    authorization: "bff8b87e-a382-4d74-a0e3-283e72485a06",
    "Content-Type": "application/json",
  },
  "https://around-api.en.tripleten-services.com/v1"
);
/* Class Instances */

let section; // undefined

api
  .getUserInfo()
  .then((data) => {
    console.log(data); ///take this out this was to make sure right thing was being called
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setAvatar(data.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getInitialCards()
  .then((result) => {
    section = new Section(
      {
        items: result,
        renderer: (cardData) => {
          const cardElement = createCard(cardData);
          section.addItem(cardElement);
          //renderCard(cardData);
        },
      },
      ".cards__list"
    );
    section.renderItems();
    console.log(result);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

function handleEditProfileSubmit(inputValues) {
  /*userInfo.setUserInfo(inputValues.name, inputValues.about);*/
  profileEditPopup.renderLoading(true);
  api
    .updateProfileInfo(inputValues.name, inputValues.about)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
      editFormValidator.disableButton();
      profileEditPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileEditPopup.renderLoading(false);
    });
}
function handleAddCardSubmit(inputValues) {
  /*const newCard = getCardElement({ name, link });*/
  const cardData = { name: inputValues.title, link: inputValues.description };
  newCardPopup.renderLoading(true);

  api
    .createNewCard({ name: cardData.name, link: cardData.link })
    .then((data) => {
      const cardElement = createCard(data);
      section.addItem(cardElement);
      newCardPopup.close();
      addFormValidator.disableButton();
      newCardPopup.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newCardPopup.renderLoading(false);
      /*addFormValidator.toggleButtonState();*/
    });
}

const deleteCardModal = new PopupConfirmDelete("#delete-card-modal");
deleteCardModal.setEventListeners();

function handleDeleteCard(card) {
  deleteCardModal.open();
  deleteCardModal.setConfirmDelete(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        deleteCardModal.close();
        card.remove();
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
      });
  });
}

function handleCardLike(card) {
  if (card.isLiked) {
    api
      .dislikeCard(card._id)
      .then(() => {
        card.updateIsLiked();
      })
      .catch((error) => console.error("Error deleting card:", error));
  } else {
    api
      .likeCard(card._id)
      .then(() => {
        card.updateIsLiked(true);
      })
      .catch((error) => console.error("Error deleting card:", error));
  }
}

const popupImage = new PopUpWithImage({
  popupSelector: "#preview-modal",
});
popupImage.setEventListeners();

const newCardPopup = new PopupWithForm({
  popupSelector: "#profile-add-modal",
  handleFormSubmit: handleAddCardSubmit,
});
newCardPopup.setEventListeners();

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleEditProfileSubmit,
});

const avatarEditModal = new PopupWithForm({
  popupSelector: "#edit-avatar-modal",
  handleFormSubmit: handleAvatarSubmit,
});

//Profile creation and editing

const profileAvatar = document.querySelector(".profile__image-container");

profileAvatar.addEventListener("click", () => avatarEditModal.open());

avatarEditModal.setEventListeners();

function handleAvatarSubmit({ link }) {
  avatarEditModal.renderLoading(true);

  api
    .updateAvatar(link)
    .then(() => {
      userInfo.setAvatar(link);
      /*editAvatarFormValidator.disableButton();*/
      avatarEditModal.close();
    })
    .catch((err) => {
      console.error("Error updating avatar:", err);
    })
    .finally(() => {
      avatarEditModal.renderLoading(false);
    });
}

//FORM VALIDATION
const editFormValidator = new FormValidator(
  validationSettings,
  editFormElemenet
);
const addFormValidator = new FormValidator(validationSettings, addFormElemenet);

const editAvatarFormValidator = new FormValidator(
  validationSettings,
  editAvatarForm
);

editAvatarFormValidator.enableValidation();
editFormValidator.enableValidation();
addFormValidator.enableValidation();
profileEditPopup.setEventListeners();

function handleImageClick(data) {
  popupImage.open(data);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleCardLike
    /*handleCardDisLike*/
  );
  const cardElement = card.getView();
  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileTitleInput.value = data.name;
  profileDescriptionInput.value = data.about;
  profileEditPopup.open();
});

addModalButton.addEventListener("click", () =>
  newCardPopup.open(profilAddModal)
);
