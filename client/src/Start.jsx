export default function Start() {
  return (
    <>
      <img src="background.svg" className="background" alt="" />
      <Auth setIsLogged={loggedIn}></Auth>
    </>
  );
}


function Auth({ setIsLogged }) {
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
      setIsLogged(res.ok);
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
            <a href="" className="form__link">
              Register
            </a>
          </span>
        </div>
      </div>
    </form>
  );
}