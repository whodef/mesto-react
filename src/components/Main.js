import '../index.css';
import {useState, useEffect} from 'react';
import api from '../utils/api';
import Card from './Card';

const Main = (props) => {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');

    useEffect(() => {
        api.getUserData()
            .then(res => {
                setUserName(res.name)
                setUserDescription(res.about)
                setUserAvatar(res.avatar)
            })
            .catch(res => {
                console.error(`Error:${res}`);
            })
    }, []);

    const [cards, setCards] = useState([]);
    useEffect(() => {
            api.getCards()
                .then(res => {
                    setCards(res)
                })
                .catch(res => {
                    console.error(`Error:${res}`);
                })
        }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                    <img className="profile__image" src={userAvatar} alt="Аватар"/>
                    <span className="profile__icon"/>
                </div>
                <div className="profile__indication">
                    <div className="profile__caption">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__change-button" type="button" aria-label="Изменить"
                                onClick={props.onEditProfile}/>
                    </div>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить" onClick={props.onAddPlace}/>
            </section>

            <section className="card">
                <ul className="card__list">
                    {/* Здесь добавляется template для карточек */}
                    {cards.map((item) => (
                        <Card key={item._id} dataCards={item} onClick={props.onCardClick}/>
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
