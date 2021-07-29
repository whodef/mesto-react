const ImagePopup = (props) => {
    return (
        <section className={`overlay overlay_type_${props.name} ${props.isOpen ? 'overlay_open' : ''}`}>
            <figure className="overlay__image-container" action="#" method="POST">
                <button className="overlay__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}/>
                <img className="overlay__image" src={props.card.link} alt={props.card.name}/>
                <figcaption className="overlay__image-caption">{props.card.name}</figcaption>
            </figure>
        </section>
    );
}

export default ImagePopup;