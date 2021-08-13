import {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = (props) => {
    // Использование Рефа
    const avatarRef = useRef('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onEditAvatar({
            link: avatarRef.current.value,
        })
    };

    return (
        <PopupWithForm className="overlay" name="popup_change-avatar" title="Обновить аватар" submitText="Сохранить"
                       isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <div className="overlay__form-input-set">
                <input className="overlay__form-input overlay__form-input_type_ext" name="input-avatar" type="url"
                       placeholder="Ссылка на картинку" ref={avatarRef} required/>
                <span className="overlay__form-error overlay__form-error_visible"/>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;