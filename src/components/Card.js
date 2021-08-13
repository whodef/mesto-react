import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const Card = (props) => {
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // Вынос повторяющегося кода в переменную для лаконичности
    const card = props.card;

    // Определяется владелец текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Переменная, которая задаётся позже в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
    );

    // Определить, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Переменная, которая задаётся позже в `className` для кнопки удаления
    const cardLikeButtonClassName = `${isLiked ? 'card__like-button_active' : 'card__like-button_inactive'}`;

    // Обработчики
    const handleCardClick = () => {
        props.onCardClick(card);
    }

    const handleLikeClick = () => {
        props.onLikeClick(card);
    }

    const handleDeleteClick = () => {
        props.onDeleteClick(card);
    }

    return (
            <li className="card__item">
                <img className="card__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
                <button className={`card__delete-button ${cardDeleteButtonClassName}`} type="button"
                        aria-label="Удалить" onClick={handleDeleteClick}/>
                <div className="card__description">
                    <h2 className="card__description-title">{card.name}</h2>
                    <div className="card__description-like-container">
                        <button className={`card__like-button ${cardLikeButtonClassName}`} type="button"
                                aria-label="Нравится" onClick={handleLikeClick}/>
                        <span className="card__like-counter">{card.likes.length}</span>
                    </div>
                </div>
            </li>
    );
}

export default Card;