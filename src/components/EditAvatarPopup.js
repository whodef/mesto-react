import {useRef, useContext} from 'react';
import {currentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = (props) => {
    // Подписка на контекст
    const currentUser = useContext(currentUserContext);

    // Использование Рефа
    const avatarRef = useRef('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onEditAvatar({
            link: avatarRef.current.value,
        })
    }

    return (
        <currentUserContext.Provider value={currentUser}>
            <PopupWithForm className="overlay" id="overlay-avatar" name="popup_change-avatar" title="Обновить аватар"
                           submitText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
                <div className="overlay__form-input-set">
                    <input className="overlay__form-input overlay__form-input_type_ext" id="avatar-url-input"
                           name="input-avatar" type="url" placeholder="Ссылка на картинку" ref={avatarRef} required/>
                    <span className="overlay__form-error overlay__form-error_visible" id="avatar-url-input-error"/>
                </div>
            </PopupWithForm>
        </currentUserContext.Provider>
    )
}

export default EditAvatarPopup;