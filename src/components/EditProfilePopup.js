import {useContext, useEffect, useState} from 'react';
import {currentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = (props) => {
    // Подписка на контекст
    const currentUser = useContext(currentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // После загрузки текущего пользователя из API, его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser]);

    const handleChange = (e) => {
        e.target.name === 'input-name-profile' ? setName(e.target.value) : setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description
        });
    }

    return (
        <currentUserContext.Provider value={currentUser}>
            <PopupWithForm className="overlay" id="change-profile-overlay" name="popup_profile"
                           title="Редактировать профиль" submitText="Сохранить"
                           isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
                <div className="overlay__form-input-set">
                    <input className="overlay__form-input overlay__form-input_type_name" id="edit-name" type="text"
                           name="input-name-profile" placeholder="Имя" minLength="2" maxLength="30"
                           value={name} onChange={handleChange} required/>
                    <span className="overlay__form-error overlay__form-error_visible" id="edit-name-error"/>
                </div>
                <div className="overlay__form-input-set">
                    <input className="overlay__form-input overlay__form-input_type_ext" id="edit-description"
                           type="text" name="input-description-profile" placeholder="Вид деятельности"
                           minLength="5" maxLength="100" value={description} onChange={handleChange} required/>
                    <span className="overlay__form-error overlay__form-error_visible" id="edit-description-error"/>
                </div>
            </PopupWithForm>
        </currentUserContext.Provider>
    )
}

export default EditProfilePopup;