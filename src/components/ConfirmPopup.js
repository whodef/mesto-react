import PopupWithForm from './PopupWithForm';

 // Таки пришлось вынести в отдельный компонент ради preventDefault(), это оказалось более оптимальным решением
const ConfirmPopup = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(props.card);
    }

    return (
        <PopupWithForm className="overlay" name="popup_confirm" title="Вы уверены?"
                       isOpen={props.isOpen} submitText="Да" onClose={props.onClose} onSubmit={handleSubmit}
        />
    )
}

export default ConfirmPopup;