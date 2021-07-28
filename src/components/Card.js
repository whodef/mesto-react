import React from 'react';

const Card = (props) => {
    const handleCardClick = () => {
        props.onClick(props.dataCards);
    }

    return (
        <li className="card__item">
            <img className="card__image" src={props.dataCards.link} alt={props.name} onClick={handleCardClick}/>
            <button className="card__delete-button" type="button" aria-label="Удалить"/>
            <div className="card__description">
                <h2 className="card__description-title">{props.dataCards.name}</h2>
                <div className="card__description-like-container">
                    <button className="card__like-button" type="button" aria-label="Нравится"/>
                    <span className="card__like-counter">{props.dataCards.likes.length}</span>
                </div>
            </div>
        </li>
    );
}

export default Card;