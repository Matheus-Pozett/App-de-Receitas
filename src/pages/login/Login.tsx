import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components';

const INITIAL_FORM_LOGIN = {
  email: '',
  password: '',
};

type LoginForm = {
  email: string;
  password: string;
};

type FormErrors = Partial<LoginForm>;

function Login() {
  const [formData, setFormData] = useState<LoginForm>(INITIAL_FORM_LOGIN);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const formValidate = (data: LoginForm) => {
      const errors: FormErrors = {};
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (data.password.length < 7) {
        errors.password = 'A senha deve ter no mínimo 7 caracteres';
      }

      if (!regex.test(formData.email)) {
        errors.email = 'O formato do email é inválido';
      }

      setFormErrors(errors);
      setIsFormValid(Object.keys(errors).length === 0);
    };
    formValidate(formData);
  }, [formData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: formData.email }));
    setFormData(INITIAL_FORM_LOGIN);
    navigate('/meals');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          placeholder="Email"
          data-testid="email-input"
          name="email"
          value={ formData.email }
          onChange={ handleChange }
        />
        {formErrors.email && <p>{formErrors.email}</p>}
        <input
          type="password"
          placeholder="Password"
          data-testid="password-input"
          name="password"
          value={ formData.password }
          onChange={ handleChange }
        />
        {formErrors.password && <p>{formErrors.password}</p>}
        <button data-testid="login-submit-btn" disabled={ !isFormValid }>Enter</button>
      </form>
    </div>

  );
}

export { Login };
