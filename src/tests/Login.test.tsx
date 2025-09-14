import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './renderWithRouter';

const EMAIL = 'test@test.com';

describe('Testes da pagina de Login', () => {
  test('Elementos devem estar na tela', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const inputPassword = screen.getByPlaceholderText(/Password/i);
    const buttonEnter = screen.getByRole('button');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonEnter).toBeInTheDocument();
  });

  test('O usuário consegue escrever no input', async () => {
    const { user } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const inputPassword = screen.getByPlaceholderText(/Password/i);

    await user.type(inputEmail, EMAIL);
    await user.type(inputPassword, '12345678');

    expect(inputEmail).toHaveValue(EMAIL);
    expect(inputPassword).toHaveValue('12345678');
  });
});

describe('Validação do formulario da pagina de login', () => {
  test('O botão deve estar desabilitado ao renderizar', async () => {
    renderWithRouter(<App />);
    const buttonEnter = screen.getByRole('button', { name: /Enter/i });
    expect(buttonEnter).toBeDisabled();
  });

  test('O botão deve permanecer desabilitado com um email inválido', async () => {
    const { user } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const inputPassword = screen.getByPlaceholderText(/Password/i);
    const buttonEnter = screen.getByRole('button');

    await user.type(inputEmail, 'email@');
    await user.type(inputPassword, '12345678');

    expect(buttonEnter).toBeDisabled();
  });

  test('O botão deve permanecer desabilitado com um password inválido', async () => {
    const { user } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const inputPassword = screen.getByPlaceholderText(/Password/i);
    const buttonEnter = screen.getByRole('button');

    await user.type(inputEmail, EMAIL);
    await user.type(inputPassword, '12345');

    expect(buttonEnter).toBeDisabled();
  });

  test('O botão deve ser habilitado quando o email e a senha são válidos', async () => {
    const { user } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const inputPassword = screen.getByPlaceholderText(/Password/i);
    const buttonEnter = screen.getByRole('button');

    expect(buttonEnter).toBeDisabled();

    await user.type(inputEmail, EMAIL);
    await user.type(inputPassword, '12345678');

    expect(buttonEnter).toBeEnabled();
  });
});

describe('Testa se salva no localStorage e redireciona para /meals', () => {
  test('Email deve ser salvo no localStorage', async () => {
    const { user } = renderWithRouter(<App />);

    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const inputPassword = screen.getByPlaceholderText(/Password/i);
    const buttonEnter = screen.getByRole('button');

    await user.type(inputEmail, EMAIL);
    await user.type(inputPassword, '12345678');
    await user.click(buttonEnter);

    expect(localStorage.getItem('user')).toBe(JSON.stringify({ email: EMAIL }));
    expect(window.location.pathname).toBe('/meals');
  });
});
