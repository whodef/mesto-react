import '../index.css';
import {useState, useEffect} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";

const App = () => {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }
    const [selectedCard, setSelectedCard] = useState({});
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const handleCardClick = (card) => {
        setSelectedCard(card);
        setImagePopupOpen(true);
    }

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const [isConfirm, setConfirm] = useState(false);
    const handleConfirm = () => {
        setConfirm(true);
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setImagePopupOpen(false);
        setConfirm(false);
        setSelectedCard({});
    }

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                closeAllPopups();
            }
        };

        if (isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isConfirm) {
            window.addEventListener('keyup', handleEsc);
        }

        return () => window.removeEventListener('keyup', handleEsc);

    }, [isEditProfilePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen, isImagePopupOpen, isConfirm]);

    return (
        <div className="page">
            <Header/>
            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
            />
            <Footer/>

            {/* Всплывающее окно для изменений в профиле */}
            <PopupWithForm className="overlay" id="change-profile-overlay" name="popup_profile"
                           title="Редактировать профиль" submitText="Сохранить" isOpen={isEditProfilePopupOpen}
                           onClose={closeAllPopups}>
                <div className="overlay__form-input-set">
                    <input className="overlay__form-input overlay__form-input_type_name" id="edit-name" type="text"
                           name="input-name-profile" placeholder="Имя" minLength="2" maxLength="30" required/>
                    <span className="overlay__form-error overlay__form-error_visible" id="edit-name-error"/>
                </div>
                <div className="overlay__form-input-set">
                    <input className="overlay__form-input overlay__form-input_type_ext" id="edit-description"
                           type="text" name="input-description-profile" placeholder="Вид деятельности" minLength="5"
                           maxLength="100" required/>
                    <span className="overlay__form-error overlay__form-error_visible" id="edit-description-error"/>
                </div>
            </PopupWithForm>

            {/* Всплывающее окно для изменений для добавления карточек */}
            <PopupWithForm className="overlay" id="new-card-overlay" name="popup_add-cards" title="Новое место"
                           submitText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                <div className="overlay__form-input-set">
                    <input className="overlay__form-input overlay__form-input_type_name" id="card-title" type="text"
                           name="input-name-card" placeholder="Название" minLength="2" maxLength="50" required/>
                    <span className="overlay__form-error overlay__form-error_visible" id="card-title-error"/>
                </div>
                <div className="overlay__form-input-set">
                    <input className="overlay__form-input overlay__form-input_type_ext" id="card-url" type="url"
                           name="input-image-url" placeholder="Ссылка на картинку" required/>
                    <span className="overlay__form-error overlay__form-error_visible" id="card-url-error"/>
                </div>
            </PopupWithForm>

            {/* Всплывающее окно для обновления аватара в профиле */}
            <PopupWithForm className="overlay" id="overlay-avatar" name="popup_change-avatar" title="Обновить аватар"
                           submitText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                <div className="overlay__form-input-set">
                    <input className="overlay__form-input overlay__form-input_type_ext" id="avatar-url-input"
                           name="input-avatar" type="url" placeholder="Ссылка на картинку" required/>
                    <span className="overlay__form-error overlay__form-error_visible" id="avatar-url-input-error"/>
                </div>
            </PopupWithForm>

            {/* Всплывающее окно для принятия решения */}
            <PopupWithForm className="overlay" id="overlay-with-submit" name="popup_confirm" title="Вы уверены?"
                           isOpen={isConfirm} onConfirmClick={handleConfirm} submitText="Да" onClose={closeAllPopups}/>

            <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>
        </div>
    );
}

export default App;
