import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

export default function Start({ setLoggedIn }) {
  return (
    <>
      <img src="/background.svg" className="background" alt="" />

      <Routes>
        <Route path="/" element={<Auth setLoggedIn={setLoggedIn} />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
}

function Register() {
  return (
    <form className="form">
      <h1 className="form__title">Create account</h1>
      <div className="form__body">
        <div className="form__item">
          <label htmlFor="email" className="form__label">
            e-mail
          </label>
          <input className="form__input" type="text" name="mail" id="email" />
        </div>
        <div className="form__item">
          <label htmlFor="nick" className="form__label">
            nickname
          </label>
          <input className="form__input" type="text" name="nick" id="nick" />
        </div>
        <div className="form__item">
          <label htmlFor="name" className="form__label">
            name
          </label>
          <input className="form__input" type="text" name="name" id="name" />
        </div>
        <div className="form__item">
          <label htmlFor="password" className="form__label">
            password
          </label>
          <input
            className="form__input"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="form__item">
          <label htmlFor="password" className="form__label">
            password
          </label>
          <input
            className="form__input"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <fieldset className="form__item">
          <legend className="form__label">date of birth</legend>
          <div className="form__inputs-group">
            <select name="date" className="form__input">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
            <select name="month" className="form__input">
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="july">July</option>
              <option value="august">August</option>
              <option value="september">September</option>
              <option value="oktober">Oktboer</option>
              <option value="november">November</option>
              <option value="december">December</option>
            </select>
            <input type="month" className="form__input" />
          </div>
        </fieldset>
        <button className="form__button" type="submit">
          Continue
        </button>
      </div>
    </form>
  );
}

function Auth({ setLoggedIn }) {
  const [isErorrOccured, setIsErorrOccured] = useState(false);

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
      console.log(res);
      setLoggedIn(res.ok);
      setIsErorrOccured(!res.ok);
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="form__title">Welcome back!</h1>
      <p className="form__caption">We're so excited to see you again!</p>
      <div className="form__body">
        <div className="form__item">
          <label
            className={`form__label ${isErorrOccured ? 'error' : ''}`}
            htmlFor="email"
          >
            Email{' '}
            {isErorrOccured && (
              <span className="message">- Login or password is invalid</span>
            )}
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
          <label
            className={`form__label ${isErorrOccured ? 'error' : ''}`}
            htmlFor="password"
          >
            Password{' '}
            {isErorrOccured && (
              <span className="message">- Login or password is invalid</span>
            )}
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
            <Link to="register" className="form__link">
              Register
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
}
