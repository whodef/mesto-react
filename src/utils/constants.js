export const overlayConfig = {
    overlayOpened: 'overlay_open',
    overlayCloseButton: '.overlay__close-button'
}

export const cardConfig = {
    cardTemplate: '#card-template',
    cardListSection: '.card__list',
    cardListItem: '.card__item',
    cardTitle: '.card__description-title',
    cardImage: '.card__image',
    cardRemoveButton: '.card__delete-button',
    cardLikeButton: '.card__like-button',
    cardLikeButtonActive: 'card__like-button_active',
    likeCounter: '.card__like-counter'
};

export const newCardPopupConfig = {
    newCardOverlaySelector: '#new-card-overlay',
    newCardForm: document.querySelector('.overlay__form[name = overlay-form-card]')
}

export const overlayWithImageConfig = {
    overlayImageSelector: '#image-overlay',
    imageOverlay: '.overlay__image',
    imageCaption: '.overlay__image-caption'
}

export const formConfig = {
    formSelector: '.overlay__form',
    inputSelector: '.overlay__form-input',
    buttonSelector: '.overlay__save-button',
    buttonMode: '.overlay__save-button',
    inputErrorMode: 'overlay__form-input_set',
    errorMode: 'overlay__form-error_visible'
};

export const avatarPopupConfig = {
    popupSelector: '#overlay-avatar',
    formAvatar: document.querySelector('.overlay__form[name = form-avatar]'),
    urlInput: document.querySelector('.overlay__form-input[name = input-avatar]')
}

export const profilePopupConfig = {
    profileOverlaySelector: '#change-profile-overlay',
    profileForm: document.querySelector('.overlay__form[name = overlay-form-profile]'),
    userNameInput: document.querySelector('.overlay__form-input[name = input-name-profile]'),
    userAboutInput: document.querySelector('.overlay__form-input[name = input-description-profile]')
}

export const profileConfig = {
    userNameSelector: '.profile__name',
    userCaptionSelector: '.profile__description',
    userAvatarSelector: '.profile__image'
}

export const confirmPopupConfig = {
    confirmPopupSelector: '#overlay-with-submit'
}

export const editAvatarPopupConfig = {
    popupSelector: '#overlay-avatar',
    popupCloseBtnSelector: '.overlay__close-button',
    formSelector: '.overlay__form-input-set',
    formInputSelector: '.overlay__form-input',
    submitButtonSelector: '.overlay__save-button'
}

export const changeProfileAvatar = document.querySelector('.profile__avatar-container');

export const changeProfileButton = document.querySelector('.profile__change-button');

export const addCardButton = document.querySelector('.profile__add-button');