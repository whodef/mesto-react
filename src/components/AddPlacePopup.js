import {useRef, useState, useContext} from 'react';
import {currentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = (props) => {
    // Подписка на контекст
    const currentUser = useContext(currentUserContext);

    // Использование Рефа
    const link = useRef('');

    const [name, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleAddPlaceSubmit = (e) => {
        e.preventDefault();
        props.onUpdatePlace({
            name,
            link: link.current.value
        });

        // Сбрасывание значений инпутов, правда корявое
        setName('');
        link.current.value = '';
    }

    return (
        <currentUserContext.Provider value={currentUser}>
            <PopupWithForm className="overlay" id="new-card-overlay" name="popup_add-cards" title="Новое место"
                           submitText="Создать" isOpen={props.isOpen} onClose={props.onClose}
                           onSubmit={handleAddPlaceSubmit}>
                <div className="overlay__form-input-set">
                    <input className="overlay__form-input overlay__form-input_type_name" id="card-title" type="text"
                           name="input-name-card" placeholder="Название" minLength="2" maxLength="50" value={name}
                           onChange={handleChange} required/>
                    <span className="overlay__form-error overlay__form-error_visible" id="card-title-error"/>
                </div>
                <div className="overlay__form-input-set">
                    <input className="overlay__form-input overlay__form-input_type_ext" id="card-url" type="url"
                           name="input-image-url" placeholder="Ссылка на картинку" ref={link} required/>
                    <span className="overlay__form-error overlay__form-error_visible" id="card-url-error"/>
                </div>
            </PopupWithForm>
        </currentUserContext.Provider>
    )
}

export default AddPlacePopup;