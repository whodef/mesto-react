import './index.css';
import logo from './images/logo.svg';
import avatar from './images/avatar.jpg';

const App = () => {
    return (
        <div className="page">
            <header className="header">
                <img className="header__logo" src={logo} alt={"Mesto Russia"}/>
            </header>

            <main className="content">
                <section className="profile">
                    <div className="profile__avatar-container">
                        <img className="profile__image" src={avatar} alt={"Изображение Жака-Ива Кусто"}/>
                        <span className="profile__icon"/>
                    </div>
                    <div className="profile__indication">
                        <div className="profile__caption">
                            <h1 className="profile__name">Жак-Ив Кусто</h1>
                            <button className="profile__change-button" id="change-profile" type="button"
                                    aria-label="Изменить"/>
                        </div>
                        <p className="profile__description">Исследователь океана</p>
                    </div>
                    <button className="profile__add-button" id="add-new-card" type="button" aria-label="Добавить"/>
                </section>

                <section className="card">
                    <ul className="card__list">
                        {/* Добавлен <template> */}
                    </ul>
                </section>
            </main>

            <footer className="footer">
                <p className="footer__copyright">&copy;2021 Mesto Russia</p>
            </footer>

            {/* Шаблон для отображения карточек .card__list */}
            <template id="card-template">
                <li className="card__item">
                    <img className="card__image" src="#" alt="Сгенерированное описание"/>
                    <button className="card__delete-button" type="button" aria-label="Удалить"/>
                    <div className="card__description">
                        <h2 className="card__description-title">Новое место</h2>
                        <div className="card__description-like-container">
                            <button className="card__like-button" type="button" aria-label="Нравится"/>
                            <span className="card__like-counter">0</span>
                        </div>
                    </div>
                </li>
            </template>

            {/* Всплывающее окно для cards */}
            <div className="overlay" id="image-overlay">
                <figure className="overlay__image-container">
                    <button className="overlay__close-button" type="button" aria-label="Закрыть"/>
                    <img className="overlay__image" src="#" alt="#"/>
                    <figcaption className="overlay__image-caption"/>
                </figure>
            </div>

            {/* Всплывающее окно для изменений в профиле */}
            <div className="overlay" id="change-profile-overlay">
                <fieldset className="overlay__container">
                    <button className="overlay__close-button" type="button" aria-label="Закрыть"/>
                    <h2 className="overlay__title">Редактировать профиль</h2>
                    <form className="overlay__form" action="#" name="overlay-form-profile" noValidate>
                        <div className="overlay__form-input-set">
                            <input className="overlay__form-input overlay__form-input_type_name" id="edit-name"
                                   type="text"
                                   name="input-name-profile" placeholder="Имя" minLength="2" maxLength="30"
                                   required/>
                            <span className="overlay__form-error overlay__form-error_visible" id="edit-name-error"/>
                        </div>
                        <div className="overlay__form-input-set">
                            <input className="overlay__form-input overlay__form-input_type_ext"
                                   id="edit-description" type="text"
                                   name="input-description-profile" placeholder="Вид деятельности"
                                   minLength="5" maxLength="100" required/>
                            <span className="overlay__form-error overlay__form-error_visible"
                                  id="edit-description-error"/>
                        </div>
                        <button className="overlay__save-button" type="submit">Сохранить</button>
                    </form>
                </fieldset>
            </div>

            {/* Всплывающее окно для изменений для добавления карточек */}
            <div className="overlay" id="new-card-overlay">
                <fieldset className="overlay__container">
                    <button className="overlay__close-button" type="button" aria-label="Закрыть"/>
                    <h2 className="overlay__title">Новое место</h2>
                    <form className="overlay__form" action="#" name="overlay-form-card" noValidate>
                        <div className="overlay__form-input-set">
                            <input className="overlay__form-input overlay__form-input_type_name" id="card-title"
                                   type="text"
                                   name="input-name-card" value="" placeholder="Название" minLength="2"
                                   maxLength="50" required/>
                            <span className="overlay__form-error overlay__form-error_visible"
                                  id="card-title-error"/>
                        </div>
                        <div className="overlay__form-input-set">
                            <input className="overlay__form-input overlay__form-input_type_ext" id="card-url"
                                   type="url"
                                   name="input-image-url" value="" placeholder="Ссылка на картинку" required/>
                            <span className="overlay__form-error overlay__form-error_visible" id="card-url-error"/>
                        </div>
                        <button className="overlay__save-button" type="submit" disabled>Создать</button>
                    </form>
                </fieldset>
            </div>

            {/* Улучшенный UX для принятия решения */}
            <div className="overlay" id="overlay-with-submit">
                <fieldset className="overlay__container overlay__container_confirm">
                    <button className="overlay__close-button" type="button" id="popup-submit-close"/>
                    <form className="overlay__form" id="form-submit" name="overlay-confirm" action="#" noValidate>
                        <h2 className="overlay__title">Вы уверены?</h2>
                        <button className="overlay__save-button overlay__save-button_confirm" id="save"
                                type="submit">Да
                        </button>
                    </form>
                </fieldset>
            </div>

            {/* Всплывающее окно для обновления аватара в профиле */}
            <div className="overlay" id="overlay-avatar">
                <fieldset className="overlay__container overlay__container_avatar">
                    <button className="overlay__close-button" type="button" id="popup-avatar-close"/>
                    <form className="overlay__form" action="#" id="form-avatar" name="form-avatar" noValidate>
                        <div className="overlay__form-input-set">
                            <h2 className="overlay__title">Обновить аватар</h2>
                            <input className="overlay__form-input overlay__form-input_type_ext"
                                   id="avatar-url-input"
                                   name="input-avatar" type="url" value="" placeholder="Ссылка на картинку"
                                   required/>
                            <span className="overlay__form-error overlay__form-error_visible"
                                  id="avatar-url-input-error"/>
                            <button className="overlay__save-button overlay__save-button_avatar"
                                    type="submit">Сохранить
                            </button>
                        </div>
                    </form>
                </fieldset>
            </div>
        </div>
    );
}

export default App;
