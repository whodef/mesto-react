import '../index.css';
import {useState, useEffect} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';

const App = () => {
    // Для получения данных пользователя, данных карточек
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    // Для выбора карточки
    const [selectedCard, setSelectedCard] = useState({});

    // Для открытия-закрытия всплывающих окон
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [isConfirm, setConfirm] = useState(false);

    // Асинхронное получение данных пользователя
    useEffect(() => {
        Promise.all([api.getUserData(), api.getCards()])
            .then(([user, cards]) => {
                setCurrentUser(user);
                setCards(cards);
            })
            .catch(err => console.error(err));
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

    // Обработчики для работы с API
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
        api.setProfileInfo(data.name, data.about)
            .then(user => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch(err => console.error(err));
    }

    const handleAddPlaceSubmit = (data) => {
        api.addCard(data.name, data.link)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.error(err));
    }

    const handleUpdateAvatar = (data) => {
        api.setUserAvatar(data.link)
            .then(user => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch(err => console.error(err));
    }

    // Закрытие всплывающих окон
    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setImagePopupOpen(false);
        setConfirm(false);
        setSelectedCard({});
    }

    // Реализация открытия-закрытия по 'Esc'
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
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header/>
                <Main
                    cards={cards}
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
                <ConfirmPopup
                    isOpen={isConfirm}
                    onClose={closeAllPopups}
                    onSubmit={handleDeleteCard}
                    card={selectedCard}
                />

                <ImagePopup
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                    card={selectedCard}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
