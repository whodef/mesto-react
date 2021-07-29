import '../index.css';

const PopupWithForm = (props) => {
    return (
        <section className={`overlay overlay_type_${props.name} ${props.isOpen ? 'overlay_open' : ''}`}>
            <fieldset className="overlay__container">
                <h2 className="overlay__title">{props.title}</h2>
                <button className="overlay__close-button" type="button" onClick={props.onClose}/>
                <form className="overlay__form" action="#" name={props.name} onSubmit={props.onSubmit} method="POST">
                    {props.children}
                    <button className="overlay__save-button" id="save" type="submit" name={props.name}>
                        {props.submitText}
                    </button>
                </form>
            </fieldset>
        </section>
    );
}

export default PopupWithForm;