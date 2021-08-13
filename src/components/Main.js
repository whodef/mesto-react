import '../index.css';
import {useContext} from 'react';
import {currentUserContext} from '../contexts/CurrentUserContext';
import Card from './Card';

const Main = (props) => {
    // Подписка на контекст
    const currentUser = useContext(currentUserContext);

    return (
        <currentUserContext.Provider value={currentUser}>
            <main className="content">
                <section className="profile">
                    <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                        <img className="profile__image" src={currentUser.avatar} alt="Аватар"/>
                        <span className="profile__icon"/>
                    </div>
                    <div className="profile__indication">
                        <div className="profile__caption">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="profile__change-button" type="button" aria-label="Изменить"
                                    onClick={props.onEditProfile}/>
                        </div>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                    <button className="profile__add-button" type="button" aria-label="Добавить"
                            onClick={props.onAddPlace}/>
                </section>

                <section className="card">
                    <ul className="card__list">
                        {/* Здесь добавляется template для карточек */}
                        {props.cards.map(item => (
                            <Card key={item._id} card={item} onCardClick={props.onCardClick}
                                  onLikeClick={props.onLikeClick} onDeleteClick={props.onDeleteClick}
                            />
                        ))}
                    </ul>
                </section>
            </main>
        </currentUserContext.Provider>
    );
}

export default Main;
