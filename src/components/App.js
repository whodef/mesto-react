import '../index.css';
import {useState, useEffect} from 'react';
import {currentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

const App = () => {
    // Для получения данных пользователя, данных карточек
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const [selectedCard, setSelectedCard] = useState({});

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);

    const [isConfirm, setConfirm] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            api.getUserData()
                .then(user => setCurrentUser(user)),
            api.getCards()
                .then(cards => setCards(cards))
                .catch(err => console.error(err))
        ])
            .then(() => setIsLoaded(true))
    }, []);

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setImagePopupOpen(true);
    }

    const handleConfirm = (card) => {
        setSelectedCard(card);
        setConfirm(true);
    }

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => console.error(err));
    }

    const handleDeleteCard = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
                closeAllPopups();
            })
            .catch(err => console.error(err));
    }

    const handleUpdateUser = (data) => {
        api.setProfileInfo(data)
            .then(user => {
                setCurrentUser(user);
                closeAllPopups();
            })
    }

    const handleAddPlaceSubmit = (data) => {
        api.addCard(data)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
    }

    const handleUpdateAvatar = (link) => {
        api.setUserAvatar(link)
            .then(user => {
                setCurrentUser(user);
                closeAllPopups();
            })
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
        <currentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header/>
                <Main
                    cards={cards}
                    isLoaded={isLoaded}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onLikeClick={handleCardLike}
                    onDeleteClick={handleConfirm}
                />
                <Footer/>

                {/* Всплывающее окно для изменений в профиле */}
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                {/* Всплывающее окно для изменений для добавления карточек */}
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onUpdatePlace={handleAddPlaceSubmit}
                />

                {/* Всплывающее окно для обновления аватара */}
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onEditAvatar={handleUpdateAvatar}
                />

                {/* Всплывающее окно для принятия решения */}
                <PopupWithForm className="overlay" id="overlay-with-submit" name="popup_confirm" title="Вы уверены?"
                               isOpen={isConfirm} onConfirmClick={handleConfirm} submitText="Да"
                               onClose={closeAllPopups} onConfirm={handleDeleteCard}/>

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                    isOpen={isImagePopupOpen}
                />
            </div>
        </currentUserContext.Provider>
    );
}

export default App;
