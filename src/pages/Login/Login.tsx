import { useState } from 'react';
import logo from '../../images/logo-recipes-app.svg';
import tomate from '../../images/tomate.svg';

const INITIAL_VALUES_FORM_LOGIN = {
  email: '',
  password: '',
};

function Login() {
  const [formData, setFormData] = useState(INITIAL_VALUES_FORM_LOGIN);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <img src={ logo } alt="logo do site" />
      <img src={ tomate } alt="foto tomate" />
      <div>
        <h1>Login</h1>
        <form>
          <input
            type="email"
            placeholder="Email"
            value={ formData.email }
            onChange={ handleChange }
            name="email"
            id="email"
            data-testid="email-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={ formData.password }
            onChange={ handleChange }
            name="password"
            id="password"
            data-testid="password-input"
          />
          <button data-testid="login-submit-btn">Enter</button>
        </form>
      </div>
    </div>
  );
}

export { Login };
