import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { useState, useRef } from 'react';
import { Link, Routes, Route, Form } from 'react-router-dom';

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
  const inputRef = useRef();

  function showOptions() {
    console.log(inputRef);
  }

  const monthList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'Oktober',
    'November',
    'December',
  ];

  function createOrderedIntegerArray(min, max, arr) {
    for (let num = min; num <= max; num++) {
      arr.push(String(num));
    }
  }

  const dateList = [];
  createOrderedIntegerArray(1, 31, dateList);

  const yearList = [];
  createOrderedIntegerArray(1970, 2024, yearList);
  yearList.reverse();

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

        <fieldset className="form__item">
          <legend className="form__label">date of birth</legend>
          <div className="form__inputs-group">
            <FormSelect optionsList={monthList} placeholder={'Month'} />

            <FormSelect optionsList={dateList} placeholder={'Day'} />

            <FormSelect optionsList={yearList} placeholder={'Year'} />
          </div>
        </fieldset>

        <button className="form__button" type="submit">
          Continue
        </button>
      </div>
    </form>
  );
}

function FormSelect({ optionsList, placeholder }) {
  const [options, setOptins] = useState(optionsList);
  const inputRef = useRef();
  const optionsRef = useRef();

  function showOptions() {
    const input = inputRef.current;
    const options = optionsRef.current;

    input.focus();

    const prevOptions = document.querySelector('.form__options-list.active');
    prevOptions?.classList.remove('active');
    options.classList.add('active');
  }

  function filterOptions() {
    const optionsElement = optionsRef.current;
    const input = inputRef.current;

    const newOptions = options.filter((item) => item.includes(input.value));

    setOptins(newOptions);

    console.log(options);
  }

  return (
    <div className="form__select" onClick={showOptions}>
      <ul className="form__options-list" ref={optionsRef}>
        {options.map((item) => (
          <li>{item}</li>
        ))}
      </ul>

      <input
        type="text"
        ref={inputRef}
        placeholder={placeholder}
        onKeyUp={filterOptions}
      />
      <FontAwesomeIcon icon={faChevronDown} />
    </div>
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
      if (!element.matches('.form__input')) continue;
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
