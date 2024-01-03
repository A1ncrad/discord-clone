import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { faShop } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';


export default function App() {
	const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      {(isLogged && (
        <div className="container">
          <Sidebar></Sidebar>
          <Main></Main>
        </div>
      )) || (
        <>
          <img src="background.svg" className="background" alt="" />
          <Auth setIsLogged={setIsLogged}></Auth>
        </>
      )}
    </>
  );
}

function Main() {
  return <main className="main"></main>;
}

function Sidebar() {

  return (
    <aside className="sidebar">
      <Scroller></Scroller>
      <Body></Body>
    </aside>
  );
}

function Body() {
  return (
    <div className="sidebar__body">
      <form className="sidebar__search">
        <input type="search" placeholder="Search" />
      </form>

      <button className="sidebar__button active">
        <FontAwesomeIcon className="icon" icon={faPerson}></FontAwesomeIcon>
        <span>Friends</span>
      </button>

      <button className="sidebar__button">
        <FontAwesomeIcon className="icon" icon={faShop}></FontAwesomeIcon>
        <span>Shop</span>
      </button>
    </div>
  );
}

function Scroller() {
  return (
    <div className="sidebar__scroller scroller">
      <Tile icon={faDiscord} className="scroller__tile active"></Tile>
      <Tile
        className="scroller__tile scroller__tile--green"
        icon={faPlus}
      ></Tile>
      <Tile
        className="scroller__tile scroller__tile--green"
        icon={faCompass}
      ></Tile>
    </div>
  );
}

function Tile({ icon, className }) {
  function handleClick(e) {
    document.querySelector('.scroller__tile.active').classList.remove('active');
    e.currentTarget.classList.add('active');
  }

  return (
    <button className={className} onClick={handleClick}>
      <FontAwesomeIcon icon={icon} className="icon"></FontAwesomeIcon>
    </button>
  );
}

function Auth({ setIsLogged }) {
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const data = {};

    // const data = [...form.elements].filter(element => {
    // 	return element.matches("input");
    // }).map(element => ( {[element.name]: element.value} ) );

    for (const element of form.elements) {
      if (!element.matches('input')) continue;
      data[element.name] = element.value;
    }

    fetch('http://127.0.0.1:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      setIsLogged(res.ok);
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="form__title">Welcome back!</h1>
      <p className="form__caption">We're so excited to see you again!</p>
      <div className="form__body">
        <div className="form__item">
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            name="mail"
            id="email"
            required
            className="form__input"
          />
        </div>
        <div className="form__item">
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            autoComplete="current-password"
            className="form__input"
          />
          <a href="" className="form__link">
            Forgot your password?
          </a>
        </div>
        <div className="form__item">
          <button className="form__button" type="submit">
            Log In
          </button>
          <span className="form__text">
            Need an account?{' '}
            <a href="" className="form__link">
              Register
            </a>
          </span>
        </div>
      </div>
    </form>
  );
}
