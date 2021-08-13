import {useRef, useState} from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = (props) => {
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
        <PopupWithForm className="overlay" name="popup_add-cards" title="Новое место" submitText="Создать"
                       isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleAddPlaceSubmit}>
            <div className="overlay__form-input-set">
                <input className="overlay__form-input overlay__form-input_type_name" type="text" name="input-name-card"
                       placeholder="Название" minLength="2" maxLength="50" value={name}
                       onChange={handleChange} required/>
                <span className="overlay__form-error overlay__form-error_visible"/>
            </div>
            <div className="overlay__form-input-set">
                <input className="overlay__form-input overlay__form-input_type_ext" type="url" name="input-image-url"
                       placeholder="Ссылка на картинку" ref={link} required/>
                <span className="overlay__form-error overlay__form-error_visible"/>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;